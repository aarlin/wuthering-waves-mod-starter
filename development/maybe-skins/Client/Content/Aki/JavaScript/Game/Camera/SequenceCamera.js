"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceCamera = void 0);
const Entity_1 = require("../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	SequenceCameraDisplayComponent_1 = require("./SequenceCameraDisplayComponent"),
	SequenceCameraPlayerComponent_1 = require("./SequenceCameraPlayerComponent");
class SequenceCamera extends Entity_1.Entity {
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
				SequenceCameraPlayerComponent_1.SequenceCameraPlayerComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnStart() {
		return (
			(this.ele = this.GetComponent(9)), (this.yme = this.GetComponent(10)), !0
		);
	}
	OnClear() {
		return (this.ele = void 0), !(this.yme = void 0);
	}
}
exports.SequenceCamera = SequenceCamera;
