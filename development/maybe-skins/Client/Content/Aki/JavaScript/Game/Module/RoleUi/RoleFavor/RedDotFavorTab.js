"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFavorTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../../RedDot/RedDotBase");
class RedDotFavorTab extends RedDotBase_1.RedDotBase {
	IsMultiple() {
		return !0;
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.UnLockRoleFavorItem,
			EventDefine_1.EEventName.UpdateRoleFavorData,
		];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)
			.GetFavorData()
			.IsExistCanUnlockFavorItem();
	}
}
exports.RedDotFavorTab = RedDotFavorTab;
