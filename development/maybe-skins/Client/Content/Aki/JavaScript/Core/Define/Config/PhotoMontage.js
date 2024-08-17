"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotoMontage = void 0);
class PhotoMontage {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Sort() {
		return this.sort();
	}
	get Name() {
		return this.name();
	}
	get IsLoop() {
		return this.isloop();
	}
	get MontagePath() {
		return this.montagepath();
	}
	get IconType() {
		return this.icontype();
	}
	get MotionType() {
		return this.motiontype();
	}
	get UnLockConditionGroup() {
		return this.unlockconditiongroup();
	}
	get ConditionTipsId() {
		return this.conditiontipsid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhotoMontage(t, i) {
		return (i || new PhotoMontage()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isloop() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	montagepath(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icontype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	motiontype() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockconditiongroup() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiontipsid(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.PhotoMontage = PhotoMontage;
//# sourceMappingURL=PhotoMontage.js.map
