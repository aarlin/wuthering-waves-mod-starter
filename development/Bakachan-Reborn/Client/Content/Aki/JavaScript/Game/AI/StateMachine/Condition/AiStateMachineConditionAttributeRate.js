"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionAttributeRate = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	AiStateMachineCondition_1 = require("./AiStateMachineCondition");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const ATTRIBUTE_RATE_COE = 1e-4;
class AiStateMachineConditionAttributeRate extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments),
			(this.nne = 0),
			(this.sne = 0),
			(this.one = -0),
			(this.rne = -0),
			(this.ane = -0),
			(this.hne = -0),
			(this.aie = (t, e, i) => {
				t === this.nne ? (this.ane = e) : t === this.sne && (this.hne = e),
					(t = this.ane / this.hne),
					(this.ResultSelf = t >= this.one && t <= this.rne);
			});
	}
	OnInit(t) {
		return (
			(this.nne = t.CondAttributeRate.AttributeId),
			(this.sne = t.CondAttributeRate.Denominator),
			(this.one = 1e-4 * t.CondAttributeRate.Min),
			(this.rne = 1e-4 * t.CondAttributeRate.Max),
			this.Node.AttributeComponent.AddListeners(
				[this.nne, this.sne],
				this.aie,
				"AiConditionEvent",
			),
			(this.ane = this.Node.AttributeComponent.GetCurrentValue(this.nne)),
			(this.hne = this.Node.AttributeComponent.GetCurrentValue(this.sne)),
			(t = this.ane / this.hne),
			(this.ResultSelf = t >= this.one && t <= this.rne),
			!0
		);
	}
	OnClear() {
		this.Node.AttributeComponent?.RemoveListeners(
			[this.nne, this.sne],
			this.aie,
		);
	}
	ToString(t, e = 0) {
		super.ToString(t, e),
			t.Append(
				`属性比例 [${EAttributeId[this.nne]}/${EAttributeId[this.sne]}, ${this.one}, ${this.rne}]\n`,
			);
	}
}
exports.AiStateMachineConditionAttributeRate =
	AiStateMachineConditionAttributeRate;
