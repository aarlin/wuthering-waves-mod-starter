"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonResultView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	CommonItemSimpleGrid_1 = require("../ItemGrid/CommonItemSimpleGrid"),
	CommonResultButton_1 = require("./CommonResultButton"),
	TIMERGAP = 1e3;
class CommonResultView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.ButtonMap = void 0),
			(this.ButtonItemMap = void 0),
			(this.aBt = new Array()),
			(this.RewardLayout = void 0),
			(this.hBt = void 0),
			(this.lBt = 0),
			(this._Bt = (t, e, i) => (
				(e = new CommonItemSimpleGrid_1.CommonItemSimpleGrid(
					e.GetOwner(),
				)).RefreshItem(t[0].ItemId, t[1]),
				{ Key: i, Value: e }
			)),
			(this.j3 = () => {
				this.aBt.forEach((t) => {
					t.DoTimerCallBack(this.lBt);
				}),
					this.lBt++,
					this.OnTimer();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UISprite],
			[7, UE.UISprite],
		];
	}
	OnStart() {
		this.GetText(2).SetUIActive(!1),
			this.SetResultText("ChallengeGetReward"),
			this.GetItem(3).SetUIActive(!1),
			(this.ButtonMap = new Map()),
			(this.ButtonItemMap = new Map()),
			this.SetupButtonFormat(),
			(this.RewardLayout = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(0),
				this._Bt,
			)),
			this.CFe();
	}
	OnBeforeDestroy() {
		this.jm(),
			this.uBt(),
			this.RewardLayout.ClearChildren(),
			(this.RewardLayout = void 0);
	}
	SetupButtonFormat() {}
	cBt(t) {
		var e = this.GetItem(3),
			i = this.GetItem(4);
		e = LguiUtil_1.LguiUtil.CopyItem(e, i);
		return (i = new CommonResultButton_1.CommonResultButton(e)).SetData(t), i;
	}
	uBt() {
		for (const t of this.ButtonMap.values()) t.Destroy();
		this.ButtonMap.clear(), this.ButtonItemMap.clear();
	}
	RefreshButtonList(t) {
		this.aBt.forEach((t, e) => {
			t.ResetData(), t.SetActive(!1);
		});
		var e,
			i = t.length,
			s = this.aBt,
			o = s.length;
		for (let r = 0; r < i; r++)
			(r < o
				? ((e = s[r]).SetData(t[r]), e)
				: ((e = this.cBt(t[r])), this.aBt.push(e), e)
			).SetActive(!0);
		this.aBt.forEach((t) => {
			t.DoRefreshCallBack();
		});
	}
	SetResultText(t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
	}
	SetTipsText(t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t),
			this.GetText(2).SetUIActive(!0);
	}
	CFe() {
		this.hBt = TimerSystem_1.TimerSystem.Forever(this.j3, 1e3);
	}
	OnTimer() {}
	jm() {
		TimerSystem_1.TimerSystem.Has(this.hBt) &&
			TimerSystem_1.TimerSystem.Remove(this.hBt),
			(this.hBt = void 0);
	}
}
exports.CommonResultView = CommonResultView;
