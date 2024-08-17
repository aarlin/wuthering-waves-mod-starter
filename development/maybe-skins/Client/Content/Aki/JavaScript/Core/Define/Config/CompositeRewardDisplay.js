"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CompositeRewardDisplay = void 0);
class CompositeRewardDisplay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get ContinueText() {
		return this.continuetext();
	}
	get TitleIconPath() {
		return this.titleiconpath();
	}
	get IsProgressVisible() {
		return this.isprogressvisible();
	}
	get ProgressBarTitle() {
		return this.progressbartitle();
	}
	get ProgressBarAnimationTime() {
		return this.progressbaranimationtime();
	}
	get IsItemVisible() {
		return this.isitemvisible();
	}
	get IsSuccess() {
		return this.issuccess();
	}
	get AudioId() {
		return this.audioid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCompositeRewardDisplay(t, s) {
		return (s || new CompositeRewardDisplay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	continuetext(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	titleiconpath(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	isprogressvisible() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	progressbartitle(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	progressbaranimationtime() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 500;
	}
	isitemvisible() {
		var t = this.J7.__offset(this.z7, 18);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	issuccess() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	audioid(t) {
		var s = this.J7.__offset(this.z7, 22);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.CompositeRewardDisplay = CompositeRewardDisplay;
//# sourceMappingURL=CompositeRewardDisplay.js.map
