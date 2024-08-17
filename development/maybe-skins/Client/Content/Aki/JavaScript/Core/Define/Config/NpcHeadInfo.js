"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcHeadInfo = void 0);
class NpcHeadInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SecondName() {
		return this.secondname();
	}
	get FunctionPath() {
		return this.functionpath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsNpcHeadInfo(t, s) {
		return (s || new NpcHeadInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	secondname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	functionpath(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.NpcHeadInfo = NpcHeadInfo;
//# sourceMappingURL=NpcHeadInfo.js.map
