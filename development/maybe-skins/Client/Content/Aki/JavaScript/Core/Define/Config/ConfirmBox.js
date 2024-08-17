"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfirmBox = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ConfirmBox {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get Content() {
		return this.content();
	}
	get SecondaryContent() {
		return this.secondarycontent();
	}
	get ButtonText() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buttontextLength(), (t) =>
			this.buttontext(t),
		);
	}
	get DelayTime() {
		return this.delaytime();
	}
	get DelayButtonIndex() {
		return this.delaybuttonindex();
	}
	get NeedMaskClose() {
		return this.needmaskclose();
	}
	get UiShowType() {
		return this.uishowtype();
	}
	get NeedClose() {
		return this.needclose();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsConfirmBox(t, e) {
		return (e || new ConfirmBox()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	content(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	secondarycontent(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	GetButtontextAt(t) {
		return this.buttontext(t);
	}
	buttontext(t, e) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
			: null;
	}
	buttontextLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	delaytime() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	delaybuttonindex() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	needmaskclose() {
		var t = this.J7.__offset(this.z7, 18);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	uishowtype() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	needclose() {
		var t = this.J7.__offset(this.z7, 22);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.ConfirmBox = ConfirmBox;
//# sourceMappingURL=ConfirmBox.js.map
