"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridDisableComponent = void 0);
const UE = require("ue"),
	SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridDisableComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	OnRefresh(e) {
		this.SetActive(e);
	}
	SetSpriteColor(e) {
		(e = UE.Color.FromHex(e)), this.GetSprite(0).SetColor(e);
	}
	GetResourceId() {
		return "UiItem_SmallItemDark";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridDisableComponent = SmallItemGridDisableComponent;
