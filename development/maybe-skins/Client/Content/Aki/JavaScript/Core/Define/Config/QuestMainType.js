"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestMainType = void 0);
class QuestMainType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MainTypeName() {
		return this.maintypename();
	}
	get QuestTabIcon() {
		return this.questtabicon();
	}
	get QuestTypeTitleIcon() {
		return this.questtypetitleicon();
	}
	get QuestChapterBg() {
		return this.questchapterbg();
	}
	get TrackIconId() {
		return this.trackiconid();
	}
	get TypeColor() {
		return this.typecolor();
	}
	get SortValue() {
		return this.sortvalue();
	}
	get AutoHideTrack() {
		return this.autohidetrack();
	}
	get NewQuestTipTime() {
		return this.newquesttiptime();
	}
	get QuestUpdateTipsTime() {
		return this.questupdatetipstime();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsQuestMainType(t, i) {
		return (i || new QuestMainType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maintypename(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	questtabicon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	questtypetitleicon(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	questchapterbg(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	trackiconid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	typecolor(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	sortvalue() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	autohidetrack() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	newquesttiptime() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	questupdatetipstime() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
}
exports.QuestMainType = QuestMainType;
//# sourceMappingURL=QuestMainType.js.map
