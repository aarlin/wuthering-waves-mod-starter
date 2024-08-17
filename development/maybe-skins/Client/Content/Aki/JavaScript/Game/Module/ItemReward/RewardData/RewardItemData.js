"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardItemData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class RewardItemData {
	constructor(t, e, o) {
		(this.CYt = void 0),
			(this.Fgi = 0),
			(this.FAt = 0),
			(this.ConfigId = t),
			(this.Count = e),
			(this.UniqueId = o),
			(e = ConfigManager_1.ConfigManager.InventoryConfig),
			(this.Lo = e.GetItemConfigData(t)),
			this.Lo
				? ((this.CYt = e.GetItemTypeConfig(this.Lo.ItemType)),
					(this.Fgi = this.CYt.SortIndex),
					(this.FAt = this.Lo.QualityId))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RewardItem",
						8,
						"生成奖励物品数据时，没有在d.道具中找到",
						["configId", t],
					);
	}
	GetConfig() {
		return this.Lo;
	}
	GetTypeSortIndex() {
		return this.Fgi;
	}
	GetQualityId() {
		return this.FAt;
	}
}
exports.RewardItemData = RewardItemData;
