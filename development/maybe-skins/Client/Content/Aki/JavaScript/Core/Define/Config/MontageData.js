"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MontageData = void 0);
class MontageData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActionMontage() {
		return this.actionmontage();
	}
	get ExpressionMontage() {
		return this.expressionmontage();
	}
	get MouthSequence() {
		return this.mouthsequence();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsMontageData(t, e) {
		return (e || new MontageData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionmontage(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	expressionmontage(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	mouthsequence(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.MontageData = MontageData;
//# sourceMappingURL=MontageData.js.map
