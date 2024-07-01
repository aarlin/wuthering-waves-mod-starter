"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WidgetCamera = void 0);
const Entity_1 = require("../../Core/Entity/Entity"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	WidgetCameraBlendComponent_1 = require("./WidgetCameraBlendComponent"),
	WidgetCameraDisplayComponent_1 = require("./WidgetCameraDisplayComponent");
class WidgetCamera extends Entity_1.Entity {
	constructor() {
		super(...arguments), (this.ade = void 0), (this.ele = void 0);
	}
	static StaticGameBudgetConfig() {
		return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
			.TsAlwaysTick2Config;
	}
	get BlendComponent() {
		return this.ade;
	}
	get DisplayComponent() {
		return this.ele;
	}
	OnCreate() {
		return (
			!!this.AddComponent(
				WidgetCameraBlendComponent_1.WidgetCameraBlendComponent,
			) &&
			!!this.AddComponent(
				WidgetCameraDisplayComponent_1.WidgetCameraDisplayComponent,
			) &&
			(this.RegisterToGameBudgetController(void 0), !0)
		);
	}
	OnStart() {
		return (
			(this.ade = this.GetComponent(11)), (this.ele = this.GetComponent(12)), !0
		);
	}
	OnClear() {
		return (this.ade = void 0), !(this.ele = void 0);
	}
}
exports.WidgetCamera = WidgetCamera;
