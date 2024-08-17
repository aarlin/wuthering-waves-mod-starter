"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionQuestStepState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionQuestStepState extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		if (0 === e.LimitParams.size)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1
			);
		var r = Number(e.LimitParams.get("任务Id")),
			t = Number(e.LimitParams.get("步骤Id")),
			a = Number(e.LimitParams.get("状态"));
		if (isNaN(r) || isNaN(a) || isNaN(t))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelCondition", 17, "配置错误！条件的参数不合法", [
						"inConditionInfo.Id",
						e.Id,
					]),
				!1
			);
		switch (a) {
			case 0:
				return (
					3 !==
						(s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r)) &&
					(s <= 2 ||
						((s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r))
							? !(s = s.GetNode(t)) ||
								s.Status < Protocol_1.Aki.Protocol.N2s.Lkn
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Quest",
										19,
										"任务步骤条件检测：找不到进行中的任务",
									),
								!1)))
				);
			case 1:
			case 3:
			default:
				return !1;
			case 2:
				var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r);
				return !!s?.IsProgressing && !!(s = s.GetNode(t)) && s.IsProcessing;
			case 4:
				return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r);
		}
	}
	CheckNew(e, o) {
		var r = e;
		if (!r) return !1;
		let t = !1;
		switch (
			ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.QuestId)
		) {
			case 0:
			case 1:
				t = !1;
				break;
			case 3:
				t = !0;
				break;
			case 2:
				var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					r.QuestId,
				)?.GetNode(r.ChildQuestId);
				t = a?.IsSuccess ?? !1;
		}
		return "Eq" === (r.Compare ?? "Eq") ? t : !t;
	}
}
exports.LevelConditionQuestStepState = LevelConditionQuestStepState;
