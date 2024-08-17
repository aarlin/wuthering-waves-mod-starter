"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BroadcastImage = void 0);
class BroadcastImage {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Icon() {
		return this.icon();
	}
	get Image() {
		return this.image();
	}
	get UmgIcon() {
		return this.umgicon();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBroadcastImage(t, s) {
		return (s || new BroadcastImage()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	image(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	umgicon(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.BroadcastImage = BroadcastImage;
//# sourceMappingURL=BroadcastImage.js.map
