"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ItemTipsModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.mPt = void 0);
	}
	SetCurrentItemTipsData(e) {
		this.mPt = e;
	}
	GetCurrentItemTipsData() {
		return this.mPt;
	}
}
exports.ItemTipsModel = ItemTipsModel;
