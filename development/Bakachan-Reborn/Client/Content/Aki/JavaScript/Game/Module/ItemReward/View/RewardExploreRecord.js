"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreRecord = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreRecord extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	Refresh(e) {
		var t = e.TitleTextId,
			i = !StringUtils_1.StringUtils.IsEmpty(t);
		i && this.LBt(t), this.m0i(i), this.L0i(e.Record), this.D0i(e.IsNewRecord);
	}
	LBt(e) {
		var t = this.GetText(0);
		StringUtils_1.StringUtils.IsEmpty(e) ||
			LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
	}
	m0i(e) {
		this.GetText(0).SetUIActive(e);
	}
	L0i(e) {
		this.GetText(1).SetText(e);
	}
	D0i(e) {
		this.GetItem(2).SetUIActive(e);
	}
}
exports.RewardExploreRecord = RewardExploreRecord;
