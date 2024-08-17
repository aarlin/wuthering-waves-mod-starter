"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Time_1 = require("../../../../Core/Common/Time"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskWait extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.TimeMillisecond = 0),
			(this.BlackboardKeyTime = ""),
			(this.RandomTime = 0),
			(this.IsInitTsVariables = !1),
			(this.TsTimeMillisecond = 0),
			(this.TsBlackboardKeyTime = ""),
			(this.TsRandomTime = 0),
			(this.EndTime = -0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsTimeMillisecond = this.TimeMillisecond),
			(this.TsBlackboardKeyTime = this.BlackboardKeyTime),
			(this.TsRandomTime = this.RandomTime));
	}
	ReceiveExecuteAI(e, i) {
		this.InitTsVariables();
		let s = this.TsTimeMillisecond;
		(e = e.AiController) &&
			this.TsBlackboardKeyTime &&
			(e = BlackboardController_1.BlackboardController.GetIntValueByEntity(
				e.CharAiDesignComp.Entity.Id,
				this.TsBlackboardKeyTime,
			)) &&
			(s = e),
			(this.EndTime =
				Time_1.Time.Now +
				s +
				MathUtils_1.MathUtils.GetRandomRange(0, this.TsRandomTime));
	}
	ReceiveTickAI(e, i, s) {
		this.EndTime < Time_1.Time.Now && this.Finish(!0);
	}
	OnClear() {
		this.EndTime = 0;
	}
}
exports.default = TsTaskWait;
