"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericScrollViewNew = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	GenericLayout_1 = require("../Layout/GenericLayout");
class GenericScrollViewNew {
	constructor(t, e, o = void 0) {
		(this.CGo = void 0),
			(this.E_i = void 0),
			(this.CGo = t),
			(this.E_i = new GenericLayout_1.GenericLayout(
				this.CGo.GetContent().GetComponentByClass(
					UE.UILayoutBase.StaticClass(),
				),
				e,
				o,
			)),
			(this.E_i.AnimControllerComponent = t
				?.GetOwner()
				.GetComponentByClass(UE.UIInturnAnimController.StaticClass()));
	}
	get IsExpand() {
		return this.CGo.Horizontal
			? this.CGo.RootUIComp.Width < this.CGo.ContentUIItem.Width
			: this.CGo.RootUIComp.Height < this.CGo.ContentUIItem.Height;
	}
	get ContentItem() {
		return this.CGo.ContentUIItem;
	}
	get ScrollWidth() {
		return this.CGo.RootUIComp.Width ?? 0;
	}
	RefreshByData(t, e, o = !1) {
		this.E_i.RefreshByData(t, e, o);
	}
	async RefreshByDataAsync(t, e = !1) {
		await this.E_i.RefreshByDataAsync(t, e);
	}
	SetHorizontalScrollEnable(t) {
		this.CGo.SetHorizontal(t);
	}
	SetVerticalScrollEnable(t) {
		this.CGo.SetVertical(t);
	}
	GetItemByIndex(t) {
		return this.E_i.GetItemByIndex(t);
	}
	GetScrollItemByIndex(t) {
		return this.E_i.GetLayoutItemByIndex(t);
	}
	GetScrollItemByKey(t) {
		return this.E_i.GetLayoutItemByKey(t);
	}
	GetScrollItemMap() {
		return this.E_i.GetLayoutItemMap();
	}
	GetScrollItemList() {
		return this.E_i.GetLayoutItemList();
	}
	ScrollTo(t) {
		this.CGo.ScrollTo(t);
	}
	ScrollToLeft(t) {
		(t = this.E_i.GetItemByKey(t)),
			this.CGo.ScrollToLeft(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t,
			);
	}
	ScrollToRight(t) {
		(t = this.E_i.GetItemByKey(t)),
			this.CGo.ScrollToRight(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t,
			);
	}
	ScrollToTop(t) {
		(t = this.E_i.GetItemByKey(t)),
			this.CGo.ScrollToTop(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t,
			);
	}
	ScrollToBottom(t) {
		(t = this.E_i.GetItemByKey(t)),
			this.CGo.ScrollToBottom(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t,
			);
	}
	SetActive(t) {
		this.CGo.RootUIComp.SetUIActive(t);
	}
	BindScrollValueChange(t) {
		this.CGo.OnScrollValueChange.Bind(t);
	}
	UnBindScrollValueChange() {
		this.CGo.OnScrollValueChange.Unbind();
	}
	BindLateUpdate(t) {
		this.E_i.BindLateUpdate(t);
	}
	UnBindLateUpdate() {
		this.E_i.UnBindLateUpdate();
	}
	GetGenericLayout() {
		return this.E_i;
	}
}
exports.GenericScrollViewNew = GenericScrollViewNew;
