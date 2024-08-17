"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDefenceMapMark = void 0);
class TowerDefenceMapMark {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ActivityId() {
		return this.activityid();
	}
	get MarkId() {
		return this.markid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTowerDefenceMapMark(t, e) {
		return (e || new TowerDefenceMapMark()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TowerDefenceMapMark = TowerDefenceMapMark;
//# sourceMappingURL=TowerDefenceMapMark.js.map
