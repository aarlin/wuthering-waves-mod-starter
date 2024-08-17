"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridCurrentEquipmentComponent = void 0);
const UE = require("ue"),
	SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent"),
	BG_COLOR = "D5A831FF",
	TOP_COLOR = "FFFFFFFF";
class SmallItemGridCurrentEquipmentComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
		];
	}
	OnStart() {
		var e = UE.Color.FromHex(BG_COLOR);
		this.GetSprite(0).SetColor(e), (e = UE.Color.FromHex(TOP_COLOR));
		this.GetSprite(1).SetColor(e);
	}
	GetResourceId() {
		return "UiItem_ItemSelTick";
	}
	OnRefresh(e) {
		super.OnRefresh(e), this.SetUiActive(e);
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridCurrentEquipmentComponent =
	SmallItemGridCurrentEquipmentComponent;
