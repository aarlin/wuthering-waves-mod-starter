"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraInputController = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
	ColorUtils_1 = require("../../Utils/ColorUtils"),
	Switcher_1 = require("../../Utils/Switcher"),
	CameraUtility_1 = require("../CameraUtility"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	DEFAULT_FPS = 60,
	RANGE_TO_RADIUS = 0.7,
	DEFAULT_SEGMENT = 12,
	MAX_AIM_ASSIST_ANGLE = 40 * MathUtils_1.MathUtils.DegToRad,
	STOP_ON_START_ANGLE_THRESHOLD = 1,
	SHORT_AIM_START_TIME = 0.4,
	AIM_RANGE_TOLERANT = 1.05,
	MIN_PHYSICAL_DENSITY_DPI = 160,
	DEFAULT_DPI = 180;
class CameraInputController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.ZoomSpeed = 0),
			(this.InputSpeedMax = 0),
			(this.InputSpeedPercentage = 0),
			(this.SmoothFactorMin = 0),
			(this.SmoothFactorMax = 0),
			(this.SmoothFactorRange = 0),
			(this.SmoothFactorCurve = void 0),
			(this.SensitivityYawMin = 0),
			(this.SensitivityYawMax = 0),
			(this.SensitivityYawRange = 0),
			(this.SensitivityYawCurve = void 0),
			(this.SensitivityPitchMin = 0),
			(this.SensitivityPitchMax = 0),
			(this.SensitivityPitchRange = 0),
			(this.SensitivityPitchCurve = void 0),
			(this.InputSpeedMin = 0),
			(this.GamepadInputRate = 0),
			(this.AimAssistSpeedCenter = 0),
			(this.AimAssistSpeedEdge = 0),
			(this.AimAssistRange = 0),
			(this.AimAssistDamping = 0),
			(this.AimAssistCurve = void 0),
			(this.AimAssistStartTimeLength = 0),
			(this.AimAssistStartSpeedBegin = 0),
			(this.AimAssistStartSpeedEnd = 0),
			(this.AimAssistStartCurve = void 0),
			(this.N_e = new Switcher_1.Switcher(!0)),
			(this.O_e = new Set()),
			(this.k_e = new Set()),
			(this.F_e = new Set()),
			(this.mae = 0),
			(this.V_e = 0),
			(this.H_e = 0),
			(this.j_e = 0),
			(this.W_e = 0),
			(this.K_e = 0),
			(this.Q_e = void 0),
			(this.X_e = !1),
			(this.uoe = void 0),
			(this.$_e = Vector_1.Vector.Create()),
			(this.Y_e = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.J_e = Vector_1.Vector.Create()),
			(this.z_e = Vector_1.Vector.Create()),
			(this.az = Quat_1.Quat.Create()),
			(this.KJ = Quat_1.Quat.Create()),
			(this.Z_e = Transform_1.Transform.Create()),
			(this.eue = []),
			(this.tue = new Array()),
			(this.ybn = 0),
			(this.Ibn = 0),
			(this.Tbn = 0),
			(this.Lbn = 0),
			(this.Dbn = 0),
			(this.Abn = 0),
			(this.Ubn = 0);
	}
	get IsAiming() {
		return this.Camera.ContainsTag(428837378);
	}
	Name() {
		return "InputController";
	}
	OnInit() {
		this.SetConfigMap(1, "ZoomSpeed"),
			this.SetConfigMap(5, "InputSpeedMin"),
			this.SetConfigMap(6, "InputSpeedMax"),
			this.SetConfigMap(2, "SmoothFactorMin"),
			this.SetConfigMap(3, "SmoothFactorMax"),
			this.SetConfigMap(4, "SmoothFactorRange"),
			this.SetCurveConfigMap(4, "SmoothFactorCurve"),
			this.SetConfigMap(7, "SensitivityYawMin"),
			this.SetConfigMap(8, "SensitivityYawMax"),
			this.SetConfigMap(9, "SensitivityYawRange"),
			this.SetCurveConfigMap(9, "SensitivityYawCurve"),
			this.SetConfigMap(10, "SensitivityPitchMin"),
			this.SetConfigMap(11, "SensitivityPitchMax"),
			this.SetConfigMap(12, "SensitivityPitchRange"),
			this.SetCurveConfigMap(12, "SensitivityPitchCurve"),
			this.SetConfigMap(13, "GamepadInputRate"),
			this.SetConfigMap(14, "AimAssistSpeedCenter"),
			this.SetConfigMap(15, "AimAssistSpeedEdge"),
			this.SetConfigMap(16, "AimAssistRange"),
			this.SetConfigMap(17, "AimAssistDamping"),
			this.SetCurveConfigMap(16, "AimAssistCurve"),
			this.SetConfigMap(18, "AimAssistStartTimeLength"),
			this.SetConfigMap(19, "AimAssistStartSpeedBegin"),
			this.SetConfigMap(20, "AimAssistStartSpeedEnd"),
			this.SetCurveConfigMap(18, "AimAssistStartCurve");
	}
	OnStart() {
		var t, e, i, a;
		super.OnStart(),
			(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.bIsSingle = !1),
			(this.uoe.bIgnoreSelf = !0),
			this.uoe.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			this.uoe.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
			),
			this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
			this.uoe.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
			),
			this.uoe.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.uoe,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? ((t = (e = cpp_1.KuroScreen.GetPhysicalScreenResolution()).X),
					(e = e.Y),
					(i =
						GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
							.X),
					(a =
						GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
							.Y),
					(this.ybn = Math.max(i, a)),
					(this.Ibn = Math.min(i, a)),
					(this.Tbn = Math.max(t, e)),
					(this.Lbn = Math.min(t, e)),
					1 === ModelManager_1.ModelManager.PlatformModel.PlatformType
						? (this.Dbn = Math.max(
								cpp_1.KuroScreen.ComputePhysicalScreenDensity(),
								160,
							))
						: (this.Dbn = Math.max(
								cpp_1.KuroScreen.GetPhysicalScreenDensityDPI(),
								160,
							)),
					(MathUtils_1.MathUtils.IsNearlyEqual(this.Tbn, 0) ||
						MathUtils_1.MathUtils.IsNearlyEqual(this.Lbn, 0)) &&
						((this.Tbn = this.ybn), (this.Lbn = this.Ibn)),
					(this.Abn = this.Tbn / (this.ybn * this.Dbn)),
					(this.Ubn = this.Lbn / (this.Ibn * this.Dbn)),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Camera",
							58,
							"CameraInputController",
							["GameScreenWidth", this.ybn],
							["GameScreenHeight", this.Ibn],
							["PhysicalScreenWidth", this.Tbn],
							["PhysicalScreenHeight", this.Lbn],
							["PhysicalDensityDpi", this.Dbn],
							["MobileDensityYawScale", this.Abn],
							["MobileDensityPitchScale", this.Ubn],
						))
				: ((this.Abn = 1 / 180), (this.Ubn = 1 / 180));
	}
	OnDisable() {
		this.K_e = 0;
	}
	UpdateInternal(t) {
		this.Camera.ContainsAnyTag([-1150819426, 1260125908]) || this.iue(t),
			this.oue(t),
			this.rue();
	}
	LockArmRotationYaw(t) {
		this.O_e.add(t);
	}
	LockArmRotationPitch(t) {
		this.k_e.add(t);
	}
	UnlockArmRotationYaw(t) {
		this.O_e.delete(t);
	}
	UnlockArmRotationPitch(t) {
		this.k_e.delete(t);
	}
	LockArmLength(t) {
		this.F_e.add(t);
	}
	UnlockArmLength(t) {
		this.F_e.delete(t);
	}
	SetInputEnable(t, e) {
		this.N_e.SetActive(t, e);
	}
	iue(t) {
		if ((s = this.Camera.CharacterEntityHandle) && s.IsInit) {
			var e = this.Camera.CharacterController;
			if (e)
				if (this.N_e.Active) {
					var i = e.GetControlRotation(),
						a = this.Camera.CurrentCamera.ArmRotation;
					let [h, o] = s.Entity.GetComponent(52).GetCameraInput();
					ModelManager_1.ModelManager.PlatformModel.IsGamepad()
						? ((h *= this.GamepadInputRate), (o *= this.GamepadInputRate))
						: ModelManager_1.ModelManager.PlatformModel.IsPc()
							? ((h /= 60), (o /= 60))
							: ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
								((h *= 180 * this.Abn), (o *= 180 * this.Ubn));
					var s = ModelManager_1.ModelManager.CameraModel,
						r =
							((s =
								(this.IsAiming
									? ((h *= s.CameraAimingYawSensitivityInputModifier),
										(o *= s.CameraAimingPitchSensitivityInputModifier))
									: ((h *= s.CameraBaseYawSensitivityInputModifier),
										(o *= s.CameraBasePitchSensitivityInputModifier)),
								Math.sqrt(h * h + o * o))),
							(h *=
								MathUtils_1.MathUtils.Lerp(
									this.SensitivityYawMin,
									this.SensitivityYawMax,
									this.SensitivityYawCurve.GetCurrentValue(
										s / this.SensitivityYawRange,
									),
								) * t),
							(o *=
								MathUtils_1.MathUtils.Lerp(
									this.SensitivityPitchMin,
									this.SensitivityPitchMax,
									this.SensitivityPitchCurve.GetCurrentValue(
										s / this.SensitivityPitchRange,
									),
								) * t),
							(this.X_e = !1),
							this.nue(t, !(!h && !o)));
					s =
						(r &&
							((h *= 1 - this.AimAssistDamping),
							(o *= 1 - this.AimAssistDamping)),
						MathUtils_1.MathUtils.Lerp(
							this.SmoothFactorMin,
							this.SmoothFactorMax,
							this.SmoothFactorCurve.GetCurrentValue(
								s / this.SmoothFactorRange,
							),
						));
					(this.j_e = this.j_e * s + h * (1 - s)),
						(this.W_e = this.W_e * s + o * (1 - s)),
						(this.j_e = MathUtils_1.MathUtils.Clamp(
							this.j_e,
							-this.InputSpeedMax,
							this.InputSpeedMax,
						)),
						(this.W_e = MathUtils_1.MathUtils.Clamp(
							this.W_e,
							-this.InputSpeedMax,
							this.InputSpeedMax,
						)),
						1 === this.Camera.CameraCollision.CurrentBlendState &&
							((this.Camera.CameraCollision.IsLeftCollision && 0 < this.j_e) ||
								(this.Camera.CameraCollision.IsRightCollision &&
									this.j_e < 0)) &&
							(this.j_e = 0),
						(this.InputSpeedPercentage = Math.abs(
							this.j_e / this.InputSpeedMax,
						)),
						0 !== this.O_e.size ||
							MathUtils_1.MathUtils.IsNearlyZero(
								this.j_e,
								this.InputSpeedMin,
							) ||
							(e.AddYawInput(this.j_e),
							MathUtils_1.MathUtils.IsNearlyEqual(
								a.Yaw,
								i.Yaw,
								MathUtils_1.MathUtils.KindaSmallNumber,
							)) ||
							((this.Camera.DesiredCamera.ArmRotation.Yaw = i.Yaw),
							(this.Camera.IsModifiedArmRotation = !0),
							(this.Camera.FadeArmRotationYaw = !1)),
						0 !== this.k_e.size ||
							MathUtils_1.MathUtils.IsNearlyZero(
								this.W_e,
								this.InputSpeedMin,
							) ||
							(e.AddPitchInput(this.W_e),
							MathUtils_1.MathUtils.IsNearlyEqual(
								a.Pitch,
								i.Pitch,
								MathUtils_1.MathUtils.KindaSmallNumber,
							)) ||
							((this.Camera.DesiredCamera.ArmRotation.Pitch = i.Pitch),
							(this.Camera.IsModifiedArmRotation = !0),
							(this.Camera.FadeArmRotationPitch = !1)),
						r && this.sue(t);
				} else this.K_e = 0;
			else this.K_e = 0;
		} else this.K_e = 0;
	}
	oue(t) {
		var e = this.Camera.CharacterEntityHandle;
		e &&
			e.IsInit &&
			(!this.N_e.Active ||
				0 < this.F_e.size ||
				this.Camera.IsModifiedArmLength ||
				((e = -e.Entity.GetComponent(52).GetZoomInput() * t) &&
					((t =
						(e * this.ZoomSpeed) /
						(this.Camera.DesiredCamera.MaxArmLength -
							this.Camera.DesiredCamera.MinArmLength)),
					this.aue(this.Camera.DesiredCamera.ZoomModifier + t),
					(this.Camera.IsModifiedArmLength = !0))));
	}
	rue() {
		this.Camera.IsModifiedArmLength ||
			(this.mae <= 0 || this.V_e <= 0 || this.H_e <= 0
				? ((this.mae = this.Camera.CurrentCamera.ArmLength),
					(this.V_e = this.Camera.CurrentCamera.MinArmLength),
					(this.H_e = this.Camera.CurrentCamera.MaxArmLength))
				: (MathUtils_1.MathUtils.IsNearlyEqual(
						this.V_e,
						this.Camera.CurrentCamera.MinArmLength,
					) &&
						MathUtils_1.MathUtils.IsNearlyEqual(
							this.H_e,
							this.Camera.CurrentCamera.MaxArmLength,
						) &&
						MathUtils_1.MathUtils.IsNearlyEqual(
							this.mae,
							this.Camera.CurrentCamera.ArmLength,
						)) ||
					this.aue(this.Camera.DesiredCamera.ZoomModifier));
	}
	aue(t) {
		var e = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
		(this.Camera.DesiredCamera.ZoomModifier =
			MathUtils_1.MathUtils.Clamp(
				t * e,
				this.Camera.CurrentCamera.MinArmLength,
				this.Camera.CurrentCamera.MaxArmLength,
			) / e),
			(this.mae = this.Camera.CurrentCamera.ArmLength),
			(this.V_e = this.Camera.CurrentCamera.MinArmLength),
			(this.H_e = this.Camera.CurrentCamera.MaxArmLength);
	}
	SetAimAssistTarget(t, e) {
		var i = this.Camera.CharacterEntityHandle.Entity.GetComponent(3),
			a = i.Actor.Camp,
			s = t.Entity.GetComponent(3);
		if (
			s &&
			2 === CampUtils_1.CampUtils.GetCampRelationship(a, s.Actor.Camp) &&
			CameraUtility_1.CameraUtility.TargetCanBeSelect(s)
		) {
			let a = this.AimAssistRange;
			if (!FNameUtil_1.FNameUtil.IsEmpty(e) && s.LockOnParts.size) {
				if (
					((t = s.LockOnParts.get(e.toString())),
					(this.Q_e = t?.AimPartBoneName
						? s.AimParts.get(t.AimPartBoneName)
						: s.AimParts.get(e.toString())),
					this.Q_e)
				)
					return (
						this.Z_e.FromUeTransform(
							s.Actor.Mesh.GetSocketTransform(this.Q_e.BoneName),
						),
						this.Z_e.TransformPosition(this.Q_e.Offset, this.J_e),
						this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e),
						this.$_e.DeepCopy(this.J_e),
						void this.Y_e.DeepCopy(this.J_e)
					);
			} else this.Q_e = void 0;
			for (var [, r] of s.AimParts) {
				this.Z_e.FromUeTransform(s.Actor.Mesh.GetSocketTransform(r.BoneName)),
					this.Z_e.TransformPosition(r.Offset, this.J_e),
					this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
				var h = this.z_e.DotProduct(this.Camera.CameraForward);
				h < 0 ||
					h > a ||
					this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(h) >
						MathUtils_1.MathUtils.Square(r.GetRadius(!0)) ||
					(this.J_e.Subtraction(i.ActorLocationProxy, this.Lz),
					this.Lz.Normalize(),
					Math.acos(this.Lz.DotProduct(this.Camera.CameraForward)) >
						MAX_AIM_ASSIST_ANGLE) ||
					((a = h),
					(this.Q_e = r),
					this.$_e.DeepCopy(this.J_e),
					this.Y_e.DeepCopy(this.J_e));
			}
		}
	}
	nue(t, e) {
		if (ModelManager_1.ModelManager.CameraModel?.GetAimAssistEnable())
			if (this.IsAiming) {
				e ? (this.K_e = this.AimAssistStartTimeLength + 1) : (this.K_e += t);
				var i = this.K_e < this.AimAssistStartTimeLength;
				switch (ModelManager_1.ModelManager.CameraModel.AimAssistMode) {
					case 0:
						return !1;
					case 1:
						if (i) break;
						return !1;
				}
				var a = ModelManager_1.ModelManager.CameraModel.AimAssistDebugDraw,
					s = this.Camera.CharacterEntityHandle.Entity.GetComponent(3),
					r = s.Actor;
				if (!e && this.hue(t, r))
					return (
						a &&
							UE.KismetSystemLibrary.DrawDebugSphere(
								this.Q_e.Owner.Actor,
								this.$_e.ToUeVector(),
								this.Q_e.GetRadius(i),
								12,
								ColorUtils_1.ColorUtils.LinearGreen,
							),
						!0
					);
				e = 0.7 * this.AimAssistRange;
				var h,
					o =
						(this.Lz.DeepCopy(this.Camera.CameraForward),
						this.Lz.MultiplyEqual(e),
						this.Lz.AdditionEqual(this.Camera.PlayerLocation),
						ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
							this.Lz,
							e,
							2,
							this.eue,
						),
						(this.Q_e = void 0),
						r.Camp);
				this.tue.length = 0;
				for (const t of this.eue)
					if (t.Entity?.Active) {
						var n,
							m = t.Entity.GetComponent(3);
						if (
							m &&
							2 ===
								CampUtils_1.CampUtils.GetCampRelationship(o, m.Actor.Camp) &&
							CameraUtility_1.CameraUtility.TargetCanBeSelect(m)
						)
							for ([, n] of m.AimParts) {
								this.Z_e.FromUeTransform(
									m.Actor.Mesh.GetSocketTransform(n.BoneName),
								),
									this.Z_e.TransformPosition(n.Offset, this.J_e),
									a &&
										UE.KismetSystemLibrary.DrawDebugSphere(
											m.Actor,
											this.J_e.ToUeVector(),
											n.GetRadius(i),
											12,
											ColorUtils_1.ColorUtils.LinearGreen,
										),
									this.J_e.Subtraction(this.Camera.CameraLocation, this.z_e);
								var l = this.z_e.DotProduct(this.Camera.CameraForward);
								l < 0 ||
									l > this.AimAssistRange ||
									this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(l) >
										MathUtils_1.MathUtils.Square(n.GetRadius(i)) ||
									(this.J_e.Subtraction(s.ActorLocationProxy, this.Lz),
									this.Lz.Normalize(),
									(l = Math.acos(
										this.Lz.DotProduct(this.Camera.CameraForward),
									)) > MAX_AIM_ASSIST_ANGLE) ||
									this.tue.push([l, n]);
							}
					}
				for ([, h] of (this.tue.sort((t, e) => t[0] - e[0]), this.tue))
					if (
						(this.Z_e.FromUeTransform(
							h.Owner.Actor.Mesh.GetSocketTransform(h.BoneName),
						),
						this.Z_e.TransformPosition(h.Offset, this.J_e),
						this.lue(r, this.J_e, h))
					)
						return this.$_e.DeepCopy(this.J_e), (this.Q_e = h), (this.X_e = !0);
			} else
				this.K_e &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Camera", 6, "Exit Aim Assist"),
					(this.K_e = 0),
					(this.Q_e = void 0);
		return !1;
	}
	lue(t, e, i) {
		(this.uoe.WorldContextObject = t),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.uoe,
				this.Camera.CameraLocation,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e),
			TraceElementCommon_1.TraceElementCommon.LineTrace(
				this.uoe,
				"CameraInputController Aim",
			);
		var a = this.uoe.HitResult?.GetHitCount();
		if (a) {
			var s = i.IgnoreCollisionBoneName;
			for (let t = 0; t < a; ++t) {
				var r = this.uoe.HitResult.Components.Get(0);
				if (
					0 !==
					r.GetCollisionResponseToChannel(
						QueryTypeDefine_1.KuroCollisionChannel.Bullet,
					)
				) {
					if (r.GetOwner() !== i.Owner.Actor || (s && r.GetName() !== s))
						return !1;
					break;
				}
			}
		}
		return !0;
	}
	hue(t, e) {
		if (
			!this.Q_e ||
			!CameraUtility_1.CameraUtility.TargetCanBeSelect(this.Q_e.Owner)
		)
			return !1;
		var i = this.Q_e;
		return (
			!(
				(i =
					(this.Z_e.FromUeTransform(
						i.Owner.Actor.Mesh.GetSocketTransform(i.BoneName),
					),
					this.Z_e.TransformPosition(i.Offset, this.$_e),
					this.$_e.Subtraction(this.Camera.CameraLocation, this.z_e),
					this.z_e.DotProduct(this.Camera.CameraForward))) < 0 ||
				i > 1.05 * this.AimAssistRange
			) &&
			(this.Y_e.Subtraction(this.Camera.CameraLocation, this.Lz),
			!(
				(i = this.Lz.SizeSquared() * this.z_e.SizeSquared()) >
					MathUtils_1.MathUtils.SmallNumber &&
				Math.acos(
					MathUtils_1.MathUtils.DotProduct(this.Lz, this.z_e) / Math.sqrt(i),
				) *
					MathUtils_1.MathUtils.RadToDeg >
					this.AimAssistSpeedEdge * t
			) && !!this.lue(e, this.$_e, this.Q_e))
		);
	}
	sue(t) {
		if (
			this.Q_e &&
			(this.$_e.Subtraction(this.Camera.CameraLocation, this.z_e),
			!this.z_e.IsNearlyZero())
		) {
			this.Camera.IsModifiedArmRotation = !0;
			var e = this.Camera.DesiredCamera.ArmRotation,
				i =
					(this.X_e ||
						(this.Y_e.Subtraction(this.Camera.CameraLocation, this.Lz),
						Quat_1.Quat.FindBetween(this.Lz, this.z_e, this.az),
						e.Quaternion(this.KJ),
						this.az.Multiply(this.KJ, this.KJ),
						this.KJ.Rotator(e)),
					this.Y_e.DeepCopy(this.$_e),
					this.z_e.DotProduct(this.Camera.CameraForward)),
				a =
					((i = Math.sqrt(
						this.z_e.SizeSquared() - MathUtils_1.MathUtils.Square(i),
					)),
					this.K_e < this.AimAssistStartTimeLength),
				s = a ? 0 : this.Q_e.RadiusIn;
			if (!(i <= s)) {
				var r,
					h = this.z_e.Size(),
					o = Math.asin(i / h) * MathUtils_1.MathUtils.RadToDeg;
				h = o - Math.asin(s / h) * MathUtils_1.MathUtils.RadToDeg;
				a &&
					h < 1 &&
					this.K_e > 0.4 &&
					(this.K_e = this.AimAssistStartTimeLength + 1);
				let n = 0,
					m =
						(a
							? ((n = MathUtils_1.MathUtils.Lerp(
									this.AimAssistStartSpeedBegin,
									this.AimAssistStartSpeedEnd,
									this.AimAssistCurve.GetCurrentValue(
										this.K_e / this.AimAssistStartTimeLength,
									),
								)),
								(r = this.Camera.CharacterEntityHandle.Entity.GetComponent(3)),
								this.$_e.Subtraction(r.ActorLocationProxy, this.Lz),
								this.Lz.Normalize(),
								(n *=
									1 +
									(0.5 *
										(r = Math.acos(
											this.Lz.DotProduct(this.Camera.CameraForward),
										))) /
										MAX_AIM_ASSIST_ANGLE))
							: ((r = this.Q_e.GetRadius(a)),
								(n = MathUtils_1.MathUtils.Lerp(
									this.AimAssistSpeedCenter,
									this.AimAssistSpeedEdge,
									this.AimAssistCurve.GetCurrentValue((i - s) / (r - s)),
								))),
						0);
				(m = n * t > h ? h / o : (n * t) / o),
					Quat_1.Quat.FindBetween(this.Camera.CameraForward, this.z_e, this.az),
					Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, this.az, m, this.az),
					e.Quaternion(this.KJ),
					this.az.Multiply(this.KJ, this.KJ),
					this.KJ.Rotator(e);
			}
		}
	}
}
exports.CameraInputController = CameraInputController;
