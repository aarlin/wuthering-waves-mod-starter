"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DynamicScrollView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
class DynamicScrollView {
	constructor(t, i, e, o) {
		(this.Yqo = void 0),
			(this.Jqo = void 0),
			(this.zqo = void 0),
			(this.Zqo = new Map()),
			(this.r7 = void 0),
			(this.eGo = void 0),
			(this.Cqo = void 0),
			(this.tGo = new Map()),
			(this.LateUpdateCallBack = void 0),
			(this.iGo = new Map()),
			(this.oGo = !1),
			(this.rGo = (t, i) => {
				const e = this.r7[t];
				var o = this.tGo.get(i);
				let s;
				return (
					o
						? ((s = o), this.nGo(e, t, i))
						: ((s = this.Yqo(e, i.GetUIItem(), t)),
							(o = new Promise((o) => {
								s.Init(i.GetUIItem()).finally(() => {
									s.Update(e, t), o();
								});
							})),
							this.tGo.set(i, s),
							this.iGo.set(i, o)),
					this.sGo(s, t),
					(s.SkipDestroyActor = !0),
					this.Zqo.set(t, s),
					s.GetUsingItem(e)
				);
			}),
			(this.aGo = (t, i) => {
				this.Zqo.delete(t);
			}),
			(this.hGo = () => {
				this.lGo();
			}),
			(this._Go = (t) => ((t = this.r7[t]), this.zqo.GetItemSize(t))),
			(this.$xi = (t) => {
				this.LateUpdateCallBack?.(t), this.uGo();
			}),
			(this.Yqo = o),
			(this.zqo = e),
			i.SetUIParent(t.RootUIComp),
			this.tGo.clear(),
			(this.eGo = i),
			(this.Jqo = t),
			this.Jqo.OnItemUpdate.Bind(this.rGo),
			this.Jqo.OnItemClear.Bind(this.aGo),
			this.Jqo.ItemSizeDelegate.Bind(this._Go),
			this.Jqo.OnDestroyCallBack.Bind(this.hGo),
			(this.Cqo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
				this,
			)),
			this.Cqo.RegisterAnimController();
	}
	async Init() {
		await this.zqo.Init(this.eGo);
	}
	GetDisplayGridNum() {
		return this.Jqo.DisplayItemArray.Num();
	}
	GetPreservedGridNum() {
		return this.Jqo.DisplayItemArray.Num() + this.Jqo.IdleItemArray.Num();
	}
	GetDisplayGridStartIndex() {
		var t = (0, puerts_1.$ref)(0);
		return this.Jqo.GetItemIndex(0, t), (0, puerts_1.$unref)(t);
	}
	GetDisplayGridEndIndex() {
		var t,
			i = this.Jqo.DisplayItemArray.Num() - 1;
		return i < 0
			? 0
			: ((t = (0, puerts_1.$ref)(0)),
				this.Jqo.GetItemIndex(i, t),
				(0, puerts_1.$unref)(t));
	}
	GetGrid(t) {
		return this.Jqo.GetItem(t)?.GetUIItem();
	}
	GetGridByDisplayIndex(t) {
		var i = (0, puerts_1.$ref)(0);
		this.Jqo.GetItemDisplayIndex(t, i), (t = (0, puerts_1.$unref)(i));
		return this.Jqo.DisplayItemArray.Get(t)?.GetUIItem();
	}
	GetGridAnimationInterval() {
		return this.Jqo.GetGridAnimationInterval();
	}
	GetGridAnimationStartTime() {
		return this.Jqo.GetGridAnimationStartTime();
	}
	NotifyAnimationStart() {
		this.Jqo.SetInAnimation(!0);
	}
	NotifyAnimationEnd() {
		this.Jqo.SetInAnimation(!1);
	}
	RefreshByData(t, i = !1) {
		(this.r7 = t), this.Zqo.clear();
		var e = this.eGo.GetOwner();
		this.eGo.SetUIActive(!0),
			this.Jqo.RefreshByData(e, t.length, i),
			this.eGo.SetUIActive(!1),
			this.Jqo.SetInAnimation(!0),
			this.cGo();
	}
	lGo() {
		this.oGo && (this.Jqo.OnLateUpdate.Unbind(), (this.oGo = !1));
	}
	mGo() {
		this.oGo || (this.Jqo.OnLateUpdate.Bind(this.$xi), (this.oGo = !0));
	}
	async nGo(t, i, e) {
		var o = this.iGo.get(e);
		o && (await o, this.tGo.get(e)?.Update(t, i));
	}
	sGo(t, i) {
		t.SetUiActive(!0);
	}
	GetScrollItemFromIndex(t) {
		if ((t = this.Zqo.get(t))) return t;
	}
	GetScrollItemCount() {
		return this.Zqo.size;
	}
	GetScrollItemItems() {
		return Array.from(this.Zqo.values());
	}
	cGo() {
		this.Cqo && this.Cqo.PlayGridAnim(this.Jqo.DisplayItemArray.Num(), !0);
	}
	uGo() {
		this.LateUpdateCallBack || this.lGo();
	}
	BindLateUpdate(t) {
		(this.LateUpdateCallBack = t), this.mGo();
	}
	UnBindLateUpdate() {
		this.LateUpdateCallBack = void 0;
	}
	ClearChildren() {
		for (const t of this.Zqo.values()) t.ClearItem();
		this.Zqo.clear(), this.Cqo?.Clear();
	}
	async ScrollToItemIndex(t, i = !0) {
		await this.dGo(t, i);
	}
	async dGo(t, i = !0) {
		await Promise.all(this.iGo.values()),
			this.Jqo.ScrollToItemIndex(t),
			i && this.ResetGridController();
	}
	ResetGridController() {
		this.Cqo && this.Cqo.PlayGridAnim(this.GetDisplayGridNum(), !0);
	}
	GetUiAnimController() {
		return this.Jqo?.GetContent()?.GetComponentByClass(
			UE.UIInturnAnimController.StaticClass(),
		);
	}
}
exports.DynamicScrollView = DynamicScrollView;
