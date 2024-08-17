"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestChapter = void 0);
class QuestChapter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ChapterNum() {
		return this.chapternum();
	}
	get SectionNum() {
		return this.sectionnum();
	}
	get ActName() {
		return this.actname();
	}
	get ChapterName() {
		return this.chaptername();
	}
	get ChapterIcon() {
		return this.chaptericon();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsQuestChapter(t, s) {
		return (s || new QuestChapter()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	chapternum(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	sectionnum(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	actname(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	chaptername(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	chaptericon(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.QuestChapter = QuestChapter;
//# sourceMappingURL=QuestChapter.js.map
