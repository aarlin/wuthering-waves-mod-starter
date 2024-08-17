"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombinationAxis = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringFloat_1 = require("./SubType/DicStringFloat"),
	DicStringString_1 = require("./SubType/DicStringString");
class CombinationAxis {
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
	get PcKeyMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.pckeymapLength(),
			(t) => this.pckeymap(t)?.key(),
			(t) => this.pckeymap(t)?.value(),
		);
	}
	get GamepadKeyMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.gamepadkeymapLength(),
			(t) => this.gamepadkeymap(t)?.key(),
			(t) => this.gamepadkeymap(t)?.value(),
		);
	}
	get SecondaryKeyScaleMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.secondarykeyscalemapLength(),
			(t) => this.secondarykeyscalemap(t)?.key(),
			(t) => this.secondarykeyscalemap(t)?.value(),
		);
	}
	get MobileIconPath() {
		return this.mobileiconpath();
	}
	get DisplayName() {
		return this.displayname();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCombinationAxis(t, i) {
		return (i || new CombinationAxis()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	axisname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	axistype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPckeymapAt(t, i) {
		return this.pckeymap(t);
	}
	pckeymap(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	pckeymapLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGamepadkeymapAt(t, i) {
		return this.gamepadkeymap(t);
	}
	gamepadkeymap(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	gamepadkeymapLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetSecondarykeyscalemapAt(t, i) {
		return this.secondarykeyscalemap(t);
	}
	secondarykeyscalemap(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? (i || new DicStringFloat_1.DicStringFloat()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	secondarykeyscalemapLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	mobileiconpath(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	displayname(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.CombinationAxis = CombinationAxis;
//# sourceMappingURL=CombinationAxis.js.map
