"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSplineMovement extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.Duration = 0),
			(this.EffectOnReach = void 0),
			(this.IsDestroyReach = !1),
			(this.IsForwardTangent = !1),
			(this.IsSummonOnReach = !1),
			(this.Rotate = 0),
			(this.Length = 0),
			(this.Height = 0),
			(this.MaxSpeed = 0),
			(this.MinSpeed = 0),
			(this.SelfHeight = 0),
			(this.SelfLength = 0),
			(this.SelfRotate = 0),
			(this.SplineTrace = void 0),
			(this.UseTargetLocation = !1);
	}
}
exports.default = LogicDataSplineMovement;
