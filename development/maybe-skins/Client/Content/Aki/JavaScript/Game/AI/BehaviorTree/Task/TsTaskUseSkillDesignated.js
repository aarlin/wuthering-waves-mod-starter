"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkillDesignated extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.BlackboardKeyTarget = ""),
			(this.SkillInfoId = 0),
			(this.IsInitTsVariables = !1),
			(this.TsBlackboardKeyTarget = ""),
			(this.TsSkillInfoId = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
			(this.TsSkillInfoId = this.SkillInfoId));
	}
	ReceiveTickAI(e, i, r) {
		var t = e.AiController;
		if (t)
			if (t.AiSkill) {
				this.InitTsVariables();
				var a = t.AiSkill.SkillInfos.get(this.TsSkillInfoId);
				if (a) {
					let e = t.AiHateList.GetCurrentTarget();
					this.TsBlackboardKeyTarget &&
						((l =
							BlackboardController_1.BlackboardController.GetEntityIdByEntity(
								t.CharAiDesignComp.Entity.Id,
								this.TsBlackboardKeyTarget,
							)),
						(l = ModelManager_1.ModelManager.CreatureModel.GetEntityById(l))) &&
						(e = l);
					var l = t.CharAiDesignComp.Entity.GetComponent(33);
					l.Valid
						? ((l = l.BeginSkill(Number(a.SkillId), {
								Target: e?.Entity,
								Context: "TsTaskUseSkillDesignated.ReceiveTickAI",
							})),
							this.FinishExecute(l),
							l && t.AiSkill && t.AiSkill.SetSkillCdFromNow(this.TsSkillInfoId))
						: this.FinishExecute(!1);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"当前AI没有对应的技能ID",
							["AiBaseId", t.AiBase.Id],
							["SkillInfoId", this.TsSkillInfoId],
						),
						this.FinishExecute(!1);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", [
						"AiBaseId",
						t.AiBase.Id,
					]),
					this.FinishExecute(!1);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
}
exports.default = TsTaskUseSkillDesignated;
