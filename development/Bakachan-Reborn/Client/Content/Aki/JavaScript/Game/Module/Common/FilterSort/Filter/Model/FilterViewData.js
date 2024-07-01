"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterResultData = exports.FilterViewData = void 0);
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
class FilterViewData {
	constructor(t, e) {
		(this.ConfigId = t), (this.ConfirmFunction = e);
	}
}
exports.FilterViewData = FilterViewData;
class FilterResultData {
	constructor() {
		(this.ConfigId = 0), (this.oLt = new Map());
	}
	SetConfigId(t) {
		this.ConfigId = t;
	}
	AddSingleRuleData(t, e, i) {
		let r = this.oLt.get(t);
		(r = r || new Map()).set(e, i), this.oLt.set(t, r);
	}
	SetSelectRuleData(t, e) {
		this.oLt.set(t, e);
	}
	SetRuleData(t) {
		this.oLt = t;
	}
	GetSelectRuleDataById(t) {
		return this.oLt.get(t);
	}
	GetSelectRuleData() {
		return this.oLt;
	}
	ClearSelectRuleData() {
		this.oLt.clear();
	}
	ShowAllFilterContent() {
		var t = new StringBuilder_1.StringBuilder();
		for (const e of this.oLt.values())
			for (const i of e.values()) t.Append(i), t.Append(",");
		return t.RemoveLast(1), t.ToString();
	}
}
exports.FilterResultData = FilterResultData;
