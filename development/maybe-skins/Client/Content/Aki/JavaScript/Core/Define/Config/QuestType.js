"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MainId() {
		return this.mainid();
	}
	get QuestTypeName() {
		return this.questtypename();
	}
	get IsShowInQuestPanel() {
		return this.isshowinquestpanel();
	}
	get TypeColor() {
		return this.typecolor();
	}
	get TextColor() {
		return this.textcolor();
	}
	get NeedRedDot() {
		return this.needreddot();
	}
	get MapId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.mapidLength(), (t) =>
			this.mapid(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsQuestType(t, s) {
		return (s || new QuestType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mainid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	questtypename(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	isshowinquestpanel() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	typecolor(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	textcolor(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	needreddot() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	GetMapidAt(t) {
		return this.mapid(t);
	}
	mapid(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	mapidLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	mapidArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.QuestType = QuestType;
//# sourceMappingURL=QuestType.js.map
