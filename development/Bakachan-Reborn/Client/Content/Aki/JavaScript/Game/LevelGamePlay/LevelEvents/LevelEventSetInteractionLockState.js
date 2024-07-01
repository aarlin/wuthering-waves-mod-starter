"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetInteractionLockState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetInteractionLockState extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		e
			? e
				? o
					? ModelManager_1.ModelManager.InteractionModel.InteractingEntity !==
						o.EntityId
						? Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								37,
								"当前申请交互锁定的实体与记录的正在交互的实体不一致，可能是因为服务器重发，交互锁定行为不响应服务器重发",
							)
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("LevelEvent", 37, "设置交互锁定状态", [
									"IsLock",
									e.IsLock,
								]),
							e.IsLock
								? ModelManager_1.ModelManager.InteractionModel.LockInteract(
										o.EntityId,
									)
								: ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock())
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							37,
							"此LevelEvent只能接受以EntityContext为上下文",
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 37, "参数类型错误")
			: Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 37, "参数为空");
	}
}
exports.LevelEventSetInteractionLockState = LevelEventSetInteractionLockState;
