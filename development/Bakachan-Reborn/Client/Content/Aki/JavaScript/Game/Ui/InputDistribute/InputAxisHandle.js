"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputAxisHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputAxisHandle extends InputDistributeHandle_1.InputDistributeHandle {
	constructor() {
		super(...arguments), (this.Ocr = 0);
	}
	BindAxis(t) {
		this.Bind(t);
	}
	UnBindAxis(t) {
		this.UnBind(t);
	}
	InputAxis(t) {
		this.InputCacheAxisValue(t), this.Call(t);
	}
	InputCacheAxisValue(t) {
		this.Ocr = t;
	}
	GetCacheAxisValue() {
		return this.Ocr;
	}
}
exports.InputAxisHandle = InputAxisHandle;
