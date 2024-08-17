"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelDecal extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.DecalMaterialRef = void 0),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.Scale = void 0),
			(this.ZfadingFactor = 4),
			(this.ZfadingPower = 1),
			(this.MaterialFloatParameters = void 0),
			(this.MaterialColorParameters = void 0);
	}
}
exports.default = EffectModelDecal;
