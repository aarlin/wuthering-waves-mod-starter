"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventLeisureInteract = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLeisureInteract extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.v8s = void 0),
			(this.LQi = void 0),
			(this.M8s = void 0);
	}
	ExecuteNew(e, t, i) {
		var r = e;
		if (r)
			if (Global_1.Global.BaseCharacter) {
				var s =
					Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
						26,
					);
				switch (r.Option.Type) {
					case IAction_1.ELeisureInteract.SitDown:
						var n = t;
						if (!(n = EntitySystem_1.EntitySystem.Get(n.EntityId)))
							return (
								Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										37,
										" LevelEventLeisureInteract, 尝试坐下椅子实体不存在",
									),
								void this.FinishExecute(!1)
							);
						s.EnterSitDownAction(n), this.FinishExecute(!0);
						break;
					case IAction_1.ELeisureInteract.Manipulate:
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								32,
								"[LevelEventLeisureInteract]控物动作已废弃",
							);
						break;
					case IAction_1.ELeisureInteract.Catapult:
					case IAction_1.ELeisureInteract.SuperCatapult:
						{
							let e = 0;
							switch (t.Type) {
								case 5:
									e = t.TriggerEntityId;
									break;
								case 1:
									e = t.EntityId;
							}
							(n = EntitySystem_1.EntitySystem.Get(e)),
								s.StartCatapult(n, r.Option),
								this.FinishExecute(!0);
						}
						break;
					case IAction_1.ELeisureInteract.Bounce:
						s.StartBounce(r.Option), this.FinishExecute(!0);
						break;
					case IAction_1.ELeisureInteract.StandControl:
						s.PlayCustomCommonSkill(400202), this.FinishExecute(!0);
				}
				(this.v8s = void 0), (this.LQi = void 0), (this.M8s = void 0);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelEvent",
						37,
						" LevelEventLeisureInteract, 尝试执行时主角未创建",
					),
					(this.v8s = e),
					(this.LQi = t),
					(this.M8s = i);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					58,
					" LevelEventLeisureInteract, 坐下参数为空",
				);
	}
	OnTick(e) {
		Global_1.Global.BaseCharacter &&
			this.v8s &&
			this.LQi &&
			this.M8s &&
			this.ExecuteNew(this.v8s, this.LQi, this.M8s);
	}
}
exports.LevelEventLeisureInteract = LevelEventLeisureInteract;
