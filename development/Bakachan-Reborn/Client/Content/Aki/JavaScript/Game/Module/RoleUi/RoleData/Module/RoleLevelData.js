"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RoleModuleDataBase_1 = require("./RoleModuleDataBase"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class RoleLevelData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor() {
		super(...arguments),
			(this.Level = 0),
			(this.BreachLevel = 0),
			(this.Exp = 0);
	}
	SetLevel(e) {
		this.Level = e;
	}
	GetLevel() {
		return this.Level;
	}
	SetExp(e) {
		this.Exp = e;
	}
	GetExp() {
		return this.Exp;
	}
	SetBreachLevel(e) {
		this.BreachLevel = e;
	}
	GetBreachLevel() {
		return this.BreachLevel;
	}
	GetRoleMaxLevel() {
		return this.GetRoleConfig().MaxLevel;
	}
	GetRoleIsMaxLevel() {
		return this.Level >= this.GetRoleMaxLevel();
	}
	GetCurrentMaxExp() {
		return this.Zlo(this.Level + 1);
	}
	GetLevelUpNeedExp() {
		var e = this.Zlo(this.Level + 1);
		return Math.max(0, e - this.Exp);
	}
	Zlo(e) {
		return (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(
			this.GetRoleConfig().LevelConsumeId,
			e,
		))
			? e.ExpCount
			: 1;
	}
	GetMaxBreachLevel() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(
				this.GetRoleConfig().BreachId,
			),
			t = e.length;
		let r = 0;
		for (let l = 0; l < t; l++) {
			var o = e[l];
			o.BreachLevel > r && (r = o.BreachLevel);
		}
		return r;
	}
	GetCurrentMaxLevel() {
		var e = this.GetBreachConfig(this.BreachLevel);
		return e ? e.MaxLevel : 0;
	}
	GetBreachConfig(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(
			this.GetRoleConfig().BreachId,
			e,
		);
	}
	GetRoleNeedBreakUp() {
		return (
			this.Level >= this.GetCurrentMaxLevel() &&
			this.Level < this.GetRoleMaxLevel()
		);
	}
	GetExpPercentage() {
		var e;
		return this.GetRoleIsMaxLevel()
			? 1
			: (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(
						this.GetRoleConfig().LevelConsumeId,
						this.Level + 1,
					))
				? this.Exp / e.ExpCount
				: 0;
	}
	IsEnoughBreachConsume() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(
			this.GetRoleConfig().BreachId,
			this.BreachLevel + 1,
		);
		if (e) {
			if (
				!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
					e.ConditionId.toString(),
					void 0,
					!1,
				)
			)
				return !1;
			for (const t of e.BreachConsume)
				if (
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						t[0],
					) < t[1]
				)
					return !1;
			return !0;
		}
		return !1;
	}
}
exports.RoleLevelData = RoleLevelData;
