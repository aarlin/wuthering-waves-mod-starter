"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonCurrencyItemListComponent = void 0);
const CommonCurrencyItem_1 = require("./CommonCurrencyItem");
class CommonCurrencyItemListComponent {
	constructor(t) {
		(this.LIt = void 0), (this.DIt = void 0), (this.DIt = t);
	}
	async SetCurrencyItemList(t) {
		let e;
		this.LIt || (this.LIt = new Array());
		var o = [];
		for (let e = this.LIt.length; e < t.length; e++) {
			const t = new CommonCurrencyItem_1.CommonCurrencyItem();
			this.LIt.push(t);
			var n = t.CreateThenShowByResourceIdAsync(
				"UIItem_CommonCurrencyItem",
				this.DIt,
			);
			o.push(n);
		}
		await Promise.all(o);
		for (let e = 0; e < t.length; e++) {
			const o = this.LIt[e];
			o.RefreshTemp(t[e]), o.SetActive(!0), o.SetPayShopButtonActive();
		}
		for (let o = t.length; o < this.LIt.length; o++)
			(e = this.LIt[o]).SetActive(!1);
	}
	GetCurrencyItemList() {
		return this.LIt;
	}
}
exports.CommonCurrencyItemListComponent = CommonCurrencyItemListComponent;
