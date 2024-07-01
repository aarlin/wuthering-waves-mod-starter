"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemRewardModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	RewardData_1 = require("./RewardData/RewardData");
class ItemRewardModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.qgi = void 0), (this.CurrentReasonId = void 0);
	}
	OnClear() {
		return (this.qgi = void 0), !(this.CurrentReasonId = void 0);
	}
	RefreshRewardData(e, t) {
		return (
			(e = { Type: 0, ViewName: e }),
			this.qgi || this.NewRewardData(),
			this.qgi.SetRewardInfo(e),
			this.qgi.SetItemList(t),
			this.qgi
		);
	}
	RefreshExploreLevelRewardData(e, t, i, r) {
		return (
			(e = {
				Type: 0,
				ViewName: e,
				CurrentExploreLevel: t,
				TargetExploreLevel: i,
			}),
			this.qgi || this.NewRewardData(),
			this.qgi.SetRewardInfo(e),
			this.qgi.SetItemList(r),
			this.qgi
		);
	}
	RefreshCommonRewardDataFromConfig(e, t, i, r) {
		if (
			(e =
				ConfigManager_1.ConfigManager.ItemRewardConfig.GetCommonRewardViewDisplayConfig(
					e,
				))
		)
			return (
				(t = {
					Type: 1,
					ViewName: t,
					AudioId: e.AudioId,
					Title: e.Title,
					ContinueText: e.ContinueText,
					IsItemVisible: e.IsItemVisible,
					OnCloseCallback: r,
				}),
				this.qgi || this.NewRewardData(),
				this.qgi.SetRewardInfo(t),
				this.qgi.SetItemList(i),
				this.qgi
			);
	}
	RefreshCompositeRewardDataFromConfig(e, t = !0, i, r) {
		if (
			(e =
				ConfigManager_1.ConfigManager.ItemRewardConfig.GetCompositeRewardViewDisplayConfig(
					e,
				))
		)
			return (
				(t = {
					Type: 2,
					ViewName: "CompositeRewardView",
					AudioId: e.AudioId,
					IsSuccess: t,
					Title: e.Title,
					ContinueText: e.ContinueText,
					TitleIconPath: e.TitleIconPath,
					IsProgressVisible: e.IsProgressVisible,
					ProgressBarTitle: e.ProgressBarTitle,
					ProgressBarAnimationTime: e.ProgressBarAnimationTime,
					IsItemVisible: e.IsItemVisible,
				}),
				this.qgi || this.NewRewardData(),
				this.qgi.SetRewardInfo(t),
				this.qgi.SetItemList(i),
				r && this.qgi.SetProgressQueue(r),
				this.qgi
			);
	}
	RefreshExploreRewardDataFromConfig(e, t = !0, i, r, s, a, o, n, g, d) {
		if (
			(e =
				ConfigManager_1.ConfigManager.ItemRewardConfig.GetExploreRewardDisplayConfig(
					e,
				))
		)
			return (
				(t = {
					Type: 3,
					ViewName: "ExploreRewardView",
					AudioId: e.AudioId,
					IsSuccess: t,
					Title: e.Title,
					TitleHexColor: e.TitleHexColor,
					TitleIconPath: e.TitleIconPath,
					TitleIconHexColor: e.TitleIconHexColor,
					IsRecordVisible: e.IsRecordVisible,
					IsItemVisible: e.IsItemVisible,
					IsExploreProgressVisible: e.IsExploreProgressVisible,
					ExploreBarTipsTextId: e.ExploreBarTipsTextId,
					IsDescription: e.IsDescription,
					Description: e.Description,
					OnCloseCallback: g,
					Tip: d,
				}),
				this.qgi || this.NewRewardData(),
				this.qgi.SetRewardInfo(t),
				this.qgi.SetItemList(i),
				r && this.qgi.SetExploreRecordInfo(r),
				s && this.qgi.SetExploreBarDataList(s),
				a && this.qgi.SetButtonInfoList(a),
				o && this.qgi.SetTargetReached(o),
				n && this.qgi.SetStateToggle(n),
				this.qgi
			);
	}
	SetItemList(e) {
		this.qgi || this.NewRewardData(),
			!e ||
				e.length < 1 ||
				(this.qgi.SetItemList(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshRewardViewItemList,
					e,
				));
	}
	AddItemList(e) {
		this.qgi || this.NewRewardData(),
			!e ||
				e.length < 1 ||
				(this.qgi.AddItemList(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshRewardViewItemList,
					e,
				));
	}
	SetProgressQueue(e) {
		this.qgi || this.NewRewardData(),
			this.qgi.SetProgressQueue(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshRewardProgressBar,
			);
	}
	SetExploreBarDataList(e) {
		this.qgi || this.NewRewardData(), this.qgi.SetExploreBarDataList(e);
	}
	SetExploreRecordInfo(e) {
		this.qgi || this.NewRewardData(), this.qgi.SetExploreRecordInfo(e);
	}
	SetButtonList(e) {
		this.qgi || this.NewRewardData(),
			!e ||
				e.length < 1 ||
				(this.qgi.SetButtonInfoList(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRefreshRewardButton,
				));
	}
	NewRewardData() {
		var e;
		return this.qgi || ((e = new RewardData_1.RewardData()), (this.qgi = e));
	}
	ClearCurrentRewardData() {
		this.qgi = void 0;
	}
	GetCurrentRewardData() {
		return this.qgi;
	}
}
exports.ItemRewardModel = ItemRewardModel;
