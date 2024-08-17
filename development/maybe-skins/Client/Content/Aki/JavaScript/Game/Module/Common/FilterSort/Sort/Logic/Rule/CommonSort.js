"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSort = void 0);
class CommonSort {
	constructor() {
		(this.gU = !1), (this.SortMap = new Map());
	}
	InitSortMap() {
		this.gU || ((this.gU = !0), this.OnInitSortMap());
	}
	GetSortFunctionByRuleId(t) {
		return this.SortMap.get(t);
	}
}
exports.CommonSort = CommonSort;
