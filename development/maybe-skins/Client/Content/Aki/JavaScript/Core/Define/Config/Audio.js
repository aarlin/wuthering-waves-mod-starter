"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Audio = void 0);
class Audio {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Path() {
		return this.path();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAudio(t, s) {
		return (s || new Audio()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	path(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Audio = Audio;
//# sourceMappingURL=Audio.js.map
