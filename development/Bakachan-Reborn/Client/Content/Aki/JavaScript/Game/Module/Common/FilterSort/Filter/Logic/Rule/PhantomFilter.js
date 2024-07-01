"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class PhantomFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.GetPhantomItemId = (t) => t.MonsterId),
			(this.GetPhantomRarity = (t) => t.Rarity);
	}
	OnInitFilterMap() {
		this.FilterMap.set(3, this.GetPhantomItemId),
			this.FilterMap.set(14, this.GetPhantomRarity),
			this.FilterMap.set(18, this.GetPhantomItemId),
			this.FilterMap.set(19, this.GetPhantomItemId),
			this.FilterMap.set(20, this.GetPhantomItemId),
			this.FilterMap.set(21, this.GetPhantomItemId);
	}
}
exports.PhantomFilter = PhantomFilter;
