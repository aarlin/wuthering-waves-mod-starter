"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridAbstract = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData"),
	WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ItemGridAbstract extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0, e = void 0, r = void 0) {
		super(),
			(this.$0t = void 0),
			(this.gIt = 0),
			(this.rAt = 0),
			(this.RIt = 0),
			(this.xIt = void 0),
			(this.wqe = e),
			this.SetBelongViewName(r),
			t && this.CreateThenShowByActor(t);
	}
	GetItemConfig() {
		return this.wqe ? this.wqe.GetItemConfig() : this.$0t;
	}
	GetItemId() {
		return this.wqe ? this.wqe.GetItemId() : this.gIt;
	}
	GetBelongView() {
		return this.wqe ? this.wqe.GetBelongView() : this.xIt;
	}
	Refresh(t, e, r) {
		var i = t[0];
		this.RefreshByItemId(i.ItemId), (this.rAt = t[1]), (this.RIt = i.IncId);
	}
	RefreshByItemId(t) {
		(this.gIt = t),
			(this.$0t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
			this.nAt(this) &&
				(this.RefreshQualitySprite(), this.RefreshTextureIcon());
	}
	ShowDefaultDownText() {
		this.nAt(this) && this.RefreshTextDown(!0, this.GetDefaultDownText());
	}
	GetDefaultDownText() {
		var t,
			e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
				this.RIt,
			);
		if (
			!(
				1 < this.rAt ||
				StringUtils_1.StringUtils.IsEmpty(e?.GetDefaultDownText())
			)
		) {
			if (e instanceof PhantomItemData_1.PhantomItemData)
				return (
					(t =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							this.RIt,
						).GetPhantomLevel()),
					StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString())
				);
			if (e instanceof WeaponItemData_1.WeaponItemData)
				return (
					(t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						this.RIt,
					).GetLevel()),
					StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString())
				);
		}
		return this.rAt.toString();
	}
	nAt(t) {
		return !0 === t.IsItemGrid;
	}
	SetBelongViewName(t) {
		this.xIt = t;
	}
}
exports.ItemGridAbstract = ItemGridAbstract;
