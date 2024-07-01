"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericLayoutNew = void 0);
const UE = require("ue"),
	UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction"),
	InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation"),
	LguiUtil_1 = require("../LguiUtil");
class GenericLayoutNew {
	constructor(t, i, e = void 0) {
		(this.Cqo = void 0),
			(this.$bo = void 0),
			(this.xqe = void 0),
			(this.Tqo = []),
			(this.Lqo = []),
			(this.NPo = void 0),
			(this.AQ = new Map()),
			(this.g4e = new Array()),
			(this.Ybo = void 0),
			(this.Dqo = 0),
			(this.vK = !1),
			(this.Rqo = void 0),
			(this.P9t = !0),
			(this.Uqo = !0),
			(this.$bo = t),
			(this.Ybo = i),
			this.Aqo(e),
			(this.Cqo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
				this,
			)),
			this.Cqo.RegisterAnimController();
	}
	get TempOriginalItem() {
		return this.NPo;
	}
	Pqo() {
		for (const t of this.AQ.values())
			t instanceof UiComponentsAction_1.UiComponentsAction && t?.Destroy();
		this.AQ.clear(), (this.g4e = []);
	}
	Aqo(t) {
		if (!this.NPo) {
			let i;
			(i = void 0 === t ? this.GetItemByIndex(0) : t).SetUIActive(!1),
				i.SetUIParent(this.xqo()),
				(this.NPo = i),
				(this.Rqo = i.displayName);
		}
	}
	SetScrollView(t) {
		(this.xqe = t), (this.Uqo = !1), this.Cqo?.RegisterAnimController();
	}
	PreLoadCopyItem(t) {
		for (let i = 0; i < t; ++i) this.wqo().SetUIActive(!1);
	}
	GetRootUiItem() {
		return this.$bo.RootUIComp;
	}
	xqo() {
		return this.GetRootUiItem().GetParentAsUIItem();
	}
	Bqo() {
		var t = this.Tqo.pop();
		t && (t.SetUIActive(!1), this.Lqo.push(t));
	}
	wqo() {
		var t = LguiUtil_1.LguiUtil.CopyItem(this.NPo, this.GetRootUiItem());
		return this.Tqo.push(t), t;
	}
	bqo() {
		var t = this.Lqo.pop();
		t ? (t.SetUIActive(!0), this.Tqo.push(t)) : this.wqo().SetUIActive(!0);
	}
	qqo() {
		this.NPo &&
			(this.NPo.SetUIActive(!0),
			this.NPo.SetUIParent(this.GetRootUiItem()),
			(this.NPo = void 0));
	}
	ht() {
		for (let t = 0, i = this.Lqo.length; t < i; ++t)
			this.Lqo[t].GetOwner().K2_DestroyActor();
		for (let t = 0, i = this.Tqo.length; t < i; ++t)
			this.Tqo[t].GetOwner().K2_DestroyActor();
		(this.Lqo.length = 0), (this.Tqo.length = 0), this.ClearGridController();
	}
	ClearGridController() {
		this.Cqo && (this.Cqo.Clear(), (this.Cqo = void 0));
	}
	SetNeedAnim(t) {
		this.P9t = t;
	}
	RebuildLayoutByDataNew(t, i = void 0) {
		this.Aqo(void 0), this.Pqo();
		var e = t ? t.length : 0,
			o = i || e,
			s = this.Tqo.length;
		if (((this.Dqo = o), (this.vK = !1), o < this.Tqo.length)) {
			for (let t = 0; t < o; ++t) this.Tqo[t].SetUIActive(!0);
			for (let t = o; t < s; ++t) this.Bqo();
		} else if (o > this.Tqo.length) {
			for (let t = 0; t < s; ++t) this.Tqo[t].SetUIActive(!0);
			for (let t = 0; t < o - s; ++t) this.bqo();
		}
		let r = 0;
		for (let i = 0; i < o; ++i) {
			this.Tqo[i].SetDisplayName(this.Rqo + "_" + i);
			var n = i < e ? t[i] : void 0;
			n = this.Ybo?.(n, this.Tqo[i], r);
			n && (this.AQ.set(n.Key, n.Value), this.g4e.push(n.Value), r++);
		}
		this.Cqo && this.P9t && this.Cqo.PlayGridAnim(this.Dqo);
	}
	GetItemByIndex(t) {
		if (this.$bo) {
			var i = this.GetRootUiItem().GetAttachUIChildren();
			if (t < i.Num()) return i.Get(t);
		}
	}
	GetLayoutItemByKey(t) {
		return this.AQ.get(t);
	}
	GetLayoutItemMap() {
		return this.AQ;
	}
	GetLayoutItemList() {
		return this.g4e;
	}
	GetLayoutItemByIndex(t) {
		return this.g4e[t];
	}
	ClearChildren() {
		this.vK ||
			((this.vK = !0),
			this.$bo.OnLateUpdate.Unbind(),
			this.Pqo(),
			this.ht(),
			this.qqo());
	}
	SetActive(t) {
		this.$bo.RootUIComp.SetUIActive(t);
	}
	GetDisplayGridNum() {
		return this.Dqo;
	}
	GetPreservedGridNum() {
		return this.Tqo.length;
	}
	GetDisplayGridStartIndex() {
		return 0;
	}
	GetDisplayGridEndIndex() {
		return this.GetDisplayGridNum() - 1;
	}
	GetGridAnimationInterval() {
		return this.$bo.GetGridAnimationInterval();
	}
	GetGridAnimationStartTime() {
		return this.$bo.GetGridAnimationStartTime();
	}
	GetGrid(t) {
		return this.GetItemByIndex(t % this.GetDisplayGridNum());
	}
	GetGridByDisplayIndex(t) {
		return this.GetItemByIndex(t);
	}
	BindLateUpdate(t) {
		this.$bo.OnLateUpdate.Bind(t);
	}
	UnBindLateUpdate() {
		this.$bo.OnLateUpdate.Unbind();
	}
	NotifyAnimationStart() {
		this.$bo.SetInAnimation(!0);
	}
	NotifyAnimationEnd() {
		this.$bo.SetInAnimation(!1);
	}
	GetUiAnimController() {
		return this.Uqo
			? this.$bo
					?.GetOwner()
					.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
			: this.xqe
					?.GetContent()
					?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
	}
}
exports.GenericLayoutNew = GenericLayoutNew;
