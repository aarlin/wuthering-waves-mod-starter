"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFetterGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomFetterGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FetterMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.fettermapLength(),
			(t) => this.fettermap(t)?.key(),
			(t) => this.fettermap(t)?.value(),
		);
	}
	get FetterGroupName() {
		return this.fettergroupname();
	}
	get FetterGroupDesc() {
		return this.fettergroupdesc();
	}
	get FetterElementColor() {
		return this.fetterelementcolor();
	}
	get FetterElementPath() {
		return this.fetterelementpath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPhantomFetterGroup(t, e) {
		return (e || new PhantomFetterGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetFettermapAt(t, e) {
		return this.fettermap(t);
	}
	fettermap(t, e) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	fettermapLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	fettergroupname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	fettergroupdesc(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	fetterelementcolor(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	fetterelementpath(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.PhantomFetterGroup = PhantomFetterGroup;
//# sourceMappingURL=PhantomFetterGroup.js.map
