"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventToggleScanSplineEffect = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	QuestController_1 = require("../../Module/QuestNew/Controller/QuestController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleScanSplineEffect extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		if (e) {
			(6 === o.Type &&
				o.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 32, "该事件仅用于任务行为树内配置"));
			var r = o,
				t = e;
			switch (t.Type) {
				case IAction_1.ETraceSplineOptionType.Open:
					var n = t;
					QuestController_1.QuestNewController.AddQuestTraceEffect(
						r.TreeConfigId,
						n.Duration,
						n.SplineEntityId,
					);
					break;
				case IAction_1.ETraceSplineOptionType.Close:
					(n = t),
						QuestController_1.QuestNewController.RemoveQuestTraceEffect(
							r.TreeConfigId,
							n.SplineEntityId,
						);
			}
		} else
			Log_1.Log.CheckError() && Log_1.Log.Error("Event", 32, "参数配置错误");
	}
}
exports.LevelEventToggleScanSplineEffect = LevelEventToggleScanSplineEffect;
