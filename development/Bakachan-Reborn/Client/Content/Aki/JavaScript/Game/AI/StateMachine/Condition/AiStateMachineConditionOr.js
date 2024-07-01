"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionOr = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionOr extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments), (this.Conditions = void 0);
	}
	OnInit(i) {
		var n = i.CondOr.Conditions.length;
		if (0 < n) {
			this.Conditions = [];
			for (let e = 0; e < n; e++) {
				var t = i.CondOr.Conditions[e],
					o = this.Transition.ConditionDatas[t];
				o =
					ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(
						this.Transition,
						o,
						t,
					);
				(this.HasTaskFinishCondition ||= o.HasTaskFinishCondition),
					this.Conditions.push(o);
			}
		}
		return !0;
	}
	OnEnter() {
		for (const i of this.Conditions) i.Enter();
	}
	OnExit() {
		for (const i of this.Conditions) i.Exit();
	}
	OnTick() {
		this.ResultSelf = !1;
		for (const i of this.Conditions) i.Tick(), (this.ResultSelf ||= i.Result);
	}
	OnClear() {
		for (const i of this.Conditions) i.Clear();
		this.Conditions.length = 0;
	}
	HandleServerDebugInfo(i) {
		this.ResultServer = i[this.Index];
		var n = this.Conditions.length;
		for (let t = 0; t < n; t++) this.Conditions[t].HandleServerDebugInfo(i);
	}
	ToString(i, n = 0) {
		super.ToString(i, n), i.Append("或\n");
		var t = this.Conditions.length;
		for (let o = 0; o < t; o++) this.Conditions[o].ToString(i, n + 1);
	}
}
exports.AiStateMachineConditionOr = AiStateMachineConditionOr;
