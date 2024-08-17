"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTagAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiTagAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
	constructor(t) {
		super(), (this.TagId = t);
	}
	IsEqual(t) {
		return t instanceof UiTagAnsContext && this.TagId === t.TagId;
	}
}
exports.UiTagAnsContext = UiTagAnsContext;
