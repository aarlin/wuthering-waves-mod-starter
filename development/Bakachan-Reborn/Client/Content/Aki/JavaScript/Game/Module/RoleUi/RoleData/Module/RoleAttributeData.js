"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAttributeData = void 0);
const RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleAttributeData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor() {
		super(...arguments),
			(this.RoleBaseAttr = new Map()),
			(this.RoleAddAttr = new Map());
	}
	SetRoleBaseAttr(t, e) {
		this.RoleBaseAttr.set(t, e);
	}
	GetRoleBaseAttr(t) {
		return this.RoleBaseAttr.get(t) ?? 0;
	}
	ClearRoleBaseAttr() {
		this.RoleBaseAttr.clear();
	}
	SetRoleAddAttr(t, e) {
		this.RoleAddAttr.set(t, e);
	}
	GetRoleAddAttr(t) {
		return this.RoleAddAttr.get(t) ?? 0;
	}
	ClearRoleAddAttr() {
		this.RoleAddAttr.clear();
	}
	GetOldRoleBaseAttr() {
		var t,
			e = new Map();
		for ([t] of this.RoleBaseAttr) e.set(t, 0);
		return e;
	}
	GetOldRoleAddAttr() {
		var t,
			e = new Map();
		for ([t] of this.RoleAddAttr) e.set(t, 0);
		return e;
	}
	GetBaseAttrList() {
		return this.RoleBaseAttr;
	}
	GetAddAttrList() {
		return this.RoleAddAttr;
	}
	GetAttrValueById(t) {
		let e = 0;
		var r;
		return (
			(r =
				((r = this.RoleBaseAttr.get(t)) && (e += r),
				this.RoleAddAttr.get(t))) && (e += r),
			e
		);
	}
}
exports.RoleAttributeData = RoleAttributeData;
