"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreRewardDisplay = void 0);
class ExploreRewardDisplay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get TitleHexColor() {
		return this.titlehexcolor();
	}
	get TitleIconPath() {
		return this.titleiconpath();
	}
	get TitleIconHexColor() {
		return this.titleiconhexcolor();
	}
	get IsRecordVisible() {
		return this.isrecordvisible();
	}
	get IsItemVisible() {
		return this.isitemvisible();
	}
	get IsExploreProgressVisible() {
		return this.isexploreprogressvisible();
	}
	get ExploreBarTipsTextId() {
		return this.explorebartipstextid();
	}
	get IsDescription() {
		return this.isdescription();
	}
	get Description() {
		return this.description();
	}
	get IsSuccess() {
		return this.issuccess();
	}
	get AudioId() {
		return this.audioid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsExploreRewardDisplay(t, i) {
		return (i || new ExploreRewardDisplay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	titlehexcolor(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	titleiconpath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	titleiconhexcolor(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isrecordvisible() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	isitemvisible() {
		var t = this.J7.__offset(this.z7, 16);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	isexploreprogressvisible() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	explorebartipstextid(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isdescription() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	issuccess() {
		var t = this.J7.__offset(this.z7, 26);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	audioid(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ExploreRewardDisplay = ExploreRewardDisplay;
//# sourceMappingURL=ExploreRewardDisplay.js.map
