"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SubtitleText = void 0);
class SubtitleText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RowName() {
		return this.rowname();
	}
	get DatatableName() {
		return this.datatablename();
	}
	get CharacterName() {
		return this.charactername();
	}
	get RoleId() {
		return this.roleid();
	}
	get Subtitles1() {
		return this.subtitles1();
	}
	get Subtitles2() {
		return this.subtitles2();
	}
	get Subtitles3() {
		return this.subtitles3();
	}
	get Subtitles4() {
		return this.subtitles4();
	}
	get Subtitles5() {
		return this.subtitles5();
	}
	get Option1() {
		return this.option1();
	}
	get Option2() {
		return this.option2();
	}
	get Option3() {
		return this.option3();
	}
	get Option4() {
		return this.option4();
	}
	get Option5() {
		return this.option5();
	}
	get Audio1() {
		return this.audio1();
	}
	get Audio2() {
		return this.audio2();
	}
	get Audio3() {
		return this.audio3();
	}
	get Audio4() {
		return this.audio4();
	}
	get Audio5() {
		return this.audio5();
	}
	get OSList() {
		return this.oslist();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSubtitleText(t, i) {
		return (i || new SubtitleText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rowname() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	datatablename(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	charactername() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitles1() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitles2() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitles3() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitles4() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitles5() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	option1() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	option2() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	option3() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	option4() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	option5() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	audio1(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	audio2(t) {
		var i = this.J7.__offset(this.z7, 36);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	audio3(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	audio4(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	audio5(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	oslist(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.SubtitleText = SubtitleText;
//# sourceMappingURL=SubtitleText.js.map
