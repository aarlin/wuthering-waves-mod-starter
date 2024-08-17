"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MiniElementItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniElementItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, n) {
		super(),
			(this.Vyt = e),
			!n && t
				? this.CreateThenShowByResourceIdAsync(
						"UiItem_MiniElement_Prefab",
						t,
						!1,
					)
				: this.CreateThenShowByActor(n);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
		];
	}
	OnStart() {
		this.RefreshMiniElement(this.Vyt);
	}
	RefreshMiniElement(e) {
		var t,
			n = this.GetTexture(1);
		n &&
			(e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) &&
			"" !== (t = e.Icon5) &&
			0 !== t.length &&
			((t = UE.Color.FromHex(e.ElementColor)),
			this.GetSprite(0).SetColor(t),
			this.SetTextureByPath(e.Icon5, n));
	}
}
exports.MiniElementItem = MiniElementItem;
