"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttributeItemData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	ItemDataBase_1 = require("./ItemDataBase"),
	ATTRIBUTE_ITEM_DEFAULT_COUNT = 1;
class AttributeItemData extends ItemDataBase_1.ItemDataBase {
	constructor(t, e, a, r) {
		super(t, 1, r), (this.UniqueId = e), (this.Eci = a);
	}
	GetUniqueId() {
		return this.UniqueId;
	}
	SetFunctionValue(t) {
		(this.Eci = t), this.OnSetFunctionValue(t);
	}
	OnSetFunctionValue(t) {}
	IsFunctionValue(t) {
		return 0 < (this.Eci & (1 << t));
	}
	GetIsLock() {
		return this.IsFunctionValue(0);
	}
	GetDefaultDownText() {
		return "";
	}
	GetUseCountLimit() {
		return 1;
	}
	HasRedDot() {
		var t = this.GetUniqueId();
		return ModelManager_1.ModelManager.InventoryModel.IsAttributeItemHasRedDot(
			t,
		);
	}
	IsValid() {
		return !0;
	}
}
exports.AttributeItemData = AttributeItemData;
