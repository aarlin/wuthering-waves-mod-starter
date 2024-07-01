"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AbilityUtils = void 0);
class AbilityUtils {
	static GetLevelValue(e, t, l) {
		return e && 0 !== e.length
			? 1 <= t && t - 1 < e.length
				? e[t - 1]
				: 0 === t
					? e[0]
					: e[e.length - 1]
			: l;
	}
	static GetArrayValue(e, t, l) {
		return !e || 0 === e.length || t < 0
			? l
			: t < e.length
				? e[t]
				: e[e.length - 1];
	}
	static GetAttrValue(e, t, l) {
		if (!e) return 0;
		switch (l) {
			case 2:
				return e.GetCurrentValue(t) - e.GetBaseValue(t);
			case 1:
				return e.GetCurrentValue(t);
			default:
				return e.GetBaseValue(t);
		}
	}
}
exports.AbilityUtils = AbilityUtils;
