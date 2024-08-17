"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Quest = void 0);
class Quest {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get QuestKey() {
		return this.questkey();
	}
	get QuestName() {
		return this.questname();
	}
	get QuestType() {
		return this.questtype();
	}
	get IsRepeat() {
		return this.isrepeat();
	}
	get IsAutoTrack() {
		return this.isautotrack();
	}
	get QuestText() {
		return this.questtext();
	}
	get IsOnline() {
		return this.isonline();
	}
	get RewardShow() {
		return this.rewardshow();
	}
	get AreaId() {
		return this.areaid();
	}
	get Duration() {
		return this.duration();
	}
	get PanelTexturePath() {
		return this.paneltexturepath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsQuest(t, s) {
		return (s || new Quest()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	questkey(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	questname(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	questtype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isrepeat() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	isautotrack() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	questtext(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	isonline() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardshow() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	areaid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	duration() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	paneltexturepath(t) {
		var s = this.J7.__offset(this.z7, 26);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Quest = Quest;
//# sourceMappingURL=Quest.js.map
