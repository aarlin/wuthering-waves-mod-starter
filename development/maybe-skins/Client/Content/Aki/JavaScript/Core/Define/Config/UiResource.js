"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiResource = void 0);
class UiResource {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Path() {
		return this.path();
	}
	get PcPath() {
		return this.pcpath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsUiResource(t, s) {
		return (s || new UiResource()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	path(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	pcpath(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.UiResource = UiResource;
//# sourceMappingURL=UiResource.js.map
