"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraModifyController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	CameraUtility_1 = require("../CameraUtility"),
	FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	MODIFY_SMALL_LENGTH = 1,
	MODIFY_ZOOM_MODIFIER_LAG_SPEED = 8;
class CameraFadeOutData {
	constructor() {
		(this.ModifyArmLength = !1),
			(this.StartArmLength = 0),
			(this.ArmLength = 0),
			(this.ModifyCameraOffset = !1),
			(this.StartCameraOffset = Vector_1.Vector.Create()),
			(this.CameraOffset = Vector_1.Vector.Create()),
			(this.ModifyZoomModifier = !1),
			(this.StartZoomModifier = 1),
			(this.ZoomModifier = 1),
			(this.ModifyFov = !1),
			(this.StartFov = 0),
			(this.Fov = 0),
			(this.ModifyArmRotation = !1),
			(this.StartArmRotation = Rotator_1.Rotator.Create()),
			(this.ArmRotation = Quat_1.Quat.Create()),
			(this.ModifyPlayerLocation = !1),
			(this.StartPlayerLocation = Vector_1.Vector.Create()),
			(this.PlayerLocation = Vector_1.Vector.Create()),
			(this.ElapsedTime = 0),
			(this.FadeOutTotalTime = 0),
			(this.UseFadeOutTimeLerp = !1);
	}
}
class CameraModify {
	constructor(t) {
		(this.Name = StringUtils_1.EMPTY_STRING),
			(this.ArmLength = 0),
			(this.ArmLengthAdditional = 0),
			(this.ArmRotation = Rotator_1.Rotator.Create()),
			(this.ArmRotationAdditional = Rotator_1.Rotator.Create()),
			(this.CameraFov = 0),
			(this.CameraOffset = Vector_1.Vector.Create()),
			(this.CameraOffsetAdditional = Vector_1.Vector.Create()),
			(this.FocusCameraRelativeYaw = 0),
			(this.IsLockInput = !1),
			(this.IsModifiedArmLength = !1),
			(this.IsModifiedArmRotation = !1),
			(this.IsModifiedArmRotationPitch = !1),
			(this.IsModifiedArmRotationRoll = !1),
			(this.IsModifiedArmRotationYaw = !1),
			(this.IsModifiedCameraFov = !1),
			(this.IsModifiedCameraOffset = !1),
			(this.IsModifiedCameraOffsetX = !1),
			(this.IsModifiedCameraOffsetY = !1),
			(this.IsModifiedCameraOffsetZ = !1),
			(this.IsModifiedCameraLens = !1),
			(this.OverrideCameraInput = !1),
			(this.ResetFinalArmLength = !1),
			(this.ResetFinalArmRotation = !1),
			(this.StopModifyOnMontageEnd = !1),
			(this.IsLerpArmLocation = !1),
			(this.MaxLookTargetAngle = 0),
			(this.MaxLookTargetAngleSpeed = 0),
			(this.IsSwitchModifier = !1),
			(this.IsModifyArmRotationBasedOnActorRotation = !1),
			(this.IsUseArmLengthFloatCurve = !1),
			(this.ArmLengthFloatCurve = void 0),
			(this.IsUseArmRotationFloatCurve = !1),
			(this.ArmRotationFloatCurve = void 0),
			(this.IsUseFovFloatCurve = !1),
			(this.FovFloatCurve = void 0),
			(this.IsUseLensFloatCurve = !1),
			(this.LensFloatCurve = void 0),
			(this.CameraLens = void 0),
			(this.ResetFinalArmRotationToFocus = !1),
			(this.IsForcePlayModify = !1),
			(this.Name = t.Name),
			(this.ArmLength = t.ArmLength),
			(this.ArmLengthAdditional = t.ArmLengthAdditional),
			(this.ArmRotation = Rotator_1.Rotator.Create(t.ArmRotation)),
			(this.ArmRotationAdditional = Rotator_1.Rotator.Create(
				t.ArmRotationAdditional,
			)),
			(this.CameraFov = t.CameraFov),
			(this.CameraOffset = Vector_1.Vector.Create(t.CameraOffset)),
			(this.CameraOffsetAdditional = Vector_1.Vector.Create(
				t.CameraOffsetAdditional,
			)),
			(this.FocusCameraRelativeYaw = t.FocusCameraRelativeYaw),
			(this.IsLockInput = t.IsLockInput),
			(this.IsModifiedArmLength = t.IsModifiedArmLength),
			(this.IsModifiedArmRotation = t.IsModifiedArmRotation),
			(this.IsModifiedArmRotationPitch = t.IsModifiedArmRotationPitch),
			(this.IsModifiedArmRotationRoll = t.IsModifiedArmRotationRoll),
			(this.IsModifiedArmRotationYaw = t.IsModifiedArmRotationYaw),
			(this.IsModifiedCameraFov = t.IsModifiedCameraFov),
			(this.IsModifiedCameraOffset = t.IsModifiedCameraOffset),
			(this.IsModifiedCameraOffsetX = t.IsModifiedCameraOffsetX),
			(this.IsModifiedCameraOffsetY = t.IsModifiedCameraOffsetY),
			(this.IsModifiedCameraOffsetZ = t.IsModifiedCameraOffsetZ),
			(this.IsModifiedCameraLens = t.IsModifiedCameraLens),
			(this.OverrideCameraInput = t.OverrideCameraInput),
			(this.ResetFinalArmLength = t.ResetFinalArmLength),
			(this.ResetFinalArmRotation = t.ResetFinalArmRotation),
			(this.StopModifyOnMontageEnd = t.StopModifyOnMontageEnd),
			(this.IsLerpArmLocation = t.IsLerpArmLocation),
			(this.MaxLookTargetAngle = t.MaxLookTargetAngle),
			(this.MaxLookTargetAngleSpeed = t.MaxLookTargetAngleSpeed),
			(this.IsSwitchModifier = t.IsSwitchModifier),
			(this.IsModifyArmRotationBasedOnActorRotation =
				t.IsModifyArmRotationBasedOnActorRotation),
			(this.IsUseArmLengthFloatCurve = t.IsUseArmLengthFloatCurve),
			this.IsUseArmLengthFloatCurve &&
				(this.ArmLengthFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
					t.ArmLengthFloatCurve,
				)),
			(this.IsUseArmRotationFloatCurve = t.IsUseArmRotationFloatCurve),
			this.IsUseArmRotationFloatCurve &&
				(this.ArmRotationFloatCurve =
					CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ArmRotationFloatCurve)),
			(this.IsUseFovFloatCurve = t.IsUseFovFloatCurve),
			this.IsUseFovFloatCurve &&
				(this.FovFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
					t.FovFloatCurve,
				)),
			(this.IsUseLensFloatCurve = t.IsUseLensFloatCurve),
			this.IsUseLensFloatCurve &&
				(this.LensFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
					t.LensFloatCurve,
				)),
			(this.CameraLens = t.CameraLens),
			(this.ResetFinalArmRotationToFocus = t.ResetFinalArmRotationToFocus),
			(this.IsForcePlayModify = t.IsForcePlayModify);
	}
}
class CameraModifyController extends CameraControllerBase_1.CameraControllerBase {
	constructor(t) {
		super(t),
			(this.ModifyArmLengthLagSpeed = 0),
			(this.ModifyCameraOffsetLagSpeed = 0),
			(this.ModifyArmRotationLagSpeed = 0),
			(this.ModifyFovLagSpeed = 0),
			(this._ue = -0),
			(this.uue = void 0),
			(this.cue = -0),
			(this.mue = -0),
			(this.due = -0),
			(this.Cue = -0),
			(this.gue = !1),
			(this.fue = void 0),
			(this.pue = void 0),
			(this.vue = !1),
			(this.IsModifyFadeOut = !1),
			(this.CurrentBlendState = 0),
			(this.ModifyFadeOutData = new CameraFadeOutData()),
			(this.ModifySettings = void 0),
			(this.Mue = void 0),
			(this.Sue = void 0),
			(this.ModifyArmLength = !1),
			(this.Eue = !1),
			(this.yue = !1),
			(this.Iue = !1),
			(this.Tue = void 0),
			(this.Lue = ""),
			(this.Due = Vector_1.Vector.Create()),
			(this.Rue = Vector_1.Vector.Create()),
			(this.Uue = !1),
			(this.Aue = !1),
			(this.Pue = !1),
			(this.xue = !0),
			(this.SettlementCamera = void 0),
			(this.wue = Quat_1.Quat.Create()),
			(this.Bue = Rotator_1.Rotator.Create()),
			(this.bue = Rotator_1.Rotator.Create()),
			(this.que = Rotator_1.Rotator.Create()),
			(this.Gue = Rotator_1.Rotator.Create()),
			(this.Nue = Rotator_1.Rotator.Create()),
			(this.Oue = Vector_1.Vector.Create()),
			(this.kue = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.az = Quat_1.Quat.Create()),
			(this.Fue = Quat_1.Quat.Create()),
			(this.Vue = new FightCameraLogicComponent_1.VirtualCamera()),
			(this.Hue = new FightCameraLogicComponent_1.VirtualCamera()),
			(this.jue = 0),
			(this.Wue = Vector_1.Vector.Create()),
			(this.l5s = () => {
				this.Mue &&
					this.Mue !== this.Sue?.GetCurrentActiveMontage() &&
					this.Que(!0, !0);
			}),
			(this.Kue = (t, e) => {
				this.Mue &&
					this.Mue !== this.Sue?.GetCurrentActiveMontage() &&
					this.Que(!0, !0);
			}),
			(this.Xue = (t) => {
				this.Mue && this.Mue !== t && this.Que(!0, !0);
			}),
			(this.$ue = (t) => {
				t === this.Tue?.EntityId && this.Que(!0, !1);
			}),
			(this.Yue = !1),
			(this.OnChangeRole = (t, e) => {
				this.ModifySettings?.IsSwitchModifier || this.Que(!0, !0);
			}),
			(this.Jue = 0);
	}
	get IsAiming() {
		return this.Yue;
	}
	set IsAiming(t) {
		this.Yue !== t &&
			((this.Yue = t), this.Yue ? this.Lock(this) : this.Unlock(this));
	}
	Name() {
		return "ModifyController";
	}
	OnInit() {
		this.SetConfigMap(1, "ModifyArmLengthLagSpeed"),
			this.SetConfigMap(2, "ModifyCameraOffsetLagSpeed"),
			this.SetConfigMap(3, "ModifyArmRotationLagSpeed"),
			this.SetConfigMap(4, "ModifyFovLagSpeed");
	}
	SetSettlementModifier(t) {
		(this.SettlementCamera = t),
			this.Camera.SettlementCamera.SetSettlementCamera(t);
	}
	OnDisable() {
		this.IsModified && this.Que(!0, !1),
			this.IsModifyFadeOut && this.EndModifyFadeOut();
	}
	UpdateInternal(t) {
		(this.IsAiming = this.Camera.ContainsTag(428837378)),
			this.IsAiming || (this.UpdateBreakModifyInfo(), this.zue(t), this.Zue(t));
	}
	UpdateDeactivateInternal(t) {
		(this.IsAiming = this.Camera.ContainsTag(428837378)),
			this.IsAiming || this.zue(t);
	}
	get IsActivate() {
		return super.IsActivate || !!this.ModifySettings?.IsForcePlayModify;
	}
	get IsModified() {
		return !!this.ModifySettings;
	}
	ApplyCameraModify(t, e, i, a, o, s, r, h, d, n, m, u) {
		var C, f, M;
		(!super.IsActivate && !s.IsForcePlayModify) ||
			(t && "None" !== t.TagName && !this.Camera.ContainsTag(t.TagId)) ||
			s.Priority < this.Jue ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Camera",
					6,
					"ApplyCameraModify",
					["tag", t?.TagName],
					["montage", r?.GetName()],
					["ArmLengthAddition", s.CameraOffsetAdditional],
				),
			(C = this.IsModified || this.IsModifyFadeOut),
			(f =
				this.IsModified &&
				(this.ModifyArmLength || !!this.ModifySettings?.IsModifiedArmLength)),
			(M = C && this.Iue),
			this.Que(!C, !1),
			(this.gue = M),
			(this.Jue = s.Priority),
			t && "None" !== t.TagName && (this.uue = t),
			this.Camera.CameraAdjustController.Lock(this),
			this.Camera.CameraGuideController.Lock(this),
			this.Camera.CopyVirtualCamera(this.Hue, this.Camera.CurrentCamera),
			C || this.Camera.CopyVirtualCamera(this.Vue, this.Hue),
			this.ResetBreakModifyInfo(),
			(this.cue = e),
			(this.mue = i),
			(this.due = a),
			(this.Cue = o),
			(this.fue = CurveUtils_1.CurveUtils.CreateCurveByStruct(h)),
			(this.pue = CurveUtils_1.CurveUtils.CreateCurveByStruct(d)),
			(this._ue = 0),
			(this.ModifySettings = new CameraModify(s)),
			this.ModifySettings.StopModifyOnMontageEnd &&
				((this.Mue = r),
				(this.Sue = this.dBn(n, u)),
				this.Sue?.OnMontageStarted.Add(this.Xue),
				this.Sue?.OnMontageEnded.Add(this.Kue),
				this.Sue?.OnAllMontageInstancesEnded.Add(this.l5s)),
			(this.ModifyArmLength =
				f ||
				!MathUtils_1.MathUtils.IsNearlyEqual(
					this.ModifySettings.ArmLengthAdditional,
					0,
				)),
			(this.Eue = !this.ModifySettings.CameraOffsetAdditional.IsNearlyZero(
				MathUtils_1.MathUtils.KindaSmallNumber,
			)),
			(this.yue = !this.ModifySettings.ArmRotationAdditional.IsNearlyZero()),
			(this.Iue = !!n),
			(this.Tue = n),
			(this.Lue = m),
			this.Iue &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.CharOnRoleDead,
					this.$ue,
				),
			(this.jue =
				this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition),
			this.Wue.DeepCopy(
				this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
			),
			(this.Uue = this.ModifySettings.IsModifiedCameraFov),
			(this.Aue = this.ModifySettings.IsModifiedCameraLens),
			this.ModifySettings.OverrideCameraInput &&
				((this.yue || this.ModifySettings.IsModifiedArmRotation) &&
					(this.Camera.CameraInputController.LockArmRotationYaw(this),
					this.Camera.CameraInputController.LockArmRotationPitch(this)),
				this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
				this.Camera.CameraInputController.LockArmLength(this),
			this.ModifySettings.IsLockInput &&
				this.Camera.CameraInputController.Lock(this),
			this.wue.Reset(),
			(this.xue = !0));
	}
	Zue(t) {
		if (this.IsModified) {
			(this._ue += t),
				this.uue &&
					!this.vue &&
					(this.Camera.ContainsTag(this.uue.TagId)
						? this._ue > this.mue && (this._ue = this.mue)
						: this._ue < this.mue + this.cue && this.Que(!0, !0));
			let i,
				a = 0,
				o = 0,
				s = 0;
			var e;
			this._ue < this.mue
				? ((i = 1),
					(s = this._ue / this.mue),
					(a =
						0 < this.mue ? this.fue.GetCurrentValue(this._ue / this.mue) : 1),
					(o =
						0 < this.mue
							? this.fue.GetOffsetRate((this._ue - t) / this.mue, t / this.mue)
							: 1))
				: this._ue < this.mue + this.cue
					? ((i = 2), (a = 1), (o = 1))
					: ((i = 3),
						(e = this._ue - this.mue - this.cue),
						(a = 0 < this.due ? this.pue.GetCurrentValue(e / this.due) : 1),
						(o =
							0 < this.due
								? this.pue.GetOffsetRate((e - t) / this.due, t / this.due)
								: 1),
						(this.Jue = 0)),
				(this.CurrentBlendState = i),
				this.ece(),
				this.tce(i, a, o),
				this.ice(i, a, o),
				this.oce(i, a, s),
				this.rce(i, a),
				this.nce(i, a, t, s),
				this.sce(i, a, s),
				this.ace(i, a, s),
				this._ue > this.mue + this.cue + this.due && this.Que(!0, !1);
		}
	}
	tce(t, e, i) {
		if (this.Iue)
			if (this.Tue?.Mesh?.IsValid() && this.Tue?.CharacterActorComponent?.Valid)
				switch (
					(this.Due.FromUeVector(
						this.Tue.Mesh.GetSocketLocation(
							FNameUtil_1.FNameUtil.GetDynamicFName(this.Lue),
						),
					),
					t)
				) {
					case 1:
						this.Lz.DeepCopy(this.gue ? this.Rue : this.Camera.PlayerLocation),
							Vector_1.Vector.Lerp(
								this.Lz,
								this.Due,
								e,
								this.Camera.PlayerLocation,
							),
							this.Rue.DeepCopy(this.Camera.PlayerLocation),
							(this.Iue = !0);
						break;
					case 2:
						this.Camera.PlayerLocation.DeepCopy(this.Due),
							this.Rue.DeepCopy(this.Camera.PlayerLocation),
							(this.Iue = !0);
						break;
					case 3:
						Vector_1.Vector.Lerp(
							this.Rue,
							this.Camera.PlayerLocation,
							e,
							this.Camera.PlayerLocation,
						),
							this.Rue.DeepCopy(this.Camera.PlayerLocation),
							(this.Iue = !0);
						break;
					default:
						this.Iue = !1;
				}
			else this.Que(!0, !1);
	}
	ice(t, e, i) {
		if (this.ModifySettings.IsLerpArmLocation) {
			switch (t) {
				case 1:
					Vector_1.Vector.Lerp(
						this.Camera.CurrentCamera.ArmLocation,
						this.Camera.PlayerLocation,
						i,
						this.Camera.DesiredCamera.ArmLocation,
					),
						Vector_1.Vector.Lerp(
							this.Wue,
							Vector_1.Vector.Create(0, 0, 0),
							i,
							this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
						);
					break;
				case 3:
					Vector_1.Vector.Lerp(
						this.Camera.CurrentCamera.ArmLocation,
						this.Camera.TmpArmLocation,
						i,
						this.Camera.DesiredCamera.ArmLocation,
					),
						Vector_1.Vector.Lerp(
							Vector_1.Vector.Create(0, 0, 0),
							this.Wue,
							i,
							this.Camera.CameraAutoController.CurrentAutoCameraArmOffset,
						);
					break;
				default:
					this.Camera.DesiredCamera.ArmLocation.DeepCopy(
						this.Camera.PlayerLocation,
					),
						this.Camera.CameraAutoController.CurrentAutoCameraArmOffset.Set(
							0,
							0,
							0,
						);
			}
			this.Camera.IsModifiedArmLocation = !0;
		}
	}
	oce(t, e, i) {
		if (
			!this.BreakModifyArmLength &&
			(this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength)
		) {
			let o = e,
				s = 0;
			var a = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
			switch (
				((s = this.ModifySettings.IsModifiedArmLength
					? this.ModifySettings.ArmLength / a
					: this.Camera.GetArmLengthWithSettingAndZoom(this.Vue) / a),
				this.ModifyArmLength &&
					((s += this.ModifySettings.ArmLengthAdditional / a),
					(s = Math.max(s, this.Camera.DesiredCamera.MinArmLength / a))),
				t)
			) {
				case 1:
					this.ModifySettings.IsUseArmLengthFloatCurve &&
						(o = this.ModifySettings.ArmLengthFloatCurve.GetCurrentValue(i)),
						(this.Camera.DesiredCamera.ZoomModifier =
							MathUtils_1.MathUtils.Lerp(this.Hue.ZoomModifier, s, o)),
						this.ModifySettings.IsModifiedArmLength &&
							(this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition =
								MathUtils_1.MathUtils.Lerp(this.jue, 0, o));
					break;
				case 2:
					(this.Camera.DesiredCamera.ZoomModifier = s),
						this.ModifySettings.IsModifiedArmLength &&
							(this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition = 0);
					break;
				case 3:
					(this.Camera.DesiredCamera.ZoomModifier = MathUtils_1.MathUtils.Lerp(
						s,
						this._ce(),
						e,
					)),
						this.ModifySettings.IsModifiedArmLength &&
							(this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition =
								MathUtils_1.MathUtils.Lerp(0, this.jue, e));
			}
			this.Camera.IsModifiedArmLength = !0;
		}
	}
	rce(t, e) {
		if (
			!this.BreakModifyCameraOffset &&
			(this.ModifySettings.IsModifiedCameraOffset || this.Eue)
		) {
			var i = Vector_1.Vector.Create();
			switch (
				(this.ModifySettings.IsModifiedCameraOffset
					? (i.FromUeVector(this.ModifySettings.CameraOffset),
						i.Set(
							this.ModifySettings.IsModifiedCameraOffsetX
								? this.ModifySettings.CameraOffset.X
								: this.Camera.CameraOffsetX,
							this.ModifySettings.IsModifiedCameraOffsetY
								? this.ModifySettings.CameraOffset.Y
								: this.Camera.CameraOffsetY,
							this.ModifySettings.IsModifiedCameraOffsetZ
								? this.ModifySettings.CameraOffset.Z
								: this.Camera.CameraOffsetZ,
						))
					: ((i.X = this.Camera.CameraOffsetX),
						(i.Y = this.Camera.CameraOffsetY),
						(i.Z = this.Camera.CameraOffsetZ)),
				this.Eue &&
					i &&
					i.AdditionEqual(
						Vector_1.Vector.Create(this.ModifySettings.CameraOffsetAdditional),
					),
				t)
			) {
				case 1:
					Vector_1.Vector.Lerp(
						this.Hue.CameraOffset,
						i,
						e,
						this.Camera.DesiredCamera.CameraOffset,
					);
					break;
				case 2:
					this.Camera.DesiredCamera.CameraOffset.DeepCopy(i);
					break;
				case 3:
					var a = Vector_1.Vector.Create(
						this.Camera.CameraOffsetX,
						this.Camera.CameraOffsetY,
						this.Camera.CameraOffsetZ,
					);
					Vector_1.Vector.Lerp(i, a, e, this.Camera.DesiredCamera.CameraOffset);
			}
			this.Camera.IsModifiedCameraOffset = !0;
		}
	}
	nce(t, e, i, a) {
		if (
			!(
				this.BreakModifyArmRotation ||
				(!this.ModifySettings.IsModifiedArmRotation && !this.yue) ||
				(!this.ModifySettings.IsLockInput && this.Pue)
			)
		) {
			this.ModifySettings.IsModifiedArmRotationPitch ||
			this.ModifySettings.IsModifiedArmRotationRoll ||
			this.ModifySettings.IsModifiedArmRotationYaw
				? (this.Iue && this.Tue?.CharacterActorComponent?.Valid
						? this.bue.FromUeRotator(
								this.Tue.CharacterActorComponent.ActorRotationProxy,
							)
						: this.bue.FromUeRotator(
								this.Camera.Character.CharacterActorComponent
									.ActorRotationProxy,
							),
					this.Bue.FromUeRotator(this.Hue.ArmRotation),
					this.Gue.DeepCopy(this.ModifySettings.ArmRotation),
					this.Bue.Set(
						this.ModifySettings.IsModifiedArmRotationPitch
							? this.bue.Pitch + this.Gue.Pitch
							: this.Bue.Pitch,
						this.ModifySettings.IsModifiedArmRotationYaw
							? this.bue.Yaw + this.Gue.Yaw
							: this.Bue.Yaw,
						this.ModifySettings.IsModifiedArmRotationRoll
							? this.bue.Roll + this.Gue.Roll
							: this.Bue.Roll,
					),
					this.ModifySettings.IsModifyArmRotationBasedOnActorRotation ||
						this.xue ||
						this.Bue.DeepCopy(this.que),
					this.xue && (this.que.DeepCopy(this.Bue), (this.xue = !1)))
				: this.Bue.DeepCopy(this.Hue.ArmRotation),
				this.yue &&
					this.Bue.Set(
						this.Bue.Pitch + this.ModifySettings.ArmRotationAdditional.Pitch,
						this.Bue.Yaw + this.ModifySettings.ArmRotationAdditional.Yaw,
						this.Bue.Roll + this.ModifySettings.ArmRotationAdditional.Roll,
					);
			let o = e;
			switch (t) {
				case 1:
					this.ModifySettings.IsUseArmRotationFloatCurve &&
						(o = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(a)),
						Rotator_1.Rotator.Lerp(this.Hue.ArmRotation, this.Bue, o, this.Gue),
						(this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
							this.Gue,
						));
					break;
				case 2:
					this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
						this.Bue,
					);
					break;
				case 3:
					Rotator_1.Rotator.Lerp(this.Bue, this.lce(), o, this.Gue),
						(this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
							this.Gue,
						));
			}
			if (
				((this.Camera.IsModifiedArmRotation = !0),
				this.Camera.DesiredCamera.ArmRotation.Quaternion(this.Fue),
				this.wue.Multiply(this.Fue, this.Fue),
				this.Fue.Rotator(this.Camera.DesiredCamera.ArmRotation),
				this.Camera.PlayerLocation.Subtraction(
					this.Camera.CameraLocation,
					this.Oue,
				),
				this.Oue.Normalize())
			) {
				this.Fue.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.kue);
				let a =
						Math.acos(this.Oue.DotProduct(this.kue)) *
						MathUtils_1.MathUtils.RadToDeg,
					o = 0;
				if (a < this.ModifySettings.MaxLookTargetAngle || 3 === t) {
					if (
						(this.wue.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
						(a = Math.acos(this.Lz.X) * MathUtils_1.MathUtils.RadToDeg) <
							MathUtils_1.MathUtils.SmallNumber)
					)
						return;
					this.wue.Inverse(this.az),
						(o = Math.min(a, this.ModifySettings.MaxLookTargetAngle - o));
				} else
					Quat_1.Quat.FindBetween(this.kue, this.Oue, this.az),
						(o = a - this.ModifySettings.MaxLookTargetAngle);
				(e = Math.min(o, this.ModifySettings.MaxLookTargetAngleSpeed * i) / a),
					Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, e, this.az),
					this.az.Multiply(this.wue, this.wue),
					this.az.Multiply(this.Fue, this.Fue),
					this.Fue.Rotator(this.Camera.DesiredCamera.ArmRotation);
			}
		}
	}
	ece() {
		var [t, e] = this.Camera?.CharacterEntityHandle.Entity.GetComponent(
			52,
		)?.GetCameraInput() ?? [0, 0];
		(Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber ||
			Math.abs(e) > MathUtils_1.MathUtils.KindaSmallNumber) &&
			(this.Pue = !0);
	}
	lce() {
		return this.ModifySettings.ResetFinalArmRotationToFocus
			? (this.Nue.DeepCopy(
					CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(),
				),
				this.Nue)
			: this.ModifySettings.ResetFinalArmRotation
				? (this.Nue.DeepCopy(this.Camera.DesiredCamera.ArmRotation),
					(this.Nue.Roll = 0),
					this.Nue)
				: this.Vue.ArmRotation;
	}
	hce() {
		return (
			this.ModifySettings.ResetFinalArmLength
				? this.Camera.DesiredCamera
				: this.Vue
		).ArmLength;
	}
	_ce() {
		return this.ModifySettings.ResetFinalArmLength &&
			this.ModifySettings.IsModifiedArmLength
			? MathUtils_1.MathUtils.Clamp(
					this.ModifySettings.ArmLength +
						(this.ModifyArmLength
							? this.ModifySettings.ArmLengthAdditional
							: 0),
					this.Camera.CurrentCamera.MinArmLength,
					this.Camera.CurrentCamera.MaxArmLength,
				) / this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera)
			: this.Vue.ZoomModifier;
	}
	sce(t, e, i) {
		if (!this.BreakModifyFov && this.Uue) {
			let o = e;
			var a = this.ModifySettings.CameraFov;
			switch (t) {
				case 1:
					this.ModifySettings.IsUseFovFloatCurve &&
						(o = this.ModifySettings.FovFloatCurve.GetCurrentValue(i)),
						(this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(
							this.Hue.Fov,
							a,
							o,
						));
					break;
				case 2:
					this.Camera.DesiredCamera.Fov = a;
					break;
				case 3:
					this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(
						a,
						this.Camera.Fov,
						o,
					);
			}
			this.Camera.IsModifiedFov = !0;
		}
	}
	ace(t, e, i) {
		if (this.Aue) {
			let o,
				s = e,
				r = 0;
			var a = this.ModifySettings.CameraLens;
			switch (t) {
				case 1:
					this.ModifySettings.IsUseLensFloatCurve &&
						(s = this.ModifySettings.LensFloatCurve.GetCurrentValue(i)),
						(o = MathUtils_1.MathUtils.Lerp(a.StartFStop, a.EndFStop, s)),
						(r = MathUtils_1.MathUtils.Lerp(
							a.RadialBlurStartIntensity,
							a.RadialBlurEndIntensity,
							s,
						));
					break;
				case 2:
					(o = a.EndFStop), (r = a.RadialBlurEndIntensity);
					break;
				case 3:
					(o = MathUtils_1.MathUtils.Lerp(a.EndFStop, a.StartFStop, s)),
						(r = MathUtils_1.MathUtils.Lerp(
							a.RadialBlurEndIntensity,
							a.RadialBlurStartIntensity,
							s,
						));
			}
			this.Camera.ApplyDepthOfField(o, void 0, void 0, void 0),
				this.Camera.ApplyRadialBlur(
					r,
					a.RadialBlurCenter,
					a.RadialBlurRadius,
					a.RadialBlurHardness,
					a.RadialBlurPassNumber,
					a.RadialBlurSampleNumber,
				);
		}
	}
	Que(t, e) {
		this.IsModified &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Camera", 6, "EndModify", ["withFadeOut", t]),
			(this.Jue = 0),
			this.Camera.CameraAdjustController.Unlock(this),
			this.Camera.CameraGuideController.Unlock(this),
			this.ModifySettings.OverrideCameraInput &&
				((this.yue || this.ModifySettings.IsModifiedArmRotation) &&
					(this.Camera.CameraInputController.UnlockArmRotationYaw(this),
					this.Camera.CameraInputController.UnlockArmRotationPitch(this)),
				this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) &&
				this.Camera.CameraInputController.UnlockArmLength(this),
			t ? this.uce(e) : this.EndModifyFadeOut(),
			(this.Mue = void 0),
			this.Sue?.IsValid() &&
				(this.Sue.OnMontageStarted.Remove(this.Xue),
				this.Sue.OnMontageEnded.Remove(this.Kue),
				this.Sue.OnAllMontageInstancesEnded.Remove(this.l5s),
				(this.Sue = void 0)),
			(this.ModifyArmLength = !1),
			(this.ModifySettings.IsModifiedCameraOffset || this.Eue) &&
				(this.Eue = !1),
			(this.ModifySettings.IsModifiedArmRotation || this.yue) &&
				(this.yue = !1),
			this.Uue && (this.Uue = !1),
			this.uue && ((this.uue = void 0), (this.vue = !1)),
			this.Aue &&
				((this.Aue = !1),
				this.Camera.ExitDepthOfField(),
				this.Camera.ExitRadialBlur()),
			(this.Pue = !1),
			(this.ModifySettings = void 0),
			this.Camera.CameraInputController.Unlock(this),
			this.Tue &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.CharOnRoleDead,
					this.$ue,
				),
			(this.Tue = void 0),
			(this.Iue = !1),
			(this.gue = !1));
	}
	uce(t = !1) {
		var e;
		this.ResetBreakModifyInfo(),
			(this.ModifyFadeOutData.ModifyArmLength =
				this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength),
			this.ModifyFadeOutData.ModifyArmLength &&
				((this.ModifyFadeOutData.StartArmLength =
					this.Camera.CurrentCamera.ArmLength),
				(this.ModifyFadeOutData.ArmLength = this.hce())),
			(this.ModifyFadeOutData.ModifyZoomModifier =
				this.ModifyFadeOutData.ModifyArmLength),
			this.ModifyFadeOutData.ModifyZoomModifier &&
				((this.ModifyFadeOutData.StartZoomModifier =
					this.Camera.CurrentCamera.ZoomModifier),
				(this.ModifyFadeOutData.ZoomModifier = this._ce())),
			(this.ModifyFadeOutData.ModifyArmRotation =
				(this.ModifySettings.IsModifiedArmRotation || this.yue) &&
				(this.ModifySettings.IsLockInput ||
					!this.Pue ||
					!MathUtils_1.MathUtils.IsNearlyZero(
						this.Camera.DesiredCamera.ArmRotation.Roll,
					))),
			this.ModifyFadeOutData.ModifyArmRotation &&
				(((e = this.lce()).Roll = 0),
				this.ModifyFadeOutData.StartArmRotation.DeepCopy(
					this.Camera.CurrentCamera.ArmRotation,
				),
				this.ModifyFadeOutData.ArmRotation.DeepCopy(e.Quaternion())),
			(this.ModifyFadeOutData.ModifyCameraOffset =
				this.ModifySettings.IsModifiedCameraOffset || this.Eue),
			this.ModifyFadeOutData.ModifyCameraOffset &&
				this.ModifyFadeOutData.StartCameraOffset.DeepCopy(
					this.Camera.CurrentCamera.CameraOffset,
				),
			(this.ModifyFadeOutData.ModifyFov = this.Uue),
			this.ModifyFadeOutData.ModifyFov &&
				((this.ModifyFadeOutData.StartFov = this.Camera.CurrentCamera.Fov),
				(this.ModifyFadeOutData.Fov = this.Camera.Fov)),
			(this.ModifyFadeOutData.ModifyPlayerLocation = this.Iue),
			this.ModifyFadeOutData.ModifyPlayerLocation &&
				(this.ModifyFadeOutData.StartPlayerLocation.DeepCopy(
					this.Camera.PlayerLocation,
				),
				this.ModifyFadeOutData.PlayerLocation.DeepCopy(this.Rue)),
			(this.ModifyFadeOutData.ElapsedTime = 0),
			(this.ModifyFadeOutData.FadeOutTotalTime = this.Cue),
			(this.ModifyFadeOutData.UseFadeOutTimeLerp = t),
			(this.IsModifyFadeOut =
				this.ModifyFadeOutData.ModifyArmLength ||
				this.ModifyFadeOutData.ModifyArmRotation ||
				this.ModifyFadeOutData.ModifyCameraOffset ||
				this.ModifyFadeOutData.ModifyFov ||
				this.ModifyFadeOutData.ModifyPlayerLocation);
	}
	EndModifyFadeOut() {
		(this.IsModifyFadeOut = !1),
			(this.ModifyFadeOutData.ModifyArmLength = !1),
			(this.ModifyFadeOutData.ModifyArmRotation = !1),
			(this.ModifyFadeOutData.ModifyCameraOffset = !1),
			(this.ModifyFadeOutData.ModifyFov = !1),
			(this.ModifyFadeOutData.ModifyPlayerLocation = !1);
	}
	zue(t) {
		var e, i, a, o, s;
		this.IsModifyFadeOut &&
			((e = this.ModifyFadeOutData),
			(i = this.Camera.CurrentCamera),
			(a = this.Camera.DesiredCamera),
			(this.ModifyFadeOutData.ElapsedTime += t),
			(o =
				e.FadeOutTotalTime <= 0
					? 1
					: MathUtils_1.MathUtils.Clamp(
							e.ElapsedTime / e.FadeOutTotalTime,
							0,
							1,
						)),
			e.ModifyArmLength &&
				(this.Camera.IsModifiedArmLength
					? (e.ModifyArmLength = !1)
					: (([e.ModifyArmLength, a.ArmLength] = e.UseFadeOutTimeLerp
							? this.FloatLerp(e.StartArmLength, e.ArmLength, o, 1)
							: this.FloatInterpTo(
									i.ArmLength,
									e.ArmLength,
									t,
									this.ModifyArmLengthLagSpeed,
									1,
								)),
						(this.Camera.IsModifiedArmLength = !0))),
			e.ModifyZoomModifier &&
				(this.Camera.IsModifiedZoomModifier
					? (e.ModifyZoomModifier = !1)
					: (([e.ModifyZoomModifier, a.ZoomModifier] = e.UseFadeOutTimeLerp
							? this.FloatLerp(
									e.StartZoomModifier,
									e.ZoomModifier,
									o,
									MathUtils_1.MathUtils.KindaSmallNumber,
								)
							: this.FloatInterpTo(i.ZoomModifier, e.ZoomModifier, t, 8, 1)),
						(this.Camera.IsModifiedZoomModifier = !0))),
			e.ModifyCameraOffset &&
				(this.Camera.IsModifiedCameraOffset
					? (e.ModifyCameraOffset = !1)
					: ((e.CameraOffset.X = this.Camera.CameraOffsetX),
						(e.CameraOffset.Y = this.Camera.CameraOffsetY),
						(e.CameraOffset.Z = this.Camera.CameraOffsetZ),
						([e.ModifyCameraOffset, a.CameraOffset] = e.UseFadeOutTimeLerp
							? this.VectorLerp(e.StartCameraOffset, e.CameraOffset, o, 1)
							: this.VectorInterpTo(
									i.CameraOffset,
									e.CameraOffset,
									t,
									this.ModifyCameraOffsetLagSpeed,
									1,
								)),
						(this.Camera.IsModifiedCameraOffset = !0))),
			e.UseFadeOutTimeLerp && this.ece(),
			e.ModifyArmRotation &&
				(this.Camera.IsModifiedArmRotation || this.Pue
					? (e.ModifyArmRotation = !1)
					: ((s = void 0),
						([e.ModifyArmRotation, s] = e.UseFadeOutTimeLerp
							? this.RotationLerp(
									e.StartArmRotation,
									e.ArmRotation.Rotator(),
									o,
									1,
								)
							: this.RotationInterpTo(
									i.ArmRotation,
									e.ArmRotation.Rotator(),
									t,
									this.ModifyArmRotationLagSpeed,
									1,
								)),
						(a.ArmRotation = s),
						(this.Camera.IsModifiedArmRotation = !0))),
			e.ModifyFov &&
				(this.Camera.IsModifiedFov
					? (e.ModifyFov = !1)
					: (([e.ModifyFov, a.Fov] = e.UseFadeOutTimeLerp
							? this.FloatLerp(e.StartFov, e.Fov, o, 1)
							: this.FloatInterpTo(i.Fov, e.Fov, t, this.ModifyFovLagSpeed, 1)),
						(this.Camera.IsModifiedFov = !0))),
			e.ModifyPlayerLocation &&
				(([e.ModifyPlayerLocation, e.PlayerLocation] = e.UseFadeOutTimeLerp
					? this.VectorLerp(e.PlayerLocation, this.Camera.PlayerLocation, o, 1)
					: this.VectorInterpTo(
							e.PlayerLocation,
							this.Camera.PlayerLocation,
							t,
							this.ModifyCameraOffsetLagSpeed,
							1,
						)),
				this.Camera.PlayerLocation.DeepCopy(e.PlayerLocation)),
			e.UseFadeOutTimeLerp && e.ElapsedTime > e.FadeOutTotalTime
				? ((this.IsModifyFadeOut = !1), this.EndModifyFadeOut())
				: (this.IsModifyFadeOut =
						e.ModifyArmLength ||
						e.ModifyZoomModifier ||
						e.ModifyCameraOffset ||
						e.ModifyArmRotation ||
						e.ModifyFov ||
						e.ModifyPlayerLocation));
	}
	dBn(t, e) {
		let i;
		return (i = t
			? t.GetEntityNoBlueprint()
			: e?.GetEntityNoBlueprint()?.GetComponent(0)?.IsVision()
				? e?.GetEntityNoBlueprint()
				: this.Camera.CharacterEntityHandle.Entity)?.GetComponent(160)
			?.MainAnimInstance;
	}
	FloatInterpTo(t, e, i, a, o) {
		return (
			(i = MathUtils_1.MathUtils.InterpTo(t, e, i, a)),
			Math.abs(t - e) < o ? [!1, e] : [!0, i]
		);
	}
	VectorInterpTo(t, e, i, a, o) {
		var s = Vector_1.Vector.Create();
		MathUtils_1.MathUtils.VectorInterpTo(t, e, i, a, s),
			(i = Vector_1.Vector.Create());
		return (
			t.Subtraction(e, i),
			i.GetAbsMax() < o ? (s.DeepCopy(e), [!1, s]) : [!0, s]
		);
	}
	RotationInterpTo(t, e, i, a, o) {
		var s = Rotator_1.Rotator.Create();
		return (
			MathUtils_1.MathUtils.RotatorInterpTo(t, e, i, a, s),
			t.Equals(e, o) ? (s.DeepCopy(e), [!1, s]) : [!0, s]
		);
	}
	FloatLerp(t, e, i, a) {
		return (
			(i = MathUtils_1.MathUtils.Lerp(t, e, i)),
			Math.abs(t - e) < a ? [!1, e] : [!0, i]
		);
	}
	VectorLerp(t, e, i, a) {
		var o = Vector_1.Vector.Create();
		return (
			Vector_1.Vector.Lerp(t, e, i, o),
			t.Equals(e, a) ? (o.DeepCopy(e), [!1, o]) : [!0, o]
		);
	}
	RotationLerp(t, e, i, a) {
		var o = Rotator_1.Rotator.Create();
		return (
			Rotator_1.Rotator.Lerp(t, e, i, o),
			t.Equals(e, a) ? (o.DeepCopy(e), [!1, o]) : [!0, o]
		);
	}
}
exports.CameraModifyController = CameraModifyController;
