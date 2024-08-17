"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapAudio = void 0);
class MapAudio {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Event() {
		return this.event();
	}
	get EnterEvent() {
		return this.enterevent();
	}
	get ExitEvent() {
		return this.exitevent();
	}
	get ResetEvent() {
		return this.resetevent();
	}
	get MusicResetEvent() {
		return this.musicresetevent();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsMapAudio(t, e) {
		return (e || new MapAudio()).__init(
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
	event(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	enterevent(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	exitevent(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	resetevent(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	musicresetevent(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.MapAudio = MapAudio;
//# sourceMappingURL=MapAudio.js.map
