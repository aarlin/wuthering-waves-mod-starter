"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Chat = void 0);
class Chat {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get BuildLimit() {
		return this.buildlimit();
	}
	get SaveMsgLimit() {
		return this.savemsglimit();
	}
	get LocalSaveMsgLimit() {
		return this.localsavemsglimit();
	}
	get SaveMsgTime() {
		return this.savemsgtime();
	}
	get ChatCd() {
		return this.chatcd();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsChat(t, i) {
		return (i || new Chat()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	buildlimit() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	savemsglimit() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	localsavemsglimit() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	savemsgtime() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	chatcd() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map
