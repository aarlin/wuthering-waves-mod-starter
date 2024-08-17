"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleResonanceTabViewNew = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	RoleController_1 = require("../RoleController"),
	Log_1 = require("../../../../Core/Common/Log");
class RoleResonanceTabViewNew extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this._do = void 0),
			(this.Wmo = (e) => {
				(this._do = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
					this.PlayMontageStart(),
					this.qIt();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	UnBindRedDot() {
		this._do.IsTrialRole() ||
			RedDotController_1.RedDotController.UnBindRedDot("RoleResonanceTabHole");
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Wmo,
		);
	}
	OnStart() {
		(this.plo = this.OpenParam),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleResonanceTabViewNew",
					])
				: ((this._do = this.plo.GetCurSelectRoleData()),
					this.PlayMontageStart());
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(7);
	}
	OnBeforeShow() {
		this.qIt();
	}
	qIt() {
		var e = this._do.GetRoleConfig(),
			o = this.GetText(0);
		e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
			e.ResonantChainGroupId,
		);
		(e =
			(o.SetText(
				this._do.GetResonanceData().GetResonantChainGroupIndex() +
					"/" +
					e.length,
			),
			this.GetItem(1).SetUIActive(!this._do.IsTrialRole()),
			UiManager_1.UiManager.IsViewShow("RoleHandBookRootView"))) &&
			o.GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(!1);
	}
	OnBeforeHide() {
		this.UnBindRedDot();
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Wmo,
		);
	}
}
exports.RoleResonanceTabViewNew = RoleResonanceTabViewNew;
