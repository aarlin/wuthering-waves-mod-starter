"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectEnvironment = void 0);
const Info_1 = require("../Common/Info");
class EffectEnvironment {
	static Initialize() {
		this.UseLog = Info_1.Info.IsBuildDevelopmentOrDebug;
	}
	static Tick(t, n) {
		this.GameTimeInSeconds += 0.001 * t;
	}
}
((exports.EffectEnvironment = EffectEnvironment).GameTimeInSeconds = 0),
	(EffectEnvironment.GlobalTimeScale = 1),
	(EffectEnvironment.UseLog = !0),
	(EffectEnvironment.DisableOtherEffect = !1),
	(EffectEnvironment.UsePool = !0),
	(EffectEnvironment.EffectQualityBiasRemote = -1);
//# sourceMappingURL=EffectEnvironment.js.map
