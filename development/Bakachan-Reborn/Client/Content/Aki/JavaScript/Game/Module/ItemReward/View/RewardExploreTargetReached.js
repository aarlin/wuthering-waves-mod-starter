"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreTargetReached = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreTargetReached extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = []);
	}
	Refresh(e) {
		this.R0i(e.IsReached), this.U0i(e.DescriptionTextId, e.Target);
	}
	R0i(e) {
		this.GetSprite(0).SetUIActive(e);
	}
	U0i(e, t) {
		var i = this.GetText(1);
		StringUtils_1.StringUtils.IsEmpty(e)
			? i.SetUIActive(!1)
			: (LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, ...t), i.SetUIActive(!0));
	}
}
exports.RewardExploreTargetReached = RewardExploreTargetReached;
