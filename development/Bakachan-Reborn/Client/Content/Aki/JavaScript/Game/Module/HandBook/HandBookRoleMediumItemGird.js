"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookRoleMediumItemGird = void 0);
const LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	RoleDataBase_1 = require("../RoleUi/RoleData/RoleDataBase"),
	RoleDefine_1 = require("../RoleUi/RoleDefine");
class HandBookRoleMediumItemGird extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnRefresh(e, t, o) {
		let i = !1;
		e.GetDataId() >= RoleDefine_1.ROBOT_DATA_MIN_ID && (i = !0);
		let l = e.GetIsNew();
		i && (l = !1),
			(e = {
				Type: 2,
				Data: e,
				ItemConfigId: e.GetRoleId(),
				BottomText: e.GetName(),
				ElementId: e.GetRoleConfig().ElementId,
				IsNewVisible: l,
				IsDisable: i,
				IsShowLock: i,
			}),
			this.Apply(e),
			this.SetSelected(t);
	}
	OnSelected(e) {
		this.SetSelected(!0),
			this.SetNewVisible(!1),
			this.Data instanceof RoleDataBase_1.RoleDataBase &&
				this.Data.GetRoleId() < RoleDefine_1.ROBOT_DATA_MIN_ID &&
				this.Data.TryRemoveNewFlag();
	}
	OnDeselected(e) {
		this.SetSelected(!1, !0);
	}
}
exports.HandBookRoleMediumItemGird = HandBookRoleMediumItemGird;
