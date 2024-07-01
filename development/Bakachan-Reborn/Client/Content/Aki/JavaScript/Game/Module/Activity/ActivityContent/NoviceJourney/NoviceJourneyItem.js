"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoviceJourneyItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	ActivityManager_1 = require("../../ActivityManager");
class NoviceJourneyItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.kh = new Map()),
			(this.Mke = 0),
			(this.sOe = []),
			(this.Lo = void 0),
			(this.CNe = void 0),
			(this.hOe = () => {
				if (1 === this.Mke)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
						"NewbieCourse_LevelTips",
					);
				else if (2 === this.Mke) {
					ActivityManager_1.ActivityManager.GetActivityController(
						this.CNe.Type,
					).RequestReward(this.Lo.Id);
					for (const e of this.sOe) e.SetReceivableVisible(!1);
				}
			}),
			(this.aOe = (e) => {
				2 !== this.Mke
					? ((e = e.Data),
						ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							e.ItemId,
						))
					: ActivityManager_1.ActivityManager.GetActivityController(
							this.CNe.Type,
						).RequestReward(this.Lo.Id);
			}),
			(this.Ske = () => {
				this.GetItem(5).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1),
					this.GetItem(4).SetUIActive(!1),
					this.GetItem(8).SetUIActive(!1);
				for (const e of this.sOe) e.SetLockVisible(!0);
			}),
			(this.Eke = () => {
				this.GetItem(5).SetUIActive(!0),
					this.GetItem(7).SetUIActive(!0),
					this.GetItem(4).SetUIActive(!1),
					this.GetItem(8).SetUIActive(!1),
					this.GetText(6).SetText(this.Lo.Id.toString());
				for (const e of this.sOe) e.SetReceivableVisible(!0);
			}),
			(this.yke = () => {
				this.GetItem(5).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1),
					this.GetItem(4).SetUIActive(!0),
					this.GetItem(8).SetUIActive(!0);
				for (const e of this.sOe) e.SetReceivedVisible(!0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.hOe]]);
	}
	async rOe(e) {
		var t = new RewardGridItem();
		t.BindOnExtendToggleClicked(this.aOe),
			await t.CreateThenShowByActorAsync(e),
			this.sOe.push(t);
	}
	async OnBeforeStartAsync() {
		var e = [this.GetItem(1), this.GetItem(2)],
			t = [];
		for (let i = 0, r = e.length; i < r; ++i) t.push(this.rOe(e[i].GetOwner()));
		await Promise.all(t);
	}
	OnStart() {
		this.kh.set(1, this.Ske),
			this.kh.set(2, this.Eke),
			this.kh.set(3, this.yke);
	}
	OnBeforeDestroy() {
		for (const e of this.sOe) this.AddChild(e);
	}
	SetActivityData(e) {
		this.CNe = e;
	}
	Refresh(e, t, i) {
		(this.Lo = e), this.GetText(0).SetText(e.Id.toString());
		var r =
			ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetRewardList(
				this.Lo.Reward,
			);
		for (let e = 0, t = this.sOe.length; e < t; ++e) {
			var s = this.sOe[e];
			e < r.length ? s.RefreshByData(r[e]) : s.SetActive(!1);
		}
		this.RefreshCurrentState();
	}
	RefreshCurrentState() {
		(this.Mke = this.CNe.GetRewardStateByLevel(this.Lo.Id)),
			this.kh.get(this.Mke)();
	}
	GetKey(e, t) {
		return this.Lo.Id;
	}
}
exports.NoviceJourneyItem = NoviceJourneyItem;
class RewardGridItem extends SmallItemGrid_1.SmallItemGrid {
	OnCanExecuteChange() {
		return !1;
	}
	RefreshByData(e) {
		(e = {
			Type: 4,
			Data: e,
			ItemConfigId: e.ItemId,
			BottomText: e.Count.toString(),
			IsReceivedVisible: !1,
		}),
			this.Apply(e);
	}
}
