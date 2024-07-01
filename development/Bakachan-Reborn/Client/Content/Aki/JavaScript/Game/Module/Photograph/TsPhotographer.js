"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsPhotographer = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	Global_1 = require("../../Global"),
	PlatformController_1 = require("../Platform/PlatformController"),
	PhotographController_1 = require("./PhotographController"),
	PhotographDefine_1 = require("./PhotographDefine"),
	SOURCE_DISTANCE = 300,
	CONFIG_PATH =
		"/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig",
	MOBILE_CONFIG_PATH =
		"/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile",
	MIN_DITHER = 0.01,
	HIDE_DISTANCE_OFFSET = 50;
class TsPhotographer extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.CapsuleCollision = void 0),
			(this.CameraArm = void 0),
			(this.CameraActor = void 0),
			(this.ZeroVector = void 0),
			(this.RelativeVectorCache = void 0),
			(this.CameraToPlayerVectorCache = void 0),
			(this.CameraToSourceVectorCache = void 0),
			(this.MoveRotationCache = void 0),
			(this.SourceRotationCache = void 0),
			(this.PlayerSourceLocation = void 0),
			(this.CameraInitializeTransform = void 0),
			(this.SourceLocation = void 0),
			(this.DefaultRotation = void 0),
			(this.SourceMaxYaw = 0),
			(this.SourceMinYaw = 0),
			(this.SourceTotalYaw = 0),
			(this.SourceMaxPitch = 0),
			(this.SourceMinPitch = 0),
			(this.CameraArmUpVector = void 0),
			(this.ActorUpVector = void 0),
			(this.Character = void 0),
			(this.StartDitherValue = 0),
			(this.StartHidePitch = 0),
			(this.CompleteHidePitch = 0),
			(this.IsLoadingConfigCompleted = !1),
			(this.CurrentDither = 0),
			(this.PlayerLocation = void 0),
			(this.CameraLocation = void 0),
			(this.StartHideDistance = 0),
			(this.CompleteHideDistance = 0);
	}
	Initialize() {
		(this.ZeroVector = new UE.Vector(0)),
			(this.RelativeVectorCache = new UE.Vector()),
			(this.CameraToPlayerVectorCache = new UE.Vector()),
			(this.CameraToSourceVectorCache = new UE.Vector()),
			(this.MoveRotationCache = new UE.Rotator()),
			(this.SourceRotationCache = new UE.Rotator()),
			(this.SourceLocation = new UE.Vector()),
			(this.DefaultRotation = new UE.Rotator(0, 0, 0)),
			(this.CameraLocation = Vector_1.Vector.Create()),
			(this.PlayerLocation = Vector_1.Vector.Create()),
			(this.SourceMaxYaw =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"CameraSourceMaxYaw",
				)),
			(this.SourceMinYaw =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"CameraSourceMinYaw",
				)),
			(this.SourceMaxPitch =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"CameraSourceMaxPitch",
				)),
			(this.SourceMinPitch =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"CameraSourceMinPitch",
				)),
			(this.SourceTotalYaw = 0),
			(this.CameraArmUpVector = new UE.Vector(0, 0, 1)),
			(this.ActorUpVector = new UE.Vector(0, 0, 1)),
			(this.Character = Global_1.Global.BaseCharacter),
			this.PlayerLocation.FromUeVector(this.Character.K2_GetActorLocation()),
			(this.IsLoadingConfigCompleted = !1);
		var t = PlatformController_1.PlatformController.IsMobile()
			? MOBILE_CONFIG_PATH
			: CONFIG_PATH;
		ResourceSystem_1.ResourceSystem.LoadAsync(
			t,
			UE.BP_FightCameraConfig_C,
			(t) => {
				t = t.基础;
				var e = ((this.StartHidePitch = t.Get(42)), t.Get(40)),
					o = t.Get(41);
				(this.StartHideDistance = Math.max(e, o) + 50),
					(this.CompleteHideDistance = Math.min(e, o) + 50),
					(this.CompleteHidePitch = t.Get(43)),
					(this.StartDitherValue = t.Get(44)),
					(this.IsLoadingConfigCompleted = !0);
			},
		),
			this.RefreshDitherEffect();
	}
	ReceiveDestroyed() {
		(this.Character = void 0), (this.IsLoadingConfigCompleted = !1);
	}
	ReceiveTick(t) {
		this.RefreshDitherEffect();
	}
	RefreshDitherEffect() {
		var t;
		this.IsLoadingConfigCompleted &&
			this.CameraActor &&
			this.CameraArm &&
			((t = this.CameraActor.K2_GetActorLocation()),
			this.CameraLocation.FromUeVector(t),
			(t = Vector_1.Vector.Dist(this.PlayerLocation, this.CameraLocation)),
			(t = this.GetPlayerDither(t, this.CameraArm.GetTargetRotation().Pitch)),
			this.CurrentDither !== t) &&
			((this.CurrentDither = t), this.Character.SetDitherEffect(t, 1));
	}
	GetPlayerDither(t, e) {
		let o = 1;
		t < this.StartHideDistance &&
			(o = MathUtils_1.MathUtils.RangeClamp(
				t,
				this.StartHideDistance,
				this.CompleteHideDistance,
				this.StartDitherValue,
				0.01,
			));
		let a = 1;
		return (
			(t = MathUtils_1.MathUtils.WrapAngle(e)) > this.StartHidePitch &&
				(a = MathUtils_1.MathUtils.RangeClamp(
					t,
					this.StartHidePitch,
					this.CompleteHidePitch,
					this.StartDitherValue,
					0.01,
				)),
			Math.min(o, a)
		);
	}
	SetPlayerSourceLocation(t) {
		this.PlayerSourceLocation = t;
	}
	SetCameraInitializeTransform(t) {
		this.CameraInitializeTransform = t;
	}
	GetCameraInitializeTransform() {
		return this.CameraInitializeTransform;
	}
	ActivateCamera(t) {
		t.K2_AttachToComponent(
			this.CameraArm,
			FNameUtil_1.FNameUtil.NONE,
			2,
			2,
			2,
			!1,
		),
			(this.CameraActor = t),
			this.SetFov(PhotographDefine_1.DEFAULT_FOV);
	}
	DeactivateCamera() {
		this.CameraActor?.IsValid() && this.CameraActor.K2_DetachFromActor(1, 1, 1),
			(this.CameraActor = void 0);
	}
	SetCameraTransform(t) {
		t = t.GetTranslation();
		var e = this.CameraActor.K2_GetActorLocation();
		(this.RelativeVectorCache.X = t.X - e.X),
			(this.RelativeVectorCache.Y = t.Y - e.Y),
			(this.RelativeVectorCache.Z = t.Z - e.Z),
			this.K2_AddActorWorldOffset(this.RelativeVectorCache, !1, void 0, !1);
	}
	AddCameraArmPitchInput(t) {
		var e, o;
		0 === t ||
			((e = this.CameraArm.GetTargetRotation().Pitch),
			0 < t && e <= this.SourceMinPitch) ||
			(t < 0 && e >= this.SourceMaxPitch) ||
			((e = this.CameraArm.GetRightVector()),
			(o = this.CameraArm.GetForwardVector()),
			(o = UE.KismetMathLibrary.RotateAngleAxis(o, t, e)),
			(t = UE.KismetMathLibrary.FindLookAtRotation(this.ZeroVector, o)),
			this.CapsuleCollision.K2_SetRelativeRotation(t, !1, void 0, !1));
	}
	AddCameraArmYawInput(t) {
		var e;
		0 !== t &&
			((e = this.CameraArm.GetForwardVector()),
			(e = UE.KismetMathLibrary.RotateAngleAxis(e, t, this.CameraArmUpVector)),
			(t = UE.KismetMathLibrary.FindLookAtRotation(this.ZeroVector, e)),
			this.CapsuleCollision.K2_SetRelativeRotation(t, !1, void 0, !1));
	}
	AddPhotographerYawInput(t) {
		var e = this.PlayerSourceLocation,
			o = this.K2_GetActorLocation();
		((o =
			((this.CameraToPlayerVectorCache.X = o.X - e.X),
			(this.CameraToPlayerVectorCache.Y = o.Y - e.Y),
			(this.CameraToPlayerVectorCache.Z = o.Z - e.Z),
			(this.SourceRotationCache.Yaw = t),
			(this.SourceRotationCache.Pitch = 0),
			(this.SourceRotationCache.Roll = 0),
			UE.KismetMathLibrary.GreaterGreater_VectorRotator(
				this.CameraToPlayerVectorCache,
				this.SourceRotationCache,
			))).X += e.X),
			(o.Y += e.Y),
			(o.Z += e.Z),
			this.K2_SetActorLocation(o, !0, void 0, !1);
	}
	AddSourceYawInput(t) {
		var e, o;
		(this.SourceTotalYaw = MathUtils_1.MathUtils.Clamp(
			this.SourceTotalYaw + t,
			this.SourceMinYaw,
			this.SourceMaxYaw,
		)),
			this.SourceTotalYaw >= this.SourceMaxYaw ||
				this.SourceTotalYaw <= this.SourceMinYaw ||
				((o = this.K2_GetActorLocation()),
				(e = this.CameraArm.GetForwardVector()),
				(this.SourceLocation.X = -300 * e.X + o.X),
				(this.SourceLocation.Y = -300 * e.Y + o.Y),
				(this.SourceLocation.Z = -300 * e.Z + o.Z),
				(this.CameraToSourceVectorCache.X = o.X - this.SourceLocation.X),
				(this.CameraToSourceVectorCache.Y = o.Y - this.SourceLocation.Y),
				(this.CameraToSourceVectorCache.Z = o.Z - this.SourceLocation.Z),
				(this.MoveRotationCache.Yaw = t),
				(this.MoveRotationCache.Pitch = 0),
				(this.MoveRotationCache.Roll = 0),
				((e = UE.KismetMathLibrary.GreaterGreater_VectorRotator(
					this.CameraToSourceVectorCache,
					this.MoveRotationCache,
				)).X += this.SourceLocation.X),
				(e.Y += this.SourceLocation.Y),
				(e.Z += this.SourceLocation.Z),
				this.K2_SetActorLocation(e, !0, void 0, !1),
				(o = this.GetActorForwardVector()),
				(e = UE.KismetMathLibrary.RotateAngleAxis(o, -t, this.ActorUpVector)),
				(o = UE.KismetMathLibrary.Conv_VectorToRotator(e)),
				this.K2_SetActorRotation(o, !1));
	}
	AddSourcePitchInput(t) {
		var e,
			o = this.K2_GetActorRotation().Pitch;
		(0 < t && o <= this.SourceMinPitch) ||
			(t < 0 && o >= this.SourceMaxPitch) ||
			((o = this.GetActorRightVector()),
			(e = this.GetActorForwardVector()),
			(e = UE.KismetMathLibrary.RotateAngleAxis(e, t, o)),
			(o = (t = UE.KismetMathLibrary.Conv_VectorToRotator(e)).Pitch),
			(t.Pitch = o),
			this.K2_SetActorRotation(t, !1));
	}
	SetFov(t) {
		let e = 50;
		(e =
			0 === PhotographController_1.PhotographController.CameraCaptureType
				? MathUtils_1.MathUtils.Clamp(
						t,
						PhotographDefine_1.MIN_FOV,
						PhotographDefine_1.MAX_FOV,
					)
				: MathUtils_1.MathUtils.Clamp(
						t,
						PhotographController_1.PhotographController.MinFov
							? PhotographController_1.PhotographController.MinFov.Value
							: PhotographDefine_1.MIN_FOV,
						PhotographController_1.PhotographController.MaxFov
							? PhotographController_1.PhotographController.MaxFov.Value
							: PhotographDefine_1.MAX_FOV,
					)),
			this.CameraActor.CameraComponent.SetFieldOfView(e);
	}
	GetFov() {
		return this.CameraActor.CameraComponent.FieldOfView;
	}
	ResetCamera() {
		var t = Global_1.Global.BaseCharacter.GetTransform();
		this.CapsuleCollision.K2_SetRelativeRotation(
			this.DefaultRotation,
			!0,
			void 0,
			!1,
		),
			this.K2_SetActorTransform(t, !0, void 0, !1),
			this.K2_SetActorLocation(this.PlayerSourceLocation, !0, void 0, !1),
			this.K2_AddActorWorldRotation(new UE.Rotator(0, 180, 0), !0, void 0, !1),
			this.SetFov(PhotographDefine_1.DEFAULT_FOV);
	}
}
(exports.TsPhotographer = TsPhotographer), (exports.default = TsPhotographer);
