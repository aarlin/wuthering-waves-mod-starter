"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AcquireData = void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class AcquireData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments),
			(this.RGe = 0),
			(this.UGe = 0),
			(this.AGe = 0),
			(this.PGe = void 0),
			(this.xGe = void 0),
			(this.wGe = void 0),
			(this.BGe = void 0),
			(this.bGe = void 0),
			(this.qGe = void 0),
			(this.GGe = 0),
			(this.NGe = void 0);
	}
	SetAcquireViewType(t) {
		this.RGe = t;
	}
	GetAcquireViewType() {
		return this.RGe;
	}
	SetAmount(t) {
		this.UGe = t;
	}
	GetAmount() {
		return this.UGe;
	}
	SetMaxAmount(t) {
		this.AGe = t;
	}
	GetMaxAmount() {
		return this.AGe;
	}
	SetLeftButtonFunction(t) {
		this.PGe = t;
	}
	SetRightButtonFunction(t) {
		this.xGe = t;
	}
	SetMidButtonFunction(t) {
		this.wGe = t;
	}
	GetLeftButtonFunction() {
		return this.PGe;
	}
	GetRightButtonFunction() {
		return this.xGe;
	}
	GetMidButtonFunction() {
		return this.wGe;
	}
	SetItemData(t) {
		this.qGe = t;
	}
	GetItemData() {
		return this.qGe;
	}
	SetLeftButtonTextTableId(t) {
		this.BGe = t;
	}
	GetLeftButtonTextTableId() {
		return this.BGe;
	}
	SetRightButtonTextTableId(t) {
		this.bGe = t;
	}
	GetRightButtonTextTableId() {
		return this.bGe;
	}
	SetRemainItemCount(t) {
		this.GGe = t;
	}
	GetRemainItemCount() {
		return this.GGe;
	}
	SetNameText(t) {
		this.NGe = t;
	}
	GetNameText() {
		return this.NGe;
	}
}
exports.AcquireData = AcquireData;
