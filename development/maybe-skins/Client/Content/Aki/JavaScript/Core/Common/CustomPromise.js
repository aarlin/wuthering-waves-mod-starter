"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomPromise = void 0);
class CustomPromise {
	constructor() {
		(this.d8 = void 0),
			(this.C8 = 0),
			(this.g8 = new Promise((s) => {
				this.d8 = s;
			}));
	}
	get Promise() {
		return this.g8;
	}
	SetResult(s) {
		(this.C8 = 1), this.d8(s);
	}
	IsFulfilled() {
		return 1 === this.C8;
	}
	IsPending() {
		return 0 === this.C8;
	}
}
exports.CustomPromise = CustomPromise;
//# sourceMappingURL=CustomPromise.js.map
