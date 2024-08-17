"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeaching = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ComboTeaching {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get NextRoleGuideID() {
		return this.nextroleguideid();
	}
	get KeyID() {
		return GameUtils_1.GameUtils.ConvertToArray(this.keyidLength(), (t) =>
			this.keyid(t),
		);
	}
	get IconText() {
		return GameUtils_1.GameUtils.ConvertToArray(this.icontextLength(), (t) =>
			this.icontext(t),
		);
	}
	get IconTagText() {
		return GameUtils_1.GameUtils.ConvertToArray(this.icontagtextLength(), (t) =>
			this.icontagtext(t),
		);
	}
	get DescriptionTitle() {
		return this.descriptiontitle();
	}
	get DescriptionContent() {
		return this.descriptioncontent();
	}
	get CommandID() {
		return GameUtils_1.GameUtils.ConvertToArray(this.commandidLength(), (t) =>
			this.commandid(t),
		);
	}
	get guideID() {
		return GameUtils_1.GameUtils.ConvertToArray(this.guideidLength(), (t) =>
			this.guideid(t),
		);
	}
	get InputEnums() {
		return GameUtils_1.GameUtils.ConvertToArray(this.inputenumsLength(), (t) =>
			this.inputenums(t),
		);
	}
	get AddBuffID() {
		return GameUtils_1.GameUtils.ConvertToArray(this.addbuffidLength(), (t) =>
			this.addbuffid(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsComboTeaching(t, i) {
		return (i || new ComboTeaching()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	nextroleguideid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetKeyidAt(t) {
		return this.keyid(t);
	}
	keyid(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	keyidLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetIcontextAt(t) {
		return this.icontext(t);
	}
	icontext(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	icontextLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetIcontagtextAt(t) {
		return this.icontagtext(t);
	}
	icontagtext(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	icontagtextLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	descriptiontitle(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	descriptioncontent(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetCommandidAt(t) {
		return this.commandid(t);
	}
	commandid(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	commandidLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	commandidArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetGuideidAt(t) {
		return this.guideid(t);
	}
	guideid(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	guideidLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	guideidArray() {
		var t = this.J7.__offset(this.z7, 20);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetInputenumsAt(t) {
		return this.inputenums(t);
	}
	inputenums(t, i) {
		var s = this.J7.__offset(this.z7, 22);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	inputenumsLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAddbuffidAt(t) {
		return this.addbuffid(t);
	}
	addbuffid(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	addbuffidLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ComboTeaching = ComboTeaching;
//# sourceMappingURL=ComboTeaching.js.map
