"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightCamera = void 0);
const Entity_1 = require("../../Core/Entity/Entity"),
	StatDefine_1 = require("../Common/StatDefine"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	FightCameraDisplayComponent_1 = require("./FightCameraDisplayComponent"),
	FightCameraLogicComponent_1 = require("./FightCameraLogicComponent");
class FightCamera extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.Zhe = void 0), (this.ele = void 0);
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsAlwaysTick2Config;
	}
	get LogicComponent() {
		return this.Zhe;
	}
	get DisplayComponent() {
		return this.ele;
	}
	OnCreate() {
		return (
			!!this.AddComponent(
				FightCameraLogicComponent_1.FightCameraLogicComponent,
			) &&
			!!this.AddComponent(
				FightCameraDisplayComponent_1.FightCameraDisplayComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnStart() {
		return (
			(this.Zhe = this.GetComponent(5)), (this.ele = this.GetComponent(4)), !0
		);
	}
	OnClear() {
		return (this.Zhe = void 0), !(this.ele = void 0);
	}
	Tick(e) {
		StatDefine_1.BATTLESTAT_ENABLED,
			super.Tick(e),
			StatDefine_1.BATTLESTAT_ENABLED;
	}
}
exports.FightCamera = FightCamera;
