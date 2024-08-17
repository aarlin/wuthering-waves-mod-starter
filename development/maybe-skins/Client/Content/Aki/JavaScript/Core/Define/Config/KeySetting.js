"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySetting = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class KeySetting {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TypeId() {
		return this.typeid();
	}
	get InputControllerType() {
		return this.inputcontrollertype();
	}
	get Name() {
		return this.name();
	}
	get OpenViewType() {
		return this.openviewtype();
	}
	get ButtonTextId() {
		return this.buttontextid();
	}
	get ActionOrAxis() {
		return this.actionoraxis();
	}
	get ActionOrAxisName() {
		return this.actionoraxisname();
	}
	get CanCombination() {
		return this.cancombination();
	}
	get PcKeyIndex() {
		return this.pckeyindex();
	}
	get XBoxKeyIndex() {
		return this.xboxkeyindex();
	}
	get ConnectedKeySettingId() {
		return this.connectedkeysettingid();
	}
	get PcAxisValue() {
		return this.pcaxisvalue();
	}
	get XBoxAxisValue() {
		return this.xboxaxisvalue();
	}
	get IsLock() {
		return this.islock();
	}
	get BothActionName() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.bothactionnameLength(),
			(t) => this.bothactionname(t),
		);
	}
	get IsCheckSameKey() {
		return this.ischecksamekey();
	}
	get AllowKeys() {
		return GameUtils_1.GameUtils.ConvertToArray(this.allowkeysLength(), (t) =>
			this.allowkeys(t),
		);
	}
	get AllowMainKeys() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.allowmainkeysLength(),
			(t) => this.allowmainkeys(t),
		);
	}
	get AllowSecondKeys() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.allowsecondkeysLength(),
			(t) => this.allowsecondkeys(t),
		);
	}
	get DetailTextId() {
		return this.detailtextid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsKeySetting(t, i) {
		return (i || new KeySetting()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typeid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	inputcontrollertype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	openviewtype() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	buttontextid(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	actionoraxis() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionoraxisname(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cancombination() {
		var t = this.J7.__offset(this.z7, 20);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	pckeyindex() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	xboxkeyindex() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	connectedkeysettingid() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	pcaxisvalue() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	xboxaxisvalue() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	islock() {
		var t = this.J7.__offset(this.z7, 32);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	GetBothactionnameAt(t) {
		return this.bothactionname(t);
	}
	bothactionname(t, i) {
		var s = this.J7.__offset(this.z7, 34);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	bothactionnameLength() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	ischecksamekey() {
		var t = this.J7.__offset(this.z7, 36);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetAllowkeysAt(t) {
		return this.allowkeys(t);
	}
	allowkeys(t, i) {
		var s = this.J7.__offset(this.z7, 38);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	allowkeysLength() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAllowmainkeysAt(t) {
		return this.allowmainkeys(t);
	}
	allowmainkeys(t, i) {
		var s = this.J7.__offset(this.z7, 40);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	allowmainkeysLength() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAllowsecondkeysAt(t) {
		return this.allowsecondkeys(t);
	}
	allowsecondkeys(t, i) {
		var s = this.J7.__offset(this.z7, 42);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	allowsecondkeysLength() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	detailtextid(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.KeySetting = KeySetting;
//# sourceMappingURL=KeySetting.js.map
