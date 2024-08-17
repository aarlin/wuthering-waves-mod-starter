"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DigitalScreenText = void 0);
class DigitalScreenText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TextContentId() {
		return this.textcontentid();
	}
	get Alignment() {
		return this.alignment();
	}
	get FontSize() {
		return this.fontsize();
	}
	get ShowStartFrame() {
		return this.showstartframe();
	}
	get ShowEndFrame() {
		return this.showendframe();
	}
	get HideFrame() {
		return this.hideframe();
	}
	get Effect() {
		return this.effect();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsDigitalScreenText(t, e) {
		return (e || new DigitalScreenText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	textcontentid(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	alignment() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fontsize() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showstartframe() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	showendframe() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	hideframe() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	effect() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DigitalScreenText = DigitalScreenText;
//# sourceMappingURL=DigitalScreenText.js.map
