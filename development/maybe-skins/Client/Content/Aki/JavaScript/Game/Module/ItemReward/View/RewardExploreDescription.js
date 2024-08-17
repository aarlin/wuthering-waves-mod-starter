"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreDescription = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreDescription extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UIText]]), (this.BtnBindInfo = []);
	}
	Refresh(e) {
		var i = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
	}
}
exports.RewardExploreDescription = RewardExploreDescription;
