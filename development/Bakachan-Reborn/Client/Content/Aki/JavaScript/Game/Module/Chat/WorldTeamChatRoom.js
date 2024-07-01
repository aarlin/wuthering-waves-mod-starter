"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldChatRoom = void 0);
const TeamChatRoomBase_1 = require("./TeamChatRoomBase");
class WorldChatRoom extends TeamChatRoomBase_1.TeamChatRoomBase {
	constructor(o) {
		super(3, o);
	}
	GetUniqueId() {
		return 3;
	}
}
exports.WorldChatRoom = WorldChatRoom;
