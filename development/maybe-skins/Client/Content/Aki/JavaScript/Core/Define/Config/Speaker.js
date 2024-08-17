"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Speaker = void 0);
class Speaker {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get NameStringKey() {
		return this.namestringkey();
	}
	get Name() {
		return this.name();
	}
	get TitleStringKey() {
		return this.titlestringkey();
	}
	get CameraBindTag() {
		return this.camerabindtag();
	}
	get HeadIconAsset() {
		return this.headiconasset();
	}
	get HeadRoundIconAsset() {
		return this.headroundiconasset();
	}
	get RolePileIconAsset() {
		return this.rolepileiconasset();
	}
	get Title() {
		return this.title();
	}
	get TimberId() {
		return this.timberid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSpeaker(t, e) {
		return (e || new Speaker()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	namestringkey() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	titlestringkey() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	camerabindtag(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	headiconasset(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	headroundiconasset(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	rolepileiconasset(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	title() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	timberid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Speaker = Speaker;
//# sourceMappingURL=Speaker.js.map
