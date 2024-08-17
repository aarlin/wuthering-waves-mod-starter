"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideTutorialPage = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideTutorialPage {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Pic() {
		return this.pic();
	}
	get Title() {
		return this.title();
	}
	get SubTitle() {
		return this.subtitle();
	}
	get Content() {
		return this.content();
	}
	get Button() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buttonLength(), (t) =>
			this.button(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGuideTutorialPage(t, i) {
		return (i || new GuideTutorialPage()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	pic(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	subtitle(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	content(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetButtonAt(t) {
		return this.button(t);
	}
	button(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	buttonLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.GuideTutorialPage = GuideTutorialPage;
//# sourceMappingURL=GuideTutorialPage.js.map
