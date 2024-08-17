"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AutoAttachExhibitionItem = exports.AutoAttachExhibitionItemAbstract =
		void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachExhibitionItemAbstract extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.CurrentShowItemIndex = 0),
			(this.AttachItem = void 0),
			this.CreateThenShowByActor(t);
	}
	SetShowItemIndex(t) {
		this.CurrentShowItemIndex = t;
	}
	GetShowItemIndex() {
		return this.CurrentShowItemIndex;
	}
	OnChangeDirection(t) {}
	RefreshItem(t) {}
	SetData(t) {}
	OnMoveItem(t) {}
	OnUnSelect() {}
	OnSelect() {}
	SetAttachItem(t) {
		this.AttachItem = t;
	}
	GetAttachItem() {
		return this.AttachItem;
	}
	Clear() {}
}
exports.AutoAttachExhibitionItemAbstract = AutoAttachExhibitionItemAbstract;
class AutoAttachExhibitionItem {
	constructor(t, e, i) {
		(this.SelectState = !1),
			(this.CurrentDirection = void 0),
			(this.InitGap = 0),
			(this.ShowItemNum = 0),
			(this.DataLength = 0),
			(this.DragState = !1),
			(this.ExhibitionView = void 0),
			(this.Rpt = void 0),
			(this.ShowItemIndex = 0),
			(this.Actor = t.GetComponentByClass(UE.UIItem.StaticClass())),
			(this.FullSizeX = this.Actor.GetWidth()),
			(this.FullSizeY = this.Actor.GetHeight()),
			(this.Index = e),
			(this.ShowItemNum = i);
	}
	SetViewItem(t) {
		(this.Rpt = t), this.Rpt.SetAttachItem(this);
	}
	SetActive(t) {
		this.Actor.SetUIActive(t);
	}
	Init(t) {
		(this.ExhibitionView = t),
			(this.CurrentDirection = t.Direction),
			(this.DataLength = t.GetDataLength()),
			this.OnInit(),
			(this.SelectState = !1),
			this.OnUnSelect();
	}
	ForceUnSelectItem() {
		(this.SelectState = !1), this.OnUnSelect();
	}
	OnInit() {}
	OnControllerDragStart() {
		this.DragState = !0;
	}
	MoveItem(t) {
		this.OnMoveItem(t), this.Rpt.OnMoveItem(t);
	}
	OnMoveItem(t) {}
	OnMoveFromRightToLeft() {
		this.Rpt.OnChangeDirection(1);
	}
	OnMoveFromLeftToRight() {
		this.Rpt.OnChangeDirection(-1);
	}
	OnMoveFromDownToUp() {
		this.Rpt.OnChangeDirection(1);
	}
	OnMoveFromUpToDown() {
		this.Rpt.OnChangeDirection(-1);
	}
	RefreshItem() {
		this.Rpt.SetShowItemIndex(this.ShowItemIndex),
			this.Rpt.RefreshItem(this.ShowItemIndex);
	}
	SetData(t) {
		this.Rpt.SetData(t);
	}
	OnControllerDragEnd() {
		this.DragState = !1;
	}
	GetItemPositionX() {
		return this.Actor.GetAnchorOffsetX();
	}
	GetItemPositionY() {
		return this.Actor.GetAnchorOffsetY();
	}
	GetSelectState() {
		return this.SelectState;
	}
	Select() {
		this.SelectState ||
			((this.SelectState = !0),
			(this.ExhibitionView.SelectedIndex = this.ShowItemIndex),
			this.OnSelect());
	}
	OnSelect() {
		this.Rpt.OnSelect();
	}
	UnSelect() {
		this.SelectState && ((this.SelectState = !1), this.OnUnSelect());
	}
	OnUnSelect() {
		this.Rpt.OnUnSelect();
	}
	Clear() {
		this.Rpt.Clear();
	}
}
exports.AutoAttachExhibitionItem = AutoAttachExhibitionItem;
