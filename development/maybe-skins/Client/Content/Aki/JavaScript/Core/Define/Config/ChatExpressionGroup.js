"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatExpressionGroup = void 0);
class ChatExpressionGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get GroupTexturePath() {
		return this.grouptexturepath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsChatExpressionGroup(t, s) {
		return (s || new ChatExpressionGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	grouptexturepath(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.ChatExpressionGroup = ChatExpressionGroup;
//# sourceMappingURL=ChatExpressionGroup.js.map
