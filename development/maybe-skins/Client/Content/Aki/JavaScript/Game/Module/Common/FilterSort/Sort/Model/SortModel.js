"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SortModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
	SortLogic_1 = require("../Logic/SortLogic");
class SortModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this._Rt = new Map()),
			(this.uRt = new SortLogic_1.SortLogic());
	}
	SetSortResultData(t, e) {
		this._Rt.set(t, e);
	}
	DeleteSortResultData(t) {
		this._Rt.delete(t);
	}
	GetSortResultData(t) {
		return this._Rt.get(t);
	}
	SortDataList(t, e, o, ...r) {
		this.uRt.SortDataList(t, e, o, ...r);
	}
	SortDataByData(t, e, o, r) {
		this.uRt.SortDataByData(t, e, o, r);
	}
}
exports.SortModel = SortModel;
