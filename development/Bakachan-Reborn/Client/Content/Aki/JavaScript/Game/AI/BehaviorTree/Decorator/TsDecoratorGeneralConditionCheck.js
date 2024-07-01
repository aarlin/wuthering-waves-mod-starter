"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	GlobalData_1 = require("../../../GlobalData"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorGeneralConditionCheck extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.ConditionGroupId = ""),
			(this.CompareValue = !0),
			(this.IsInitTsVariables = !1),
			(this.TsConditionGroupId = ""),
			(this.TsCompareValue = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsConditionGroupId = this.ConditionGroupId),
			(this.TsCompareValue = this.CompareValue));
	}
	PerformConditionCheckAI(e, o) {
		return (
			this.InitTsVariables(),
			!!this.TsConditionGroupId &&
				ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
					this.TsConditionGroupId,
					void 0,
				) === this.TsCompareValue
		);
	}
}
exports.default = TsDecoratorGeneralConditionCheck;
