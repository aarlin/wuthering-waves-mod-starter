"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataWhirlpool extends LogicDataBase_1.default {
	constructor() {
		super(...arguments), (this.MoveTime = 0), (this.WeightLimit = 0);
	}
}
exports.default = LogicDataWhirlpool;
