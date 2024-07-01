"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponSkeletalObserverHandles =
		exports.ResonanceConditionData =
		exports.LevelUpConditionData =
		exports.BreachConditionData =
		exports.ConsumeData =
		exports.MaterialData =
		exports.WEAPON_EQUIPTYPE =
		exports.WEAPON_CURVE_RATION =
			void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
(exports.WEAPON_CURVE_RATION = 1e4), (exports.WEAPON_EQUIPTYPE = 0);
class MaterialData {
	constructor(e, t = 1) {
		(this.ItemData = e), (this.UseCount = t);
	}
	AddCount() {
		this.UseCount += 1;
	}
	ReduceCount() {
		--this.UseCount;
	}
	CheckEmpty() {
		return 0 === this.UseCount;
	}
}
exports.MaterialData = MaterialData;
class ConsumeData {
	constructor() {
		(this.Exp = 0), (this.Coin = 0);
	}
}
exports.ConsumeData = ConsumeData;
class BreachConditionData {
	constructor() {
		(this.CanBreach = !0), (this.Tips = "");
	}
}
exports.BreachConditionData = BreachConditionData;
class LevelUpConditionData {
	constructor() {
		(this.HasHighQuality = !1),
			(this.HasBeStrength = !1),
			(this.HasResonance = !1);
	}
	CheckAllCondition() {
		return this.HasHighQuality && this.HasBeStrength && this.HasResonance;
	}
	GetConditionTextList() {
		var e,
			t = [];
		return (
			this.HasHighQuality &&
				((e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"WeaponHighQuality",
					)),
				t.push(e)),
			this.HasBeStrength &&
				((e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"WeaponHasLevelUp",
					)),
				t.push(e)),
			this.HasResonance &&
				((e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"WeaponHasResonance",
					)),
				t.push(e)),
			t
		);
	}
}
exports.LevelUpConditionData = LevelUpConditionData;
class ResonanceConditionData {
	constructor() {
		(this.HasBeStrength = !1), (this.HasResonance = !1);
	}
}
exports.ResonanceConditionData = ResonanceConditionData;
class WeaponSkeletalObserverHandles {
	constructor(e, t) {
		(this.WeaponObserver = e), (this.WeaponScabbardObserver = t);
	}
}
exports.WeaponSkeletalObserverHandles = WeaponSkeletalObserverHandles;
