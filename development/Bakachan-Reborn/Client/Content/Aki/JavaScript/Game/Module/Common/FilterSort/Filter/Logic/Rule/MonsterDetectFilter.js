"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDetectFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class MonsterDetectFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.YTt = (t) => t.Conf.DangerType),
			(this.JTt = (t) => t.Conf.TypeDescription2);
	}
	OnInitFilterMap() {
		this.FilterMap.set(7, this.YTt), this.FilterMap.set(17, this.JTt);
	}
}
exports.MonsterDetectFilter = MonsterDetectFilter;
