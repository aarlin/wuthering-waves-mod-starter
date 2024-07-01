"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskRandomFloat extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.Min = 0),
			(this.Max = 0),
			(this.BlackboardKeyWriteTo = ""),
			(this.IsInitTsVariables = !1),
			(this.TsMin = 0),
			(this.TsMax = 0),
			(this.TsBlackboardKeyWriteTo = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMin = this.Min),
			(this.TsMax = this.Max),
			(this.TsBlackboardKeyWriteTo = this.BlackboardKeyWriteTo));
	}
	ReceiveTickAI(t, a, e) {
		this.InitTsVariables();
		var s = t.AiController;
		s
			? (BlackboardController_1.BlackboardController.SetFloatValueByEntity(
					s.CharAiDesignComp.Entity.Id,
					this.TsBlackboardKeyWriteTo,
					MathUtils_1.MathUtils.GetRandomRange(this.TsMin, this.TsMax),
				),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskRandomFloat;
