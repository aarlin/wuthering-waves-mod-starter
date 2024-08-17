"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTransition = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class AiStateMachineTransition {
	constructor(i, t) {
		(this.Conditions = void 0),
			(this.HasTaskFinishCondition = !1),
			(this.Node = i),
			(this.From = i.Owner.GetNodeData(t.From)?.Uuid),
			(this.To = i.Owner.GetNodeData(t.To)?.Uuid),
			(this.TransitionPredictionType = t.TransitionPredictionType),
			(this.Weight = t.Weight),
			(this.ConditionDatas = t.Conditions),
			(this.Condition =
				ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(
					this,
					t.Conditions[0],
					0,
				)),
			(this.HasTaskFinishCondition = this.Condition.HasTaskFinishCondition);
	}
	Enter() {
		this.Condition.Enter();
	}
	Exit() {
		this.Condition.Exit();
	}
	Tick() {
		this.Condition.Tick();
	}
	CheckPredictionCondition() {
		return (
			!!(
				(1 === this.TransitionPredictionType &&
					this.Node.ActorComponent.IsAutonomousProxy) ||
				2 === this.TransitionPredictionType
			) && this.Condition.Result
		);
	}
	HandleServerDebugInfo(i) {
		this.Condition.HandleServerDebugInfo(i);
	}
	Clear() {
		this.Condition.Clear(),
			(this.Node = void 0),
			(this.ConditionDatas = void 0),
			(this.Condition = void 0),
			(this.Conditions = void 0);
	}
}
exports.AiStateMachineTransition = AiStateMachineTransition;
