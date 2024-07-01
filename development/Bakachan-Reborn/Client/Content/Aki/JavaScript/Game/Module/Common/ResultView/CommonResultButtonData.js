"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonResultButtonData = void 0);
class CommonResultButtonData {
	constructor() {
		(this.rBt = (t, e) => {}), (this.nBt = () => {}), (this.sBt = (t) => {});
	}
	GetButtonTimerCallBack() {
		return this.rBt;
	}
	GetButtonClickCallBack() {
		return this.nBt;
	}
	GetButtonRefreshCallBack() {
		return this.sBt;
	}
	SetTimerCallBack(t) {
		this.rBt = t;
	}
	SetClickCallBack(t) {
		this.nBt = t;
	}
	SetRefreshCallBack(t) {
		this.sBt = t;
	}
}
exports.CommonResultButtonData = CommonResultButtonData;
