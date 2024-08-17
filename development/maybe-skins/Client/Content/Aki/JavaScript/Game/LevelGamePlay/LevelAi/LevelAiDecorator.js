"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecorator = void 0);
const LevelAiNode_1 = require("./LevelAiNode");
class LevelAiDecorator extends LevelAiNode_1.LevelAiNode {
	constructor() {
		super(...arguments),
			(this.InverseCondition = !1),
			(this.NotifyExecutionStart = !0),
			(this.NotifyExecutionFinish = !0),
			(this.CheckConditionOnPlanEnter = !0),
			(this.CheckConditionOnPlanRecheck = !0),
			(this.CheckConditionOnTick = !1),
			(this.Params = void 0),
			(this.pIe = 1);
	}
	Serialize(e, t, i, n) {
		super.Serialize(e, t, i), (this.Params = n);
	}
	GetWorldStateProxy(e) {
		return 0 === e
			? this.CharacterPlanComponent.WorldStateProxy
			: this.CharacterPlanComponent.WorldState;
	}
	WrappedExecutionStart() {
		this.NotifyExecutionStart && this.OnExecutionStart();
	}
	WrappedExecutionFinish(e) {
		this.NotifyExecutionFinish && this.OnExecutionFinish(e);
	}
	WrappedCheckCondition(e) {
		let t = 1;
		var i;
		return (
			this.vIe(e)
				? ((i = this.CheckCondition(e)),
					(t = (i = this.InverseCondition ? !i : i) ? 1 : 0),
					(this.pIe = t),
					this.PrintDescription("Check Condition", ["CheckResult", t]))
				: 2 === e && (t = this.pIe),
			t
		);
	}
	vIe(e) {
		switch (e) {
			case 0:
				return this.CheckConditionOnPlanEnter;
			case 1:
				return this.CheckConditionOnPlanRecheck;
			case 2:
				return this.CheckConditionOnTick;
			default:
				return !1;
		}
	}
	NotifyEventBasedCondition(e) {
		e = this.InverseCondition ? !e : e;
		var t =
			((this.pIe = e ? 1 : 0),
			this.CharacterPlanComponent.FindActiveDecoratorInfo(this));
		return !!t && t.PlanInstance.NotifyEventBasedDecoratorCondition(this, e);
	}
	OnExecutionStart() {}
	OnExecutionFinish(e) {}
	CheckCondition(e) {
		return !0;
	}
}
exports.LevelAiDecorator = LevelAiDecorator;
