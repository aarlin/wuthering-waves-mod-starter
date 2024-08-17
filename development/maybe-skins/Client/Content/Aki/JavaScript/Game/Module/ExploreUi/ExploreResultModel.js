"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreResultModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ExploreResultModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.fVt = 0),
			(this.pVt = ""),
			(this.vVt = ""),
			(this.MVt = ""),
			(this.SVt = ""),
			(this.EVt = ""),
			(this.yVt = void 0),
			(this.IVt = void 0),
			(this.TVt = void 0),
			(this.LVt = void 0);
	}
	ResetFailData() {
		(this.fVt = 0),
			(this.pVt = ""),
			(this.yVt = void 0),
			(this.IVt = void 0),
			(this.TVt = void 0),
			(this.vVt = ""),
			(this.SVt = ""),
			(this.EVt = ""),
			(this.MVt = ""),
			(this.LVt = void 0);
	}
	SetLeftBtnData(t, e) {
		(this.yVt = t), (this.vVt = e);
	}
	SetRightBtnData(t, e) {
		(this.TVt = t), (this.MVt = e);
	}
	SetMiddleBtnData(t, e, i) {
		(this.IVt = t), (this.SVt = e), (this.EVt = i);
	}
	SetScore(t) {
		this.fVt = t;
	}
	SetMiddleDesc(t) {
		this.pVt = t;
	}
	SetShowRewards(t) {
		this.LVt = t;
	}
	SetData(t, e, i, s, h, V, r, o) {
		this.ResetFailData(),
			(this.yVt = t),
			(this.IVt = e),
			(this.fVt = i),
			(this.pVt = s),
			(this.vVt = h),
			(this.SVt = V),
			(this.EVt = r),
			(this.LVt = o);
	}
	GetFailScore() {
		return this.fVt;
	}
	GetMiddleDesc() {
		return this.pVt;
	}
	GetLeftBtnClickFunction() {
		return this.yVt;
	}
	GetRightBtnClickFunction() {
		return this.TVt;
	}
	GetMiddleBtnClickFunction() {
		return this.IVt;
	}
	GetLeftText() {
		return this.vVt;
	}
	GetRightText() {
		return this.MVt;
	}
	GetMiddleText() {
		return this.SVt;
	}
	GetMiddleDownText() {
		return this.EVt;
	}
	GetShowItems() {
		return this.LVt;
	}
}
exports.ExploreResultModel = ExploreResultModel;
