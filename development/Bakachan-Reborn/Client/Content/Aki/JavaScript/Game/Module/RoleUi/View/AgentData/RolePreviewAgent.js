"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RolePreviewAgent = void 0);
const RoleViewAgent_1 = require("./RoleViewAgent");
class RolePreviewAgent extends RoleViewAgent_1.RoleViewAgent {
	GetRoleSystemMode() {
		return 2;
	}
}
exports.RolePreviewAgent = RolePreviewAgent;
