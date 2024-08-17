"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TabComponentWithTitle = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	CommonTabTitle_1 = require("./CommonTabTitle"),
	TabComponent_1 = require("./TabComponent"),
	CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponentWithTitle extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.TabTitle = void 0),
			(this.cpt = void 0),
			(this.xqe = void 0),
			(this.pqe = (t) => {
				var e = this.bBt.GetCommonData(t);
				e &&
					(this.TabTitle.UpdateIcon(e.GetSmallIcon()),
					this.TabTitle.UpdateTitle(e.GetTitleData())),
					this.bBt.ToggleCallBack(t);
			}),
			(this.dVe = (t, e) => this.bBt.ProxyCreate(t, e)),
			(this.bBt = e),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	OnStart() {
		(this.xqe = this.GetScrollViewWithScrollbar(1)),
			(this.cpt = new TabComponent_1.TabComponent(
				this.xqe.ContentUIItem,
				this.dVe,
				this.pqe,
				void 0,
			)),
			(this.TabTitle = new CommonTabTitle_1.CommonTabTitle(this.GetItem(0)));
	}
	OnBeforeDestroy() {
		this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			this.TabTitle && (this.TabTitle.Destroy(), (this.TabTitle = void 0));
	}
	RefreshTabItem(t, e) {
		var a = new Array();
		for (let e = 0; e < t; e++) {
			var o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = e), (o.Data = this.bBt.GetCommonData(e)), a.push(o);
		}
		this.cpt.RefreshTabItem(a, e);
	}
	async RefreshTabItemAsync(t) {
		var e = new Array();
		for (let o = 0; o < t; o++) {
			var a = new CommonTabItemBase_1.CommonTabItemData();
			(a.Index = o), (a.Data = this.bBt.GetCommonData(o)), e.push(a);
		}
		await this.RefreshTabItemByDataAsync(e);
	}
	async RefreshTabItemByDataAsync(t) {
		await this.cpt.RefreshTabItemAsync(t);
	}
	SelectToggleByIndex(t, e = !1) {
		this.cpt.SelectToggleByIndex(t, e);
	}
	GetSelectedIndex() {
		return this.cpt.GetSelectedIndex();
	}
	ScrollToToggleByIndex(t) {
		(t = this.cpt.GetTabItemByIndex(t)), this.xqe.ScrollTo(t.GetRootItem());
	}
	GetTabItemByIndex(t) {
		return this.cpt.GetTabItemByIndex(t);
	}
	GetTabItemMap() {
		return this.cpt.GetTabItemMap();
	}
	GetTabComponentData(t) {
		return this.bBt.GetCommonData(t);
	}
	GetTabComponent() {
		return this.cpt;
	}
	SetCanChange(t) {
		this.cpt.SetCanChange(t);
	}
}
exports.TabComponentWithTitle = TabComponentWithTitle;
