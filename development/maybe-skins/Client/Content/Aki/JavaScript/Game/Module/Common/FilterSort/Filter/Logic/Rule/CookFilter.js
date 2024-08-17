"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class CookFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.GetCookTypeList = (e) => (0 === e.MainType ? e.EffectType : 0)),
			(this.GetCookMenuList = (e) => (0 === e.MainType ? e.SubType : 0));
	}
	OnInitFilterMap() {
		this.FilterMap.set(10, this.GetCookMenuList),
			this.FilterMap.set(11, this.GetCookTypeList);
	}
}
exports.CookFilter = CookFilter;
