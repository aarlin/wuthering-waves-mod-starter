"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponInstance = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WeaponDataBase_1 = require("./Data/WeaponDataBase");
class WeaponInstance extends WeaponDataBase_1.WeaponDataBase {
	constructor() {
		super(...arguments), (this.WeaponItem = void 0);
	}
	SetWeaponItem(e) {
		this.WeaponItem = e;
	}
	SetLevel(e) {
		this.WeaponItem.UVn = e;
	}
	GetLevel() {
		return this.WeaponItem.UVn;
	}
	SetExp(e) {
		this.WeaponItem.RVn = e;
	}
	GetExp() {
		return this.WeaponItem.RVn;
	}
	SetResonanceLevel(e) {
		this.WeaponItem.xVn = e;
	}
	GetResonanceLevel() {
		return this.WeaponItem.xVn;
	}
	SetBreachLevel(e) {
		this.WeaponItem.TVn = e;
	}
	GetBreachLevel() {
		return this.WeaponItem.TVn;
	}
	GetIncId() {
		return this.WeaponItem.Q5n;
	}
	GetItemId() {
		var e = this.GetIncId();
		return ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(
			e,
		).GetConfigId();
	}
	IsLock() {
		var e = this.GetIncId();
		return ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(
			e,
		).GetIsLock();
	}
	IsTrial() {
		return !1;
	}
	HasRole() {
		return 0 < this.GetRoleId();
	}
	SetRoleId(e) {
		this.WeaponItem.l3n = e;
	}
	GetRoleId() {
		return this.WeaponItem.l3n;
	}
	GetMaterialExp() {
		var e = this.GetItemConfig().QualityId,
			t =
				((e =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e)),
				this.GetExp()),
			a = this.GetLevel();
		return t <= 0 && 1 === a
			? e.BasicExp
			: ((a =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpCoefficient()),
				Math.floor(e.BasicExp + (this.GetLastLevelMaxExp() + t) * a));
	}
	HasWeaponCultivated() {
		var e = 1 < this.GetResonanceLevel(),
			t = 1 < this.GetLevel(),
			a = 0 < this.GetExp();
		return e || t || a;
	}
}
exports.WeaponInstance = WeaponInstance;
