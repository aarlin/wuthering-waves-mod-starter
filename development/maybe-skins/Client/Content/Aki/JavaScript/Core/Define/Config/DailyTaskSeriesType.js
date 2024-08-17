"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyTaskSeriesType = void 0);
class DailyTaskSeriesType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get SeriesType() {
		return this.seriestype();
	}
	__init(e, s) {
		return (this.z7 = e), (this.J7 = s), this;
	}
	static getRootAsDailyTaskSeriesType(e, s) {
		return (s || new DailyTaskSeriesType()).__init(
			e.readInt32(e.position()) + e.position(),
			e,
		);
	}
	seriestype() {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.readInt32(this.z7 + e) : 0;
	}
}
exports.DailyTaskSeriesType = DailyTaskSeriesType;
//# sourceMappingURL=DailyTaskSeriesType.js.map
