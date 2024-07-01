"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreAreaItemData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class ExploreAreaItemData {
	constructor() {
		(this.AreaId = 0),
			(this.ExploreType = 0),
			(this.ExploreProgressId = 0),
			(this.V5t = 0),
			(this.kAt = 0),
			(this.JQt = 0),
			(this.RTn = void 0),
			(this.DTn = 0),
			(this.PTn = void 0),
			(this.ATn = void 0),
			(this.UTn = !1),
			(this.wTn = 0),
			(this.SortIndex = 0);
	}
	Initialize(t) {
		(this.AreaId = t.Area),
			(this.ExploreType = t.ExploreType),
			(this.RTn = t.TypeName),
			(this.DTn = t.PhantomSkillId),
			(this.PTn = t.UnlockTextId),
			(this.ATn = t.LockTextId),
			(this.wTn = t.CountMode),
			(this.SortIndex = t.SortIndex),
			(this.ExploreProgressId = t.Id),
			(this.UTn = !1),
			0 !== this.DTn &&
				(this.UTn =
					ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
						this.DTn,
					));
	}
	Refresh(t) {
		(this.V5t = t.lLs), (this.kAt = t.Yys), (this.JQt = t.jms);
	}
	GetProgress() {
		return this.V5t;
	}
	GetCurrentCount() {
		return this.kAt;
	}
	GetTotalCount() {
		return this.JQt;
	}
	GetNameId() {
		return this.RTn;
	}
	IsPercent() {
		return 0 === this.wTn;
	}
	IsCompleted() {
		return (
			100 <= this.V5t || (0 < this.kAt && 0 < this.JQt && this.kAt >= this.JQt)
		);
	}
	HasPhantomSkill() {
		return 0 !== this.DTn;
	}
	GetUnlockTextId() {
		return this.PTn;
	}
	GetLockTextId() {
		return this.ATn;
	}
	GetIsPhantomSkillUnlock() {
		return this.UTn;
	}
	GetPhantomSkillHelpId() {
		var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
			this.DTn,
		);
		if (t) return t.HelpId;
	}
}
exports.ExploreAreaItemData = ExploreAreaItemData;
