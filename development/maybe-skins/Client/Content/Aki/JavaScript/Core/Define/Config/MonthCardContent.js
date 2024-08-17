"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonthCardContent = void 0);
class MonthCardContent {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Days() {
		return this.days();
	}
	get ItemId() {
		return this.itemid();
	}
	get Count() {
		return this.count();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonthCardContent(t, s) {
		return (s || new MonthCardContent()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	days() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	count() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MonthCardContent = MonthCardContent;
//# sourceMappingURL=MonthCardContent.js.map
