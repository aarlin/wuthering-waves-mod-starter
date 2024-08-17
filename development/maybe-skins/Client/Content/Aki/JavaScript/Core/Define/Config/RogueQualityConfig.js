"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueQualityConfig = void 0);
class RogueQualityConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PhantomBgA() {
		return this.phantombga();
	}
	get PhantomBgB() {
		return this.phantombgb();
	}
	get PhantomBgC() {
		return this.phantombgc();
	}
	get TokenBg() {
		return this.tokenbg();
	}
	get TokenColor() {
		return this.tokencolor();
	}
	get RoleNiagaraColor() {
		return this.roleniagaracolor();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRogueQualityConfig(t, i) {
		return (i || new RogueQualityConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantombga(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	phantombgb(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	phantombgc(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tokenbg(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tokencolor(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleniagaracolor(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.RogueQualityConfig = RogueQualityConfig;
//# sourceMappingURL=RogueQualityConfig.js.map
