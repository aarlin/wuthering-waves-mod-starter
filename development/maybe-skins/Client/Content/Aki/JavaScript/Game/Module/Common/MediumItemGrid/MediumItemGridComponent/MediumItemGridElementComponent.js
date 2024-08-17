"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridElementComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridElementComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	GetResourceId() {
		return "UiItem_ItemElement";
	}
	OnRefresh(e) {
		var t, n, o;
		void 0 !== e &&
		(t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) &&
		"" !== (n = t.Icon5) &&
		0 !== n.length
			? ((o = this.GetTexture(0)),
				this.SetElementIcon(n, o, e),
				o.SetColor(UE.Color.FromHex(t.ElementColor)),
				this.SetActive(!0))
			: this.SetActive(!1);
	}
}
exports.MediumItemGridElementComponent = MediumItemGridElementComponent;
