"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class EffectModelStaticMesh extends UE.EffectModelBase {
	constructor() {
		super(...arguments),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.Scale = void 0),
			(this.StaticMeshRef = void 0),
			(this.UseMultipleMaterialSlots = !1),
			(this.MaterialOverrideRef = void 0),
			(this.MaterialOverrideArrayRef = void 0),
			(this.MaterialFloatParameters = void 0),
			(this.MaterialColorParameters = void 0),
			(this.ReceiveDecal = !1),
			(this.EnableCollision = !1),
			(this.CastShadow = !0),
			(this.TranslucencySortPriority = 0),
			(this.EnableScreenSizeCullRatioOverride = !1),
			(this.ScreenSizeCullRatio = 0.005);
	}
}
exports.default = EffectModelStaticMesh;
