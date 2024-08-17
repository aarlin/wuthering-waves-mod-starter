"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ueArrayToArray = exports.ObjectUtils = void 0);
const Long = require("../Define/Net/long"),
	FNameUtil_1 = require("./FNameUtil"),
	GameplayTagUtils_1 = require("./GameplayTagUtils"),
	MathUtils_1 = require("./MathUtils");
class ObjectUtils {
	static CopyValue(e, a) {
		Object.keys(e).forEach((t) => {
			void 0 !== a[t] && (a[t] = e[t]);
		});
	}
	static DeepCopyValue(e, a) {
		Object.keys(e).forEach((t) => {
			e[t] instanceof Long
				? void 0 !== a[t] && (a[t] = MathUtils_1.MathUtils.LongToBigInt(e[t]))
				: "object" == typeof e[t]
					? ObjectUtils.DeepCopyValue(e[t], a[t])
					: void 0 !== a[t] && (a[t] = e[t]);
		});
	}
	static SettingValue(t, e) {
		for (var [a, r] of t) e[a] = r;
	}
	static IsValid(t) {
		return t?.IsValid() ?? !1;
	}
	static SoftObjectPathIsValid(t) {
		return !!t && !FNameUtil_1.FNameUtil.IsNothing(t.AssetPathName);
	}
	static SoftObjectReferenceValid(t) {
		return !!t && 0 < (t = t?.ToAssetPathName())?.length && "None" !== t;
	}
	static GetGameplayTags(t) {
		var e = new Array();
		for (const r of t) {
			var a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(r);
			a && e.push(a);
		}
		return e;
	}
	static GetRandomArrayItem(e) {
		var a = e.length;
		if (0 < a) {
			let t = 0;
			return (
				1 < a &&
					((t = MathUtils_1.MathUtils.GetRandomRange(0, a)),
					(t = Math.floor(t)) === a) &&
					--t,
				e[t]
			);
		}
	}
}
function ueArrayToArray(e) {
	var a = e.Num(),
		r = [];
	for (let t = 0; t < a; t++) r.push(e.Get(t));
	return r;
}
(exports.ObjectUtils = ObjectUtils), (exports.ueArrayToArray = ueArrayToArray);
//# sourceMappingURL=ObjectUtils.js.map
