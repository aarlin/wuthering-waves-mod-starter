"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamChatRoom = void 0);
const TeamChatRoomBase_1 = require("./TeamChatRoomBase");
class TeamChatRoom extends TeamChatRoomBase_1.TeamChatRoomBase {
	constructor(e) {
		super(2, e);
	}
	GetUniqueId() {
		return 2;
	}
}
exports.TeamChatRoom = TeamChatRoom;
