"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	FilterLogic_1 = require("../Logic/FilterLogic");
class FilterModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.tLt = new Map()),
			(this.iLt = new FilterLogic_1.FilterLogic());
	}
	SetFilterResultData(e, t) {
		this.tLt.set(e, t);
	}
	DeleteFilterResultData(e) {
		this.tLt.delete(e);
	}
	GetFilterResultData(e) {
		return this.tLt.get(e);
	}
	ClearData(e) {
		this.tLt.get(e)?.ClearSelectRuleData();
	}
	GetFilterList(e, t, i, r) {
		return this.iLt.GetFilterList(e, t, i, r);
	}
	GetFilterItemDataList(e, t) {
		return this.iLt.GetFilterItemDataList(e, t);
	}
	UpdateFilterData(e, t) {
		this.GetFilterResultData(e).SetRuleData(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFilterDataUpdate,
				e,
			);
	}
}
exports.FilterModel = FilterModel;
