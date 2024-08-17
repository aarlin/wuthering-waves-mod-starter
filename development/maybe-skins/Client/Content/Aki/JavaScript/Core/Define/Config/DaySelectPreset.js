"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DaySelectPreset = void 0);
class DaySelectPreset {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get ChangeDayNum() {
		return this.changedaynum();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsDaySelectPreset(t, e) {
		return (e || new DaySelectPreset()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	changedaynum() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DaySelectPreset = DaySelectPreset;
//# sourceMappingURL=DaySelectPreset.js.map
