"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RolePreviewAttributeTabView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	RoleController_1 = require("../RoleController"),
	RoleFavorUtil_1 = require("../RoleFavor/RoleFavorUtil"),
	RoleLevelUpSuccessAttributeView_1 = require("../RoleLevel/RoleLevelUpSuccessAttributeView"),
	Log_1 = require("../../../../Core/Common/Log");
class RolePreviewAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.RoleViewAgent = void 0),
			(this.RoleInstance = void 0),
			(this.Qft = void 0),
			(this.Yuo = (e) => {
				this.PlayMontageStartWithReLoop(), this.VC(e);
			}),
			(this.ndo = (e, t, o) => {
				var n = new RoleLevelUpSuccessAttributeView_1.RoleAttributeItem();
				return (
					n.SetRootActor(t.GetOwner(), !0), n.Refresh(e), { Key: o, Value: n }
				);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
			[4, UE.UIText],
		];
	}
	OnStart() {
		(this.RoleViewAgent = this.ExtraParams),
			void 0 === this.RoleViewAgent
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RolePreviewAttributeTabView",
					])
				: (this.Qft = new GenericLayoutNew_1.GenericLayoutNew(
						this.GetVerticalLayout(3),
						this.ndo,
					));
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Yuo,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Yuo,
		);
	}
	OnBeforeShow() {
		this.PlayMontageStart();
		var e = this.RoleViewAgent.GetCurSelectRoleId();
		this.VC(e);
	}
	OnBeforeDestroy() {
		(this.RoleInstance = void 0),
			this.Qft?.ClearChildren(),
			(this.Qft = void 0);
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(3);
	}
	PlayMontageStartWithReLoop() {
		RoleController_1.RoleController.PlayRoleMontage(3, !1, !0, !1);
	}
	VC(e) {
		(this.RoleInstance =
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
			this.sdo(),
			this.ado(),
			this.hdo(),
			this.ldo();
	}
	ado() {
		var e = this.RoleInstance.GetElementInfo();
		this.SetElementIcon(
			e.Icon,
			this.GetTexture(1),
			this.RoleInstance.GetRoleConfig().ElementId,
		),
			(e =
				ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
					e.Name,
				));
		this.GetText(2).SetText(e);
	}
	sdo() {
		this.GetText(0).SetText(this.RoleInstance.GetName());
	}
	hdo() {
		var e =
				ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
					this.RoleInstance.GetRoleId(),
				),
			t = this.RoleInstance.GetRoleConfig(),
			o = [];
		(t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
			t.WeaponType,
		)),
			o.push({ Name: "Text_Weapon_Text", CurText: t }),
			e &&
				((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Sex)),
				o.push({ Name: "PrefabTextItem_3159729083_Text", CurText: t }),
				(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Country)),
				o.push({ Name: "PrefabTextItem_3969856612_Text", CurText: t }),
				(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Influence)),
				o.push({ Name: "PrefabTextItem_152395022_Text", CurText: t })),
			(e = RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(
				this.RoleInstance.GetRoleId(),
			)),
			(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e));
		o.push({ Name: "Text_CharacterVoice_Text", CurText: t });
		let n = !0;
		for (const e of o) (e.ShowArrow = !1), (n = !(e.InnerShowBg = n));
		this.Qft?.RebuildLayoutByDataNew(o);
	}
	ldo() {
		var e = this.RoleInstance.GetRoleConfig();
		this.GetText(4).ShowTextNew(e.Introduction);
	}
}
exports.RolePreviewAttributeTabView = RolePreviewAttributeTabView;
