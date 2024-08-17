"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeSkillWeight extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.SkillInfoId = 0),
			(this.Weight = 0),
			(this.IsInitTsVariables = !1),
			(this.TsSkillInfoId = 0),
			(this.TsWeight = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsSkillInfoId = this.SkillInfoId),
			(this.TsWeight = this.Weight));
	}
	ReceiveTickAI(e, i, s) {
		this.InitTsVariables();
		var t = e.AiController;
		t
			? t.AiSkill
				? (t.AiSkill.ChangeSkillWeight(this.TsSkillInfoId, this.TsWeight),
					this.FinishExecute(!0))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", [
							"AiBaseId",
							t.AiBase.Id,
						]),
					this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
}
exports.default = TsTaskChangeSkillWeight;
