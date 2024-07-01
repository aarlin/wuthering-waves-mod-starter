"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataFreeze extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Target = 0),
			(this.Tags = void 0),
			(this.FreezeTime = -0);
	}
}
exports.default = LogicDataFreeze;
