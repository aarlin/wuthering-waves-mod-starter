"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickIntervalUtils = void 0);
const MathUtils_1 = require("./MathUtils");
class Config {
	constructor(t, i, e, s, n) {
		(this.TickPerFrameThreshold = t),
			(this.TickFramePeriod = i),
			(this.TickPerFrameThresholdRadio = e),
			(this.TickFramePeriodRatio = s),
			(this.MaxInterval = n);
	}
	GetScore(t, i) {
		return Math.min(
			this.MaxInterval,
			Math.max(0, t - this.TickPerFrameThreshold) / this.TickFramePeriod +
				Math.max(0, i - this.TickPerFrameThresholdRadio) /
					this.TickFramePeriodRatio,
		);
	}
}
const MAX_INTERVAL = 60,
	characterConfig = new Config(
		5e3,
		5e3,
		75 * MathUtils_1.MathUtils.DegToRad,
		10 * MathUtils_1.MathUtils.DegToRad,
		MAX_INTERVAL,
	),
	commonNpcConfig = new Config(
		5e3,
		5e3,
		75 * MathUtils_1.MathUtils.DegToRad,
		10 * MathUtils_1.MathUtils.DegToRad,
		MAX_INTERVAL,
	),
	simpleNpcConfig = new Config(
		5e3,
		3500,
		75 * MathUtils_1.MathUtils.DegToRad,
		10 * MathUtils_1.MathUtils.DegToRad,
		MAX_INTERVAL,
	),
	sceneItemConfig = new Config(
		1500,
		1e3,
		75 * MathUtils_1.MathUtils.DegToRad,
		10 * MathUtils_1.MathUtils.DegToRad,
		MAX_INTERVAL,
	);
class TickIntervalUtils {
	static Wz(t, i, e) {
		if (t < e.TickPerFrameThreshold && i < e.TickPerFrameThresholdRadio)
			return 0;
		let s = 1,
			n =
				(t > e.TickPerFrameThreshold &&
					((s = 1 + (t - e.TickPerFrameThreshold) / e.TickFramePeriod),
					(s *= s)),
				1);
		return (
			i > e.TickPerFrameThresholdRadio &&
				((n = 1 + (i - e.TickPerFrameThresholdRadio) / e.TickFramePeriodRatio),
				(n *= n)),
			Math.min(s * n, e.MaxInterval)
		);
	}
	static GetCharacterTickInterval(t, i) {
		return this.Wz(t, i, characterConfig);
	}
	static GetCommonNpcTickInterval(t, i) {
		return this.Wz(t, i, commonNpcConfig);
	}
	static GetSimpleNpcTickInterval(t, i) {
		return this.Wz(t, i, simpleNpcConfig);
	}
	static GetSceneItemTickInterval(t, i) {
		return this.Wz(t, i, sceneItemConfig);
	}
}
exports.TickIntervalUtils = TickIntervalUtils;
//# sourceMappingURL=TickIntervalUtils.js.map
