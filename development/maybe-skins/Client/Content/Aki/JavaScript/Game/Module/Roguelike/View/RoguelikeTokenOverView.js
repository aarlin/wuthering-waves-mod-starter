"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeTokenOverView =
		exports.RoguelikeTokenGrid =
		exports.RogueTokenData =
			void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	RoguelikeController_1 = require("../RoguelikeController");
class RogueTokenData {
	constructor() {
		(this.IsReceive = !1), (this.Config = void 0);
	}
}
exports.RogueTokenData = RogueTokenData;
class RoguelikeTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.OnClicked = () => {
				this.ScrollViewDelegate.SelectGridProxy(
					this.GridIndex,
					this.DisplayIndex,
					!0,
				);
			});
	}
	OnStart() {
		this.BindOnExtendToggleClicked(this.OnClicked);
	}
	OnRefresh(e, t, o) {
		this.Data = e;
		var i = {
			Type: 4,
			Data: e,
			IconPath: (i =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
					e.Config.Token,
				)).BuffIcon,
			QualityId: i.Quality,
			BottomTextId: i.BuffName,
			QualityType: "MediumItemGridQualitySpritePath",
			IsProhibit: void 0 === e.IsReceive,
		};
		this.Apply(i), this.SetSelected(t), t && this.OnSelected(!0);
	}
	OnSelected(e) {
		e &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoguelikeSelectToken,
				this,
			);
	}
}
exports.RoguelikeTokenGrid = RoguelikeTokenGrid;
class RogueTokenCommonItemSmallItemGrid extends CommonItemSmallItemGrid_1.CommonItemSmallItemGrid {
	OnExtendToggleClicked() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RoguelikeGetTokenReward,
		);
	}
}
class RoguelikeTokenOverView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TabComponent = void 0),
			(this.TabDataList = []),
			(this.DataMap = new Map()),
			(this.SeasonId = 0),
			(this.CommonGridItem = void 0),
			(this.LoopScrollView = void 0),
			(this.LastSelectGrid = void 0),
			(this.dVe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.pqe = (e) => {
				const t =
						ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTokenBySeasonId(
							this.SeasonId,
						),
					o = [];
				let i = 0;
				var n = (e) => {
					t.forEach((t) => {
						var n, a;
						(ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
							t.Token,
						).PerkType !== e &&
							void 0 !== e) ||
							((n = this.DataMap.get(t.Token)),
							((a = new RogueTokenData()).IsReceive = n),
							(a.Config = t),
							void 0 !== n && i++,
							o.push(a));
					});
				};
				switch (e) {
					case 0:
						n(void 0);
						break;
					case 1:
						n(2);
						break;
					case 2:
						n(5);
				}
				this.GetItem(13).SetUIActive(!1),
					this.LoopScrollView.ReloadData(o),
					this.LoopScrollView.ScrollToGridIndex(0),
					this.LoopScrollView.SelectGridProxy(0, !0),
					this.LoopScrollView.RefreshAllGridProxies(),
					this.GetItem(12).SetUIActive(0 < o.length),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(3),
						"Roguelike_TokenOverView_Collect",
						i,
						o.length,
					);
			}),
			(this.yqe = (e) => (
				(e = this.TabDataList[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.CreateLoopScrollItem = () => new RoguelikeTokenGrid()),
			(this.OnCloseClick = () => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.RefreshDetail = (e) => {
				if (this.LastSelectGrid !== e) {
					e = (this.LastSelectGrid = e).Data;
					var t =
							ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
								e.Config.Token,
							),
						o =
							(LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(11),
								t.BuffName,
							),
							LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(6),
								t.BuffDesc,
								...t.BuffDescParam,
							),
							this.GetText(7).SetUIActive(!1),
							this.SetTextureByPath(t.BuffIcon, this.GetTexture(9)),
							ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
								e.Config.DropId,
							));
					o = [{ IncId: 0, ItemId: (o = Array.from(o))[0][0] }, o[0][1]];
					let i = 10,
						n = 0;
					t.BuffElement.forEach((e, t) => {
						(i = t), (n = e);
					}),
						this.GetTexture(5).SetUIActive(i < 10),
						this.GetText(4).SetUIActive(i < 10),
						i < 10 &&
							((t =
								ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
									i,
								)),
							this.SetTextureByPath(t.Icon5, this.GetTexture(5)),
							this.GetText(4).SetText(n.toString())),
						this.CommonGridItem.Refresh(o),
						this.CommonGridItem.SetActive(!e.IsReceive),
						this.GetItem(13).SetUIActive(!0);
				}
			}),
			(this.RoguelikeGetTokenReward = () => {
				const e = this.LastSelectGrid.Data;
				void 0 !== e.IsReceive &&
					RoguelikeController_1.RoguelikeController.RoguelikeTokenReceiveRequest(
						this.SeasonId,
						e.Config.Id,
					).then((t) => {
						t &&
							((e.IsReceive = !0), this.CommonGridItem.SetActive(!e.IsReceive));
					});
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UILoopScrollViewComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
			[12, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UITexture],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UITexture],
			[10, UE.UITexture],
			[11, UE.UIText],
			[13, UE.UIItem],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeSelectToken,
			this.RefreshDetail,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoguelikeGetTokenReward,
				this.RoguelikeGetTokenReward,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeSelectToken,
			this.RefreshDetail,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoguelikeGetTokenReward,
				this.RoguelikeGetTokenReward,
			);
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		(this.SeasonId = e.F8n),
			e.Xws.forEach((e) => {
				this.DataMap.set(e.Ekn, e.qms);
			}),
			void 0 === this.CommonGridItem &&
				((this.CommonGridItem = new RogueTokenCommonItemSmallItemGrid()),
				this.CommonGridItem.Initialize(this.GetItem(8).GetOwner())),
			this.CommonGridItem.SetActive(!1),
			(e = new CommonTabComponentData_1.CommonTabComponentData(
				this.dVe,
				this.pqe,
				this.yqe,
			)),
			(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(1),
				this.GetItem(2).GetOwner(),
				this.CreateLoopScrollItem,
			)),
			(this.TabComponent =
				new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
					this.GetItem(0),
					e,
					this.OnCloseClick,
				)),
			(this.TabDataList =
				ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
					"RoguelikeTokenOverView",
				)),
			(e = this.TabDataList.length);
		await this.TabComponent.RefreshTabItemByLengthAsync(e);
	}
	OnBeforeShow() {
		this.TabComponent.SelectToggleByIndex(0);
	}
}
exports.RoguelikeTokenOverView = RoguelikeTokenOverView;
