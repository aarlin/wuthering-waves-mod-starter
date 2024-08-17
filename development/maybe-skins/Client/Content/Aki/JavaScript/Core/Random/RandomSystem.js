"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../Common/Log");
class RandomSystem {
	static HY() {
		return Math.random() * this.RAND_MAX;
	}
	static GetRandomInteger() {
		return this.HY();
	}
	static GetRandomPercent() {
		return Math.random() * this.RAND_PERCENT;
	}
	static Czs(e) {
		return (e = (e = (e ^= e << 13) ^ (e >> 17)) ^ (e << 5));
	}
	static GetNextRandomSeed(e, t) {
		var a = RandomSystem.Czs(e);
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"GetNextRandomSeed",
					["seed", e],
					["newSeed", a],
					["reason", t],
				),
			a
		);
	}
	static IterateRandomSeed(e, t) {
		var a = RandomSystem.Czs(e);
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"IterateRandomSeed",
					["seed", e],
					["newSeed", a],
					["reason", t],
				),
			a
		);
	}
}
(RandomSystem.RAND_MAX = 2147483647),
	(RandomSystem.RAND_PERCENT = 1e4),
	(exports.default = RandomSystem);
//# sourceMappingURL=RandomSystem.js.map
