"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreCountryData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ExploreAreaData_1 = require("./ExploreAreaData");
class ExploreCountryData {
	constructor() {
		(this.CountryId = 0),
			(this.W5t = ""),
			(this.Q5t = new Map()),
			(this.X5t = []);
	}
	Initialize(t) {
		(this.CountryId = t.Id), (this.W5t = t.Title);
	}
	AddExploreAreaData(t) {
		var e = t.AreaId,
			r = new ExploreAreaData_1.ExploreAreaData();
		r.Initialize(t),
			this.Q5t.set(e, r),
			this.X5t.push(r),
			(t =
				ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreProgressConfigListByArea(
					e,
				));
		for (const e of t) r.AddExploreAreaItemData(e);
		return r.SortExploreAreaItemDataList(), r;
	}
	GetExploreAreaData(t) {
		return this.Q5t.get(t);
	}
	GetExploreAreaDataMap() {
		return this.Q5t;
	}
	GetExploreAreaDataList() {
		return this.X5t;
	}
	GetAreaSize() {
		return this.Q5t.size;
	}
	GetNameId() {
		return this.W5t;
	}
	GetCountryExploreProgress() {
		var t = 100 * this.X5t.length;
		let e = 0;
		for (const t of this.X5t) e += t.GetProgress();
		return e / t;
	}
}
exports.ExploreCountryData = ExploreCountryData;
