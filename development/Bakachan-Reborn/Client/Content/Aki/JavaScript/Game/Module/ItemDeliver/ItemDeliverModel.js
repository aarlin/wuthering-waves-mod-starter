"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemDeliverModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ItemDeliverModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this._Ci = void 0);
	}
	OnClear() {
		return !(this._Ci = void 0);
	}
	SetItemDeliverData(e) {
		this._Ci = e;
	}
	GetItemDeliverData() {
		return this._Ci;
	}
}
exports.ItemDeliverModel = ItemDeliverModel;
