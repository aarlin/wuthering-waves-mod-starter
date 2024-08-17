"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemMainType = void 0);
class ItemMainType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Icon() {
		return this.icon();
	}
	get IconFirstAchieve() {
		return this.iconfirstachieve();
	}
	get PackageId() {
		return this.packageid();
	}
	get bShowDescompose() {
		return this.bshowdescompose();
	}
	get SequenceId() {
		return this.sequenceid();
	}
	get UseWayId() {
		return this.usewayid();
	}
	get DestroyUseWayId() {
		return this.destroyusewayid();
	}
	get bFilterSortVisible() {
		return this.bfiltersortvisible();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsItemMainType(t, s) {
		return (s || new ItemMainType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	iconfirstachieve(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	packageid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bshowdescompose() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	sequenceid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	usewayid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	destroyusewayid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bfiltersortvisible() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.ItemMainType = ItemMainType;
//# sourceMappingURL=ItemMainType.js.map
