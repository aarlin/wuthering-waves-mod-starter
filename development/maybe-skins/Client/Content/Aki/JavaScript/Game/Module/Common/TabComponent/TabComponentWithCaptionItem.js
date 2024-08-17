"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TabComponentWithCaptionItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
	TabComponent_1 = require("./TabComponent"),
	CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class TabComponentWithCaptionItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, o) {
		super(),
			(this.lqe = void 0),
			(this.BBt = void 0),
			(this.xqe = void 0),
			(this.Gft = void 0),
			(this.NeedCaptionSwitchWithToggle = !0),
			(this.dVe = (e, t) => this.bBt.ProxyCreate(e, t)),
			(this.pqe = (e) => {
				var t = this.bBt.GetCommonData(e);
				t &&
					this.NeedCaptionSwitchWithToggle &&
					(this.lqe.SetTitleByTitleData(t.GetTitleData()),
					this.lqe.SetTitleIcon(t.GetSmallIcon())),
					this.bBt.ToggleCallBack(e);
			}),
			(this.bBt = t),
			(this.qBt = o),
			this.CreateThenShowByActor(e.GetOwner());
	}
	get TabComponent() {
		return this.BBt;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.qBt),
			(this.xqe = this.GetScrollViewWithScrollbar(1)),
			(this.BBt = new TabComponent_1.TabComponent(
				this.xqe.ContentUIItem,
				this.dVe,
				this.pqe,
				void 0,
			)),
			(this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			));
	}
	SetCloseCallBack(e) {
		this.qBt = e;
	}
	RefreshTabItem(e, t) {
		this.TabComponent.RefreshTabItem(e, t);
	}
	async RefreshTabItemAsync(e, t = !0) {
		await this.TabComponent.RefreshTabItemAsync(e, t);
	}
	RefreshTabItemByLength(e, t) {
		(e = this.CreateTabItemDataByLength(e)), this.RefreshTabItem(e, t);
	}
	async RefreshTabItemByLengthAsync(e) {
		(e = this.CreateTabItemDataByLength(e)), await this.RefreshTabItemAsync(e);
	}
	CreateTabItemDataByLength(e) {
		var t = new Array();
		for (let i = 0; i < e; i++) {
			var o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = i), (o.Data = this.bBt.GetCommonData(i)), t.push(o);
		}
		return t;
	}
	SelectToggleByIndex(e, t = !1) {
		this.TabComponent.SelectToggleByIndex(e, t);
	}
	ShowItem() {
		this.Gft.PlayLevelSequenceByName("Start", !0);
	}
	async ShowItemAsync() {
		var e = new CustomPromise_1.CustomPromise();
		await this.Gft.PlaySequenceAsync("Start", e, !0);
	}
	HideItem() {
		this.Gft.PlayLevelSequenceByName("Close", !0);
	}
	GetSelectedIndex() {
		return this.TabComponent.GetSelectedIndex();
	}
	ScrollToToggleByIndex(e) {
		(e = this.TabComponent.GetTabItemByIndex(e)),
			this.xqe.ScrollTo(e.GetRootItem());
	}
	GetTabItemByIndex(e) {
		return this.TabComponent.GetTabItemByIndex(e);
	}
	GetTabItemMap() {
		return this.TabComponent.GetTabItemMap();
	}
	GetTabComponent() {
		return this.TabComponent;
	}
	SetCanChange(e) {
		this.TabComponent.SetCanChange(e);
	}
	SetTabRootActive(e) {
		this.GetItem(2).SetUIActive(e);
	}
	SetRootActive(e) {
		this.GetItem(2).SetUIActive(e), this.lqe?.SetUiActive(e);
	}
	async SetCurrencyItemList(e) {
		await this.lqe.SetCurrencyItemList(e);
	}
	GetCurrencyItemList() {
		return this.lqe.GetCurrencyItemList();
	}
	SetHelpButtonShowState(e) {
		this.lqe.SetHelpBtnActive(e);
	}
	SetHelpButtonCallBack(e) {
		this.lqe.SetHelpCallBack(e);
	}
	SetCloseBtnRaycast(e) {
		this.lqe.SetCloseBtnRaycast(e);
	}
	SetCloseBtnShowState(e) {
		this.lqe.SetCloseBtnShowState(e);
	}
	OnBeforeDestroy() {
		this.BBt && (this.BBt.Destroy(), (this.BBt = void 0)),
			this.lqe && (this.lqe.Destroy(), (this.lqe = void 0));
	}
	SetTitle(e) {
		this.lqe?.SetTitle(e);
	}
	SetTitleIcon(e) {
		this.lqe.SetTitleIcon(e);
	}
	SetTitleIconVisible(e) {
		this.lqe?.SetTitleIconVisible(e);
	}
	SetScrollViewVisible(e) {
		this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(e);
	}
	DestroyOverride() {
		return !0;
	}
}
exports.TabComponentWithCaptionItem = TabComponentWithCaptionItem;
