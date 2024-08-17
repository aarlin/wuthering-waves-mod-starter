"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActionType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class ActionType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Type() {
		return this.type();
	}
	get IsClientTrigger() {
		return this.isclienttrigger();
	}
	get NeedTick() {
		return this.needtick();
	}
	get Param1() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param1Length(),
			(t) => this.param1(t)?.key(),
			(t) => this.param1(t)?.value(),
		);
	}
	get Param2() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param2Length(),
			(t) => this.param2(t)?.key(),
			(t) => this.param2(t)?.value(),
		);
	}
	get Param3() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param3Length(),
			(t) => this.param3(t)?.key(),
			(t) => this.param3(t)?.value(),
		);
	}
	get Param4() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param4Length(),
			(t) => this.param4(t)?.key(),
			(t) => this.param4(t)?.value(),
		);
	}
	get Param5() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param5Length(),
			(t) => this.param5(t)?.key(),
			(t) => this.param5(t)?.value(),
		);
	}
	get Param6() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param6Length(),
			(t) => this.param6(t)?.key(),
			(t) => this.param6(t)?.value(),
		);
	}
	get Param7() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param7Length(),
			(t) => this.param7(t)?.key(),
			(t) => this.param7(t)?.value(),
		);
	}
	get Param8() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.param8Length(),
			(t) => this.param8(t)?.key(),
			(t) => this.param8(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsActionType(t, i) {
		return (i || new ActionType()).__init(
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
	needtick() {
		var t = this.J7.__offset(this.z7, 8);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	GetParam1At(t, i) {
		return this.param1(t);
	}
	param1(t, i) {
		var r = this.J7.__offset(this.z7, 10);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param1Length() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam2At(t, i) {
		return this.param2(t);
	}
	param2(t, i) {
		var r = this.J7.__offset(this.z7, 12);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param2Length() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam3At(t, i) {
		return this.param3(t);
	}
	param3(t, i) {
		var r = this.J7.__offset(this.z7, 14);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param3Length() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam4At(t, i) {
		return this.param4(t);
	}
	param4(t, i) {
		var r = this.J7.__offset(this.z7, 16);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param4Length() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam5At(t, i) {
		return this.param5(t);
	}
	param5(t, i) {
		var r = this.J7.__offset(this.z7, 18);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param5Length() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam6At(t, i) {
		return this.param6(t);
	}
	param6(t, i) {
		var r = this.J7.__offset(this.z7, 20);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param6Length() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam7At(t, i) {
		return this.param7(t);
	}
	param7(t, i) {
		var r = this.J7.__offset(this.z7, 22);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param7Length() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetParam8At(t, i) {
		return this.param8(t);
	}
	param8(t, i) {
		var r = this.J7.__offset(this.z7, 24);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	param8Length() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ActionType = ActionType;
//# sourceMappingURL=ActionType.js.map
