"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleHandBookSelectionComponent = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class RoleHandBookSelectionComponent {
	constructor() {
		(this.RoleScroll = void 0),
			(this.RoleHandBookItem = void 0),
			(this.PlaySequence = () => {
				this.RoleHandBookItem && this.RoleHandBookItem.PlaySequence();
			});
	}
	UpdateRoleHandBookItem(e) {}
	GetCurSelectRoleId() {
		return 0;
	}
	GetAllRoleItemMap() {
		return this.RoleScroll.GetScrollItemMap();
	}
	UpdateComponent(e) {}
	RefreshRoleItem(e) {}
	UpdateItemByRoleId(e) {
		var o = this.GetAllRoleItemMap().get(e);
		e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		o.UpdateItem(e);
	}
	OnBeforeDestroy() {}
}
exports.RoleHandBookSelectionComponent = RoleHandBookSelectionComponent;
