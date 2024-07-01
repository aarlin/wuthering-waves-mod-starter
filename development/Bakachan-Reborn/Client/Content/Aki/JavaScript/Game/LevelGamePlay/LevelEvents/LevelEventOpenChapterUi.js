"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenChapterUi = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GeneralLogicTreeUtil_1 = require("../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenChapterUi extends LevelGeneralBase_1.LevelEventBase {
	ExecuteInGm(e, r) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, r) {
		if (e) {
			let t;
			if (e.QuestId) t = e.QuestId;
			else
				switch (r.Type) {
					case 2:
						t = r.QuestId;
						break;
					case 6:
						t = r.TreeConfigId;
				}
			t
				? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(e, t)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 19, "非任务系统不可使用章节提示事件");
		}
	}
}
exports.LevelEventOpenChapterUi = LevelEventOpenChapterUi;
