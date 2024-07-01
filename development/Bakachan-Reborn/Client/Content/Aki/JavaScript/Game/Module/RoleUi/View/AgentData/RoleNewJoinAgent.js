"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleNewJoinAgent = void 0);
const RoleViewAgent_1 = require("./RoleViewAgent");
class RoleNewJoinAgent extends RoleViewAgent_1.RoleViewAgent {
	GetRoleSystemMode() {
		return 3;
	}
}
exports.RoleNewJoinAgent = RoleNewJoinAgent;
