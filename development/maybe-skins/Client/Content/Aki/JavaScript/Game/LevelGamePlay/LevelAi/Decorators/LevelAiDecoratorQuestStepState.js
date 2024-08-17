"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorQuestStepState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestStepState extends LevelAiDecorator_1.LevelAiDecorator {
	constructor() {
		super(...arguments),
			(this.fIe = (e) => {
				var t = this.Params;
				t &&
					e &&
					t.QuestId === e.TreeConfigId &&
					t.ChildQuestId === e.NodeId &&
					((t = this.CheckCondition(1)), this.NotifyEventBasedCondition(t));
			});
	}
	OnExecutionStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
			this.fIe,
		);
	}
	OnExecutionFinish() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
			this.fIe,
		);
	}
	CheckCondition(e) {
		var t,
			o = this.Params;
		return (
			!!o &&
			(3 ===
				ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o.QuestId) ||
				(!!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					o.QuestId,
				)) &&
					(t.GetNode(o.ChildQuestId)?.IsSuccess ?? !1)))
		);
	}
}
exports.LevelAiDecoratorQuestStepState = LevelAiDecoratorQuestStepState;
