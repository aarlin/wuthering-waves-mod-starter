"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreAreaMissionData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class ExploreAreaMissionData {
	constructor(e) {
		(this.AreaId = 0),
			(this.QuestId = 0),
			(this.QuestNameId = void 0),
			(this.QuestStatus = void 0),
			(this.QuestType = void 0),
			(this.SortIndex = 0),
			(this.AreaId = e.Area),
			(this.QuestId = e.Id),
			(this.SortIndex = e.SortIndex);
		var t = (e = ModelManager_1.ModelManager.QuestNewModel).GetQuestConfig(
			this.QuestId,
		);
		(this.QuestStatus = e.GetQuestState(this.QuestId)),
			(this.QuestNameId = t?.TidName),
			(this.QuestType = t?.Type);
	}
}
exports.ExploreAreaMissionData = ExploreAreaMissionData;
