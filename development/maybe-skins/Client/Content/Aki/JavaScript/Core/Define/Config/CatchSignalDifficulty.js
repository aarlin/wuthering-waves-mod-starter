"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CatchSignalDifficulty = void 0);
class CatchSignalDifficulty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get SpeedRate() {
		return this.speedrate();
	}
	get TapTimeWindow() {
		return this.taptimewindow();
	}
	get PressTimeWindow() {
		return this.presstimewindow();
	}
	get ReleaseTimeWindow() {
		return this.releasetimewindow();
	}
	get TargetCompletion() {
		return this.targetcompletion();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCatchSignalDifficulty(t, i) {
		return (i || new CatchSignalDifficulty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	speedrate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	taptimewindow() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 100;
	}
	presstimewindow() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 100;
	}
	releasetimewindow() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 100;
	}
	targetcompletion() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 80;
	}
}
exports.CatchSignalDifficulty = CatchSignalDifficulty;
//# sourceMappingURL=CatchSignalDifficulty.js.map
