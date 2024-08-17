"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkEffect = void 0);
class MarkEffect {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MarkId() {
		return this.markid();
	}
	get EffectResourcePath() {
		return this.effectresourcepath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsMarkEffect(t, e) {
		return (e || new MarkEffect()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	markid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	effectresourcepath(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.MarkEffect = MarkEffect;
//# sourceMappingURL=MarkEffect.js.map
