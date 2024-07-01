"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotTest = void 0);
const RedDotBase_1 = require("../RedDotBase");
class RedDotTest extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [];
	}
	OnCheck() {
		return !0;
	}
}
exports.RedDotTest = RedDotTest;
