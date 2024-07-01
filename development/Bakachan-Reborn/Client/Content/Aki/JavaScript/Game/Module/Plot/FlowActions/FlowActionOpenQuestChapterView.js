"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionOpenQuestChapterView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionOpenQuestChapterView extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.$Ge = () => {
				this.FinishExecute(!0);
			});
	}
	OnExecute() {
		var e = this.ActionInfo.Params;
		if (e) {
			var t = this.Context.Context;
			let o;
			if (e.QuestId) o = e.QuestId;
			else
				switch (t.Type) {
					case 2:
						o = t.QuestId;
						break;
					case 6:
						o = t.TreeConfigId;
				}
			o
				? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(
						e,
						o,
						this.$Ge,
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 19, "非任务系统不可使用章节提示事件");
		}
	}
}
exports.FlowActionOpenQuestChapterView = FlowActionOpenQuestChapterView;
