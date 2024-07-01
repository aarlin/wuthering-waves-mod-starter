"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeAchievementView = exports.RoguelikeAchievementItem =
		void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AchievementController_1 = require("../../Achievement/AchievementController"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class RoguelikeAchievementItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.CommonGridItem = void 0),
			(this.Data = void 0),
			(this.OnBtnRewardClick = () => {
				AchievementController_1.AchievementController.RequestGetAchievementReward(
					!1,
					this.Data.GetId(),
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.OnBtnRewardClick]]);
	}
	OnStart() {
		void 0 === this.CommonGridItem &&
			((this.CommonGridItem =
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this.CommonGridItem.Initialize(this.GetItem(3).GetOwner())),
			this.CommonGridItem.SetActive(!1);
	}
	GetKey(e, t) {
		return e.GetId();
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	Update(e = void 0) {
		switch (
			((this.Data = e || this.Data),
			this.GetText(0).SetText(this.Data.GetDesc()),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				"Rogue_Achievement_Progress",
				this.Data.GetCurrentProgress(),
				this.Data.GetMaxProgress(),
			),
			this.Data.GetFinishState())
		) {
			case 1:
				this.GetItem(2).SetUIActive(!1),
					this.GetButton(4).RootUIComp.SetUIActive(!0),
					this.GetItem(6).SetUIActive(!1);
				break;
			case 0:
				this.GetItem(2).SetUIActive(!1),
					this.GetButton(4).RootUIComp.SetUIActive(!1),
					this.GetItem(6).SetUIActive(!0);
				break;
			case 2:
				this.GetItem(2).SetUIActive(!0),
					this.GetButton(4).RootUIComp.SetUIActive(!1),
					this.GetItem(6).SetUIActive(!1);
		}
		0 < (e = this.Data.GetRewards()).length &&
			(this.CommonGridItem.SetActive(!0), this.CommonGridItem.Refresh(e[0]));
	}
}
exports.RoguelikeAchievementItem = RoguelikeAchievementItem;
class RoguelikeAchievementView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TabComponent = void 0),
			(this.AchievementGroupDataList = []),
			(this.TabDataList = []),
			(this.AchievementScrollView = void 0),
			(this.OnAchievementDataWithIdNotify = (e) => {
				this.pqe(this.TabComponent.GetSelectedIndex());
			}),
			(this.jao = () => new RoguelikeAchievementItem()),
			(this.CloseClick = () => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.dVe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.pqe = (e) => {
				(e = this.AchievementGroupDataList[e]), this.RefreshAchievementList(e);
			}),
			(this.yqe = (e) => (
				(e = this.TabDataList[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	async OnBeforeStartAsync() {
		var e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
		if (void 0 !== e)
			if (
				((e =
					ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
						e.F8n,
					)),
				(this.AchievementGroupDataList =
					ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
						e.Achievement,
					)),
				this.AchievementGroupDataList.length <= 0)
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Roguelike",
						59,
						"RoguelikeAchievementView成就id无效",
						["AchievementId", e.Achievement.toString()],
					);
			else {
				const e = new CommonTabComponentData_1.CommonTabComponentData(
					this.dVe,
					this.pqe,
					this.yqe,
				);
				(this.TabComponent =
					new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
						this.GetItem(0),
						e,
						this.CloseClick,
					)),
					(this.AchievementScrollView =
						new GenericScrollViewNew_1.GenericScrollViewNew(
							this.GetScrollViewWithScrollbar(2),
							this.jao,
						)),
					(this.TabDataList =
						ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
							"RoguelikeAchievementView",
						));
				var t = this.TabDataList.length,
					i = (await this.TabComponent.RefreshTabItemByLengthAsync(t), []);
				for (let e = 0; e < t; e++) {
					const t = new CommonTabItemBase_1.CommonTabItemData();
					var o = this.TabDataList[e];
					o = new CommonTabData_1.CommonTabData(
						o.Icon,
						new CommonTabTitleData_1.CommonTabTitleData(o.TabName),
					);
					(t.RedDotName = "RoguelikeAchievementGroup"),
						(t.RedDotUid = this.AchievementGroupDataList[e].GetId()),
						(t.Data = o),
						i.push(t);
				}
				await this.TabComponent.RefreshTabItemAsync(i),
					this.TabComponent.SelectToggleByIndex(0);
			}
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.OnAchievementDataWithIdNotify,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.OnAchievementDataWithIdNotify,
		);
	}
	RefreshAchievementList(e) {
		(e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
			e.GetId(),
		)).sort((e, t) => t.GetFinishSort() - e.GetFinishSort()),
			this.AchievementScrollView.RefreshByData(e);
	}
}
exports.RoguelikeAchievementView = RoguelikeAchievementView;
