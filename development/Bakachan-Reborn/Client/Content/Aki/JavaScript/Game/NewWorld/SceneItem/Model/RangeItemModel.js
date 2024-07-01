"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RangeItemModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class RangeItemModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Hnr = void 0);
	}
	OnInit() {
		return (this.Hnr = new Map()), !0;
	}
	AddBoxRange(e, o) {
		this.Hnr.has(e) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"SceneGameplay",
				30,
				"[RangeItemModel] Box Range Id 重复",
				["BoxRangeItem", o.GetName()],
			),
			this.Hnr.set(e, o);
	}
	RemoveBoxRange(e) {
		this.Hnr.delete(e);
	}
	GetBoxRange(e) {
		return this.Hnr.get(e);
	}
	OnClear() {
		return !(this.Hnr = void 0);
	}
}
exports.RangeItemModel = RangeItemModel;
