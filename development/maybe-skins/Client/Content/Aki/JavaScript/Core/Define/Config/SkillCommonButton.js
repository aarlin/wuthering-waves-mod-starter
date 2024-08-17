"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillCommonButton = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringInt_1 = require("./SubType/DicStringInt"),
	DicStringIntArray_1 = require("./SubType/DicStringIntArray");
class SkillCommonButton {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get ButtonType() {
		return this.buttontype();
	}
	get ActionType() {
		return this.actiontype();
	}
	get SkillId() {
		return this.skillid();
	}
	get SkillIdTagMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.skillidtagmapLength(),
			(t) => this.skillidtagmap(t)?.key(),
			(t) => this.skillidtagmap(t)?.value(),
		);
	}
	get SkillIconTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.skillicontagsLength(),
			(t) => this.skillicontags(t),
		);
	}
	get EnableTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.enabletagsLength(), (t) =>
			this.enabletags(t),
		);
	}
	get DisableTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.disabletagsLength(), (t) =>
			this.disabletags(t),
		);
	}
	get DisableSkillIdTags() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.disableskillidtagsLength(),
			(t) => this.disableskillidtags(t)?.key(),
			(t) => this.disableskillidtags(t)?.value(),
		);
	}
	get HiddenTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.hiddentagsLength(), (t) =>
			this.hiddentags(t),
		);
	}
	get IsCdVisible() {
		return this.iscdvisible();
	}
	get AttributeId() {
		return this.attributeid();
	}
	get MaxAttributeId() {
		return this.maxattributeid();
	}
	get AttributeIdTagMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.attributeidtagmapLength(),
			(t) => this.attributeidtagmap(t)?.key(),
			(t) => this.attributeidtagmap(t)?.value(),
		);
	}
	get MaxAttributeBurstEffectId() {
		return this.maxattributebursteffectid();
	}
	get CdCompletedEffectId() {
		return this.cdcompletedeffectid();
	}
	get IsLongPressControlCamera() {
		return this.islongpresscontrolcamera();
	}
	get LongPressTime() {
		return this.longpresstime();
	}
	get DynamicEffectTagMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.dynamiceffecttagmapLength(),
			(t) => this.dynamiceffecttagmap(t)?.key(),
			(t) => this.dynamiceffecttagmap(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillCommonButton(t, i) {
		return (i || new SkillCommonButton()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	buttontype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actiontype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSkillidtagmapAt(t, i) {
		return this.skillidtagmap(t);
	}
	skillidtagmap(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? (i || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	skillidtagmapLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetSkillicontagsAt(t) {
		return this.skillicontags(t);
	}
	skillicontags(t, i) {
		var s = this.J7.__offset(this.z7, 16);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	skillicontagsLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetEnabletagsAt(t) {
		return this.enabletags(t);
	}
	enabletags(t, i) {
		var s = this.J7.__offset(this.z7, 18);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	enabletagsLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetDisabletagsAt(t) {
		return this.disabletags(t);
	}
	disabletags(t, i) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	disabletagsLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetDisableskillidtagsAt(t, i) {
		return this.disableskillidtags(t);
	}
	disableskillidtags(t, i) {
		var s = this.J7.__offset(this.z7, 22);
		return s
			? (i || new DicStringIntArray_1.DicStringIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	disableskillidtagsLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetHiddentagsAt(t) {
		return this.hiddentags(t);
	}
	hiddentags(t, i) {
		var s = this.J7.__offset(this.z7, 24);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	hiddentagsLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	iscdvisible() {
		var t = this.J7.__offset(this.z7, 26);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	attributeid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxattributeid() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetAttributeidtagmapAt(t, i) {
		return this.attributeidtagmap(t);
	}
	attributeidtagmap(t, i) {
		var s = this.J7.__offset(this.z7, 32);
		return s
			? (i || new DicStringIntArray_1.DicStringIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	attributeidtagmapLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	maxattributebursteffectid() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cdcompletedeffectid() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	islongpresscontrolcamera() {
		var t = this.J7.__offset(this.z7, 38);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	longpresstime() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDynamiceffecttagmapAt(t, i) {
		return this.dynamiceffecttagmap(t);
	}
	dynamiceffecttagmap(t, i) {
		var s = this.J7.__offset(this.z7, 42);
		return s
			? (i || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	dynamiceffecttagmapLength() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.SkillCommonButton = SkillCommonButton;
//# sourceMappingURL=SkillCommonButton.js.map
