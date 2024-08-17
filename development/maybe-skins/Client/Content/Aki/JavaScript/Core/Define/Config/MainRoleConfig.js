"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MainRoleConfig = void 0);
class MainRoleConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Gender() {
		return this.gender();
	}
	get UnlockCondition() {
		return this.unlockcondition();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMainRoleConfig(t, i) {
		return (i || new MainRoleConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gender() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MainRoleConfig = MainRoleConfig;
//# sourceMappingURL=MainRoleConfig.js.map
