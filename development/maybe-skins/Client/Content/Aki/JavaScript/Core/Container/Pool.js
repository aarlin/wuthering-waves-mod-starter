"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Pool = void 0);
const Log_1 = require("../Common/Log");
class Pool {
	constructor(t, s, e = void 0) {
		(this.f7 = t),
			(this.a7 = s),
			(this.h7 = e),
			(this.p7 = new Array()),
			(this.v7 = new WeakSet()),
			(this.M7 = 0);
	}
	get Size() {
		return this.M7 + this.p7.length;
	}
	Create() {
		if (this.a7) {
			var t = this.a7();
			if (t) return (this.M7 += 1), this.v7.add(t), t;
			Log_1.Log.CheckError() && Log_1.Log.Error("Core", 1, "创建器创建值为空");
		} else Log_1.Log.CheckError() && Log_1.Log.Error("Core", 1, "创建器不存在");
	}
	Get() {
		var t;
		if (!(this.p7.length <= 0))
			return (t = this.p7.pop()), (this.M7 += 1), this.v7.add(t), t;
	}
	Put(t) {
		if (t)
			if (this.v7.delete(t)) {
				if ((--this.M7, this.Size < this.f7)) return this.p7.push(t), !0;
				this.h7?.(t);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Pool", 1, "非池中对象", ["value", t]);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Core", 1, "无效对象", ["value", t]);
		return !1;
	}
	Clear() {
		for (const t of this.p7) this.h7?.(t);
		(this.p7.length = 0), (this.M7 = 0), (this.v7 = new WeakSet());
	}
}
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map
