"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SoundAreaPlayInfo = void 0);
class SoundAreaPlayInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BuffTitle() {
		return this.bufftitle();
	}
	get BuffDescription() {
		return this.buffdescription();
	}
	get ShowTitle() {
		return this.showtitle();
	}
	get Time() {
		return this.time();
	}
	get MaxCount() {
		return this.maxcount();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSoundAreaPlayInfo(t, i) {
		return (i || new SoundAreaPlayInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bufftitle(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	buffdescription(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showtitle() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	time() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 3;
	}
	maxcount() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SoundAreaPlayInfo = SoundAreaPlayInfo;
//# sourceMappingURL=SoundAreaPlayInfo.js.map
