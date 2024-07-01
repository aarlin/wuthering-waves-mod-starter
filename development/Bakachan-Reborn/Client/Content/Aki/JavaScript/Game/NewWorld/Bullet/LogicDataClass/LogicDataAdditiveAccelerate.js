"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataAdditiveAccelerate extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Acceleration = void 0),
			(this.AccelerationCurve = void 0);
	}
}
exports.default = LogicDataAdditiveAccelerate;
