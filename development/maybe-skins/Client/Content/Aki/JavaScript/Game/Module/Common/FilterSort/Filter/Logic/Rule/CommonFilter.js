"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonFilter = void 0);
class CommonFilter {
	constructor() {
		(this.gU = !1), (this.FilterMap = new Map());
	}
	InitFilterMap() {
		this.gU || ((this.gU = !0), this.OnInitFilterMap());
	}
	GetFilterFunction(t) {
		return this.FilterMap.get(t);
	}
	DefaultFilterList() {
		return [];
	}
}
exports.CommonFilter = CommonFilter;
