"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputTouchHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputTouchHandle extends InputDistributeHandle_1.InputDistributeHandle {
	BindTouch(t) {
		this.Bind(t);
	}
	UnBindTouch(t) {
		this.UnBind(t);
	}
	InputTouch(t) {
		this.Call(t);
	}
}
exports.InputTouchHandle = InputTouchHandle;
