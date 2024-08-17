"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostTabItem = void 0);
const UE = require("ue"),
	CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
class CostTabItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor(e) {
		super(),
			(this.wqe = void 0),
			(this.x4e = (e) => {
				1 === e && this.SelectedCallBack(this.GridIndex);
			}),
			(this.wqe = e);
	}
	Init() {
		this.SetRootActor(this.wqe.GetOwner(), !0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.x4e]]);
	}
	OnStart() {
		super.OnStart(), this.GetExtendToggle(1).SetToggleState(0);
	}
	OnUpdateTabIcon(e) {
		this.SetSpriteByPath(e, this.GetSprite(0), !1, void 0);
	}
	OnSetToggleState(e, t) {
		this.GetExtendToggle(1).SetToggleState(e, t);
	}
	GetTabToggle() {
		return this.GetExtendToggle(1);
	}
}
exports.CostTabItem = CostTabItem;
