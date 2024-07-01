"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorQuestState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestState extends LevelAiDecorator_1.LevelAiDecorator {
	constructor() {
		super(...arguments),
			(this.DEe = (e) => {
				var t = this.Params;
				t &&
					t.QuestId === e &&
					((t = this.CheckCondition(1)), this.NotifyEventBasedCondition(t));
			});
	}
	OnExecutionStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		);
	}
	OnExecutionFinish() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		);
	}
	CheckCondition(e) {
		var t = this.Params;
		if (!t) return !1;
		var a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId);
		let r = !1;
		switch (t.Compare) {
			case "Eq":
				r = a === t.State;
				break;
			case "Ne":
				r = a !== t.State;
				break;
			case "Ge":
				r = a >= t.State;
				break;
			case "Gt":
				r = a > t.State;
				break;
			case "Le":
				r = a <= t.State;
				break;
			case "Lt":
				r = a < t.State;
		}
		return r;
	}
}
exports.LevelAiDecoratorQuestState = LevelAiDecoratorQuestState;
