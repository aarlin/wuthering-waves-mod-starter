"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingTipsText = void 0);
class LoadingTipsText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LevelAreaId() {
		return this.levelareaid();
	}
	get ImageId() {
		return this.imageid();
	}
	get Weight() {
		return this.weight();
	}
	get Title() {
		return this.title();
	}
	get TipsText() {
		return this.tipstext();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsLoadingTipsText(t, i) {
		return (i || new LoadingTipsText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelareaid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	imageid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weight() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tipstext(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.LoadingTipsText = LoadingTipsText;
//# sourceMappingURL=LoadingTipsText.js.map
