"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneCamera = void 0);
const Entity_1 = require("../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	SceneCameraDisplayComponent_1 = require("./SceneCameraDisplayComponent"),
	SceneCameraPlayerComponent_1 = require("./SceneCameraPlayerComponent");
class SceneCamera extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.ele = void 0), (this.yme = void 0);
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsAlwaysTick2Config;
	}
	get CameraActor() {
		return this.ele?.CineCamera;
	}
	get DisplayComponent() {
		return this.ele;
	}
	get PlayerComponent() {
		return this.yme;
	}
	OnCreate() {
		return (
			!!this.AddComponent(
				SceneCameraDisplayComponent_1.SceneCameraDisplayComponent,
			) &&
			!!this.AddComponent(
				SceneCameraPlayerComponent_1.SceneCameraPlayerComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnStart() {
		return (
			(this.ele = this.GetComponent(7)), (this.yme = this.GetComponent(8)), !0
		);
	}
	OnClear() {
		return (this.ele = void 0), !(this.yme = void 0);
	}
}
exports.SceneCamera = SceneCamera;
