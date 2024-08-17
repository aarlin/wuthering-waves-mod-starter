"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardFloatCompare extends UE.BTDecorator_BlueprintBase {
	constructor() {
		super(...arguments),
			(this.BlackboardKey = ""),
			(this.Operation = 0),
			(this.CompareValue = 0),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKey = ""),
			(this.TsOperation = 0),
			(this.TsCompareValue = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKey = this.BlackboardKey),
			(this.TsOperation = this.Operation),
			(this.TsCompareValue = this.CompareValue));
	}
	PerformConditionCheckAI(e, r) {
		var a = e.AiController;
		if (!a)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				!1
			);
		if (!(e = a.CharAiDesignComp)) return !1;
		this.InitTsVariables();
		let t = BlackboardController_1.BlackboardController.GetFloatValueByEntity(
			e.Entity.Id,
			this.TsBlackboardKey,
		);
		switch (((t = t || 0), this.TsOperation)) {
			case 0:
				return t === this.TsCompareValue;
			case 1:
				return t !== this.TsCompareValue;
			case 2:
				return t < this.TsCompareValue;
			case 3:
				return t <= this.TsCompareValue;
			case 4:
				return t > this.TsCompareValue;
			case 5:
				return t >= this.TsCompareValue;
			default:
				return !1;
		}
	}
}
exports.default = TsDecoratorBlackboardFloatCompare;
