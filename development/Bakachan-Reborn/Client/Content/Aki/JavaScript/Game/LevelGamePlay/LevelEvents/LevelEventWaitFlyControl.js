"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventWaitFlyControl = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventWaitFlyControl extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.oUe = -0),
			(this.rUe = ""),
			(this.nUe = ""),
			(this.sUe = !1),
			(this.aUe = !1),
			(this.hUe = (e, t) => {
				t === CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
					(this.sUe = !0);
			});
	}
	Execute(e, t) {
		t &&
		e &&
		((t = e.get("WaitTime")),
		(this.rUe = e.get("Success")),
		(this.nUe = e.get("Failure")),
		(this.oUe = parseFloat(t)),
		(e = Global_1.Global.BaseCharacter),
		this.oUe) &&
		e
			? ((this.sUe = !1),
				(this.aUe = !0),
				EventSystem_1.EventSystem.AddWithTarget(
					e.CharacterActorComponent.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.hUe,
				))
			: this.FinishExecute(!1);
	}
	OnTick(e) {
		this.sUe
			? this.FinishExecute(!0)
			: ((this.oUe -= e), this.oUe <= 0 && this.FinishExecute(!1));
	}
	OnFinish() {
		var e = Global_1.Global.BaseCharacter;
		e &&
			(this.rUe &&
				"" !== this.rUe &&
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
					this.rUe,
					e,
				),
			this.Cde());
	}
	OnFailure() {
		var e = Global_1.Global.BaseCharacter;
		e &&
			(this.nUe &&
				"" !== this.nUe &&
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
					this.nUe,
					e,
				),
			this.Cde());
	}
	Cde() {
		if (this.aUe) {
			var e = Global_1.Global.BaseCharacter;
			if (!e) return;
			EventSystem_1.EventSystem.RemoveWithTarget(
				e.CharacterActorComponent.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.hUe,
			);
		}
		this.aUe = !1;
	}
	OnReset() {
		this.Cde(),
			(this.oUe = 0),
			(this.rUe = ""),
			(this.nUe = ""),
			(this.sUe = !1),
			(this.aUe = !1);
	}
}
exports.LevelEventWaitFlyControl = LevelEventWaitFlyControl;
