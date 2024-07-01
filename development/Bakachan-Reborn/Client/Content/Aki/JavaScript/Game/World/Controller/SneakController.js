"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SneakController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class SneakController extends ControllerBase_1.ControllerBase {
	static StartSneaking() {
		(this.bfr = !0),
			this.BXt(!0),
			this.GXt(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart);
	}
	static EndSneaking() {
		(this.bfr = !1),
			this.BXt(!1),
			this.OXt(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd);
	}
	static get IsSneaking() {
		return this.bfr;
	}
	static GXt() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnBattleStateChanged,
			this.Zpe,
		);
	}
	static OXt() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnBattleStateChanged,
			this.Zpe,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			);
	}
	static BXt(e) {
		var t =
			Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(157);
		t?.Valid &&
			(e
				? t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
						InstigatorId: t.CreatureDataId,
						Reason: "SneakController",
					})
				: t.RemoveBuff(
						CharacterBuffIds_1.buffId.StealthIgnoreHateBuff,
						-1,
						"SneakController",
					));
	}
}
(exports.SneakController = SneakController),
	((_a = SneakController).bfr = !1),
	(SneakController.RXt = !1),
	(SneakController.Zpe = (e) => {
		_a.BXt(!e),
			e !== _a.RXt &&
				((_a.RXt = e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSneakFoundChange,
					_a.RXt,
					0,
				));
	});
