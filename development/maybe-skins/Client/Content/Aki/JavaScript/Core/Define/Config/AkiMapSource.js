"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AkiMapSource = void 0);
class AkiMapSource {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MapId() {
		return this.mapid();
	}
	get MapPath() {
		return this.mappath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAkiMapSource(t, s) {
		return (s || new AkiMapSource()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mappath(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.AkiMapSource = AkiMapSource;
//# sourceMappingURL=AkiMapSource.js.map
