"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventEnableAi = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableAi extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r) {
		var o = e;
		if (o)
			if (o.EntityIds)
				for (const e of o.EntityIds) {
					var n =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
					n
						? (n = n.Entity.GetComponent(36)) && n.Valid
							? n.StopMove(!o.IsEnable)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelEvent",
									19,
									"LevelEventEnableAi行为执行时,实体不存在CharacterMoveComponent",
									["实体Id", e],
								)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								19,
								"LevelEventEnableAi行为执行时找不到实体",
								["实体Id", e],
							);
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						19,
						"LevelEventEnableAi行为执行失败：配置的实体Id列表为空",
					),
					this.FinishExecute(!1);
		else this.FinishExecute(!1);
	}
}
exports.LevelEventEnableAi = LevelEventEnableAi;
