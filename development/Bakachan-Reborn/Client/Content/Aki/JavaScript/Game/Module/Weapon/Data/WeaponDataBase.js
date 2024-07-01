"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponDataBase = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class WeaponDataBase {
	GetWeaponConfig() {
		return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
			this.GetItemId(),
		);
	}
	GetBreachConfig() {
		var e,
			n = this.GetWeaponConfig();
		if (n)
			return (
				(e = this.GetBreachLevel()),
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
					n.BreachId,
					e,
				)
			);
	}
	GetBreachConfigList() {
		var e = this.GetWeaponConfig();
		if (e)
			return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(
				e.BreachId,
			);
	}
	GetResonanceConfig() {
		var e,
			n = this.GetWeaponConfig();
		if (n)
			return (
				(e = this.GetResonanceLevel()),
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
					n.ResonId,
					e,
				)
			);
	}
	CanGoBreach() {
		var e,
			n = this.GetLevel();
		return (
			!(
				this.GetLastBreachConfig().LevelLimit <= n ||
				!(e = this.GetBreachConfig())
			) && n >= e.LevelLimit
		);
	}
	GetLastBreachConfig() {
		var e = this.GetWeaponConfig().BreachId;
		return (e =
			ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e))[
			e.length - 1
		];
	}
	GetBreachConsume() {
		var e = this.GetWeaponConfig(),
			n = this.GetBreachLevel();
		return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
			e.BreachId,
			n,
		).Consume;
	}
	GetMaxLevel() {
		var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelLimit(
				this.GetItemConfig().QualityId,
			),
			n = this.GetLastBreachConfig();
		return Math.min(e, n.LevelLimit);
	}
	IsLevelMax() {
		return this.GetMaxLevel() <= this.GetLevel();
	}
	GetMaterialCost() {
		var e = this.GetItemConfig().QualityId;
		return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e)
			.Cost;
	}
	GetMaxExp(e) {
		let n = 0;
		for (const a of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelList(
			this.GetWeaponConfig().LevelId,
		)) {
			if (!(a.Level <= e)) return n;
			n += a.Exp;
		}
		return n;
	}
	GetLevelLimitMaxExp() {
		var e = this.GetBreachLevel();
		e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
			this.GetWeaponConfig().BreachId,
			e,
		);
		return this.GetMaxExp(e.LevelLimit - 1);
	}
	GetLevelExp(e) {
		let n = 0;
		return e <= 0
			? 0
			: (n = (e =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelConfig(
						this.GetWeaponConfig().LevelId,
						e,
					))
					? e.Exp
					: n);
	}
	GetCurrentMaxLevel() {
		var e,
			n = this.GetWeaponConfig();
		return n
			? ((e = this.GetBreachLevel()),
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
					n.BreachId,
					e,
				).LevelLimit)
			: 0;
	}
	GetLastLevelMaxExp() {
		return this.GetMaxExp(this.GetLevel() - 1);
	}
	GetItemConfig() {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
			this.GetItemId(),
		);
	}
}
exports.WeaponDataBase = WeaponDataBase;
