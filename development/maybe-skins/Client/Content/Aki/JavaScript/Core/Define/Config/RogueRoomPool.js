"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueRoomPool = void 0);
class RogueRoomPool {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get BehaviorTree() {
		return this.behaviortree();
	}
	get RoomsMusicState() {
		return this.roomsmusicstate();
	}
	__init(t, o) {
		return (this.z7 = t), (this.J7 = o), this;
	}
	static getRootAsRogueRoomPool(t, o) {
		return (o || new RogueRoomPool()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	behaviortree() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roomsmusicstate(t) {
		var o = this.J7.__offset(this.z7, 6);
		return o ? this.J7.__string(this.z7 + o, t) : null;
	}
}
exports.RogueRoomPool = RogueRoomPool;
//# sourceMappingURL=RogueRoomPool.js.map
