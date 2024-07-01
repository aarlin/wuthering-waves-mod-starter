"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RolePreviewDescribeTabView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	RoleController_1 = require("../../RoleUi/RoleController"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RolePreviewDescribeTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.CharacterVoiceTitleText = void 0),
			(this.CharacterVoiceNameText = void 0),
			(this.AttributeIconTexture = void 0),
			(this.AttributeText = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UITexture],
			[7, UE.UIText],
		];
	}
	OnStart() {
		this.rdt(), this.PlayMontageStart();
	}
	OnBeforeDestroy() {
		(this.CharacterVoiceTitleText = void 0),
			(this.CharacterVoiceNameText = void 0),
			(this.AttributeIconTexture = void 0),
			(this.AttributeText = void 0);
	}
	rdt() {
		var e,
			t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
		(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			t.GetRoleId(),
		)) &&
			(this.GetText(0).ShowTextNew(t.Name),
			(e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
				t.WeaponType,
			)),
			this.GetText(1).SetText(e),
			this.GetText(2).ShowTextNew(t.Introduction)),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleFilterWeapon"),
			(this.CharacterVoiceTitleText = this.GetText(4)),
			(this.CharacterVoiceNameText = this.GetText(5)),
			(this.AttributeIconTexture = this.GetTexture(6)),
			(this.AttributeText = this.GetText(7)),
			this.SetCharacterVoiceInfo(),
			this.SetAttributeInfo();
	}
	SetCharacterVoiceInfo() {
		this.CharacterVoiceTitleText.SetUIActive(!1),
			this.CharacterVoiceNameText.SetUIActive(!1);
	}
	SetAttributeInfo() {
		this.AttributeIconTexture.SetUIActive(!1),
			this.AttributeText.SetUIActive(!1);
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(3);
	}
	OnBeforeShow() {
		this.PlayMontageStart();
	}
}
exports.RolePreviewDescribeTabView = RolePreviewDescribeTabView;
