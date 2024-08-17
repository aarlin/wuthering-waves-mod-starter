"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataShakeScreen extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Count = 0),
			(this.Epicenter = ""),
			(this.Falloff = 0),
			(this.InnerRadius = 0),
			(this.Interval = 0),
			(this.OrientShakeTowardsEpicenter = !1),
			(this.OuterRadius = 0),
			(this.Shake = void 0);
	}
}
exports.default = LogicDataShakeScreen;
