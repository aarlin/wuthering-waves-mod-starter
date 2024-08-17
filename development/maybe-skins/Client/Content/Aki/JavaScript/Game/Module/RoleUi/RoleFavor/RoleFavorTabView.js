"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorTabView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleController_1 = require("../RoleController"),
	RoleFavorDefine_1 = require("./RoleFavorDefine");
class RoleFavorTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this.bl = () => {
				var e = this.plo.GetCurSelectRoleId(),
					o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e),
					t =
						((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name)),
					n = this.GetText(1),
					a = this.GetText(2),
					i = this.GetText(0);
				(e = 9 !== e.PartyId),
					(t = (e =
						(n.SetUIActive(e),
						a.SetUIActive(e),
						this.GetButton(6).RootUIComp.SetUIActive(e),
						this.GetButton(3).RootUIComp.SetUIActive(e),
						e ? i.SetText(t) : i.SetText(o.GetName()),
						o.GetFavorData())).GetFavorLevel()),
					LguiUtil_1.LguiUtil.SetLocalText(n, "FavorLevel", t),
					(i =
						ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(
							t,
						)),
					(o = e.GetFavorExp());
				i
					? LguiUtil_1.LguiUtil.SetLocalText(a, "RoleExp", o, i.LevelUpExp)
					: ((n =
							ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(
								t - 1,
							).LevelUpExp),
						LguiUtil_1.LguiUtil.SetLocalText(a, "RoleExp", n, n)),
					this.BNe();
			}),
			(this.BNe = () => {
				var e = this.plo.GetCurSelectRoleData().GetFavorData();
				this.GetItem(7).SetUIActive(e.IsFavorItemCanUnlock(1)),
					this.GetItem(8).SetUIActive(e.IsFavorItemCanUnlock(0)),
					this.GetItem(9).SetUIActive(e.IsFavorItemCanUnlock(2)),
					this.GetItem(10).SetUIActive(e.IsFavorItemCanUnlock(3));
			}),
			(this.OnClickExperienceButton = () => {
				var e = this.plo.GetCurSelectRoleId(),
					o =
						ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
							e,
						);
				o
					? ((o = new RoleFavorDefine_1.ContentItemData(1, e, o, 1)),
						UiManager_1.UiManager.OpenView("RoleFavorInfoView", o))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Role",
							44,
							"该角色的好感度配置FavorRoleInfo找不到！！！",
							["角色Id", e],
						);
			}),
			(this.OnClickVoiceButton = () => {
				var e = this.BuildContentItemData(0, 1);
				e.Config
					? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
					: ((e = this.plo.GetCurSelectRoleId()),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Role",
								44,
								"该角色的好感度配置FavorWord找不到！！！",
								["角色Id", e],
							));
			}),
			(this.OnClickActionButton = () => {
				var e = this.BuildContentItemData(2, 1);
				e.Config
					? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
					: ((e = this.plo.GetCurSelectRoleId()),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Role",
								44,
								"该角色的好感度配置Motion找不到！！！",
								["角色Id", e],
							));
			}),
			(this.OnClickPreciousItemButton = () => {
				var e = this.BuildContentItemData(3, void 0);
				e.Config
					? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
					: ((e = this.plo.GetCurSelectRoleId()),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Role",
								44,
								"该角色的好感度配置FavorGoods找不到！！！",
								["角色Id", e],
							));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.OnClickExperienceButton],
				[4, this.OnClickVoiceButton],
				[5, this.OnClickActionButton],
				[6, this.OnClickPreciousItemButton],
			]);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateRoleFavorData,
			this.bl,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.bl,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateRoleFavorData,
			this.bl,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.bl,
			);
	}
	OnStart() {
		(this.plo = this.ExtraParams),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleFavorTabView",
					])
				: RoleController_1.RoleController.SendRoleFavorListRequest();
	}
	OnBeforeShow() {
		this.PlayMontageStart(), this.BNe();
		var e = this.L_o();
		e && e.Montage_Stop(0), this.bl();
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(13);
	}
	D_o() {
		var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		if (e && ((e = e.Model?.CheckGetComponent(1)?.MainMeshComponent), e))
			return e;
	}
	L_o() {
		var e = this.D_o();
		if (e)
			return e
				.GetAnimInstance()
				.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
				);
	}
	BuildContentItemData(e, o) {
		var t = this.plo.GetCurSelectRoleId(),
			n = this.GetConfigByFavorTabType(e);
		return new RoleFavorDefine_1.ContentItemData(e, t, n, o);
	}
	GetConfigByFavorTabType(e) {
		var o = this.plo.GetCurSelectRoleId();
		let t;
		switch (e) {
			case 2:
				t = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
					o,
					1,
				)[0];
				break;
			case 1:
				t =
					ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
						o,
					);
				break;
			case 3:
				t =
					ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(
						o,
					)[0];
				break;
			case 0:
				t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
					o,
					1,
				)[0];
		}
		return t;
	}
}
exports.RoleFavorTabView = RoleFavorTabView;
