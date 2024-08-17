"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeMemoryPlaceView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeMemoryRewardItemData {
	constructor() {
		(this.SeasonReward = void 0), (this.Config = void 0);
	}
}
class RoguelikeMemoryRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.GridItem = void 0),
			(this.Data = void 0),
			(this.OnBtnRewardClick = () => {
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					RoguelikeDefine_1.COLLECT_SCORE_ID,
				) >= this.Data.Config.Point &&
					RoguelikeController_1.RoguelikeController.RoguelikeSeasonRewardReceiveRequest(
						[this.Data?.Config?.Index ?? 0],
					).then((e) => {});
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[4, this.OnBtnRewardClick]]);
	}
	OnStart() {
		void 0 === this.GridItem &&
			((this.GridItem =
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this.GridItem.Initialize(this.GetItem(0).GetOwner())),
			this.GridItem.SetActive(!1);
	}
	Refresh(e, t, i) {
		this.Data = e;
		var o =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					RoguelikeDefine_1.COLLECT_SCORE_ID,
				) >= e.Config.Point,
			n =
				(o && !e.SeasonReward?.qms
					? this.GetButton(4).SetActive(!0)
					: this.GetButton(4).SetActive(!1),
				this.GridItem.SetActive(!0),
				ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
					e.Config.DropId,
				));
		n = [{ IncId: 0, ItemId: (n = Array.from(n))[0][0] }, n[0][1]];
		this.GridItem.Refresh(n),
			this.GetText(1).SetText(e.Config.Index.toString()),
			(this.GetSprite(2).useChangeColor = o),
			(this.GetSprite(3).useChangeColor = o),
			this.GetSprite(3).SetUIActive(0 !== i);
	}
}
class RoguelikeMemoryPlaceView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.CaptionItem = void 0),
			(this.LoopScrollView = void 0),
			(this.SeasonData = void 0),
			(this.CreateLoopScrollItem = () => new RoguelikeMemoryRewardItem()),
			(this.OnBtnTokenOverViewClick = () => {
				UiManager_1.UiManager.OpenView(
					"RoguelikeTokenOverView",
					this.SeasonData,
				);
			}),
			(this.OnBtnAchievementViewClick = () => {
				UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIText],
			[6, UE.UIText],
			[5, UE.UIText],
			[7, UE.UILoopScrollViewComponent],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.OnBtnTokenOverViewClick],
				[2, this.OnBtnAchievementViewClick],
			]);
	}
	OnStart() {
		(this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
			this.GetItem(0),
		)),
			this.CaptionItem.SetCloseCallBack(() => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(7),
				this.GetItem(8).GetOwner(),
				this.CreateLoopScrollItem,
			)),
			this.GetLoopScrollViewComponent(7)
				.RootUIComp.GetParentAsUIItem()
				.SetUIActive(!1),
			this.CaptionItem.SetHelpBtnActive(!1),
			(this.SeasonData = this.OpenParam);
		var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonReward(
				this.SeasonData.F8n,
			),
			t = [];
		for (let n = 0; n < e.length; n++) {
			var i = e[n],
				o = new RoguelikeMemoryRewardItemData();
			(o.SeasonReward = this.SeasonData.Yws[n]), (o.Config = i), t.push(o);
		}
		this.LoopScrollView.ReloadData(t), this.UpdateView();
	}
	UpdateView() {
		var e = this.SeasonData.Yws.length,
			t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				RoguelikeDefine_1.COLLECT_SCORE_ID,
			),
			i = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(3),
			"Roguelike_MemoryPlace_Level",
			e.toString(),
		),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(4),
				"Roguelike_MemoryPlace_Exp",
				t,
				i.PointItemMaxCount,
			),
			(e =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
					this.SeasonData.F8n,
				));
		let o = 0,
			n = 0;
		for (const t of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
			e.Achievement,
		))
			(n += t.GetMaxProgress()), (o += t.GetCurrentProgress());
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(5),
			"Rogue_MemoryPlace_Progress",
			o,
			n,
		),
			(t =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTokenBySeasonId(
					this.SeasonData.F8n,
				).length),
			(i = this.SeasonData.Xws.length),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(6),
				"Rogue_MemoryPlace_Progress",
				i,
				t,
			);
	}
}
exports.RoguelikeMemoryPlaceView = RoguelikeMemoryPlaceView;
