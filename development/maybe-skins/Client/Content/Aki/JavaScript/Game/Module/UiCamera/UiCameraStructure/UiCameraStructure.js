"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraStructure = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class UiCameraStructure {
	constructor() {
		(this.iUo = void 0),
			(this.CameraActor = void 0),
			(this.SpringArmComponent = void 0),
			(this.OwnActor = void 0);
	}
	Initialize(t) {
		(this.iUo = t),
			(this.CameraActor = this.iUo.GetCameraActor()),
			(this.OwnActor = this.OnSpawnStructureActor()),
			(this.SpringArmComponent = this.OnSetSpringArmComponent()),
			this.OnInitialize();
	}
	Destroy() {
		this.Deactivate(),
			this.OnDestroy(),
			(this.CameraActor = void 0),
			(this.OwnActor = void 0);
	}
	IsValid() {
		return (
			!(!this.CameraActor || !this.OwnActor) &&
			this.CameraActor.IsValid() &&
			this.OwnActor.IsValid()
		);
	}
	Activate() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCamera", 8, "激活相机结构", [
				"Name",
				this.constructor.name,
			]),
			this.OnActivate();
	}
	Deactivate() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCamera", 8, "休眠相机结构", [
				"Name",
				this.constructor.name,
			]),
			this.OnDeactivate();
	}
	OnActivate() {}
	OnDeactivate() {}
	OnSpawnStructureActor() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("UiCamera", 8, "没有创建StructureActor", [
				"Name",
				this.constructor.name,
			]);
	}
	OnSetSpringArmComponent() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("UiCamera", 8, "没有实现OnSetSpringArmComponent", [
				"Name",
				this.constructor.name,
			]);
	}
	GetSpringArmComponent() {
		return this.SpringArmComponent;
	}
	OnInitialize() {}
	OnDestroy() {}
	AttachToComponent(t, o = FNameUtil_1.FNameUtil.NONE, r = 2, i = 2, e = 1) {
		this.CameraActor?.IsValid() &&
			this.CameraActor.K2_AttachToComponent(t, o, r, i, e, !1);
	}
	DetachFromComponent(t = 1, o = 1, r = 1) {
		this.CameraActor?.IsValid() && this.CameraActor.K2_DetachFromActor(t, o, r);
	}
	DetachUiCameraSpringActor(t, o, r) {
		this.OwnActor?.K2_DetachFromActor(t, o, r);
	}
	SetActorTransform(t) {
		this.OwnActor.K2_SetActorTransform(t, !1, void 0, !1);
	}
	SetActorLocation(t) {
		this.OwnActor.K2_GetActorLocation().Equals(
			t,
			MathUtils_1.MathUtils.SmallNumber,
		) || this.OwnActor.K2_SetActorLocation(t, !1, void 0, !1);
	}
	SetActorRelativeLocation(t) {
		this.OwnActor.K2_SetActorRelativeLocation(t, !1, void 0, !1);
	}
	SetCameraActorRelativeLocation(t) {
		this.CameraActor.K2_SetActorRelativeLocation(t, !1, void 0, !1);
	}
	SetActorRotation(t) {
		this.OwnActor.K2_GetActorRotation().Equals(
			t,
			MathUtils_1.MathUtils.SmallNumber,
		) || this.OwnActor.K2_SetActorRotation(t, !1);
	}
	SetActorLocationAndRotation(t, o) {
		this.OwnActor.K2_SetActorLocationAndRotation(t, o, !0, void 0, !1);
	}
	SetUiCameraAnimationRelativeRotation(t) {
		this.OwnActor.K2_SetActorRelativeRotation(t, !1, void 0, !1);
	}
	SetSprintArmRelativeRotation(t) {
		this.SpringArmComponent.K2_SetRelativeRotation(t, !1, void 0, !1);
	}
	SetSpringArmRelativeLocation(t) {
		this.SpringArmComponent.K2_SetRelativeLocation(t, !1, void 0, !1);
	}
	SetCollisionTest(t) {
		this.SpringArmComponent.bDoCollisionTest = t;
	}
	SetSpringArmLength(t) {
		this.SpringArmComponent.TargetArmLength = t;
	}
	GetSpringArmLength() {
		return this.SpringArmComponent.TargetArmLength;
	}
	GetSpringRelativeLocation() {
		return this.SpringArmComponent.RelativeLocation;
	}
	GetSpringRelativeRotation() {
		return this.SpringArmComponent.RelativeRotation;
	}
	GetActorLocation() {
		return this.OwnActor.K2_GetActorLocation();
	}
	GetActorRotation() {
		return this.OwnActor.K2_GetActorRotation();
	}
	GetOwnActor() {
		return this.OwnActor;
	}
}
exports.UiCameraStructure = UiCameraStructure;
