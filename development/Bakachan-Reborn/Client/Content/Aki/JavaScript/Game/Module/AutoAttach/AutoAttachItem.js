"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AutoAttachItem = void 0);
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.CurrentShowItemIndex = 0),
			(this.CWe = 0),
			(this.gWe = 0),
			(this.SelectState = !1),
			(this.fWe = !1),
			(this.pWe = !1),
			(this.SourceView = void 0),
			(this.CurrentMoveDirection = void 0),
			(this.AllData = void 0),
			(this.DragState = !1),
			e && this.CreateThenShowByActor(e);
	}
	SetData(e) {
		this.AllData = e;
	}
	SetIfNeedShowFakeItem(e) {
		this.pWe = e;
	}
	SetSourceView(e) {
		(this.SourceView = e),
			(this.CurrentMoveDirection = this.SourceView.GetCurrentMoveDirection());
	}
	SetItemIndex(e) {
		this.CWe = e;
	}
	GetItemIndex() {
		return this.CWe;
	}
	InitItem() {
		(this.gWe = this.SourceView.GetDataLength()),
			this.CWe < this.gWe
				? (this.CurrentShowItemIndex = this.CWe)
				: (this.CurrentShowItemIndex =
						this.CWe - this.SourceView.GetShowItemNum()),
			this.vWe();
	}
	vWe() {
		if ((this.MWe(), this.SourceView)) {
			var e = Math.floor(this.SourceView.GetShowItemNum() / 2),
				t = this.SourceView.GetItemSize(),
				i = this.SourceView.GetGap();
			let r = 0;
			(r =
				this.SourceView.GetIfCircle() || 0 === this.CurrentMoveDirection
					? (this.CWe - e) * (t + i)
					: (e - this.CWe) * (t + i)),
				this.MoveItem(r);
		}
	}
	MWe() {
		this.RootItem.SetAnchorOffsetX(0), this.RootItem.SetAnchorOffsetY(0);
	}
	MoveItem(e) {
		var t = this.CurrentShowItemIndex;
		e = this.SWe(e);
		(this.CurrentShowItemIndex = e[1]),
			0 === this.CurrentMoveDirection
				? this.RootItem.SetAnchorOffsetX(e[0])
				: this.RootItem.SetAnchorOffsetY(e[0]),
			this.SourceView.GetIfCircle() ||
				this.fWe ||
				((e =
					(0 <= this.CurrentShowItemIndex &&
						this.CurrentShowItemIndex < this.gWe) ||
					this.pWe),
				this.RootItem.SetUIActive(e)),
			t !== this.CurrentShowItemIndex && this.RefreshItem(),
			this.OnMoveItem();
	}
	GetCurrentMovePercentage() {
		var e = this.SourceView.GetViewSize();
		return (this.GetCurrentPosition() + e / 2) / e;
	}
	SWe(e) {
		return (
			(e = this.GetCurrentPosition() + e),
			this.SourceView.GetIfCircle() ? this.EWe(e) : this.yWe(e)
		);
	}
	EWe(e) {
		let t = e,
			i = this.CurrentShowItemIndex;
		var r = this.SourceView.GetItemSize(),
			h = this.SourceView.GetGap(),
			s = this.SourceView.GetShowItemNum();
		if (this.IWe(t)) {
			if (!this.TWe(t)) {
				for (; !this.TWe(t); ) (t += (r + h) * Math.ceil(s + 1)), (i += s + 1);
				for (; i >= this.gWe; ) i -= this.gWe;
			}
		} else {
			for (; !this.IWe(t); ) (t -= (r + h) * Math.ceil(s + 1)), (i -= s + 1);
			for (; i < 0; ) i = this.gWe + i;
		}
		return [t, i];
	}
	yWe(e) {
		let t = e,
			i = this.CurrentShowItemIndex;
		var r = this.SourceView.GetItemSize(),
			h = this.SourceView.GetGap(),
			s = this.SourceView.GetShowItemNum();
		if (this.IWe(t)) {
			if (!this.TWe(t))
				for (; !this.TWe(t); )
					(t += (r + h) * Math.ceil(s + 1)),
						0 === this.CurrentMoveDirection ? (i += s + 1) : (i -= s + 1);
		} else
			for (; !this.IWe(t); )
				(t -= (r + h) * Math.ceil(s + 1)),
					0 === this.CurrentMoveDirection ? (i -= s + 1) : (i += s + 1);
		return [t, i];
	}
	GetCurrentShowItemIndex() {
		return this.CurrentShowItemIndex;
	}
	GetCurrentSelectedState() {
		return (
			this.SourceView.GetCurrentSelectIndex() === this.GetCurrentShowItemIndex()
		);
	}
	GetSelectedState() {
		return this.SelectState;
	}
	Select() {
		this.SelectState || ((this.SelectState = !0), this.OnSelect());
	}
	OnControllerDragStart() {
		this.DragState = !0;
	}
	OnControllerDragEnd() {
		this.DragState = !1;
	}
	ForceUnSelectItem() {
		(this.SelectState = !1), this.OnUnSelect();
	}
	GetCurrentPosition() {
		return 0 === this.CurrentMoveDirection
			? this.RootItem.GetAnchorOffsetX()
			: this.RootItem.GetAnchorOffsetY();
	}
	RefreshItem() {
		var e = this.AllData[this.CurrentShowItemIndex];
		this.fWe || void 0 !== e
			? this.OnRefreshItem(e)
			: this.pWe && this.OnRefreshItem(void 0);
	}
	IWe(e) {
		var t = this.SourceView.GetItemSize(),
			i = this.SourceView.GetGap(),
			r = this.SourceView.GetShowItemNum();
		return !((t + i) * Math.ceil((r + 1) / 2) < e);
	}
	TWe(e) {
		var t = this.SourceView.GetItemSize(),
			i = this.SourceView.GetGap(),
			r = this.SourceView.GetShowItemNum();
		return !(e < -(t + i) * Math.ceil(r / 2));
	}
}
exports.AutoAttachItem = AutoAttachItem;
