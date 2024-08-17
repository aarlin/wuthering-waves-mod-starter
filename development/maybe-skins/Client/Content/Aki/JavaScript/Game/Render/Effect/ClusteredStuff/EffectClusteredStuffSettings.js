"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectClusteredStuffSettings extends UE.PrimaryDataAsset {
	constructor() {
		super(...arguments),
			(this.EffectDataRef = void 0),
			(this.DensityChangeSpeed = -0),
			(this.AttachToActor = !0),
			(this.AbsoluteWorldPosition = void 0);
	}
}
exports.default = EffectClusteredStuffSettings;
