"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueInfoViewTokenDetail =
		exports.RogueInfoViewTokenDetailGrid =
		exports.RogueInfoViewTokenDetailGridBottom =
		exports.RogueInfoViewShopDiscount =
		exports.RogueInfoViewShopDiscountTag =
		exports.RogueInfoViewTokenElement =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	CommonSelectItem_1 = require("./CommonSelectItem");
class RogueInfoViewTokenElement extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments),
			(this.E_i = void 0),
			(this.Wso = () => new CommonSelectItem_1.CommonElementItem());
	}
	GetResourceId() {
		return "UiItem_ItemRogueElement";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
	}
	OnActivate() {
		this.E_i = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.Wso,
		);
	}
	OnRefresh(e) {
		(e = e.GetSortElementInfoArrayByCount()).length <= 0 ||
			((e = e[0]),
			(e = new Array(e.Count).fill(e.ElementId)),
			this.E_i?.RefreshByData(e));
	}
}
exports.RogueInfoViewTokenElement = RogueInfoViewTokenElement;
class RogueInfoViewShopDiscountTag extends MediumItemGridComponent_1.MediumItemGridComponent {
	GetResourceId() {
		return "UiItem_ItemDiscountTag";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnRefresh(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(0),
			"RogueInfoViewShopDiscount",
			e.Discounted.toString(),
		);
	}
}
exports.RogueInfoViewShopDiscountTag = RogueInfoViewShopDiscountTag;
class RogueInfoViewShopDiscount extends MediumItemGridComponent_1.MediumItemGridComponent {
	GetResourceId() {
		return "UiItem_ItemDiscount";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[1, UE.UIText],
			[0, UE.UITexture],
		];
	}
	OnRefresh(e) {
		e.IsDiscounted()
			? LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"RogueInfoViewShopPriceWithDiscount",
					e.CurrentPrice,
					e.OriginalPrice,
				)
			: LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"RogueInfoViewShopPrice",
					e.OriginalPrice,
				),
			0 !== e.ShopItemCoinId &&
				((e =
					ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(
						e.ShopItemCoinId,
					)),
				this.SetTextureByPath(e?.IconSmall ?? "", this.GetTexture(0)));
	}
}
exports.RogueInfoViewShopDiscount = RogueInfoViewShopDiscount;
class RogueInfoViewTokenDetailGridBottom extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments), (this.oao = void 0);
	}
	GetResourceId() {
		return "UiItem_ItemRogue";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
		];
	}
	OnActivate() {
		(this.oao = new CommonSelectItem_1.CommonElementItem()),
			this.oao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
	}
	OnRefresh(e) {
		(e = e.GetSortElementInfoArrayByCount()).length <= 0 ||
			(this.oao.Update(e[0].ElementId),
			this.oao.RefreshPanel(),
			this.GetText(1).SetText(e[0].Count.toString()));
	}
}
exports.RogueInfoViewTokenDetailGridBottom = RogueInfoViewTokenDetailGridBottom;
class RogueInfoViewTokenDetailGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments),
			(this.OnStageChanged = (e) => {
				1 === e.State && this.OnSelected(!0);
			});
	}
	OnStart() {
		this.BindOnExtendToggleStateChanged(this.OnStageChanged);
	}
	OnRefresh(e, t, o) {
		var i = {
				Type: 4,
				Data: e,
				IconPath: (i =
					ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
						e.ConfigId,
					)).BuffIcon,
				QualityId: i.Quality,
				QualityType: "MediumItemGridQualitySpritePath",
				IsDisable: e.IsSell,
			},
			n =
				((i =
					(this.Apply(i),
					this.SetSelected(t),
					t && this.OnSelected(!0),
					this.RefreshComponent(RogueInfoViewTokenElement, !0, e))),
				(i =
					(this.SetComponentVisible(i, 0 !== e.OriginalPrice),
					this.RefreshComponent(RogueInfoViewShopDiscount, !0, e))),
				this.SetComponentVisible(i, 0 !== e.OriginalPrice),
				this.RefreshComponent(RogueInfoViewTokenDetailGridBottom, !0, e));
		this.SetComponentVisible(n, 0 === e.OriginalPrice),
			(n = this.RefreshComponent(RogueInfoViewShopDiscountTag, !0, e));
		this.SetComponentVisible(n, e.IsDiscounted()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Roguelike",
					35,
					"肉鸽商店刷新数据 格子",
					["isSelected", t],
					["gridIndex", o],
					["discountComponent", void 0 !== i],
					["isDiscounted", e.IsDiscounted()],
				);
	}
	OnSelected(e) {
		this.IsSelected ||
			(this.SetSelected(!0, e),
			e &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
					this.Data,
					this.GridIndex,
				));
	}
	OnDeselected(e) {
		this.SetSelected(!1, !1);
	}
}
exports.RogueInfoViewTokenDetailGrid = RogueInfoViewTokenDetailGrid;
class RogueInfoViewTokenDetail extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.LoopScrollView = void 0),
			(this.DetailItem = void 0),
			(this.UiViewSequence = void 0),
			(this.Hao = () => new RogueInfoViewTokenDetailGrid());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnBeforeCreateImplement() {
		(this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
			this.AddUiBehavior(this.UiViewSequence);
	}
	async OnBeforeStartAsync() {
		(this.DetailItem = new CommonSelectItem_1.CommonSelectItem()),
			await this.DetailItem.CreateThenShowByActorAsync(
				this.GetItem(2).GetOwner(),
			),
			(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(0),
				this.GetItem(1).GetOwner(),
				this.Hao,
			));
		var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.BuffEntryList;
		e.sort(
			(e, t) => (
				(e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(
					e.ConfigId,
				)?.Quality),
				(t = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(
					t.ConfigId,
				)?.Quality),
				void 0 === e || void 0 === t ? 0 : t - e
			),
		),
			await this.LoopScrollView.RefreshByDataAsync(e);
	}
	OnStart() {
		this.DetailItem.SetActive(!1);
	}
	OnAfterShow() {
		this.LoopScrollView.SelectGridProxy(0, !0);
	}
	Update(e) {
		this.LoopScrollView?.ReloadData(e);
	}
	OnSelected(e, t) {
		var o = this.LoopScrollView.GetSelectedGridIndex();
		this.LoopScrollView.SelectGridProxy(t, !1),
			this.LoopScrollView.RefreshGridProxy(o),
			this.DetailItem.SetActive(!0),
			this.DetailItem.Update(e);
	}
}
exports.RogueInfoViewTokenDetail = RogueInfoViewTokenDetail;
