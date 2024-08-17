"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntrustRole = void 0);
class EntrustRole {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Icon() {
		return this.icon();
	}
	get HeadIcon() {
		return this.headicon();
	}
	get SmallHeadIcon() {
		return this.smallheadicon();
	}
	get Name() {
		return this.name();
	}
	get UnLockCondition() {
		return this.unlockcondition();
	}
	get JumpType() {
		return this.jumptype();
	}
	get JumpParam() {
		return this.jumpparam();
	}
	get ExPropertyCurve() {
		return this.expropertycurve();
	}
	get Type() {
		return this.type();
	}
	get MapSortId() {
		return this.mapsortid();
	}
	get FailDialog() {
		return this.faildialog();
	}
	get SuccessDialog() {
		return this.successdialog();
	}
	get InvestDialog() {
		return this.investdialog();
	}
	get InvestSuccessDialog() {
		return this.investsuccessdialog();
	}
	get InvestFailDialog() {
		return this.investfaildialog();
	}
	get JoinDialog() {
		return this.joindialog();
	}
	get BuildSuccessDialog() {
		return this.buildsuccessdialog();
	}
	get SpineAtlas() {
		return this.spineatlas();
	}
	get SpineSkeletonData() {
		return this.spineskeletondata();
	}
	get SmallSpineAtlas() {
		return this.smallspineatlas();
	}
	get SmallSpineSkeletonData() {
		return this.smallspineskeletondata();
	}
	get Portrait() {
		return this.portrait();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsEntrustRole(t, s) {
		return (s || new EntrustRole()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	headicon(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	smallheadicon(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	jumptype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	jumpparam() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	expropertycurve() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapsortid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	faildialog(t) {
		var s = this.J7.__offset(this.z7, 26);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	successdialog(t) {
		var s = this.J7.__offset(this.z7, 28);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	investdialog(t) {
		var s = this.J7.__offset(this.z7, 30);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	investsuccessdialog(t) {
		var s = this.J7.__offset(this.z7, 32);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	investfaildialog(t) {
		var s = this.J7.__offset(this.z7, 34);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	joindialog(t) {
		var s = this.J7.__offset(this.z7, 36);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	buildsuccessdialog(t) {
		var s = this.J7.__offset(this.z7, 38);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	spineatlas(t) {
		var s = this.J7.__offset(this.z7, 40);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	spineskeletondata(t) {
		var s = this.J7.__offset(this.z7, 42);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	smallspineatlas(t) {
		var s = this.J7.__offset(this.z7, 44);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	smallspineskeletondata(t) {
		var s = this.J7.__offset(this.z7, 46);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	portrait(t) {
		var s = this.J7.__offset(this.z7, 48);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.EntrustRole = EntrustRole;
//# sourceMappingURL=EntrustRole.js.map
