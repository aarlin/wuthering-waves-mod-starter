"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputActionHandle = void 0);
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputActionHandle extends InputDistributeHandle_1.InputDistributeHandle {
	BindAction(t) {
		this.Bind(t);
	}
	UnBindAction(t) {
		this.UnBind(t);
	}
	InputAction(t) {
		t ? this.Call(0) : this.Call(1);
	}
}
exports.InputActionHandle = InputActionHandle;
