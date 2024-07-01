"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventChangeEntityPerformanceState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeEntityPerformanceState extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t, a) {
		const n = e;
		if (n) {
			let e, a;
			switch (n.Type) {
				case IAction_1.EChangeEntityPrefabPerformanceType.Target:
					(e = n.EntityId),
						(a =
							ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e));
					break;
				case IAction_1.EChangeEntityPrefabPerformanceType.Self:
					if (!t) return;
					(e = t.EntityId),
						(a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e));
			}
			e &&
				WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(e, (t) => {
					var r;
					t
						? (t = a?.Entity?.GetComponent(117))
							? (r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
									n.PerformanceTag,
								))
								? t.ChangePerformanceState(r)
								: Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"LevelEvent",
										37,
										"[LevelEventChangeEntityPerformanceState] 找不到对应的StateTag",
										["pbDataId", e],
										["Type", n.Type],
									)
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"LevelEvent",
									37,
									"[LevelEventChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent",
									["pbDataId", e],
								)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"LevelEvent",
								37,
								"[ LevelEventChangeEntityPerformanceState] 找不到对应的Entity",
								["pbDataId", e],
								["Type", n.Type],
							);
				});
		}
	}
}
exports.LevelEventChangeEntityPerformanceState =
	LevelEventChangeEntityPerformanceState;
