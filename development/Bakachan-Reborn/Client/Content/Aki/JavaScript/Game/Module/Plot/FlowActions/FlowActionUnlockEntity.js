"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionUnlockEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FlowActionBase_1 = require("./FlowActionBase"),
	LOCK_TAG_NAME = "关卡.Common.属性.锁定";
class FlowActionUnlockEntity extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var o = this.ActionInfo.Params;
		if (GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(LOCK_TAG_NAME))
			for (const t of o.EntityIds) {
				var e =
					ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						t,
					)?.Entity?.GetComponent(115);
				e
					? e.RemoveLockPerformanceTagLocal()
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							32,
							"找不对对应的实体",
							["pbDataId", t],
							["actionId", this.ActionInfo.ActionId],
						);
			}
	}
}
exports.FlowActionUnlockEntity = FlowActionUnlockEntity;
