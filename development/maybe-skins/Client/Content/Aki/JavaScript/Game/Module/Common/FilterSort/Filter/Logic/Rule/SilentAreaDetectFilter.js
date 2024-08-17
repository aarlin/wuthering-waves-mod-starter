"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaDetectFilter = void 0);
const CommonFilter_1 = require("./CommonFilter");
class SilentAreaDetectFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.zTt = (e) =>
				e.SilentAreaDetectionData
					? e.SilentAreaDetectionData.Conf.Secondary
					: e.SilentAreaTitleData.TypeDescription);
	}
	OnInitFilterMap() {
		this.FilterMap.set(8, this.zTt);
	}
}
exports.SilentAreaDetectFilter = SilentAreaDetectFilter;
