"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueEffect = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueEffect {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MainEffectType() {
		return this.maineffecttype();
	}
	get Condition() {
		return this.condition();
	}
	get ConditionArgs() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.conditionargsLength(),
			(t) => this.conditionargs(t),
		);
	}
	get Count() {
		return this.count();
	}
	get RoomCount() {
		return this.roomcount();
	}
	get BuffArray1() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffarray1Length(), (t) =>
			this.buffarray1(t),
		);
	}
	get ExtraEffectTypeArray1() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffecttypearray1Length(),
			(t) => this.extraeffecttypearray1(t),
		);
	}
	get ExtraEffectTypeArgsArray1() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffecttypeargsarray1Length(),
			(t) => this.extraeffecttypeargsarray1(t),
		);
	}
	get BuffArray2() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffarray2Length(), (t) =>
			this.buffarray2(t),
		);
	}
	get ExtraEffectTypeArray2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffecttypearray2Length(),
			(t) => this.extraeffecttypearray2(t),
		);
	}
	get ExtraEffectTypeArgsArray2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffecttypeargsarray2Length(),
			(t) => this.extraeffecttypeargsarray2(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsRogueEffect(t, r) {
		return (r || new RogueEffect()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maineffecttype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetConditionargsAt(t) {
		return this.conditionargs(t);
	}
	conditionargs(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
	}
	conditionargsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	conditionargsArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	count() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roomcount() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBuffarray1At(t) {
		return this.buffarray1(t);
	}
	buffarray1(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	buffarray1Length() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExtraeffecttypearray1At(t) {
		return this.extraeffecttypearray1(t);
	}
	extraeffecttypearray1(t, r) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	extraeffecttypearray1Length() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExtraeffecttypeargsarray1At(t) {
		return this.extraeffecttypeargsarray1(t);
	}
	extraeffecttypeargsarray1(t, r) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	extraeffecttypeargsarray1Length() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetBuffarray2At(t) {
		return this.buffarray2(t);
	}
	buffarray2(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	buffarray2Length() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExtraeffecttypearray2At(t) {
		return this.extraeffecttypearray2(t);
	}
	extraeffecttypearray2(t, r) {
		var i = this.J7.__offset(this.z7, 24);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	extraeffecttypearray2Length() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExtraeffecttypeargsarray2At(t) {
		return this.extraeffecttypeargsarray2(t);
	}
	extraeffecttypeargsarray2(t, r) {
		var i = this.J7.__offset(this.z7, 26);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	extraeffecttypeargsarray2Length() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.RogueEffect = RogueEffect;
//# sourceMappingURL=RogueEffect.js.map
