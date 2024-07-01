"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkeletalObserverManager = void 0);
const SkeletalObserverHandle_1 = require("./SkeletalObserverHandle");
class SkeletalObserverManager {
	static NewSkeletalObserver(e) {
		var r = new SkeletalObserverHandle_1.SkeletalObserverHandle();
		return r.CreateSkeletalObserverHandle(e), this.CSo.push(r), r;
	}
	static DestroySkeletalObserver(e) {
		var r = this.CSo.indexOf(e);
		r < 0 || (e.ResetSkeletalObserverHandle(), this.CSo.splice(r, 1));
	}
	static ClearAllSkeletalObserver() {
		for (const e of this.CSo) e.ResetSkeletalObserverHandle();
		this.CSo.length = 0;
	}
	static GetLastSkeletalObserver() {
		var e = this.CSo.length - 1;
		if (!(e < 0)) return this.CSo[e];
	}
}
(exports.SkeletalObserverManager = SkeletalObserverManager).CSo = [];
