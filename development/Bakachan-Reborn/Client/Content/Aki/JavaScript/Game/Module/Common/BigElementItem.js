"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BigElementItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class BigElementItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.Vyt = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
		];
	}
	OnStart() {}
	Refresh(e) {
		var t, i;
		this.Vyt !== e &&
			((this.Vyt = e), (t = this.GetTexture(1))) &&
			(i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) &&
			((e = i.Icon4Pure),
			StringUtils_1.StringUtils.IsEmpty(e) ||
				((i = UE.Color.FromHex(i.ElementColor)),
				this.GetSprite(0).SetColor(i),
				this.SetTextureByPath(e, t)));
	}
}
exports.BigElementItem = BigElementItem;
