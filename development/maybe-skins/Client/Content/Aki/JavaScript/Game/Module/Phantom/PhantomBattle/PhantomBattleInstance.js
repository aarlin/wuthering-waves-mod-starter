"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomBattleInstance = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhantomBattleInstance {
	constructor(t) {
		(this.xe = 0),
			(this.HNi = void 0),
			(this.oVi = void 0),
			(this.PhantomId = t.MonsterId),
			(this.PhantomItem = t),
			(this.PhantomSkill =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillList(
					t.SkillId,
				));
	}
	set PhantomId(t) {
		this.xe = t;
	}
	get PhantomId() {
		return this.xe;
	}
	set PhantomItem(t) {
		this.HNi = t;
	}
	get PhantomItem() {
		return this.HNi;
	}
	set PhantomSkill(t) {
		this.oVi = t;
	}
	get PhantomSkill() {
		return this.oVi;
	}
	GetPhantomSkillId() {
		return this.oVi[0].Id;
	}
	GetPhantomSkillInfoByLevel() {
		return 0 < this.PhantomSkill.length ? this.PhantomSkill[0] : void 0;
	}
	GetModelZoom() {
		return this.PhantomItem.Zoom;
	}
	GetModelLocation() {
		return this.PhantomItem.Location;
	}
	GetModelRotator() {
		return this.PhantomItem.Rotator;
	}
	GetStandAnim() {
		return this.PhantomItem.StandAnim;
	}
}
exports.PhantomBattleInstance = PhantomBattleInstance;
