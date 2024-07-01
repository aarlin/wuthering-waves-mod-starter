"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataRebound extends LogicDataBase_1.default {
	constructor() {
		super(...arguments),
			(this.BulletRowName = void 0),
			(this.EffectRebound = void 0),
			(this.PositionOffset = void 0),
			(this.RotationOffset = void 0),
			(this.ScreenShake = void 0),
			(this.CameraModified = void 0),
			(this.ReboundBitMask = 0);
	}
}
exports.default = LogicDataRebound;
