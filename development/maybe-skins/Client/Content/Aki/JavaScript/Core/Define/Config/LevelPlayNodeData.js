"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayNodeData = void 0);
class LevelPlayNodeData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Key() {
		return this.key();
	}
	get Data() {
		return this.data();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsLevelPlayNodeData(t, e) {
		return (e || new LevelPlayNodeData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	key(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	data(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.LevelPlayNodeData = LevelPlayNodeData;
//# sourceMappingURL=LevelPlayNodeData.js.map
