"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreRewardView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ItemRewardController_1 = require("../ItemRewardController"),
	RewardExploreBarList_1 = require("./RewardExploreBarList"),
	RewardExploreConfirmButton_1 = require("./RewardExploreConfirmButton"),
	RewardExploreDescription_1 = require("./RewardExploreDescription"),
	RewardExploreRecord_1 = require("./RewardExploreRecord"),
	RewardExploreScore_1 = require("./RewardExploreScore"),
	RewardExploreTargetReachedList_1 = require("./RewardExploreTargetReachedList"),
	RewardExploreToggle_1 = require("./RewardExploreToggle"),
	RewardItemList_1 = require("./RewardItemList"),
	SUCCESS_OUTLINE_COLOR = "C48B29FF",
	FAIL_OUTLINE_COLOR = "B33100FF";
class ExploreRewardView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.jIt = void 0),
			(this.Ggi = void 0),
			(this.Ngi = void 0),
			(this.$gi = void 0),
			(this.sOe = void 0),
			(this.Ygi = void 0),
			(this.Jgi = void 0),
			(this.zgi = void 0),
			(this.Zgi = void 0),
			(this.SPr = void 0),
			(this.LZe = []),
			(this.e0i = () => {
				var e = this.Ngi.ButtonInfoList;
				if (e && 0 < e?.length) {
					let t = 0;
					for (const i of e) this.LZe[t].Refresh(i), t++;
				}
			}),
			(this.B$t = (e) => {
				this.sOe && this.sOe.Refresh(this.jIt.GetItemList());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIText],
			[20, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshRewardButton,
				this.e0i,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshRewardButton,
				this.e0i,
			);
	}
	async OnBeforeStartAsync() {
		(this.jIt = this.OpenParam),
			(this.Ggi = this.jIt.GetRewardInfo()),
			(this.Ngi = this.jIt.GetExtendRewardInfo()),
			this.GetItem(5).SetUIActive(!1),
			this.Ggi.IsRecordVisible &&
				this.Ngi.ExploreRecordInfo &&
				(await this.t0i()),
			this.Ggi.IsDescription &&
				!StringUtils_1.StringUtils.IsEmpty(this.Ggi.Description) &&
				(await this.i0i()),
			this.Ggi.IsItemVisible &&
				this.Ngi.ItemList &&
				0 < this.Ngi.ItemList?.length &&
				(await this.o0i()),
			this.Ggi.IsExploreProgressVisible &&
				this.Ngi.ExploreBarDataList &&
				(await this.r0i()),
			this.Ngi.TargetReached &&
				0 < this.Ngi.TargetReached?.length &&
				(await this.n0i()),
			this.Ngi.StateToggle && (await this.s0i()),
			this.Ngi.ScoreReached && (await this.EPr());
		var e = this.Ngi.ButtonInfoList;
		if (e && 0 < e?.length) {
			let t = 0;
			for (const i of e) this.a0i(i, t), t++;
		}
		(e = this.jIt.GetRewardInfo().AudioId),
			ItemRewardController_1.ItemRewardController.PlayAudio(e);
	}
	OnStart() {
		this.h0i(),
			this.G$t() && (this.L0t(), this.l0i()),
			this.Qgi() && this.Xgi();
	}
	OnAfterPlayStartSequence() {
		this.jIt.GetRewardInfo().IsSuccess
			? this.UiViewSequence.PlaySequence("Success", !0)
			: this.UiViewSequence.PlaySequence("Fail", !0);
	}
	OnBeforeDestroy() {
		this.Ggi.OnCloseCallback?.(),
			(this.jIt = void 0),
			(this.Ggi = void 0),
			this.$gi?.Destroy(),
			(this.$gi = void 0),
			this.sOe?.Destroy(),
			(this.sOe = void 0),
			this.Ygi?.Destroy(),
			(this.Ygi = void 0),
			this.zgi?.Destroy(),
			(this.zgi = void 0),
			this.Zgi?.Destroy(),
			(this.Zgi = void 0),
			this.Jgi?.Destroy(),
			(this.Jgi = void 0);
		for (const e of this.LZe) e.Destroy();
		(this.LZe.length = 0),
			ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
	}
	G$t() {
		var e = this.GetItem(0),
			t = this.Ggi.Title;
		t = !StringUtils_1.StringUtils.IsEmpty(t);
		return e.SetUIActive(t), t;
	}
	L0t() {
		var e = this.GetText(1),
			t = this.Ggi.Title;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
	}
	h0i() {
		this.GetItem(18).SetUIActive(void 0 !== this.Ggi.Tip),
			this.Ggi.Tip && this.GetText(19).SetText(this.Ggi.Tip);
	}
	l0i() {
		var e = this.GetText(1),
			t = e.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass()),
			i = this.Ggi.TitleHexColor;
		StringUtils_1.StringUtils.IsEmpty(i) || e.SetColor(UE.Color.FromHex(i)),
			this.Ggi.IsSuccess
				? t.SetOutlineColor(UE.Color.FromHex("C48B29FF"))
				: t.SetOutlineColor(UE.Color.FromHex("B33100FF"));
	}
	Qgi() {
		var e = this.GetTexture(2),
			t = this.Ggi.TitleIconPath;
		t = !StringUtils_1.StringUtils.IsEmpty(t);
		return e.SetUIActive(t), t;
	}
	Xgi() {
		const e = this.GetTexture(2);
		var t = this.Ggi.TitleIconPath,
			i = this.Ggi.TitleIconHexColor;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			(e.SetUIActive(!1),
			this.SetTextureByPath(t, e, void 0, () => {
				e.SetUIActive(!0);
			})),
			StringUtils_1.StringUtils.IsEmpty(i) || e.SetColor(UE.Color.FromHex(i));
	}
	async t0i() {
		var e,
			t = this.Ngi.ExploreRecordInfo;
		t &&
			((e = this.GetItem(3)),
			(this.$gi = new RewardExploreRecord_1.RewardExploreRecord()),
			await this.$gi.CreateThenShowByResourceIdAsync("Uiitem_ResultRecord", e),
			this.$gi.Refresh(t));
	}
	async o0i() {
		var e,
			t = this.jIt.GetItemList();
		!t ||
			t.length < 1 ||
			((e = this.GetItem(3)),
			(this.sOe = new RewardItemList_1.RewardItemList()),
			await this.sOe.CreateThenShowByResourceIdAsync("Uiitem_TipsItem", e),
			this.sOe.Refresh(t));
	}
	async r0i() {
		var e,
			t = this.Ngi.ExploreBarDataList;
		!t ||
			t.length < 1 ||
			((e = this.GetItem(3)),
			(this.Ygi = new RewardExploreBarList_1.RewardExploreBarList()),
			await this.Ygi.CreateThenShowByResourceIdAsync("Uiitem_ResultBar", e),
			this.Ygi.Refresh(this.Ggi.ExploreBarTipsTextId, t));
	}
	async i0i() {
		var e,
			t = this.Ggi.Description;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = this.GetItem(3)),
			(this.Jgi = new RewardExploreDescription_1.RewardExploreDescription()),
			await this.Jgi.CreateThenShowByResourceIdAsync("Uiitem_ResultDesc", e),
			this.Jgi.Refresh(t));
	}
	async n0i() {
		var e,
			t = this.Ngi.TargetReached;
		!t ||
			t.length < 1 ||
			((e = this.GetItem(3)),
			(this.zgi =
				new RewardExploreTargetReachedList_1.RewardExploreTargetReachedList()),
			await this.zgi.CreateThenShowByResourceIdAsync("UiItem_Settlement", e),
			this.zgi.SetBarList(t));
	}
	async s0i() {
		var e,
			t = this.Ngi.StateToggle;
		t &&
			((e = this.GetItem(6)),
			(this.Zgi = new RewardExploreToggle_1.RewardExploreToggle()),
			await this.Zgi.CreateThenShowByResourceIdAsync(
				"UiItem_SettlementToggle",
				e,
			),
			this.Zgi.Refresh(t));
	}
	async EPr() {
		var e,
			t = this.Ngi.ScoreReached;
		t &&
			((e = this.GetItem(20)),
			(this.SPr = new RewardExploreScore_1.RewardExploreScore()),
			await this.SPr.CreateThenShowByResourceIdAsync("UiItem_ResultScore", e),
			this.SPr.Refresh(t));
	}
	a0i(e, t) {
		var i = this.GetItem(5),
			s = this.GetItem(4);
		i = LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), s);
		return (
			(s = new RewardExploreConfirmButton_1.RewardExploreConfirmButton(
				i,
				t,
			)).Refresh(e),
			s.SetActive(!0),
			this.LZe.push(s),
			s
		);
	}
}
exports.ExploreRewardView = ExploreRewardView;
