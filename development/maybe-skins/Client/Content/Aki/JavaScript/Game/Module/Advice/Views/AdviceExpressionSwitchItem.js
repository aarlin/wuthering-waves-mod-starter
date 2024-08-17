"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceExpressionSwitchItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
class AdviceExpressionSwitchItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor() {
		super(...arguments),
			(this.Q9e = 0),
			(this.X9e = (e) => {
				1 === e && this.SelectedCallBack(this.Q9e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
		]),
			(this.BtnBindInfo = [[0, this.X9e]]);
	}
	OnStart() {
		super.OnStart(), this.GetExtendToggle(0).SetToggleState(0);
	}
	OnSetToggleState(e, t) {
		this.GetExtendToggle(0).SetToggleState(e, t);
	}
	OnRefresh(e, t, o) {
		this.UpdateTabIcon(e.Data?.GetIcon());
	}
	OnUpdateTabIcon(e) {}
	GetTabToggle() {
		return this.GetExtendToggle(0);
	}
	UpdateView(e) {
		(this.Q9e = e),
			(e =
				ConfigManager_1.ConfigManager.ChatConfig.GetExpressionGroupConfig(
					e,
				).GroupTexturePath),
			this.SetTextureByPath(e, this.GetTexture(1));
	}
}
exports.AdviceExpressionSwitchItem = AdviceExpressionSwitchItem;
