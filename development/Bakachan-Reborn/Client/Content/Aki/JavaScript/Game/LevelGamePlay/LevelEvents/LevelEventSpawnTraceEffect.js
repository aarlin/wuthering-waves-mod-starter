"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSpawnTraceEffect = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	QuestController_1 = require("../../Module/QuestNew/Controller/QuestController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnTraceEffect extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.FRe = 0);
	}
	ExecuteNew(e, r) {
		e
			? 6 !== r.Type ||
				r.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 19, "该事件仅用于任务行为树内配置")
				: (this.FRe = r.TreeConfigId)
			: Log_1.Log.CheckError() && Log_1.Log.Error("Event", 34, "参数配置错误");
	}
	OnReset() {
		QuestController_1.QuestNewController.ClearQuestTraceEffect(this.FRe);
	}
}
exports.LevelEventSpawnTraceEffect = LevelEventSpawnTraceEffect;
