"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FNameUtil = void 0);
const UE = require("ue");
class FNameUtil {
	static GetDynamicFName(e) {
		if (e) {
			let t = this.BJ.get(e);
			return t || ((t = new UE.FName(e)), this.BJ.set(e, t)), t;
		}
	}
	static IsEmpty(t) {
		return !t || t.op_Equality(this.EMPTY);
	}
	static IsNothing(t) {
		return this.IsEmpty(t) || t.op_Equality(this.NONE);
	}
}
((exports.FNameUtil = FNameUtil).EMPTY = new UE.FName("")),
	(FNameUtil.NONE = new UE.FName("None")),
	(FNameUtil.BJ = new Map());
//# sourceMappingURL=FNameUtil.js.map
