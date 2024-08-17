"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayData = void 0);
class LevelPlayData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get LevelPlayId() {
		return this.levelplayid();
	}
	get Data() {
		return this.data();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsLevelPlayData(t, e) {
		return (e || new LevelPlayData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	levelplayid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	data(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.LevelPlayData = LevelPlayData;
//# sourceMappingURL=LevelPlayData.js.map
