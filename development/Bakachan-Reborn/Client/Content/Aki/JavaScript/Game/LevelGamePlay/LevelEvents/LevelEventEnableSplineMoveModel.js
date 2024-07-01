"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventEnableSplineMoveModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
	CHECK_BASE_CHARACTER_INTERVAL = 500;
class LevelEventEnableSplineMoveModel extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.lVs = void 0),
			(this._Vs = new Array()),
			(this.uVs = () => {
				if (Global_1.Global.BaseCharacter?.IsValid()) {
					for (var [e, t] of (TimerSystem_1.TimerSystem.Remove(this.lVs),
					(this.lVs = void 0),
					this._Vs))
						this.ExecuteNew(e, t);
					this._Vs.length = 0;
				}
			});
	}
	ExecuteNew(e, t) {
		if (e) {
			var i,
				r = e.Config;
			let o;
			switch (
				(t instanceof LevelGeneralContextDefine_1.TriggerContext &&
					((n = t.TriggerEntityId
						? EntitySystem_1.EntitySystem.Get(t.TriggerEntityId)
						: void 0),
					(i = t.OtherEntityId
						? EntitySystem_1.EntitySystem.Get(t.OtherEntityId)
						: void 0),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"LevelEvent",
						40,
						"EnableSplineMoveModel: Trigger触发",
						["TargetType", r.Target.Type],
						["SplineMoveType", r.Type],
						["SplineEntityId", r.SplineEntityId],
						["TriggerEntity", n?.GetComponent(0)?.GetPbDataId()],
						["OtherEntity", i?.GetComponent(0)?.GetPbDataId()],
					),
				r.Target.Type)
			) {
				case "Triggered":
					if (t instanceof LevelGeneralContextDefine_1.TriggerContext) {
						if ((o = EntitySystem_1.EntitySystem.Get(t.OtherEntityId))?.Valid)
							break;
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								6,
								"EnableSplineMoveModel: 未找到合法的触发者实体",
								["Type", r.Target.Type],
								["ContextType", t.Type],
							);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								6,
								"EnableSplineMoveModel: Triggered类型必须对应TriggerContext",
								["Type", r.Target.Type],
								["ContextType", t.Type],
							);
					return void this.FinishExecute(!1);
				case "Player":
					if (!Global_1.Global.BaseCharacter?.IsValid())
						return (
							this._Vs.push([e, t]),
							void (
								this.lVs ||
								(this.lVs = TimerSystem_1.TimerSystem.Forever(this.uVs, 500))
							)
						);
					o = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
					break;
				default:
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								6,
								"EnableSplineMoveModel不接受此对象类型",
								["Type", r.Target.Type],
							),
						void this.FinishExecute(!1)
					);
			}
			var n = o?.GetComponent(95);
			n?.Valid
				? ("Open" === r.Type
						? n.StartSplineMove(r.SplineEntityId, r)
						: n.EndSplineMove(r.SplineEntityId),
					this.FinishExecute(!0))
				: this.FinishExecute(!1);
		} else this.FinishExecute(!1);
	}
}
exports.LevelEventEnableSplineMoveModel = LevelEventEnableSplineMoveModel;
