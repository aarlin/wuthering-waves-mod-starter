"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CatchSignalGameplay = void 0);
class CatchSignalGameplay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Type() {
		return this.type();
	}
	get MorseCode() {
		return this.morsecode();
	}
	get Difficulty() {
		return this.difficulty();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCatchSignalGameplay(t, i) {
		return (i || new CatchSignalGameplay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	morsecode(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	difficulty() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.CatchSignalGameplay = CatchSignalGameplay;
//# sourceMappingURL=CatchSignalGameplay.js.map
