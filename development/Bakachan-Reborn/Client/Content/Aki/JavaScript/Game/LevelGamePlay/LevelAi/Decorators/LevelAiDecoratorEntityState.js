"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorEntityState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorEntityState extends LevelAiDecorator_1.LevelAiDecorator {
	constructor() {
		super(...arguments),
			(this.gIe = () => {
				var e = this.CheckCondition(1);
				this.NotifyEventBasedCondition(e);
			});
	}
	OnExecutionStart() {
		var e = this.Params;
		e &&
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				e.EntityId,
			))?.Valid &&
			EventSystem_1.EventSystem.AddWithTarget(
				e.Entity,
				EventDefine_1.EEventName.OnGameplayTagChanged,
				this.gIe,
			);
	}
	OnExecutionFinish() {
		var e = this.Params;
		e &&
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				e.EntityId,
			))?.Valid &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e.Entity,
				EventDefine_1.EEventName.OnGameplayTagChanged,
				this.gIe,
			);
	}
	CheckCondition(e) {
		var t,
			a = this.Params;
		return (
			!!a &&
			!!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				a.EntityId,
			))?.Valid &&
			!!(t = t.Entity.GetComponent(177)) &&
			((t = t.ContainsTagByName(a.State)), "Eq" === a.Compare ? t : !t)
		);
	}
}
exports.LevelAiDecoratorEntityState = LevelAiDecoratorEntityState;
