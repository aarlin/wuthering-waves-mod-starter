"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DoubleRewardActivity = void 0);
class DoubleRewardActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Count() {
		return this.count();
	}
	get UpRate() {
		return this.uprate();
	}
	get Prefab() {
		return this.prefab();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDoubleRewardActivity(t, i) {
		return (i || new DoubleRewardActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	count() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 3;
	}
	uprate() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	prefab(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.DoubleRewardActivity = DoubleRewardActivity;
//# sourceMappingURL=DoubleRewardActivity.js.map
