"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreToggle = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreToggle extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.A0i = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[1, UE.UIExtendToggle],
			[0, UE.UIText],
		];
	}
	OnStart() {
		this.A0i = this.GetExtendToggle(1);
	}
	OnBeforeDestroy() {
		this.A0i = void 0;
	}
	Refresh(e) {
		this.A0i.OnStateChange.Add(e.OnToggleClick),
			StringUtils_1.StringUtils.IsEmpty(e.DescriptionTextId) ||
				this.LBt(e.DescriptionTextId);
	}
	LBt(e) {
		var t;
		StringUtils_1.StringUtils.IsEmpty(e) ||
			((t = this.GetText(0)), LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
	}
}
exports.RewardExploreToggle = RewardExploreToggle;
