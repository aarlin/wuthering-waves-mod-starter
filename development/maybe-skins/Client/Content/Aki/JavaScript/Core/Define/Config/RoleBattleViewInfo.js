"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBattleViewInfo = void 0);
class RoleBattleViewInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MiniMapVisible() {
		return this.minimapvisible();
	}
	get TopButtonVisible() {
		return this.topbuttonvisible();
	}
	get HomeButtonVisible() {
		return this.homebuttonvisible();
	}
	get RoleStateVisible() {
		return this.rolestatevisible();
	}
	get ChatVisible() {
		return this.chatvisible();
	}
	get FormationVisible() {
		return this.formationvisible();
	}
	get JoystickType() {
		return this.joysticktype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleBattleViewInfo(t, i) {
		return (i || new RoleBattleViewInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	minimapvisible() {
		var t = this.J7.__offset(this.z7, 6);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	topbuttonvisible() {
		var t = this.J7.__offset(this.z7, 8);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	homebuttonvisible() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	rolestatevisible() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	chatvisible() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	formationvisible() {
		var t = this.J7.__offset(this.z7, 16);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	joysticktype() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RoleBattleViewInfo = RoleBattleViewInfo;
//# sourceMappingURL=RoleBattleViewInfo.js.map
