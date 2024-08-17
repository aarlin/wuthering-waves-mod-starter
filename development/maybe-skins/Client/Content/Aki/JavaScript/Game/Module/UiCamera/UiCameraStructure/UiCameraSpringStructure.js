"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraSpringStructure = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	UiCameraStructure_1 = require("./UiCameraStructure");
class UiCameraSpringStructure extends UiCameraStructure_1.UiCameraStructure {
	constructor() {
		super(...arguments), (this.tUo = void 0);
	}
	OnSpawnStructureActor() {
		var t = GlobalData_1.GlobalData.World,
			r = new UE.Transform(
				new UE.Quat(0),
				new UE.Vector(0),
				new UE.Vector(1, 1, 1),
			);
		return (
			(t = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
				t,
				UE.BP_UiCameraAnimation_C.StaticClass(),
				r,
			)).SetTickableWhenPaused(!0),
			UE.GameplayStatics.FinishSpawningActor(t, r),
			(this.tUo = t),
			this.tUo.SpringArm?.SetTickableWhenPaused(!0),
			this.tUo.Camera?.SetTickableWhenPaused(!0),
			t
		);
	}
	OnSetSpringArmComponent() {
		return this.tUo.SpringArm;
	}
	OnInitialize() {}
	OnDestroy() {
		ActorSystem_1.ActorSystem.Put(this.tUo), (this.tUo = void 0);
	}
	OnActivate() {
		this.CameraActorAttachToSpringActor();
	}
	OnDeactivate() {
		this.CameraActorDetachFromSpringActor();
	}
	CameraActorAttachToSpringActor() {
		var t = this.tUo.Camera;
		this.AttachToComponent(t);
	}
	CameraActorDetachFromSpringActor() {
		this.DetachFromComponent();
	}
	GetSpringActor() {
		return this.tUo;
	}
}
exports.UiCameraSpringStructure = UiCameraSpringStructure;
