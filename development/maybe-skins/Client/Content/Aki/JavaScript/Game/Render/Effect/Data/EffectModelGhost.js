"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelGhost extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.MaterialRef = void 0),
			(this.Mesh = void 0),
			(this.MeshComponentsToUse = new UE.TArray()),
			(this.CustomComponentNames = new UE.TArray()),
			(this.AlphaCurve = void 0);
	}
}
exports.default = EffectModelGhost;
