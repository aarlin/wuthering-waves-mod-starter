"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataForce extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.ForceBase = -0),
			(this.ForceDampingRatio = -0),
			(this.InnerRadius = -0),
			(this.OuterRadius = -0),
			(this.LimitWeight = 0),
			(this.ConstantForce = !1),
			(this.TowardsBullet = !1),
			(this.HaveTopArea = !1),
			(this.TopAreaHeight = 0),
			(this.ContinueTime = 0),
			(this.ContinueTimeCurve = void 0),
			(this.IsLaunching = !1),
			(this.WorkHaveTag = void 0),
			(this.IsResetOnLast = !1),
			(this.Group = 0);
	}
}
exports.default = LogicDataForce;
