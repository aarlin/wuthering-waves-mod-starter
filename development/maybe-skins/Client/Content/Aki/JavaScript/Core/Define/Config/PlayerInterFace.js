"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerInterFace = void 0);
class PlayerInterFace {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get MainName() {
		return this.mainname();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPlayerInterFace(t, e) {
		return (e || new PlayerInterFace()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	mainname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.PlayerInterFace = PlayerInterFace;
//# sourceMappingURL=PlayerInterFace.js.map
