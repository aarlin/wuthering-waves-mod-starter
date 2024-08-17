"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatPlayerData = void 0);
class ChatPlayerData {
	constructor(t) {
		(this.j8 = 0), (this.FMt = 0), (this.M8e = ""), (this.j8 = t);
	}
	SetPlayerId(t) {
		this.j8 = t;
	}
	GetPlayerId() {
		return this.j8;
	}
	SetPlayerIcon(t) {
		this.FMt = t ?? 0;
	}
	GetPlayerIcon() {
		return this.FMt;
	}
	SetPlayerName(t) {
		this.M8e = t ?? "";
	}
	GetPlayerName() {
		return this.M8e;
	}
}
exports.ChatPlayerData = ChatPlayerData;
