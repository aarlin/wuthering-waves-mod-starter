"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelSkeletalMesh extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.SkeletalMeshRef = void 0),
			(this.AnimationRef = void 0),
			(this.Looping = !0),
			(this.Playing = !0),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.Scale = void 0),
			(this.EnableCollision = !1),
			(this.HideFrames = 1),
			(this.CastShadow = !0);
	}
}
exports.default = EffectModelSkeletalMesh;
