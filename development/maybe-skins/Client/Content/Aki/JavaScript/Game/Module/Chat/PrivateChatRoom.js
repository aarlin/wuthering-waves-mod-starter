"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PrivateChatRoom = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	ChatRoom_1 = require("./ChatRoom");
class PrivateChatRoom extends ChatRoom_1.ChatRoom {
	constructor(e, t) {
		super(1, t), (this.jMt = e);
	}
	GetFriendData() {
		return ModelManager_1.ModelManager.FriendModel.GetFriendById(this.jMt);
	}
	GetTargetPlayerId() {
		return this.jMt;
	}
	GetUniqueId() {
		return this.jMt;
	}
	GetPlayerName() {
		return this.GetFriendData()?.PlayerName;
	}
	GetPlayerRemarks() {
		return this.GetFriendData()?.FriendRemark;
	}
	IsOnline() {
		return this.GetFriendData()?.PlayerIsOnline;
	}
	CanChat() {
		var e = ModelManager_1.ModelManager.FriendModel;
		return !e.HasBlockedPlayer(this.jMt) && !!e.HasFriend(this.jMt);
	}
}
exports.PrivateChatRoom = PrivateChatRoom;
