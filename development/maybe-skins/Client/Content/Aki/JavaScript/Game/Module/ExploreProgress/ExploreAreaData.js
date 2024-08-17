"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreAreaData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ExploreAreaItemData_1 = require("./ExploreAreaItemData");
class ExploreAreaData {
	constructor() {
		(this.AreaId = 0),
			(this.V5t = 0),
			(this.H5t = new Map()),
			(this.j5t = []),
			(this.W5t = ""),
			(this.K5t = 0);
	}
	Initialize(e) {
		(this.AreaId = e.AreaId),
			(this.W5t = e.Title),
			(this.K5t = e.SortIndex),
			(this.V5t = 0);
	}
	Clear() {
		(this.AreaId = 0), (this.V5t = 0), this.H5t.clear();
	}
	AddExploreAreaItemData(e) {
		var t,
			r = e.ExploreType;
		this.H5t.has(r) ||
			((t = new ExploreAreaItemData_1.ExploreAreaItemData()).Initialize(e),
			this.H5t.set(r, t),
			this.j5t.push(t));
	}
	SortExploreAreaItemDataList() {
		this.j5t.sort((e, t) => {
			var r = e.SortIndex,
				a = t.SortIndex;
			return r !== a ? r - a : e.ExploreProgressId - t.ExploreProgressId;
		});
	}
	Refresh(e) {
		this.V5t = e.lLs;
		var t = ConfigManager_1.ConfigManager.ExploreProgressConfig;
		for (const a of e.e5n) {
			var r = t.GetExploreProgressConfigById(a._Ls).ExploreType;
			this.H5t.get(r)?.Refresh(a);
		}
	}
	GetExploreAreaItemData(e) {
		return this.H5t.get(e);
	}
	GetAllExploreAreaItemData() {
		return this.j5t;
	}
	GetProgress() {
		return this.V5t;
	}
	GetNameId() {
		return this.W5t;
	}
	GetSortIndex() {
		return this.K5t;
	}
}
exports.ExploreAreaData = ExploreAreaData;
