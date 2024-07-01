"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericScrollView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	GenericLayoutNew_1 = require("../Layout/GenericLayoutNew");
class GenericScrollView {
	constructor(t, e, o = void 0) {
		(this.CGo = void 0),
			(this.E_i = void 0),
			(this.CGo = t),
			(this.E_i = new GenericLayoutNew_1.GenericLayoutNew(
				this.CGo.GetContent().GetComponentByClass(
					UE.UILayoutBase.StaticClass(),
				),
				e,
				o,
			)),
			this.E_i.SetScrollView(t);
	}
	get TempOriginalItem() {
		return this.E_i?.TempOriginalItem;
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
		return this.CGo.RootUIComp.Width;
	}
	RefreshByData(t, e = void 0) {
		this.E_i.RebuildLayoutByDataNew(t, e);
	}
	ClearChildren() {
		this.E_i.ClearChildren(), this.CGo.OnScrollValueChange.Unbind();
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
		(t = this.E_i.GetLayoutItemByKey(t)),
			this.CGo.ScrollToLeft(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t.GetRootItem(),
			);
	}
	ScrollToRight(t) {
		(t = this.E_i.GetLayoutItemByKey(t)),
			this.CGo.ScrollToRight(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t.GetRootItem(),
			);
	}
	ScrollToTop(t) {
		(t = this.E_i.GetLayoutItemByKey(t)),
			this.CGo.ScrollToTop(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t.GetRootItem(),
			);
	}
	ScrollToBottom(t) {
		(t = this.E_i.GetLayoutItemByKey(t)),
			this.CGo.ScrollToBottom(
				(0, puerts_1.$ref)(
					new UE.Vector2D(this.CGo.ContentUIItem.RelativeLocation),
				),
				t.GetRootItem(),
			);
	}
	SetActive(t) {
		this.CGo.RootUIComp.SetUIActive(t);
	}
	BindScrollValueChange(t) {
		this.CGo.OnScrollValueChange.Bind(t);
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
exports.GenericScrollView = GenericScrollView;
