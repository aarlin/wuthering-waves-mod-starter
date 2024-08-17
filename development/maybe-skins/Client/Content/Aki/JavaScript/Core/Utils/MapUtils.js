"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapUtils = void 0);
class MapUtils {
	static ForEach(t, e) {
		var a = t.Num();
		for (let s = 0; s < a; s++) {
			var r = t.GetKey(s);
			e(t.GetKey(s), t.Get(r));
		}
	}
}
exports.MapUtils = MapUtils;
//# sourceMappingURL=MapUtils.js.map
