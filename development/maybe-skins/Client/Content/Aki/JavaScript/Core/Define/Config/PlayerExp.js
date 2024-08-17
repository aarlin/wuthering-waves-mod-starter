"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerExp = void 0);
class PlayerExp {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get PlayerLevel() {
		return this.playerlevel();
	}
	get PlayerExp() {
		return this.playerexp();
	}
	get Condition() {
		return this.condition();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPlayerExp(t, e) {
		return (e || new PlayerExp()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	playerlevel() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	playerexp() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	condition(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.PlayerExp = PlayerExp;
//# sourceMappingURL=PlayerExp.js.map
