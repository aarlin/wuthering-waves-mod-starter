"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
class PowerItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t) {
		super(),
			(this.Hio = void 0),
			(this.wIt = void 0),
			(this.x4e = (t) => {
				1 === t && this.wIt(this.Hio);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	Refresh(t, e, o) {
		(this.Hio = t),
			this.GetText(10).SetText(t.StackValue.toString()),
			t.CostValue > t.StackValue &&
				this.GetText(10).SetColor(coinNotEnoughColor),
			this.GetSprite(7).SetUIActive(!1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.SetItemIcon(this.GetTexture(3), t.ItemId);
	}
	SetClickCallback(t) {
		this.wIt = t;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UITexture],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UITexture],
			[7, UE.UISprite],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.x4e]]);
	}
	SetIntoToggleGroup(t) {
		this.GetExtendToggle(0).SetToggleGroup(t.GetOwner());
	}
}
exports.PowerItem = PowerItem;
