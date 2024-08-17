"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisibleStateUtil = void 0);
const trueNumber = [
		-2, -3, -5, -9, -17, -33, -65, -129, -257, -513, -1025, -2049,
	],
	falseNumber = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
class VisibleStateUtil {
	static SetVisible(e, t, i = 0) {
		return t ? e & trueNumber[i] : e | falseNumber[i];
	}
	static GetVisible(e) {
		return 0 === e;
	}
	static GetVisibleByType(e, t) {
		return 0 == (e & falseNumber[t]);
	}
}
exports.VisibleStateUtil = VisibleStateUtil;
