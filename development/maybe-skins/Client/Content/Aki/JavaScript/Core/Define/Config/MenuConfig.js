"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt"),
	DicIntString_1 = require("./SubType/DicIntString");
class MenuConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FunctionId() {
		return this.functionid();
	}
	get OptionsDefault() {
		return this.optionsdefault();
	}
	get MainType() {
		return this.maintype();
	}
	get SubName() {
		return this.subname();
	}
	get SubType() {
		return this.subtype();
	}
	get SubSort() {
		return this.subsort();
	}
	get SubImage() {
		return this.subimage();
	}
	get Name() {
		return this.name();
	}
	get Platform() {
		return this.platform();
	}
	get FunctionSort() {
		return this.functionsort();
	}
	get FunctionImage() {
		return this.functionimage();
	}
	get SetType() {
		return this.settype();
	}
	get SliderRange() {
		return GameUtils_1.GameUtils.ConvertToArray(this.sliderrangeLength(), (t) =>
			this.sliderrange(t),
		);
	}
	get SliderDefault() {
		return this.sliderdefault();
	}
	get Digits() {
		return this.digits();
	}
	get OptionsName() {
		return GameUtils_1.GameUtils.ConvertToArray(this.optionsnameLength(), (t) =>
			this.optionsname(t),
		);
	}
	get OptionsValue() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.optionsvalueLength(),
			(t) => this.optionsvalue(t),
		);
	}
	get KeyMap() {
		return this.keymap();
	}
	get ButtonText() {
		return this.buttontext();
	}
	get OpenView() {
		return this.openview();
	}
	get RelationFunction() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.relationfunctionLength(),
			(t) => this.relationfunction(t),
		);
	}
	get DisableValue() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.disablevalueLength(),
			(t) => this.disablevalue(t),
		);
	}
	get DisableFunction() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.disablefunctionLength(),
			(t) => this.disablefunction(t),
		);
	}
	get AffectedValue() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.affectedvalueLength(),
			(t) => this.affectedvalue(t),
		);
	}
	get AffectedFunction() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.affectedfunctionLength(),
			(t) => this.affectedfunction(t)?.key(),
			(t) => this.affectedfunction(t)?.value(),
		);
	}
	get ValueTipsMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.valuetipsmapLength(),
			(t) => this.valuetipsmap(t)?.key(),
			(t) => this.valuetipsmap(t)?.value(),
		);
	}
	get ClickedTipsMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.clickedtipsmapLength(),
			(t) => this.clickedtipsmap(t)?.key(),
			(t) => this.clickedtipsmap(t)?.value(),
		);
	}
	get ClickedTips() {
		return this.clickedtips();
	}
	get BlockOnIosCheckServer() {
		return this.blockonioscheckserver();
	}
	get ConditionGroup() {
		return this.conditiongroup();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMenuConfig(t, i) {
		return (i || new MenuConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	optionsdefault() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maintype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subname(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	subtype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subsort() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subimage(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	platform() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionsort() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionimage(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	settype() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSliderrangeAt(t) {
		return this.sliderrange(t);
	}
	sliderrange(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	sliderrangeLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	sliderrangeArray() {
		var t = this.J7.__offset(this.z7, 30);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	sliderdefault() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	digits() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetOptionsnameAt(t) {
		return this.optionsname(t);
	}
	optionsname(t, i) {
		var s = this.J7.__offset(this.z7, 36);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	optionsnameLength() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOptionsvalueAt(t) {
		return this.optionsvalue(t);
	}
	optionsvalue(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	optionsvalueLength() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	optionsvalueArray() {
		var t = this.J7.__offset(this.z7, 38);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	keymap(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	buttontext(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	openview(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetRelationfunctionAt(t) {
		return this.relationfunction(t);
	}
	relationfunction(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	relationfunctionLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	relationfunctionArray() {
		var t = this.J7.__offset(this.z7, 46);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDisablevalueAt(t) {
		return this.disablevalue(t);
	}
	disablevalue(t) {
		var i = this.J7.__offset(this.z7, 48);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	disablevalueLength() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	disablevalueArray() {
		var t = this.J7.__offset(this.z7, 48);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDisablefunctionAt(t) {
		return this.disablefunction(t);
	}
	disablefunction(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	disablefunctionLength() {
		var t = this.J7.__offset(this.z7, 50);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	disablefunctionArray() {
		var t = this.J7.__offset(this.z7, 50);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAffectedvalueAt(t) {
		return this.affectedvalue(t);
	}
	affectedvalue(t) {
		var i = this.J7.__offset(this.z7, 52);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	affectedvalueLength() {
		var t = this.J7.__offset(this.z7, 52);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	affectedvalueArray() {
		var t = this.J7.__offset(this.z7, 52);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAffectedfunctionAt(t, i) {
		return this.affectedfunction(t);
	}
	affectedfunction(t, i) {
		var s = this.J7.__offset(this.z7, 54);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	affectedfunctionLength() {
		var t = this.J7.__offset(this.z7, 54);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetValuetipsmapAt(t, i) {
		return this.valuetipsmap(t);
	}
	valuetipsmap(t, i) {
		var s = this.J7.__offset(this.z7, 56);
		return s
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	valuetipsmapLength() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetClickedtipsmapAt(t, i) {
		return this.clickedtipsmap(t);
	}
	clickedtipsmap(t, i) {
		var s = this.J7.__offset(this.z7, 58);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	clickedtipsmapLength() {
		var t = this.J7.__offset(this.z7, 58);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	clickedtips(t) {
		var i = this.J7.__offset(this.z7, 60);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	blockonioscheckserver() {
		var t = this.J7.__offset(this.z7, 62);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	conditiongroup() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MenuConfig = MenuConfig;
//# sourceMappingURL=MenuConfig.js.map
