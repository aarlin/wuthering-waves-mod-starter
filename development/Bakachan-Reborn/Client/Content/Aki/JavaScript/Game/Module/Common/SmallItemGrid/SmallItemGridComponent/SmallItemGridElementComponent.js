"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridElementComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridElementComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
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
exports.SmallItemGridElementComponent = SmallItemGridElementComponent;
