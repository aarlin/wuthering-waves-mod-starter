"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleScoreModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	StateRef_1 = require("../../../../Core/Utils/Audio/StateRef"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class BattleScoreModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.iyn = new Map()),
			(this.oyn = new Map()),
			(this.ryn = 0),
			(this.RougeScoreMusicState = new StateRef_1.StateRef(
				"game_rogue_combat_combo_rank",
				"none",
			));
	}
	OnInit() {
		return !0;
	}
	OnLeaveLevel() {
		return (
			this.iyn.clear(),
			(this.ryn = 0),
			(this.RougeScoreMusicState.State = "none"),
			!0
		);
	}
	HandleBattleScoreNotify(e) {
		this.UpdateScore(e.mTs, e.CTs);
	}
	UpdateScore(e, t) {
		var r;
		this.iyn.set(e, t),
			this.ryn !== e &&
				((this.ryn = e),
				this.oyn.has(e) ||
					((r =
						ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(
							e,
						)) &&
						this.oyn.set(e, r))),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattleScoreChanged,
				e,
				t,
			);
	}
	GetScoreConfig(e) {
		return this.oyn.get(e);
	}
	GetScore(e) {
		return this.iyn.get(e) ?? 0;
	}
	GetScoreMap() {
		return this.iyn;
	}
	GetCurScoreId() {
		return this.ryn;
	}
}
exports.BattleScoreModel = BattleScoreModel;
