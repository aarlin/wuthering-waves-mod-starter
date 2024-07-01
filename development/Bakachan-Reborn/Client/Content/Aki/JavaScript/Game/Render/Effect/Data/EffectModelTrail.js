"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelTrail extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.AttachToBones = !0),
			(this.AttachBoneNames = void 0),
			(this.RelativeLocations = void 0),
			(this.LocationsCurve = void 0),
			(this.Material = void 0),
			(this.UnitLength = 0),
			(this.DissipateSpeed = void 0),
			(this.Alpha = void 0),
			(this.FloatParameters = void 0),
			(this.ColorParameters = void 0),
			(this.DestroyAtOnce = !1),
			(this.DissipateSpeedAfterDead = 0);
	}
}
exports.default = EffectModelTrail;
