"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraPhotographerStructure = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	CameraController_1 = require("../../../Camera/CameraController"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	PhotographDefine_1 = require("../../Photograph/PhotographDefine"),
	UiCameraStructure_1 = require("./UiCameraStructure");
class UiCameraPhotographerStructure extends UiCameraStructure_1.UiCameraStructure {
	constructor() {
		super(...arguments), (this.zRo = void 0);
	}
	OnSpawnStructureActor() {
		var e = new UE.Transform(
				new UE.Quat(0),
				new UE.Vector(0),
				new UE.Vector(1, 1, 1),
			),
			t = UE.GameplayStatics.BeginSpawningActorFromClass(
				GlobalData_1.GlobalData.World,
				UE.TsPhotographer_C.StaticClass(),
				e,
			);
		return (
			t?.SetTickableWhenPaused(!0),
			(this.zRo = UE.GameplayStatics.FinishSpawningActor(t, e)),
			this.zRo.Initialize(),
			this.zRo.CameraArm.SetTickableWhenPaused(!0),
			this.zRo
		);
	}
	OnSetSpringArmComponent() {
		return this.zRo.CameraArm;
	}
	OnDestroy() {
		this.ZRo();
	}
	OnActivate() {
		var e = this.eUo(),
			t = this.Uji(),
			r = Global_1.Global.BaseCharacter;
		t.SetIsDitherEffectEnable(!1),
			r.SetDitherEffect(1, 1),
			(t = r.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
			(r = e.GetTransform());
		this.zRo.SetPlayerSourceLocation(t),
			this.zRo.SetCameraInitializeTransform(r),
			this.zRo.ActivateCamera(this.CameraActor);
	}
	OnDeactivate() {
		this.zRo.DeactivateCamera();
	}
	ZRo() {
		this.zRo?.IsValid() &&
			(this.zRo.DeactivateCamera(), ActorSystem_1.ActorSystem.Put(this.zRo)),
			(this.zRo = void 0);
	}
	Uji() {
		var e = CameraController_1.CameraController.FightCamera;
		if (e) return e.GetComponent(5);
	}
	eUo() {
		var e = CameraController_1.CameraController.FightCamera;
		if (e && (e = e.GetComponent(4)).Valid) return e.CameraActor;
	}
	SetPlayerSourceLocation(e) {
		this.zRo.SetPlayerSourceLocation(e);
	}
	SetCameraInitializeTransform(e) {
		this.zRo.SetCameraInitializeTransform(e);
	}
	GetCameraInitializeTransform() {
		return this.zRo.GetCameraInitializeTransform();
	}
	SetCameraTransform(e) {
		this.zRo.SetCameraTransform(e);
	}
	AddCameraArmPitchInput(e) {
		this.zRo.AddCameraArmPitchInput(e);
	}
	AddCameraArmYawInput(e) {
		this.zRo.AddCameraArmYawInput(e);
	}
	AddPhotographerYawInput(e) {
		this.zRo.AddPhotographerYawInput(e);
	}
	AddSourceYawInput(e) {
		this.zRo.AddSourceYawInput(e);
	}
	AddSourcePitchInput(e) {
		this.zRo.AddSourcePitchInput(e);
	}
	SetFov(e) {
		this.zRo.SetFov(e);
	}
	GetFov() {
		return this.zRo.GetFov();
	}
	ResetCamera() {
		this.zRo.ResetCamera();
	}
}
exports.UiCameraPhotographerStructure = UiCameraPhotographerStructure;
