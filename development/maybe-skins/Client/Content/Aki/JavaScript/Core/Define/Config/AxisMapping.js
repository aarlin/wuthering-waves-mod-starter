"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AxisMapping = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringFloat_1 = require("./SubType/DicStringFloat");
class AxisMapping {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get AxisName() {
		return this.axisname();
	}
	get AxisType() {
		return this.axistype();
	}
	get PcKeys() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.pckeysLength(),
			(t) => this.pckeys(t)?.key(),
			(t) => this.pckeys(t)?.value(),
		);
	}
	get FrancePcKeys() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.francepckeysLength(),
			(t) => this.francepckeys(t)?.key(),
			(t) => this.francepckeys(t)?.value(),
		);
	}
	get GamepadKeys() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.gamepadkeysLength(),
			(t) => this.gamepadkeys(t)?.key(),
			(t) => this.gamepadkeys(t)?.value(),
		);
	}
	get DisplayName() {
		return this.displayname();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAxisMapping(t, s) {
		return (s || new AxisMapping()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	axisname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	axistype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPckeysAt(t, s) {
		return this.pckeys(t);
	}
	pckeys(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (s || new DicStringFloat_1.DicStringFloat()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	pckeysLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetFrancepckeysAt(t, s) {
		return this.francepckeys(t);
	}
	francepckeys(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? (s || new DicStringFloat_1.DicStringFloat()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	francepckeysLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGamepadkeysAt(t, s) {
		return this.gamepadkeys(t);
	}
	gamepadkeys(t, s) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? (s || new DicStringFloat_1.DicStringFloat()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	gamepadkeysLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	displayname(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.AxisMapping = AxisMapping;
//# sourceMappingURL=AxisMapping.js.map
