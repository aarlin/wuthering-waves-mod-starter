"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleWeaponTabView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	WeaponController_1 = require("../../Weapon/WeaponController"),
	WeaponDetailTipsComponent_1 = require("../../Weapon/WeaponDetailTipsComponent"),
	RoleController_1 = require("../RoleController"),
	Log_1 = require("../../../../Core/Common/Log");
class RoleWeaponTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this.Ddo = void 0),
			(this.fdo = () => {
				this.pdo = !1;
			}),
			(this.Rdo = (e) => {
				UiManager_1.UiManager.OpenView("WeaponReplaceView", e);
			}),
			(this.Udo = (e) => {
				(e = { WeaponIncId: e, IsFromRoleRootView: !0 }),
					UiManager_1.UiManager.OpenView("WeaponRootView", e),
					WeaponController_1.WeaponController.RoleFadeIn(
						UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
					);
			}),
			(this.Ado = (e, o) => {
				this.Ddo.UpdateWeaponLock(o);
			}),
			(this.pdo = !1),
			(this.Pdo = () => {
				(this.pdo = !0), this.PlayMontageStart(!0), this.xdo();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0);
		(this.Ddo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
			await this.Ddo.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnStart() {
		(this.plo = this.ExtraParams),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleWeaponTabView",
					])
				: (this.Ddo.SetCanShowEquip(!1),
					this.Ddo.SetReplaceFunction(this.Rdo),
					this.Ddo.SetCultureFunction(this.Udo));
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnItemLock,
			this.Ado,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Pdo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetRoleFlag,
				this.fdo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnItemLock,
			this.Ado,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Pdo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetRoleFlag,
				this.fdo,
			);
	}
	OnBeforeShow() {
		ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1),
			this.pdo
				? (this.PlayMontageStart(!0), (this.pdo = !1))
				: this.PlayMontageStart(!1),
			this.xdo();
	}
	OnBeforeDestroy() {
		this.Ddo && (this.Ddo.Destroy(), (this.Ddo = void 0));
	}
	PlayMontageStart(e = !1) {
		RoleController_1.RoleController.PlayRoleMontage(6, e);
	}
	xdo() {
		var e = this.plo.GetCurSelectRoleData(),
			o = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
				e.GetDataId(),
			);
		void 0 === o
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 59, "RoleWeaponTabView获取不到武器数据", [
					"roleId",
					e.GetDataId(),
				])
			: this.Ddo.UpdateComponent(o);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		return this.Ddo.GetGuideUiItemAndUiItemForShowEx(e);
	}
}
exports.RoleWeaponTabView = RoleWeaponTabView;
