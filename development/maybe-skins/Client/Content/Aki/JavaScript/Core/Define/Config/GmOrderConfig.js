"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GmOrderConfig = void 0);
class GmOrderConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get NameOverride() {
		return this.nameoverride();
	}
	get Code() {
		return this.code();
	}
	get CodeOverride() {
		return this.codeoverride();
	}
	get Sort() {
		return this.sort();
	}
	get Visible() {
		return this.visible();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsGmOrderConfig(t, r) {
		return (r || new GmOrderConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	nameoverride(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	code(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	codeoverride(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	visible() {
		var t = this.J7.__offset(this.z7, 16);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.GmOrderConfig = GmOrderConfig;
//# sourceMappingURL=GmOrderConfig.js.map
