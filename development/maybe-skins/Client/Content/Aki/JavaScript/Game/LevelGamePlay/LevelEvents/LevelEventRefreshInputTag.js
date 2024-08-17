"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventRefreshInputTag = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../Global"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputController_1 = require("../../Input/InputController"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRefreshInputTag extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
			LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
			InputDistributeController_1.InputDistributeController.RefreshInputTag();
		var n = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity,
			r = 477750727;
		n?.Valid &&
			(n = n.GetComponent(185))?.HasTag(r) &&
			(n.RemoveTag(r), Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Test",
				30,
				"[LevelEventRefreshInputTag.ExecuteNew] RemoveTag 禁止冲刺",
			);
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RemGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "UnLimitPlayerOperation" },
		);
	}
}
exports.LevelEventRefreshInputTag = LevelEventRefreshInputTag;
