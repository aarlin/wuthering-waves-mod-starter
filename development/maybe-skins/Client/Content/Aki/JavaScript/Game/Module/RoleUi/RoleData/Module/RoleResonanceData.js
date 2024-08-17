"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleResonanceData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleResonanceData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor() {
		super(...arguments),
			(this.ResonantChainGroupIndex = 0),
			(this.ResonanceInfoMap = new Map()),
			(this.ResonanceLockSet = new Set());
	}
	SetResonance(e) {
		this.ResonanceInfoMap.set(e.ResonId, e);
	}
	GetResonance(e) {
		return this.ResonanceInfoMap.get(e);
	}
	SetResonanceLock(e) {
		this.ResonanceLockSet.add(e);
	}
	SetResonantChainGroupIndex(e) {
		this.ResonantChainGroupIndex = e;
	}
	GetResonantChainGroupIndex() {
		return this.ResonantChainGroupIndex;
	}
	CheckFrontResonanceOpen(e, n) {
		return !0;
	}
	IsEnoughResonanceActive(e) {
		if (
			(e =
				ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
					e,
				))
		) {
			if (!this.CheckFrontResonanceOpen(e.Id, e.GroupId)) return !1;
			for (const n of e.ActivateConsume)
				if (
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						n[0],
					) < n[1]
				)
					return !1;
			return !0;
		}
		return !1;
	}
	GetResonanceLevel() {
		let e = 0;
		for (const n of this.ResonanceInfoMap.values()) {
			if (!n.IsOpen) break;
			e += 1;
		}
		return e;
	}
	GetResonanceIncreaseLevel() {
		let e = 0;
		for (const n of this.ResonanceInfoMap.values()) {
			if (!n.IsOpen) break;
			e += n.Increase;
		}
		return e;
	}
	IsResonanceFullyUnLock() {
		var e = this.GetRoleConfig().ResonanceId;
		for (const n of ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
			e,
		))
			if (!this.GetResonance(n.Id)?.IsOpen) return !1;
		return !0;
	}
}
exports.RoleResonanceData = RoleResonanceData;
