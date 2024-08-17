"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraSpecialGameplayController = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	CameraController_1 = require("../CameraController"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	ISpecialGameplayCamera_1 = require("./SpecialGameplay/ISpecialGameplayCamera");
class CameraSpecialGameplayController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments), (this.CameraActor = void 0), (this.wce = void 0);
	}
	Name() {
		return "SpecialGameplayController";
	}
	OnInit() {
		this.Lock(this);
	}
	UpdateInternal(e) {
		this.wce && this.wce.Update(e);
	}
	EnterSpecialGameplayController(e) {
		this.CameraActor ||
			(this.CameraActor =
				CameraController_1.CameraController.SpawnCameraActor()),
			CameraController_1.CameraController.SetViewTarget(
				this.CameraActor,
				"EnterSpecialGameplayController",
				0,
				0,
			),
			ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.has(e)
				? ((this.wce =
						ISpecialGameplayCamera_1.SpecialGameplayCamera.GameplayMap.get(
							e,
						)()),
					this.wce.OnInit(this.CameraActor))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 58, "[特殊玩法相机] 未找到特殊玩法", [
						"gameplayId",
						e,
					]),
			this.Unlock(this);
	}
	ExitSpecialGameplayController() {
		this.Camera?.CameraActor?.IsValid() &&
			CameraController_1.CameraController.SetViewTarget(
				this.Camera.CameraActor,
				"ExitSpecialGameplayController",
			),
			this?.CameraActor &&
				(ActorSystem_1.ActorSystem.Put(this.CameraActor),
				(this.CameraActor = void 0)),
			this.wce?.OnDestroy(),
			(this.wce = void 0),
			this.Lock(this);
	}
}
exports.CameraSpecialGameplayController = CameraSpecialGameplayController;
