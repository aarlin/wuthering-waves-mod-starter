"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraHandleData = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
	UiManager_1 = require("../../../Ui/UiManager"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraHandleData {
	constructor() {
		(this.AAo = void 0),
			(this.PAo = void 0),
			(this.xAo = void 0),
			(this.JUo = void 0),
			(this.wAo = void 0),
			(this.BAo = void 0),
			(this.bAo = new UE.Vector()),
			(this.qAo = new Map()),
			(this.GAo = UE.NewArray(UE.Actor)),
			(this.NAo = void 0),
			(this.OAo = void 0),
			(this.kAo = new UE.Transform()),
			(this.FAo = Vector_1.Vector.Create()),
			(this.VAo = Vector_1.Vector.Create()),
			(this.HAo = Vector_1.Vector.Create()),
			(this.jAo = void 0),
			(this.WAo = void 0),
			(this.IsEmptyState = !1),
			(this.ReplaceCameraTag = void 0);
	}
	ToString() {
		return `UniqueId:${this.AAo},HandleName:${this.BAo},ViewName:` + this.PAo;
	}
	static NewByHandleName(t, e) {
		var o =
				UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId(),
			a = new UiCameraHandleData();
		return (
			(a.UniqueId = o),
			(a.HandleName = t),
			e?.IsValid() && (a.wAo = e),
			a.Refresh(),
			a
		);
	}
	static NewByView(t, e) {
		var o,
			a,
			r =
				UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(
					t,
				);
		if (r)
			return (
				(o = UiManager_1.UiManager.GetViewByName(t)),
				((a = new UiCameraHandleData()).UniqueId = o
					? o.GetViewId()
					: UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId()),
				(a.HandleName = r.GetSourceHandleName()),
				(a.ViewName = t),
				(a.UiCameraMappingConfig = r.GetUiCameraMappingConfig()),
				(a.wAo = e),
				a.Refresh(),
				a
			);
	}
	Reset() {
		(this.AAo = void 0),
			(this.PAo = void 0),
			(this.xAo = void 0),
			(this.BAo = void 0),
			(this.bAo = void 0),
			this.qAo.clear(),
			(this.NAo = void 0),
			(this.jAo = void 0),
			(this.WAo = void 0),
			this.GAo.Empty(),
			(this.JUo = void 0);
	}
	Refresh() {
		var t, e;
		(this.JUo =
			ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(
				this.HandleName,
			)),
			this.JUo &&
				((e = this.JUo.TargetType),
				(this.IsEmptyState = this.JUo.IsEmptyState),
				(this.jAo =
					UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActor(
						e,
					)),
				(this.WAo =
					UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActorSkeletalMesh(
						e,
					)),
				(this.ReplaceCameraTag = this.JUo.ReplaceCameraTag),
				StringUtils_1.StringUtils.IsEmpty(this.ReplaceCameraTag)
					? ((this.NAo = void 0), (this.OAo = void 0))
					: ((e = FNameUtil_1.FNameUtil.GetDynamicFName(this.ReplaceCameraTag)),
						(t = (0, puerts_1.$ref)(this.GAo)),
						UE.GameplayStatics.GetAllActorsOfClassWithTag(
							GlobalData_1.GlobalData.World,
							UE.CineCameraActor.StaticClass(),
							e,
							t,
						),
						!(e = (0, puerts_1.$unref)(t)) ||
							e.Num() < 1 ||
							((this.NAo = e.Get(0)),
							(this.OAo = this.NAo?.GetCineCameraComponent()))));
	}
	set UniqueId(t) {
		this.AAo = t;
	}
	get UniqueId() {
		return this.AAo;
	}
	set HandleName(t) {
		this.BAo = t;
	}
	get HandleName() {
		return this.BAo;
	}
	set ViewName(t) {
		this.PAo = t;
	}
	get ViewName() {
		return this.PAo;
	}
	set UiCameraMappingConfig(t) {
		this.xAo = t;
	}
	get UiCameraMappingConfig() {
		return this.xAo;
	}
	get ExternalTransform() {
		return this.wAo;
	}
	GetHandleName() {
		return this.BAo;
	}
	IsEqual(t) {
		return (
			this.HandleName === t.HandleName &&
			this.ReplaceCameraTag === t.ReplaceCameraTag &&
			this.ViewName === t.ViewName &&
			this.UniqueId === t.UniqueId
		);
	}
	GetUiCameraAnimationConfig() {
		return this.JUo;
	}
	GetTargetActor() {
		return this.jAo;
	}
	GetTargetSkeletalMesh() {
		return this.WAo;
	}
	GetTargetSkeletalMeshTransform() {
		var t = this.GetTargetSkeletalMesh();
		if (t)
			return (
				this.kAo.SetLocation(t.K2_GetComponentLocation()),
				this.kAo.SetRotation(t.K2_GetComponentQuaternion()),
				this.kAo.SetScale3D(t.K2_GetComponentScale()),
				this.kAo
			);
	}
	GetTargetSkeletalMeshSocketTransform() {
		var t = this.GetUiCameraAnimationConfig(),
			e =
				((t = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName)),
				this.GetTargetSkeletalMesh());
		if (e) return e.GetSocketTransform(t);
	}
	GetTargetArmLength() {
		var t, e;
		return this.NAo
			? (t = this.GetTargetActor())?.IsValid() && this.JUo.bTargetActorAsCenter
				? ((t = Vector_1.Vector.Create(t.K2_GetActorLocation())),
					(e = Vector_1.Vector.Create(this.NAo.K2_GetActorLocation())),
					Vector_1.Vector.Dist2D(t, e))
				: 0
			: this.GetUiCameraAnimationConfig().ArmLength;
	}
	GetTargetArmOffsetLocation() {
		return this.OAo
			? Vector_1.Vector.ZeroVector
			: this.GetUiCameraAnimationConfig().ArmOffsetLocation;
	}
	GetTargetArmOffsetRotation() {
		if (this.NAo && this.JUo.bTargetActorAsCenter) {
			var t = this.GetTargetActor();
			if (t)
				return (
					(t = this.KAo(
						t.K2_GetActorLocation(),
						this.NAo.K2_GetActorLocation(),
						this.NAo.K2_GetActorRotation(),
					)),
					UE.KismetMathLibrary.FindLookAtRotation(
						this.NAo.K2_GetActorLocation(),
						t,
					)
				);
		}
		return this.GetUiCameraAnimationConfig().ArmOffsetRotation;
	}
	GetTargetArmCollisionTest() {
		return !this.NAo && this.GetUiCameraAnimationConfig().ArmCollisionTest;
	}
	GetTargetFieldOfView() {
		return this.OAo
			? this.OAo.FieldOfView
			: this.GetUiCameraAnimationConfig().CameraFieldOfView;
	}
	GetTargetFocalDistance() {
		return this.OAo
			? this.OAo.FocusSettings.ManualFocusDistance
			: this.GetUiCameraAnimationConfig().FocalDistance;
	}
	GetTargetAperture() {
		return this.OAo
			? this.OAo.CurrentAperture
			: this.GetUiCameraAnimationConfig().Aperture;
	}
	GetDefaultLocation() {
		var t, e;
		return this.ExternalTransform
			? this.ExternalTransform.GetLocation()
			: (t = this.GetUiCameraAnimationConfig())
				? (3 === (e = t.TargetType) || 4 === e || 5 === e) &&
					RenderModuleController_1.RenderModuleController
						.DebugNewUiSceneWorkflow &&
					RenderModuleController_1.RenderModuleController
						.DebugInUiSceneRendering
					? (((e = new UE.Vector()).X =
							t.Location.X +
							RenderModuleController_1.RenderModuleController
								.DebugUiSceneLoadOffset.X),
						(e.Y =
							t.Location.Y +
							RenderModuleController_1.RenderModuleController
								.DebugUiSceneLoadOffset.Y),
						(e.Z =
							t.Location.Z +
							RenderModuleController_1.RenderModuleController
								.DebugUiSceneLoadOffset.Z),
						e)
					: t.Location
				: void 0;
	}
	KAo(t, e, o) {
		return (
			this.FAo.DeepCopy(t),
			this.VAo.DeepCopy(e),
			(t = Vector_1.Vector.Dist2D(this.FAo, this.VAo)),
			(e = o.Pitch),
			(o = MathCommon_1.MathCommon.WrapAngle(e)),
			(e = MathCommon_1.MathCommon.DegreeToRadian(o)),
			(o = t * Math.tan(e) + this.VAo.Z),
			this.HAo.Set(this.FAo.X, this.FAo.Y, o),
			this.HAo.ToUeVector()
		);
	}
	GetTargetLocation() {
		if (this.ExternalTransform) return this.ExternalTransform.GetLocation();
		var t = this.JUo?.ReplaceCameraTag;
		if (!StringUtils_1.StringUtils.IsEmpty(t))
			return this.NAo?.IsValid()
				? (t = this.GetTargetActor())?.IsValid() &&
					this.JUo.bTargetActorAsCenter
					? this.KAo(
							t.K2_GetActorLocation(),
							this.NAo.K2_GetActorLocation(),
							this.NAo.K2_GetActorRotation(),
						)
					: this.NAo.K2_GetActorLocation()
				: void 0;
		var e = this.GetDefaultLocation();
		switch (this.JUo.LocationType) {
			case 0:
				return e;
			case 1:
				var o,
					a = this.GetTargetSkeletalMeshTransform();
				return a
					? (r = (o = this.GetTargetSkeletalMesh()).GetOwner())?.IsValid()
						? r
								.K2_GetActorLocation()
								.Equals(
									o.K2_GetComponentLocation(),
									MathUtils_1.MathUtils.SmallNumber,
								)
							? e
							: UE.KismetMathLibrary.TransformLocation(a, e)
						: void 0
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CameraAnimation",
								8,
								"播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画",
							)
						);
			case 2:
				var r = this.GetTargetSkeletalMeshSocketTransform();
				return r
					? UE.KismetMathLibrary.TransformLocation(r, e)
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CameraAnimation",
								8,
								"播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画",
							)
						);
		}
	}
	GetDefaultRotation() {
		var t = this.ExternalTransform;
		if (t) return t.GetRotation().Rotator();
		if ((t = this.GetUiCameraAnimationConfig())) {
			if (this.NAo) return this.NAo.K2_GetActorRotation();
			if (!t.IsTrack) return t.Rotation;
			var e = CameraController_1.CameraController.CameraLocation;
			if (t.IsTrackWorldLocation) {
				var o = t.TrackLocation;
				const a = UE.KismetMathLibrary.FindLookAtRotation(e.ToUeVector(), o);
				return t.bOverrideTrackPitch && (a.Pitch = t.TrackPitchOverride), a;
			}
			if (!(o = this.GetTargetActor())) return t.Rotation;
			if (this.bAo) {
				var a = t.TrackLocation;
				o = o.K2_GetActorLocation();
				(this.bAo.X = o.X + a.X),
					(this.bAo.Y = o.Y + a.Y),
					(this.bAo.Z = o.Z + a.Z);
				const r = UE.KismetMathLibrary.FindLookAtRotation(
					e.ToUeVector(),
					this.bAo,
				);
				return t.bOverrideTrackPitch && (r.Pitch = t.TrackPitchOverride), r;
			}
		}
	}
	GetTargetRotation() {
		var t = this.ExternalTransform;
		if (t) return t.GetRotation().Rotator();
		if (
			((t = this.JUo?.ReplaceCameraTag), !StringUtils_1.StringUtils.IsEmpty(t))
		)
			return this.NAo?.IsValid()
				? this.GetTargetActor()?.IsValid() && this.JUo.bTargetActorAsCenter
					? Rotator_1.Rotator.ZeroRotator
					: this.NAo.K2_GetActorRotation()
				: void 0;
		var e = this.GetDefaultRotation();
		switch (this.JUo.RotationType) {
			case 0:
				return e;
			case 2:
				var o = this.GetTargetActor();
				return o
					? ((o = o.GetTransform()),
						(a = Rotator_1.Rotator.Create(0, e.Yaw, 0)),
						UE.KismetMathLibrary.TransformRotation(o, a.ToUeRotator()))
					: e;
			case 1:
				return (
					(o =
						CameraController_1.CameraController.FightCamera.GetComponent(5)
							.CameraRotation.Yaw),
					Rotator_1.Rotator.Create(0, o, 0).ToUeRotator()
				);
			case 3:
				var a = this.GetTargetActor();
				return a
					? ((o = a.GetTransform()),
						(a = this.GetTargetSkeletalMesh())
							? ((a = a.RelativeRotation),
								(a = Rotator_1.Rotator.Create(
									a.Pitch + e.Pitch,
									a.Yaw + e.Yaw,
									a.Roll + e.Roll,
								)),
								UE.KismetMathLibrary.TransformRotation(o, a.ToUeRotator()))
							: void (
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"CameraAnimation",
										8,
										"播放Ui镜头获得对应相机旋转时，拿不到对应的Actor骨骼，不播放镜头动画",
									)
								))
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CameraAnimation",
								8,
								"播放Ui镜头获得对应相机旋转时，拿不到对应的Actor，不播放镜头动画",
							)
						);
		}
	}
	GetTargetPostProcessBlendWeight() {
		return (this.OAo || this.GetUiCameraAnimationConfig())
			.PostProcessBlendWeight;
	}
	GetReplaceCameraActor() {
		return this.NAo;
	}
	GetReplaceCameraComponent() {
		return this.OAo;
	}
	CanApplyAnimationHandle() {
		if (!(o = this.GetUiCameraAnimationConfig())) return !1;
		var t = o.TargetType,
			e = FNameUtil_1.FNameUtil.GetDynamicFName(o.SocketName),
			o = 2 === o.LocationType;
		if (2 === t || 1 === t) {
			if (!this.WAo) return !1;
			if (o) {
				if (FNameUtil_1.FNameUtil.IsEmpty(e)) return !1;
				if (!this.WAo.DoesSocketExist(e)) return !1;
			}
		}
		return !0;
	}
}
exports.UiCameraHandleData = UiCameraHandleData;
