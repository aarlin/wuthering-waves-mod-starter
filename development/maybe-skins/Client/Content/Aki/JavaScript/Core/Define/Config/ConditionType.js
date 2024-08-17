"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConditionType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class ConditionType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Type() {
		return this.type();
	}
	get IsClientTrigger() {
		return this.isclienttrigger();
	}
	get SubType() {
		return this.subtype();
	}
	get RegisterPlaces() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.registerplacesLength(),
			(t) => this.registerplaces(t),
		);
	}
	get Param1() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param1Length(),
			(t) => this.param1(t)?.key(),
			(t) => this.param1(t)?.value(),
		);
	}
	get DefaultParam1() {
		return this.defaultparam1();
	}
	get Param2() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param2Length(),
			(t) => this.param2(t)?.key(),
			(t) => this.param2(t)?.value(),
		);
	}
	get DefaultParam2() {
		return this.defaultparam2();
	}
	get Param3() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param3Length(),
			(t) => this.param3(t)?.key(),
			(t) => this.param3(t)?.value(),
		);
	}
	get DefaultParam3() {
		return this.defaultparam3();
	}
	get Param4() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param4Length(),
			(t) => this.param4(t)?.key(),
			(t) => this.param4(t)?.value(),
		);
	}
	get DefaultParam4() {
		return this.defaultparam4();
	}
	get Param5() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param5Length(),
			(t) => this.param5(t)?.key(),
			(t) => this.param5(t)?.value(),
		);
	}
	get DefaultParam5() {
		return this.defaultparam5();
	}
	get Param6() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param6Length(),
			(t) => this.param6(t)?.key(),
			(t) => this.param6(t)?.value(),
		);
	}
	get DefaultParam6() {
		return this.defaultparam6();
	}
	get Param7() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param7Length(),
			(t) => this.param7(t)?.key(),
			(t) => this.param7(t)?.value(),
		);
	}
	get DefaultParam7() {
		return this.defaultparam7();
	}
	get Param8() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param8Length(),
			(t) => this.param8(t)?.key(),
			(t) => this.param8(t)?.value(),
		);
	}
	get DefaultParam8() {
		return this.defaultparam8();
	}
	get Param9() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param9Length(),
			(t) => this.param9(t)?.key(),
			(t) => this.param9(t)?.value(),
		);
	}
	get DefaultParam9() {
		return this.defaultparam9();
	}
	get Param10() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param10Length(),
			(t) => this.param10(t)?.key(),
			(t) => this.param10(t)?.value(),
		);
	}
	get DefaultParam10() {
		return this.defaultparam10();
	}
	get Param11() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param11Length(),
			(t) => this.param11(t)?.key(),
			(t) => this.param11(t)?.value(),
		);
	}
	get DefaultParam11() {
		return this.defaultparam11();
	}
	get Param12() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param12Length(),
			(t) => this.param12(t)?.key(),
			(t) => this.param12(t)?.value(),
		);
	}
	get DefaultParam12() {
		return this.defaultparam12();
	}
	get Param13() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param13Length(),
			(t) => this.param13(t)?.key(),
			(t) => this.param13(t)?.value(),
		);
	}
	get DefaultParam13() {
		return this.defaultparam13();
	}
	get Param14() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param14Length(),
			(t) => this.param14(t)?.key(),
			(t) => this.param14(t)?.value(),
		);
	}
	get DefaultParam14() {
		return this.defaultparam14();
	}
	get Param15() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param15Length(),
			(t) => this.param15(t)?.key(),
			(t) => this.param15(t)?.value(),
		);
	}
	get DefaultParam15() {
		return this.defaultparam15();
	}
	get Param16() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param16Length(),
			(t) => this.param16(t)?.key(),
			(t) => this.param16(t)?.value(),
		);
	}
	get DefaultParam16() {
		return this.defaultparam16();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsConditionType(t, i) {
		return (i || new ConditionType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	type(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isclienttrigger() {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	subtype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRegisterplacesAt(t) {
		return this.registerplaces(t);
	}
	registerplaces(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	registerplacesLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	registerplacesArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetParam1At(t, i) {
		return this.param1(t);
	}
	param1(t, i) {
		var r = this.J7.__offset(this.z7, 12);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param1Length() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam1(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam2At(t, i) {
		return this.param2(t);
	}
	param2(t, i) {
		var r = this.J7.__offset(this.z7, 16);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param2Length() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam2(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam3At(t, i) {
		return this.param3(t);
	}
	param3(t, i) {
		var r = this.J7.__offset(this.z7, 20);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param3Length() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam3(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam4At(t, i) {
		return this.param4(t);
	}
	param4(t, i) {
		var r = this.J7.__offset(this.z7, 24);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param4Length() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam4(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam5At(t, i) {
		return this.param5(t);
	}
	param5(t, i) {
		var r = this.J7.__offset(this.z7, 28);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param5Length() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam5(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam6At(t, i) {
		return this.param6(t);
	}
	param6(t, i) {
		var r = this.J7.__offset(this.z7, 32);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param6Length() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam6(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam7At(t, i) {
		return this.param7(t);
	}
	param7(t, i) {
		var r = this.J7.__offset(this.z7, 36);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param7Length() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam7(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam8At(t, i) {
		return this.param8(t);
	}
	param8(t, i) {
		var r = this.J7.__offset(this.z7, 40);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param8Length() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam8(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam9At(t, i) {
		return this.param9(t);
	}
	param9(t, i) {
		var r = this.J7.__offset(this.z7, 44);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param9Length() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam9(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam10At(t, i) {
		return this.param10(t);
	}
	param10(t, i) {
		var r = this.J7.__offset(this.z7, 48);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param10Length() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam10(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam11At(t, i) {
		return this.param11(t);
	}
	param11(t, i) {
		var r = this.J7.__offset(this.z7, 52);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param11Length() {
		var t = this.J7.__offset(this.z7, 52);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam11(t) {
		var i = this.J7.__offset(this.z7, 54);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam12At(t, i) {
		return this.param12(t);
	}
	param12(t, i) {
		var r = this.J7.__offset(this.z7, 56);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param12Length() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam12(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam13At(t, i) {
		return this.param13(t);
	}
	param13(t, i) {
		var r = this.J7.__offset(this.z7, 60);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param13Length() {
		var t = this.J7.__offset(this.z7, 60);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam13(t) {
		var i = this.J7.__offset(this.z7, 62);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam14At(t, i) {
		return this.param14(t);
	}
	param14(t, i) {
		var r = this.J7.__offset(this.z7, 64);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param14Length() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam14(t) {
		var i = this.J7.__offset(this.z7, 66);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam15At(t, i) {
		return this.param15(t);
	}
	param15(t, i) {
		var r = this.J7.__offset(this.z7, 68);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param15Length() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam15(t) {
		var i = this.J7.__offset(this.z7, 70);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetParam16At(t, i) {
		return this.param16(t);
	}
	param16(t, i) {
		var r = this.J7.__offset(this.z7, 72);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param16Length() {
		var t = this.J7.__offset(this.z7, 72);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultparam16(t) {
		var i = this.J7.__offset(this.z7, 74);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ConditionType = ConditionType;
//# sourceMappingURL=ConditionType.js.map
