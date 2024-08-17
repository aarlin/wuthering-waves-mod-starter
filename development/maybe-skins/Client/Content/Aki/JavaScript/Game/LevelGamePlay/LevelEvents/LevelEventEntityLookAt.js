"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventEntityLookAt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	TURN_SPEED = 200,
	TOLERANCE = 10;
class LevelEventEntityLookAt extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.sDe = void 0),
			(this.pDe = void 0),
			(this.vDe = !1),
			(this.WTe = 0);
	}
	ExecuteNew(e, t) {
		e
			? ((this.pDe = e),
				(this.vDe = !1),
				this.CreateWaitEntityTask(this.pDe.EntityId))
			: this.FinishExecute(!1);
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteWhenEntitiesReady() {
		var e,
			t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.pDe.EntityId,
			);
		t
			? ((e = (this.sDe = t).Entity.GetComponent(3)),
				(t = t.Entity.GetComponent(36)?.CharacterMovement),
				ObjectUtils_1.ObjectUtils.IsValid(t)
					? ((this.WTe = t.MovementMode),
						(t.MovementMode = 1),
						(t = Vector_1.Vector.Create(
							this.pDe.Pos.X ?? 0,
							this.pDe.Pos.Y ?? 0,
							this.pDe.Pos.Z ?? 0,
						)),
						AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(e, t, 200),
						this.IsAsync ? this.FinishExecute(!0) : (this.vDe = !0))
					: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 27, "执行转向动作时实体不存在:", [
						"PbDataId",
						this.pDe.EntityId,
					]),
				this.FinishExecute(!0));
	}
	OnTick(e) {
		var t;
		this.vDe &&
			(this.sDe?.IsInit
				? (t = this.sDe.Entity?.GetComponent(3)).InputRotatorProxy.Equals(
						t.ActorRotationProxy,
						10,
					) &&
					((t.Entity.GetComponent(36).CharacterMovement.MovementMode =
						this.WTe),
					this.FinishExecute(!0))
				: this.FinishExecute(!0));
	}
	OnReset() {
		(this.sDe = void 0), (this.vDe = !1), (this.WTe = 0);
	}
}
exports.LevelEventEntityLookAt = LevelEventEntityLookAt;
