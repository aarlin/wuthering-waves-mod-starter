"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelMultiEffect extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.EffectData = void 0),
			(this.Type = 0),
			(this.BaseNum = 0),
			(this.SpinSpeed = -0),
			(this.Radius = -0);
	}
}
exports.default = EffectModelMultiEffect;
