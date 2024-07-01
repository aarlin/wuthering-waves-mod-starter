"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsDecoratorCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments), (this.CheckValue = "");
	}
	PerformConditionCheckAI(e, r) {
		return !0;
	}
}
exports.default = TsDecoratorCheck;
