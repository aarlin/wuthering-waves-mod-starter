"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActionMapping = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ActionMapping {
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
		return GameUtils_1.GameUtils.ConvertToArray(this.pckeysLength(), (t) =>
			this.pckeys(t),
		);
	}
	get FrancePcKeys() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.francepckeysLength(),
			(t) => this.francepckeys(t),
		);
	}
	get GamepadKeys() {
		return GameUtils_1.GameUtils.ConvertToArray(this.gamepadkeysLength(), (t) =>
			this.gamepadkeys(t),
		);
	}
	get MobileIconPath() {
		return this.mobileiconpath();
	}
	get DisplayName() {
		return this.displayname();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsActionMapping(t, s) {
		return (s || new ActionMapping()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	actiontype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPckeysAt(t) {
		return this.pckeys(t);
	}
	pckeys(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	pckeysLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetFrancepckeysAt(t) {
		return this.francepckeys(t);
	}
	francepckeys(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	francepckeysLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGamepadkeysAt(t) {
		return this.gamepadkeys(t);
	}
	gamepadkeys(t, s) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	gamepadkeysLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	mobileiconpath(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	displayname(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.ActionMapping = ActionMapping;
//# sourceMappingURL=ActionMapping.js.map
