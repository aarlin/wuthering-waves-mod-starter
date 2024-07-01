"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputKeyHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputKeyHandle extends InputDistributeHandle_1.InputDistributeHandle {
	BindAction(e) {
		this.Bind(e);
	}
	UnBindAction(e) {
		this.UnBind(e);
	}
	InputKey(e) {
		e ? this.Call(0) : this.Call(1);
	}
}
exports.InputKeyHandle = InputKeyHandle;
