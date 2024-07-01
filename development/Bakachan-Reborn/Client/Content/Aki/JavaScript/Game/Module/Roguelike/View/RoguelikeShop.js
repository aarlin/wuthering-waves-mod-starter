"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeShop = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RogueSelectResult_1 = require("../Define/RogueSelectResult"),
	RoguelikeController_1 = require("../RoguelikeController"),
	ElementPanel_1 = require("./ElementPanel"),
	RogueInfoViewTokenDetail_1 = require("./RogueInfoViewTokenDetail"),
	RoguelikeShopDetail_1 = require("./RoguelikeShopDetail");
class RoguelikeShop extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.LoopScrollView = void 0),
			(this.ElementPanel = void 0),
			(this.ShopDetailPanel = void 0),
			(this.Data = void 0),
			(this.ShopIndex = 0),
			(this.LevelSequencePlayer = void 0),
			(this.CaptionItem = void 0),
			(this.Eho = () => {
				RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
					Protocol_1.Aki.Protocol._3s.Proto_ShopBindId,
				);
			}),
			(this.yho = () => {
				RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
			}),
			(this.Iho = (e, t, i) => {
				this.Tho(this.ShopIndex),
					this.ElementPanel?.Refresh(),
					this.CaptionItem?.SetCurrencyItemList([
						RoguelikeDefine_1.INSIDE_CURRENCY_ID,
					]),
					UiManager_1.UiManager.OpenView(
						"CommonSelectResultView",
						new RogueSelectResult_1.RogueSelectResult(
							ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
								?.PhantomEntry,
							t,
							e,
							!0,
						),
					);
			}),
			(this.Oao = (e, t) => {
				(ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e),
					this.LoopScrollView.SelectGridProxy(t, !1),
					this.ShopDetailPanel.Refresh(e);
			}),
			(this.Tho = (e) => {
				(this.ShopIndex = e),
					(this.Data =
						ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
							e,
						)),
					this.UpdateItemList(),
					this.GLn();
			}),
			(this.Hao = () =>
				new RogueInfoViewTokenDetail_1.RogueInfoViewTokenDetailGrid());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[5, UE.UILoopScrollViewComponent],
			[6, UE.UIItem],
			[1, UE.UIItem],
			[3, UE.UIButtonComponent],
			[2, UE.UIItem],
			[0, UE.UIItem],
			[4, UE.UIText],
			[7, UE.UITexture],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[3, this.Eho],
				[9, this.yho],
			]);
	}
	OnAfterShow() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Show"),
			this.Tho(this.ShopIndex);
	}
	async OnBeforeStartAsync() {
		(this.ElementPanel = new ElementPanel_1.ElementPanel()),
			await this.ElementPanel.CreateThenShowByActorAsync(
				this.GetItem(2).GetOwner(),
			),
			(this.ShopDetailPanel = new RoguelikeShopDetail_1.RoguelikeShopDetail()),
			await this.ShopDetailPanel.CreateThenShowByActorAsync(
				this.GetItem(1).GetOwner(),
			),
			(this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
				this.GetItem(0),
			)),
			this.CaptionItem.SetCloseCallBack(() => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			await this.CaptionItem.SetCurrencyItemList([
				RoguelikeDefine_1.INSIDE_CURRENCY_ID,
			]);
	}
	OnStart() {
		this.ElementPanel.Refresh(),
			(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(5),
				this.GetItem(6).GetOwner(),
				this.Hao,
			)),
			(this.Data = this.OpenParam),
			(this.ShopIndex = this.Data.Index),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			)),
			this.UpdateItemList(),
			this.GLn();
	}
	UpdateItemList() {
		var e = this.Data.RogueGainEntryList;
		e.sort((e, t) =>
			e.IsSell !== t.IsSell
				? e.IsSell
					? 1
					: -1
				: e.IsDiscounted() !== t.IsDiscounted()
					? e.IsDiscounted()
						? -1
						: 1
					: e.IsDiscounted() && t.IsDiscounted()
						? e.CurrentPrice - t.CurrentPrice
						: e.IsDiscounted() || t.IsDiscounted()
							? e.Index - t.Index
							: e.OriginalPrice - t.OriginalPrice,
		),
			this.LoopScrollView.RefreshByData(e),
			0 < this.Data.RogueGainEntryList.length &&
				((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
					this.Data.RogueGainEntryList[0]),
				this.LoopScrollView.SelectGridProxy(0, !1),
				this.ShopDetailPanel.Refresh(this.Data.RogueGainEntryList[0]));
	}
	GLn() {
		var e = this.Data.UseTime,
			t = this.Data.MaxTime,
			i = this.GetButton(3);
		i.RootUIComp.SetUIActive(0 < t), (e = t - e);
		const o = this.GetText(4);
		if (
			(e <= 0
				? LguiUtil_1.LguiUtil.SetLocalTextNew(o, "RoguelikeView_29_Text", e, t)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(o, "RoguelikeView_28_Text", e, t),
			0 < (t = this.Data.CostCurrency).length)
		) {
			t = t[0];
			var n =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					t.Ekn,
				) >= t.I5n;
			const o = n ? "RogueSpecialRefreshCost" : "RogueSpecialRefreshCost_Not";
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), o, t.I5n),
				i.SetSelfInteractive(0 < e && n),
				(i =
					ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
						t.Ekn,
					)),
				this.SetTextureByPath(i.IconSmall, this.GetTexture(7));
		}
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
			this.Oao,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeRefreshGain,
				this.Tho,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeChooseDataResult,
				this.Iho,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
			this.Oao,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeRefreshGain,
				this.Tho,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeChooseDataResult,
				this.Iho,
			);
	}
	OnBeforeHide() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Hide");
	}
}
exports.RoguelikeShop = RoguelikeShop;
