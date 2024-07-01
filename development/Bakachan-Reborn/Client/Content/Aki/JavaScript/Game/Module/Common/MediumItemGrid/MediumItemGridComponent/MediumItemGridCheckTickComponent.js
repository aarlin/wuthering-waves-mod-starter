"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridCheckTickComponent = void 0);
const UE = require("ue"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCheckTickComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
		];
	}
	GetResourceId() {
		return "UiItem_ItemSelTick";
	}
	OnRefresh(e) {
		var t = e.IsCheckTick;
		void 0 !== t &&
			(this.SetActive(t),
			void 0 !== (t = e.HexColor) && this.SetSpriteColor(t),
			void 0 !== (t = e.Alpha) && this.SetSpriteAlpha(t),
			void 0 !== (t = e.TickHexColor)) &&
			this.SetSpriteTickColor(t);
	}
	SetSpriteColor(e) {
		(e = UE.Color.FromHex(e)), this.GetSprite(0).SetColor(e);
	}
	SetSpriteAlpha(e) {
		this.GetSprite(0).SetAlpha(e);
	}
	SetSpriteTickColor(e) {
		(e = UE.Color.FromHex(e)), this.GetSprite(1).SetColor(e);
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.MediumItemGridCheckTickComponent = MediumItemGridCheckTickComponent;
