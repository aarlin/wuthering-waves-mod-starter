"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemInteractionPanelItemData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class ItemInteractionPanelItemData {
	constructor(t, e) {
		(this.ItemConfigId = 0),
			(this.kAt = 0),
			(this.rAt = 0),
			(this.FAt = 0),
			(this.NeedCount = 0),
			(this.IsSelected = !1),
			(this.ItemConfigId = t.ItemConfigId),
			(this.kAt = t.CurrentCount),
			(t = t.NeedCount) && (this.NeedCount = t),
			(this.FAt = e),
			(this.rAt =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					this.ItemConfigId,
				));
	}
	SetCurrentCount(t) {
		this.kAt = t;
	}
	GetCurrentCount() {
		return this.kAt;
	}
	GetItemCount() {
		return this.rAt;
	}
	IsEnable() {
		return this.rAt >= this.NeedCount;
	}
	GetQualityId() {
		return this.FAt;
	}
}
exports.ItemInteractionPanelItemData = ItemInteractionPanelItemData;
