"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreConfirmButton = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreConfirmButton extends UiPanelBase_1.UiPanelBase {
	constructor(i, e) {
		super(),
			(this.g0i = void 0),
			(this.f0i = void 0),
			(this.p0i = void 0),
			(this.v0i = () => {
				--this.f0i,
					this.f0i <= 0 &&
						(this.M0i(),
						this.g0i.OnTimeDownOnCallback && this.g0i.OnTimeDownOnCallback(),
						this.g0i.IsTimeDownCloseView) &&
						UiManager_1.UiManager.CloseView("ExploreRewardView");
				var i = this.g0i.DescriptionTextId,
					e = this.GetText(2);
				LguiUtil_1.LguiUtil.SetLocalTextNew(e, i, this.f0i);
			}),
			(this.m2e = () => {
				var i = this.g0i.OnClickedCallback;
				i && i(this.S0i),
					this.g0i.IsClickedCloseView &&
						UiManager_1.UiManager.CloseView("ExploreRewardView");
			}),
			(this.S0i = e),
			this.CreateThenShowByActor(i);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.m2e]]);
	}
	OnBeforeDestroy() {
		this.M0i(), (this.g0i = void 0);
	}
	Refresh(i) {
		(this.g0i = i),
			this.E0i(i.ButtonTextId),
			(i = !StringUtils_1.StringUtils.IsEmpty(i.DescriptionTextId)),
			this.y0i(i),
			i && this.I0i();
	}
	E0i(i) {
		var e = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(e, i);
	}
	y0i(i) {
		this.GetItem(1).SetUIActive(i);
	}
	I0i() {
		var i = this.g0i.DescriptionTextId,
			e = this.g0i.DescriptionArgs,
			t = this.g0i.TimeDown,
			s = this.GetText(2);
		t && 0 < t
			? (LguiUtil_1.LguiUtil.SetLocalTextNew(
					s,
					i,
					t / TimeUtil_1.TimeUtil.InverseMillisecond,
				),
				this.T0i(t))
			: LguiUtil_1.LguiUtil.SetLocalTextNew(s, i, ...e);
	}
	T0i(i) {
		(this.f0i = i / TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.p0i = TimerSystem_1.TimerSystem.Forever(this.v0i, 1e3));
	}
	M0i() {
		this.p0i &&
			TimerSystem_1.TimerSystem.Has(this.p0i) &&
			(TimerSystem_1.TimerSystem.Remove(this.p0i), (this.p0i = void 0));
	}
}
exports.RewardExploreConfirmButton = RewardExploreConfirmButton;
