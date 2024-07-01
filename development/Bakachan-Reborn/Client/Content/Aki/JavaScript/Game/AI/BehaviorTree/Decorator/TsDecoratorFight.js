"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsDecoratorFight extends UE.BTDecorator_BlueprintBase {
	PerformConditionCheckAI(e, r) {
		return (e = e.AiController?.AiHateList.GetCurrentTarget()?.Valid), e || !1;
	}
}
exports.default = TsDecoratorFight;
