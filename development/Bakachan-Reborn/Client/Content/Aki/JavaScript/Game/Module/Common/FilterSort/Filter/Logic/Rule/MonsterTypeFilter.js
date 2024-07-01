"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterTypeFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class MonsterTypeFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments), (this.YTt = (e) => e.Conf.TypeDescription2);
	}
	OnInitFilterMap() {
		this.FilterMap.set(7, this.YTt);
	}
}
exports.MonsterTypeFilter = MonsterTypeFilter;
