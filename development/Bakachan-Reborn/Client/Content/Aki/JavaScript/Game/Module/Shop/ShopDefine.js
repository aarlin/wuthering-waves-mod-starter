"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Shop =
		exports.SECONDS_PRE_HOUR =
		exports.SECONDS_PRE_MIN =
		exports.SECONDS_PER_DAY =
			void 0),
	(exports.SECONDS_PER_DAY = 86400),
	(exports.SECONDS_PRE_MIN = 60),
	(exports.SECONDS_PRE_HOUR = 3600);
class Shop {
	constructor(e) {
		(this.dvo = e.eAs), (this.g4e = new Map()), this.UpdateShopItemList(e.Dxs);
	}
	get UpdateTime() {
		return this.dvo;
	}
	UpdateRefreshTime(e) {
		this.dvo = e;
	}
	UpdateShopItemList(e) {
		this.g4e.clear();
		for (const t of e) this.g4e.set(t.Ekn, t);
	}
	GetItemInfo(e) {
		return this.g4e.get(e);
	}
	GetItemList() {
		return this.g4e;
	}
}
exports.Shop = Shop;
