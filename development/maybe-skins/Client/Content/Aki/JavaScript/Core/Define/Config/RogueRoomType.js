"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueRoomType = void 0);
class RogueRoomType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoomTipsType() {
		return this.roomtipstype();
	}
	get RoomsMusicState() {
		return this.roomsmusicstate();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsRogueRoomType(t, s) {
		return (s || new RogueRoomType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roomtipstype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roomsmusicstate(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.RogueRoomType = RogueRoomType;
//# sourceMappingURL=RogueRoomType.js.map
