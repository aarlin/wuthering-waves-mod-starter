"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopRecommendTabItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
class PayShopRecommendTabItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor(e) {
		super(),
			(this.ToggleEvent = (e) => {
				1 === e && this.SelectedCallBack(this.GridIndex);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.ToggleEvent]]);
	}
	OnStart() {
		super.OnStart(), this.GetExtendToggle(0).SetToggleState(0);
	}
	SetName(e) {
		(e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e)),
			this.GetText(1).ShowTextNew(e.Name);
	}
	OnUpdateTabIcon(e) {}
	OnSetToggleState(e, t) {
		this.GetExtendToggle(0).SetToggleState(e, t);
	}
	GetTabToggle() {
		return this.GetExtendToggle(0);
	}
}
exports.PayShopRecommendTabItem = PayShopRecommendTabItem;
