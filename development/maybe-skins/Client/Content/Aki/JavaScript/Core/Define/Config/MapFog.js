"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapFog = void 0);
class MapFog {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Fog() {
		return this.fog();
	}
	get MapId() {
		return this.mapid();
	}
	get UnlockCondition() {
		return this.unlockcondition();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMapFog(t, s) {
		return (s || new MapFog()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	fog() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MapFog = MapFog;
//# sourceMappingURL=MapFog.js.map
