"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestRewardInfo =
		exports.ShowNodeData =
		exports.QUEST_CONFIGPATH =
		exports.SCAN_SKILL_ID =
		exports.CITY_AREA_ID =
		exports.INVALID_ENTITYDATAID =
		exports.INVALID_QUEST_ID =
			void 0),
	(exports.INVALID_QUEST_ID = 0),
	(exports.INVALID_ENTITYDATAID = 0),
	(exports.CITY_AREA_ID = 303),
	(exports.SCAN_SKILL_ID = 210004),
	(exports.QUEST_CONFIGPATH =
		"Source/Config/Raw/Tables/k.可视化编辑/QuestList");
class ShowNodeData {
	constructor(e) {
		(this.NodeId = e), (this.ChildNodeIds = []);
	}
}
exports.ShowNodeData = ShowNodeData;
class QuestRewardInfo {
	constructor(e, t) {
		(this.ItemId = e), (this.ItemCount = t);
	}
}
exports.QuestRewardInfo = QuestRewardInfo;
