"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ShopDefine_1 = require("./ShopDefine"),
	ShopItemFullInfo_1 = require("./SubViews/ShopItemFullInfo");
class ShopModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.OpenItemInfo = void 0),
			(this.Cvo = void 0),
			(this.Qre = ""),
			(this.InteractTarget = 0),
			(this.CurrentInteractCreatureDataLongId = void 0);
	}
	get VersionId() {
		return this.Qre;
	}
	set VersionId(e) {
		this.Qre = e;
	}
	OnInit() {
		return (this.Cvo = new Map()), !0;
	}
	GetShopInfo(e) {
		return this.Cvo.get(e);
	}
	GetShopItem(e, t) {
		if ((e = this.GetShopInfo(e))) return e.GetItemInfo(t);
	}
	GetShopConfig(e) {
		return ConfigManager_1.ConfigManager.ShopConfig.GetShopInfoConfig(e);
	}
	UpdateShopListData(e) {
		for (const t of e) this.UpdateShopData(t);
	}
	UpdateShopData(e) {
		let t = this.GetShopInfo(e.CVn);
		t
			? (t.UpdateRefreshTime(e.eAs), t.UpdateShopItemList(e.Dxs))
			: ((t = new ShopDefine_1.Shop(e)), this.Cvo.set(e.CVn, t)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ShopUpdate,
				e.CVn,
			);
	}
	UpdateItemData(e) {
		var t = this.GetShopItem(e.CVn, e.Ekn);
		t && (t.s8n = e.s8n);
	}
	IsOpen(e) {
		return (
			!!(e = this.GetShopConfig(e)) &&
			ModelManager_1.ModelManager.FunctionModel.IsOpen(e.OpenId)
		);
	}
	GetShopItemList(e) {
		this.GetShopInfo(e);
		var t = this.GetShopInfo(e),
			o = [];
		if (t) {
			for (var [, n] of t.GetItemList()) {
				var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					n.G3n,
					!0,
				);
				r &&
					((r = new ShopItemFullInfo_1.ShopItemFullInfo(r, n, e)), o.push(r));
			}
			o.sort((e, t) =>
				e.IsInteractive() !== t.IsInteractive()
					? e.IsInteractive()
						? -1
						: 1
					: e.IsUnlocked() !== t.IsUnlocked()
						? e.IsUnlocked()
							? 1
							: -1
						: e.IsOutOfStock() !== t.IsOutOfStock()
							? e.IsOutOfStock()
								? 1
								: -1
							: e.Id <= t.Id
								? -1
								: 1,
			);
		}
		return o;
	}
	GetShopItemFullInfoByShopIdAndItemId(e, t) {
		for (const o of this.GetShopItemList(e)) if (o.Id === t) return o;
	}
}
exports.ShopModel = ShopModel;
