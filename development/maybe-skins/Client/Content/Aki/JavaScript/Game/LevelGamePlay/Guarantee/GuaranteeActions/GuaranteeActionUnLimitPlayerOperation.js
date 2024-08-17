"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionUnLimitPlayerOperation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	InputController_1 = require("../../../Input/InputController"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	LevelEventLockInputState_1 = require("../../LevelEventLockInputState"),
	GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionUnLimitPlayerOperation extends GuaranteeActionBase_1.GuaranteeActionBase {
	OnExecute(e) {
		InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
			LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
			InputDistributeController_1.InputDistributeController.RefreshInputTag(),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetActiveBattleViewSkill,
				!0,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
				!0,
			),
			(LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []);
		var t,
			n = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
		n?.Valid &&
			((n = n.GetComponent(185))?.HasTag((t = 477750727)) &&
				(n.RemoveTag(t), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"Test",
					30,
					"[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
				),
			n?.HasTag((t = -63548288)) && n.RemoveTag(t),
			n?.HasTag((t = 229513169))) &&
			n.RemoveTag(t),
			ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
	}
}
exports.GuaranteeActionUnLimitPlayerOperation =
	GuaranteeActionUnLimitPlayerOperation;
