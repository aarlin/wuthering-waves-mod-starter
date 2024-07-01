"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSceneItemMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.qAt = void 0),
			(this.dRe = !1),
			(this.CRe = void 0),
			(this.TDe = void 0),
			(this.LDe = () => {
				this.CRe?.Valid
					? this.CRe.IsMoving ||
						this.dRe ||
						(TimerSystem_1.TimerSystem.Remove(this.TDe),
						(this.TDe = void 0),
						(this.dRe = !0),
						this.FinishExecute(!0))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 40, "SceneItemMove过程中MoveComp失效"),
						this.FinishExecute(!1));
			}),
			(this.vUr = (e) => {
				e.GetComponent(113)?.RemoveStopMoveCallbackWithEntity(this.vUr),
					EventSystem_1.EventSystem.HasWithTarget(
						e,
						EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
						this.vUr,
					) &&
						EventSystem_1.EventSystem.RemoveWithTarget(
							e,
							EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
							this.vUr,
						),
					this.FinishExecute(!0);
			});
	}
	ExecuteNew(e, t) {
		e
			? ((this.qAt = e), this.CreateWaitEntityTask(this.qAt.EntityId))
			: (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 34, "参数配置错误"),
				this.FinishExecute(!1));
	}
	ExecuteWhenEntitiesReady() {
		if (this.qAt) {
			var e = this.qAt.EntityId,
				t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
			if (t?.Valid) {
				var o = t.Entity.GetComponent(113);
				switch (((this.CRe = o), this.qAt.MoveConfig.Type)) {
					case IAction_1.EMoveSceneItemType.MoveToPoint:
						this.MUr(this.qAt, t);
						break;
					case IAction_1.EMoveSceneItemType.CycleMoveToPoints:
						this.SUr(this.qAt, t);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 34, "实体不合法", ["entityId", e]),
					this.FinishExecute(!1);
		}
	}
	MUr(e, t) {
		var o,
			i = e.MoveConfig;
		i &&
			(this.CRe?.Valid
				? (e.StopBeforeMove && this.CRe.StopMove(),
					i.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion
						? ((o = Vector_1.Vector.Create(
								i.Point.X ?? 0,
								i.Point.Y ?? 0,
								i.Point.Z ?? 0,
							)),
							this.CRe.AddMoveTarget(
								new SceneItemMoveComponent_1.MoveTarget(
									o,
									-1,
									-1,
									i.MoveMotion.MaxSpeed ?? -1,
									i.MoveMotion.Acceleration ?? -1,
								),
							))
						: this.CRe.AddMoveTarget(i),
					this.IsAsync
						? this.FinishExecute(!0)
						: (this.TDe = TimerSystem_1.TimerSystem.Forever(this.LDe, 1e3)))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 32, "Entity找不到SceneItemMoveComponent", [
							"entityId",
							e.EntityId,
						]),
					this.FinishExecute(!1)));
	}
	SUr(e, t) {
		var o = e.MoveConfig;
		o &&
			(this.CRe?.Valid
				? (e.StopBeforeMove &&
						(this.CRe.StopMove(),
						EventSystem_1.EventSystem.EmitWithTarget(
							t.Entity,
							EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
							t.Entity,
						)),
					EventSystem_1.EventSystem.AddWithTarget(
						t.Entity,
						EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
						this.vUr,
					),
					ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(
						t.Entity,
						o.Points,
						o.IsLoop ?? !1,
						o.MoveMotion,
						o.StopTime,
					),
					this.IsAsync
						? this.FinishExecute(!0)
						: (this.CRe.ClearStopMoveCallbackWithEntity(),
							this.CRe.AddStopMoveCallbackWithEntity(this.vUr)))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 32, "Entity找不到SceneItemMoveComponent", [
							"entityId",
							e.EntityId,
						]),
					this.FinishExecute(!1)));
	}
	OnReset() {
		(this.dRe = !1),
			(this.CRe = void 0),
			(this.qAt = void 0) !== this.TDe &&
				(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
	}
}
exports.LevelEventSceneItemMove = LevelEventSceneItemMove;
