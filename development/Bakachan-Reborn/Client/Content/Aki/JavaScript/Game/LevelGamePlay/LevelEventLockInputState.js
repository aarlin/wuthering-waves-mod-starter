"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventLockInputState = void 0);
class LevelEventLockInputState {
	static Lock(t) {
		(this.CLe = !0), (this.InputTagNames = t);
	}
	static Unlock() {
		(this.CLe = !1), (this.InputLimitEsc = !1);
	}
	static IsLockInput() {
		return !this.GmViewOpening && this.CLe;
	}
}
((exports.LevelEventLockInputState = LevelEventLockInputState).InputLimitView =
	[]),
	(LevelEventLockInputState.InputLimitEsc = !1);
