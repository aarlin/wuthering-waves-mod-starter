"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Revive = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Revive {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ReviveTimes() {
		return this.revivetimes();
	}
	get UseItemId() {
		return this.useitemid();
	}
	get ReviveDelay() {
		return GameUtils_1.GameUtils.ConvertToArray(this.revivedelayLength(), (t) =>
			this.revivedelay(t),
		);
	}
	get DeathBp() {
		return this.deathbp();
	}
	get WindowBp() {
		return this.windowbp();
	}
	get ReviveTitle() {
		return this.revivetitle();
	}
	get ReviveContent() {
		return this.revivecontent();
	}
	get ReviveSequencePath() {
		return this.revivesequencepath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRevive(t, e) {
		return (e || new Revive()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	revivetimes() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	useitemid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRevivedelayAt(t) {
		return this.revivedelay(t);
	}
	revivedelay(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
	}
	revivedelayLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	revivedelayArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	deathbp(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	windowbp(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	revivetitle(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	revivecontent(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	revivesequencepath(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.Revive = Revive;
//# sourceMappingURL=Revive.js.map
