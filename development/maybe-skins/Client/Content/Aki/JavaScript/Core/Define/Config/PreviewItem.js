"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PreviewItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PreviewItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get ShowTypes() {
		return GameUtils_1.GameUtils.ConvertToArray(this.showtypesLength(), (t) =>
			this.showtypes(t),
		);
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get BgDescription() {
		return this.bgdescription();
	}
	get Icon() {
		return this.icon();
	}
	get IconMiddle() {
		return this.iconmiddle();
	}
	get IconSmall() {
		return this.iconsmall();
	}
	get PreviewCornerMarker() {
		return this.previewcornermarker();
	}
	get QualityId() {
		return this.qualityid();
	}
	get PreviewItemAccess() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.previewitemaccessLength(),
			(t) => this.previewitemaccess(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPreviewItem(t, i) {
		return (i || new PreviewItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetShowtypesAt(t) {
		return this.showtypes(t);
	}
	showtypes(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	showtypesLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	showtypesArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgdescription(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconmiddle(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconsmall(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	previewcornermarker(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualityid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPreviewitemaccessAt(t) {
		return this.previewitemaccess(t);
	}
	previewitemaccess(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	previewitemaccessLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	previewitemaccessArray() {
		var t = this.J7.__offset(this.z7, 24);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.PreviewItem = PreviewItem;
//# sourceMappingURL=PreviewItem.js.map
