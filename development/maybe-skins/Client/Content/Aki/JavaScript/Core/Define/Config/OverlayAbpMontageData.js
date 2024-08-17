"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OverlayAbpMontageData = void 0);
class OverlayAbpMontageData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Montage() {
		return this.montage();
	}
	get MaleVariant() {
		return this.malevariant();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsOverlayAbpMontageData(t, e) {
		return (e || new OverlayAbpMontageData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	montage(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	malevariant(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.OverlayAbpMontageData = OverlayAbpMontageData;
//# sourceMappingURL=OverlayAbpMontageData.js.map
