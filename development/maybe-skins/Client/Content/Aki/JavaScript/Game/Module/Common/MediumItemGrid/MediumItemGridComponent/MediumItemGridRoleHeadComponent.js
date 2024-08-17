"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridRoleHeadComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	GetResourceId() {
		return "UiItem_ItemRole";
	}
	OnRefresh(e) {
		var t = e.RoleConfigId;
		if (t) {
			const o = this.GetTexture(0);
			var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
			i
				? (o.SetUIActive(!1),
					this.SetRoleIcon(i, o, t, void 0, () => {
						o.SetUIActive(!0);
					}),
					this.GetSprite(1).SetUIActive(e.IsLightVisible ?? !1),
					this.SetActive(!0))
				: this.SetActive(!1);
		} else this.SetActive(!1);
	}
}
exports.MediumItemGridRoleHeadComponent = MediumItemGridRoleHeadComponent;
