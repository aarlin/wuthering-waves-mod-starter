"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTrialActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleTrialActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleIdList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.roleidlistLength(), (t) =>
			this.roleidlist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleTrialActivity(t, i) {
		return (i || new RoleTrialActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRoleidlistAt(t) {
		return this.roleidlist(t);
	}
	roleidlist(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	roleidlistLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	roleidlistArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.RoleTrialActivity = RoleTrialActivity;
//# sourceMappingURL=RoleTrialActivity.js.map
