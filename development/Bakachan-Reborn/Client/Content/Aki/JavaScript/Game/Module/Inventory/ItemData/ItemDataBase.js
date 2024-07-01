"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemDataBase = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class ItemDataBase {
	constructor(t, e, n) {
		(this.LastCount = 0),
			(this.ConfigId = t),
			(this.Count = e),
			(this.ItemDataType = n);
	}
	GetConfigId() {
		return this.ConfigId;
	}
	GetUniqueId() {
		return 0;
	}
	SetCount(t) {
		(this.LastCount = this.Count), (this.Count = t);
	}
	GetCount() {
		return this.Count;
	}
	GetLastCount() {
		return this.LastCount;
	}
	GetItemDataType() {
		return this.ItemDataType;
	}
	GetItemTypeConfig() {
		var t = this.GetType();
		if (t)
			return ConfigManager_1.ConfigManager.InventoryConfig.GetItemTypeConfig(t);
	}
	CanLock() {
		var t = this.GetItemTypeConfig();
		return !!t && t.Lock;
	}
	GetQualityConfig() {
		var t = this.GetQuality();
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
			t,
		);
	}
	GetIsLock() {
		return !1;
	}
}
exports.ItemDataBase = ItemDataBase;
