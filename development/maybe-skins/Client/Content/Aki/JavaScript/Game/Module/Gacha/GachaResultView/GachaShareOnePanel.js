"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaShareOnePanel = void 0);
const UE = require("ue"),
	GaChaShareById_1 = require("../../../../Core/Define/ConfigQuery/GaChaShareById"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class GachaShareOnePanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.$be = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIHorizontalLayout],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UITexture],
			[6, UE.UIText],
			[7, UE.UISprite],
		];
	}
	OnStart() {
		(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
			this.GetHorizontalLayout(1),
		)),
			this.PWt();
	}
	PWt() {
		var e = this.OpenParam.u5n.G3n,
			t = GaChaShareById_1.configGaChaShareById.GetConfig(e),
			a =
				((t =
					(this.SetTextureByPath(t.SharePic, this.GetTexture(0)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.Desc),
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e))),
				(t =
					(this.$be.RebuildLayout(t.QualityId),
					this.GetText(3).ShowTextNew(t.Name),
					this.GetTexture(5))),
				this.GetSprite(7)),
			i = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e);
		this.GetItem(4).SetUIActive(2 === i),
			t.SetUIActive(1 === i),
			a.SetUIActive(1 !== i),
			1 === i
				? ((i =
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
							e,
						).ElementId),
					(i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(i)),
					this.SetTextureByPath(i.Icon, t),
					t.SetColor(UE.Color.FromHex(i.ElementColor)))
				: ((t =
						ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
							e,
						)),
					(i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponIconPath(
						t.WeaponType,
					)),
					this.SetSpriteByPath(i, a, !1));
	}
}
exports.GachaShareOnePanel = GachaShareOnePanel;
