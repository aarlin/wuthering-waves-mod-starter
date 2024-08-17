"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideData = void 0);
class GuideData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TitleText() {
		return this.titletext();
	}
	get NoteText() {
		return this.notetext();
	}
	get BgTexture() {
		return this.bgtexture();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsGuideData(t, e) {
		return (e || new GuideData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	titletext(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	notetext(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	bgtexture(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.GuideData = GuideData;
//# sourceMappingURL=GuideData.js.map
