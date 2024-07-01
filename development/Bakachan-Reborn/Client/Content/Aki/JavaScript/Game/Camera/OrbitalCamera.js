"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OrbitalCamera = void 0);
const Entity_1 = require("../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	OrbitalCameraPlayerComponent_1 = require("./OrbitalCameraPlayerComponent"),
	SequenceCameraDisplayComponent_1 = require("./SequenceCameraDisplayComponent");
class OrbitalCamera extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.ele = void 0), (this.yme = void 0);
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsAlwaysTick2Config;
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
				SequenceCameraDisplayComponent_1.SequenceCameraDisplayComponent,
			) &&
			!!this.AddComponent(
				OrbitalCameraPlayerComponent_1.OrbitalCameraPlayerComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnStart() {
		return (
			(this.ele = this.GetComponent(9)), (this.yme = this.GetComponent(6)), !0
		);
	}
	OnClear() {
		return (this.ele = void 0), !(this.yme = void 0);
	}
}
exports.OrbitalCamera = OrbitalCamera;
