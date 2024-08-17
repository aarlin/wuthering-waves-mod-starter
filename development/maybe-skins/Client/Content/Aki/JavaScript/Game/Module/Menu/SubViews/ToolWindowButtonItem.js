"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ToolWindowButtonItem = void 0);
const UE = require("ue"),
	ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
class ToolWindowButtonItem extends ButtonAndTextItem_1.ButtonAndTextItem {
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, UE.UISprite]);
	}
	OnStart() {
		this.SetIconVisible(!1);
	}
	RefreshIcon(t, e) {
		this.SetSpriteByPath(t, this.GetSprite(2), !1, void 0, e);
	}
	SetIconVisible(t) {
		this.GetSprite(2).SetUIActive(t);
	}
}
exports.ToolWindowButtonItem = ToolWindowButtonItem;
