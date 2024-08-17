"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayItem = void 0);
class PayItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ItemId() {
		return this.itemid();
	}
	get ItemCount() {
		return this.itemcount();
	}
	get PayId() {
		return this.payid();
	}
	get IsDisplay() {
		return this.isdisplay();
	}
	get StageImage() {
		return this.stageimage();
	}
	get BonusItemCount() {
		return this.bonusitemcount();
	}
	get SpecialBonusItemCount() {
		return this.specialbonusitemcount();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPayItem(t, s) {
		return (s || new PayItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemcount() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	payid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isdisplay() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	stageimage(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	bonusitemcount() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	specialbonusitemcount() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PayItem = PayItem;
//# sourceMappingURL=PayItem.js.map
