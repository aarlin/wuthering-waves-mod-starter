"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoleSelectionList = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleSelectionList extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionRole";
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.RoleSelectionListUpdate];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.RoleModel.RedDotRoleSelectionListCondition();
	}
}
exports.RedDotRoleSelectionList = RedDotRoleSelectionList;
