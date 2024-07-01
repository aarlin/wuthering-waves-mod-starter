"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoleSystemRoleList = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleSystemRoleList extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionRole";
	}
	IsMultiple() {
		return !0;
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RoleLevelUp,
			EventDefine_1.EEventName.RoleBreakUp,
			EventDefine_1.EEventName.RedDotRefreshItemData,
			EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
			EventDefine_1.EEventName.RedDotRefreshPhantomEquip,
			EventDefine_1.EEventName.RedDotRoleChange,
			EventDefine_1.EEventName.RedDotUnLockPhantom,
			EventDefine_1.EEventName.RedDotCreateRole,
		];
	}
	OnCheck(e) {
		return !(
			!ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e) ||
			(!ModelManager_1.ModelManager.RoleModel.RedDotRoleSystemRoleListCondition(
				e,
			) &&
				!ModelManager_1.ModelManager.RoleModel.RedDotAttributeTabBreakUpCondition(
					e,
				))
		);
	}
}
exports.RedDotRoleSystemRoleList = RedDotRoleSystemRoleList;
