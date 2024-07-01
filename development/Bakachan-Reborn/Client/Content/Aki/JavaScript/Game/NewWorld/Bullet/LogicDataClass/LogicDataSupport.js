"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSupport extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Tag = void 0),
			(this.Camp = 0),
			(this.Effect = void 0);
	}
}
exports.default = LogicDataSupport;
