"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SecondaryGuideData = void 0);
class SecondaryGuideData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SortNumber() {
		return this.sortnumber();
	}
	get ConditionGroupId() {
		return this.conditiongroupid();
	}
	get Text() {
		return this.text();
	}
	get SubText() {
		return this.subtext();
	}
	get Icon() {
		return this.icon();
	}
	get HelpGroupId() {
		return this.helpgroupid();
	}
	get ShowDropDown() {
		return this.showdropdown();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsSecondaryGuideData(t, r) {
		return (r || new SecondaryGuideData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortnumber() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiongroupid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	text(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	subtext(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	icon(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	helpgroupid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showdropdown() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.SecondaryGuideData = SecondaryGuideData;
//# sourceMappingURL=SecondaryGuideData.js.map
