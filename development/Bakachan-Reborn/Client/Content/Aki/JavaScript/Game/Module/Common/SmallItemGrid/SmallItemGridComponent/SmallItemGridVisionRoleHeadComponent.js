"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridVisionRoleHeadComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisionRoleHeadComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	GetResourceId() {
		return "UiItem_ItemRoleS";
	}
	OnRefresh(e) {
		if (e) {
			var t = e;
			if (t && 0 !== t) {
				const o = this.GetTexture(0);
				var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
				i
					? (o.SetUIActive(!1),
						this.SetRoleIcon(i, o, t, void 0, () => {
							o.SetUIActive(!0);
						}),
						this.wxt(e),
						this.Bxt(e),
						this.SetActive(!0))
					: this.SetActive(!1);
			} else this.SetActive(!1);
		} else this.SetActive(!1);
	}
	wxt(e) {
		this.GetSprite(2).SetUIActive(!1);
	}
	Bxt(e) {
		this.GetSprite(1).SetUIActive(!0);
	}
}
exports.SmallItemGridVisionRoleHeadComponent =
	SmallItemGridVisionRoleHeadComponent;
