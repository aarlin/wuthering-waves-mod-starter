"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBreachResponseData = void 0);
class RoleBreachResponseData {
	UpdateRoleBreakThroughViewResponse(e) {
		this.R_o = e;
	}
	GetLevelLimit() {
		return this.R_o.X8n;
	}
	GetUnLockSkillId() {
		return this.R_o.Y8n;
	}
	GetFinalProp() {
		var e = new Map();
		for (const t of this.R_o.J8n) e.set(t.Ckn, t.gkn);
		return e;
	}
	GetCostList() {
		return this.R_o.z8n;
	}
	GetRewardList() {
		return this.R_o.Z8n;
	}
}
exports.RoleBreachResponseData = RoleBreachResponseData;
class RoleBreakThroughViewResponse {
	constructor() {
		(this.X8n = 0),
			(this.Y8n = 0),
			(this.J8n = void 0),
			(this.z8n = void 0),
			(this.Z8n = void 0);
	}
}
