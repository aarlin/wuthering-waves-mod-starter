"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombinationAction = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class CombinationAction {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActionName() {
		return this.actionname();
	}
	get ActionType() {
		return this.actiontype();
	}
	get PcKeys() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.pckeysLength(),
			(t) => this.pckeys(t)?.key(),
			(t) => this.pckeys(t)?.value(),
		);
	}
	get GamepadKeys() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.gamepadkeysLength(),
			(t) => this.gamepadkeys(t)?.key(),
			(t) => this.gamepadkeys(t)?.value(),
		);
	}
	get SecondaryKeyValidTime() {
		return this.secondarykeyvalidtime();
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
	static getRootAsCombinationAction(t, i) {
		return (i || new CombinationAction()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	actiontype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPckeysAt(t, i) {
		return this.pckeys(t);
	}
	pckeys(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	pckeysLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGamepadkeysAt(t, i) {
		return this.gamepadkeys(t);
	}
	gamepadkeys(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	gamepadkeysLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	secondarykeyvalidtime() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : -1;
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
exports.CombinationAction = CombinationAction;
//# sourceMappingURL=CombinationAction.js.map
