"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSpeedReduce extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.SpeedDampingRatio = -0),
			(this.IsNotThroughObstacles = !1),
			(this.MinSpeed = -0);
	}
}
exports.default = LogicDataSpeedReduce;
