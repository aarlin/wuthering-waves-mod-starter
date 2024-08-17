"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SortResultData = exports.SortViewData = void 0);
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class SortViewData {
	constructor(t, e) {
		(this.ConfigId = t), (this.ConfirmFunction = e);
	}
}
exports.SortViewData = SortViewData;
class SortResultData {
	constructor() {
		(this.Mne = 0), (this.cRt = void 0), (this.mRt = void 0), (this.dRt = !1);
	}
	SetConfigId(t) {
		this.Mne = t;
	}
	SetSelectBaseSort(t) {
		this.cRt = t;
	}
	SetSelectAttributeSort(t) {
		this.mRt = t;
	}
	GetSelectBaseSort() {
		return this.cRt;
	}
	GetSelectAttributeSort() {
		return this.mRt;
	}
	SetIsAscending(t) {
		this.dRt = t;
	}
	GetIsAscending() {
		return this.dRt;
	}
	GetAllSelectRuleSet() {
		var t = new Set(),
			e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
		for (const r of e.FrontSortList) t.add(r);
		if ((t.add(this.cRt[0]), this.mRt))
			for (const e of this.mRt.keys()) t.add(e);
		for (const r of e.LastSortList) t.add(r);
		return t;
	}
	ShowAllSortContent() {
		var t = new StringBuilder_1.StringBuilder();
		if ((t.Append(this.cRt[1]), t.Append(","), this.mRt))
			for (const e of this.mRt.values()) t.Append(e), t.Append(",");
		return t.RemoveLast(1), t.ToString();
	}
}
exports.SortResultData = SortResultData;
