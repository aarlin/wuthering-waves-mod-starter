"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelBillboard extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.IsUpdateEveryFrame = !0),
			(this.OrientAxis = 0),
			(this.IsFixSize = !1),
			(this.ScaleSize = -0),
			(this.MaxDistance = -0),
			(this.MinSize = -0);
	}
}
exports.default = EffectModelBillboard;
