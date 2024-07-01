"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionChangeEntityPerformanceState = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityPerformanceState extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e,
			t,
			a = this.ActionInfo.Params;
		if (a) {
			let n, o;
			switch (a.Type) {
				case IAction_1.EChangeEntityPrefabPerformanceType.Target:
					(n = a.EntityId),
						(o =
							ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n));
					break;
				case IAction_1.EChangeEntityPrefabPerformanceType.Self:
					(n = this.XXi()),
						(o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n));
			}
			o?.IsInit
				? (e = o?.Entity?.GetComponent(117))
					? (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
							a.PerformanceTag,
						))
						? e.ChangePerformanceState(t)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								7,
								"[FlowActionChangeEntityPerformanceState] 找不到对应的StateTag",
								["pbDataId", n],
								["Type", a.Type],
							)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							7,
							"[FlowActionChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent",
							["pbDataId", n],
						)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Plot",
						7,
						"[ FlowActionChangeEntityPerformanceState] 找不到对应的Entity",
						["pbDataId", n],
						["Type", a.Type],
					);
		}
	}
	XXi() {
		let e;
		switch (this.Context.Context.Type) {
			case 1:
				var t = this.Context.Context;
				e = t.EntityId;
				break;
			case 5:
				e = (t = this.Context.Context).TriggerEntityId;
		}
		return e;
	}
}
exports.FlowActionChangeEntityPerformanceState =
	FlowActionChangeEntityPerformanceState;
