"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FuncMenuWheel = void 0);
class FuncMenuWheel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get FuncId() {
		return this.funcid();
	}
	get FuncName() {
		return this.funcname();
	}
	get FuncMenuIconPath() {
		return this.funcmenuiconpath();
	}
	get FuncMenuSequence() {
		return this.funcmenusequence();
	}
	get AutoEquip() {
		return this.autoequip();
	}
	get UnlockCondition() {
		return this.unlockcondition();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsFuncMenuWheel(t, e) {
		return (e || new FuncMenuWheel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	funcid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	funcname(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	funcmenuiconpath(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	funcmenusequence() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	autoequip() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.FuncMenuWheel = FuncMenuWheel;
//# sourceMappingURL=FuncMenuWheel.js.map
