"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCalabashAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiCalabashAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
	constructor(t, s) {
		super(), (this.Socket = t), (this.IsRotate = s);
	}
	IsEqual(t) {
		return (
			t instanceof UiCalabashAnsContext && this.Socket.op_Equality(t.Socket)
		);
	}
}
exports.UiCalabashAnsContext = UiCalabashAnsContext;
