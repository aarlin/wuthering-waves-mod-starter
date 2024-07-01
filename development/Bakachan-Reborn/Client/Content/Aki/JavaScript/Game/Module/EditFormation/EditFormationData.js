"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditFormationData = void 0);
class EditFormationRoleData {
	constructor(t, i, e, o) {
		(this.Position = 0),
			(this.ConfigId = 0),
			(this.PlayerId = 0),
			(this.Level = 0),
			(this.Position = t),
			(this.ConfigId = i),
			(this.PlayerId = o),
			(this.Level = e);
	}
}
class EditFormationData {
	constructor(t) {
		(this.FormationId = 0),
			(this.r4t = 0),
			(this.n4t = []),
			(this.sQe = new Map()),
			(this.FormationId = t);
	}
	AddRoleData(t, i, e, o = !1) {
		var s = this.n4t.length + 1;
		this.n4t.push(t), (t = new EditFormationRoleData(s, t, i, e));
		this.sQe.set(s, t), o && (this.r4t = s);
	}
	GetRoleDataByPosition(t) {
		return this.sQe.get(t);
	}
	get GetRoleIdList() {
		return this.n4t;
	}
	SetCurrentRole(t) {
		for (const i of this.sQe.values())
			i.ConfigId === t && (this.r4t = i.Position);
	}
	GetRoleDataMap() {
		return this.sQe;
	}
	get GetCurrentRoleConfigId() {
		var t = this.r4t - 1;
		return this.n4t[t];
	}
	get GetCurrentRolePosition() {
		return this.r4t;
	}
}
exports.EditFormationData = EditFormationData;
