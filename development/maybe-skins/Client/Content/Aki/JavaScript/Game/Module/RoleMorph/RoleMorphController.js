"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleMorphController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	RoleMorphPaoTaiHandle_1 = require("./handle/RoleMorphPaoTaiHandle");
class RoleMorphController extends UiControllerBase_1.UiControllerBase {
	static OnLeaveLevel() {
		return this.Hho && (this.Hho.EndMorph(), (this.Hho = void 0)), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
			this.xie,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
			this.xie,
		);
	}
	static EndMorph() {
		this.Hho && (this.Hho.EndMorph(), (this.Hho = void 0));
	}
}
((exports.RoleMorphController = RoleMorphController).A6 = new Map([
	[5012, RoleMorphPaoTaiHandle_1.RoleMorphPaoTaiHandle],
])),
	(RoleMorphController.xie = () => {
		RoleMorphController.EndMorph();
		var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
		e &&
			(e = e.RoleConfig?.Id) &&
			(e = RoleMorphController.A6.get(e)) &&
			((RoleMorphController.Hho = new e()),
			RoleMorphController.Hho.BeginMorph());
	});
