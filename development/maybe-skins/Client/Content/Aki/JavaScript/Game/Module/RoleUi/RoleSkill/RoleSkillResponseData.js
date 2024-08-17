"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillResponseData = void 0);
class RoleSkillResponseData {
	constructor() {
		(this.bco = void 0), (this.qco = void 0), (this.Gco = 0);
	}
	UpdateRoleSkillViewResponse(e, t, o) {
		(this.bco = e), (this.qco = t), (this.Gco = o);
	}
	GetSkillId() {
		return this.Gco;
	}
	GetSkillEffect() {
		return this.bco;
	}
	GetNextLevelSkillEffect() {
		return this.qco;
	}
}
exports.RoleSkillResponseData = RoleSkillResponseData;
