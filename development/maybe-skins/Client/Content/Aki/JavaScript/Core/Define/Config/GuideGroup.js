"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Step() {
		return GameUtils_1.GameUtils.ConvertToArray(this.stepLength(), (t) =>
			this.step(t),
		);
	}
	get OpenLimitCondition() {
		return this.openlimitcondition();
	}
	get AutoOpenCondition() {
		return this.autoopencondition();
	}
	get LimitRepeat() {
		return GameUtils_1.GameUtils.ConvertToArray(this.limitrepeatLength(), (t) =>
			this.limitrepeat(t),
		);
	}
	get DungeonId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.dungeonidLength(), (t) =>
			this.dungeonid(t),
		);
	}
	get ResetInDungeon() {
		return this.resetindungeon();
	}
	get OnlineMode() {
		return this.onlinemode();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGuideGroup(t, i) {
		return (i || new GuideGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetStepAt(t) {
		return this.step(t);
	}
	step(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	stepLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	stepArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	openlimitcondition() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	autoopencondition() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLimitrepeatAt(t) {
		return this.limitrepeat(t);
	}
	limitrepeat(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	limitrepeatLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	limitrepeatArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDungeonidAt(t) {
		return this.dungeonid(t);
	}
	dungeonid(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	dungeonidLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	dungeonidArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	resetindungeon() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	onlinemode() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
}
exports.GuideGroup = GuideGroup;
//# sourceMappingURL=GuideGroup.js.map
