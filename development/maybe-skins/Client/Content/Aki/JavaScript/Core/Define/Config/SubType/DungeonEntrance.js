"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DungeonEntrance = void 0);
class DungeonEntrance {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get DungeonId() {
		return this.dungeonid();
	}
	get EntranceEntityId() {
		return this.entranceentityid();
	}
	__init(t, n) {
		return (this.z7 = t), (this.J7 = n), this;
	}
	static getRootAsDungeonEntrance(t, n) {
		return (n || new DungeonEntrance()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	dungeonid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entranceentityid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DungeonEntrance = DungeonEntrance;
//# sourceMappingURL=DungeonEntrance.js.map
