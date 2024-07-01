"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskTurnTo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiTask_1 = require("../LevelAiTask"),
	TURN_SPEED = 200,
	TOLERANCE = 10;
class LevelAiTaskTurnTo extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments), (this.Tae = void 0), (this.WTe = 0);
	}
	ExecuteTask() {
		var e = this.Params;
		if (!e) return 1;
		var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
			e.EntityId,
		);
		return t
			? ((this.Tae = t.Entity.GetComponent(3)),
				(t = t.Entity.GetComponent(36)?.CharacterMovement),
				t?.IsValid()
					? ((this.WTe = t.MovementMode),
						(t.MovementMode = 1),
						(t = Vector_1.Vector.Create(
							e.Pos.X ?? 0,
							e.Pos.Y ?? 0,
							e.Pos.Z ?? 0,
						)),
						AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
							this.Tae,
							t,
							200,
						),
						(this.NotifyTick = !0),
						3)
					: 1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelAi", 30, "执行转向动作时实体不存在:", [
						"PbDataId",
						e.EntityId,
					]),
				1);
	}
	TickTask(e) {
		this.Tae.InputRotatorProxy.Equals(this.Tae.ActorRotationProxy, 10) &&
			((this.Tae.Entity.GetComponent(36).CharacterMovement.MovementMode =
				this.WTe),
			this.FinishLatentTask(0));
	}
	AbortTask() {
		return this.Tae?.ClearInput(), 2;
	}
	OnTaskFinished(e) {
		(this.Tae = void 0), (this.WTe = 0);
	}
}
exports.LevelAiTaskTurnTo = LevelAiTaskTurnTo;
