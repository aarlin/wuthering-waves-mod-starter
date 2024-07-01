"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkill extends TsTaskAbortImmediatelyBase_1.default {
	ReceiveTickAI(e, l, r) {
		var o = e.AiController;
		if (o) {
			var t = o.CharAiDesignComp.Entity.Id,
				i = o.CharAiDesignComp.Entity.GetComponent(33);
			if (i.Valid) {
				let e =
					BlackboardController_1.BlackboardController.GetStringValueByEntity(
						t,
						"SkillId",
					);
				(e = e || "0"),
					(i = i.BeginSkill(Number(e), {
						Target: o.AiHateList.GetCurrentTarget()?.Entity,
						Context: "TsTaskUseSkill.ReceiveTickAI",
					})),
					this.FinishExecute(i),
					i &&
						o.AiSkill &&
						o.AiSkill.SetSkillCdFromNow(
							BlackboardController_1.BlackboardController.GetIntValueByEntity(
								t,
								"SkillInfoId",
							),
						),
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						t,
						"SkillId",
					),
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						t,
						"SkillInfoId",
					);
			} else this.FinishExecute(!1);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskUseSkill;
