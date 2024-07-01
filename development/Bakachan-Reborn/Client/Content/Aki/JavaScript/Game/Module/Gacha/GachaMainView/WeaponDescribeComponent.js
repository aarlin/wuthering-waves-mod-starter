"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponDescribeComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
class WeaponDescribeComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.cjt = 0), (this.$be = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIHorizontalLayout],
			[3, UE.UITexture],
			[4, UE.UISprite],
			[5, UE.UISprite],
		];
	}
	OnStart() {
		(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
			this.GetHorizontalLayout(2),
		)),
			this.GetTexture(3)?.SetUIActive(!1),
			this.GetSprite(5)?.SetUIActive(!0);
	}
	Update(e, t = !1) {
		(this.cjt = e),
			(e =
				(e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(
					this.cjt,
				)).IdArray.length <= 0
					? this.cjt
					: e.IdArray[0]),
			(e =
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
					e,
				)) &&
				(this.GetText(0).ShowTextNew(e.WeaponName),
				this.GetItem(1).SetUIActive(t),
				(t =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_GachaWeaponBg",
					)),
				this.SetSpriteByPath(t, this.GetSprite(4), !1),
				this.vjt(e.WeaponType),
				this.HFe(e.QualityId));
	}
	HFe(e) {
		this.$be.RebuildLayout(e);
	}
	vjt(e) {
		for (const t of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
			if (e === t.Value) {
				this.SetSpriteByPath(t.Icon, this.GetSprite(5), !1);
				break;
			}
	}
}
exports.WeaponDescribeComponent = WeaponDescribeComponent;
