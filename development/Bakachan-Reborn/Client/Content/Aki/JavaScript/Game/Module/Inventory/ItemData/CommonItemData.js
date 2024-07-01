"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemData = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ItemDataBase_1 = require("./ItemDataBase");
class CommonItemData extends ItemDataBase_1.ItemDataBase {
	constructor(e, t, i, n, r) {
		super(e, i, n),
			(this.UniqueId = 0),
			(this.EndTime = 0),
			(this.UniqueId = t),
			(this.EndTime = r ?? 0);
	}
	GetConfig() {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
			this.ConfigId,
		);
	}
	GetUniqueId() {
		return this.UniqueId;
	}
	GetMainType() {
		var e = this.GetConfig();
		if (e) return e.MainTypeId;
	}
	GetType() {
		var e = this.GetConfig();
		if (e) return e.ItemType;
	}
	GetMaxStackCount() {
		var e = this.GetConfig();
		return e ? e.MaxStackableNum : 0;
	}
	GetQuality() {
		return this.GetConfig()?.QualityId;
	}
	GetSortIndex() {
		return this.GetConfig()?.SortIndex;
	}
	GetItemAccess() {
		return this.GetConfig()?.ItemAccess;
	}
	GetShowTypeList() {
		return this.GetConfig()?.ShowTypes;
	}
	GetUseCountLimit() {
		return this.GetConfig().UseCountLimit;
	}
	GetRedDotDisableRule() {
		return this.GetConfig().RedDotDisableRule;
	}
	HasRedDot() {
		var e = this.GetConfigId();
		return ModelManager_1.ModelManager.InventoryModel.IsCommonItemHasRedDot(e);
	}
	SetEndTime(e) {
		this.EndTime = e;
	}
	IsLimitTimeItem() {
		return 0 < this.EndTime && !this.IsOverTime();
	}
	GetEndTime() {
		return this.EndTime;
	}
	IsOverTime() {
		return (
			!(this.EndTime <= 0) &&
			this.EndTime <= TimeUtil_1.TimeUtil.GetServerTimeStamp()
		);
	}
	IsValid() {
		return !this.IsOverTime();
	}
}
exports.CommonItemData = CommonItemData;
