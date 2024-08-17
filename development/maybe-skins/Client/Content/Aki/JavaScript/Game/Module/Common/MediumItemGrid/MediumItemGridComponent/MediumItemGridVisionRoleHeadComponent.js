"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridVisionRoleHeadComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisionRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
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
			const n = this.GetTexture(0);
			var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
			i
				? (n.SetUIActive(!1),
					this.SetRoleIcon(i, n, t, void 0, () => {
						n.SetUIActive(!0);
					}),
					this.wxt(e),
					this.Bxt(e),
					this.SetActive(!0))
				: this.SetActive(!1);
		} else this.SetActive(!1);
	}
	wxt(e) {
		if (
			((e = e.VisionUniqueId),
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e))
		) {
			let t = "";
			(t = (e =
				ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e))
				? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgB()
				: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgA()),
				this.SetSpriteByPath(t, this.GetSprite(2), !1);
		}
		this.GetSprite(2).SetUIActive(!0);
	}
	Bxt(e) {
		if (
			((e = e.VisionUniqueId),
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e))
		) {
			let t = "";
			(t = (e =
				ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e))
				? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgB()
				: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgA()),
				this.SetSpriteByPath(t, this.GetSprite(1), !1);
		}
		this.GetSprite(1).SetUIActive(!0);
	}
}
exports.MediumItemGridVisionRoleHeadComponent =
	MediumItemGridVisionRoleHeadComponent;
