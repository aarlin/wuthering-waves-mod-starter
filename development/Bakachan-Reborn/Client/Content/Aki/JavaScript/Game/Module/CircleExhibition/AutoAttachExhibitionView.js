"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AutoAttachExhibitionView = exports.DEFAULT_ATTACH_TIME = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log");
exports.DEFAULT_ATTACH_TIME = 8;
class AutoAttachExhibitionView {
	constructor(t) {
		(this.wje = void 0),
			(this.Bje = void 0),
			(this.CurrentDirection = void 0),
			(this.CreateSourceActor = void 0),
			(this.CreateSourceUiActor = void 0),
			(this.Items = new Array()),
			(this.SelectedIndex = 0),
			(this.CreateItemFunction = (t, e, i) => {}),
			(this.DragState = !1),
			(this.InertiaState = !1),
			(this.Distance = 0),
			(this.AttachTime = exports.DEFAULT_ATTACH_TIME),
			(this.ItemSizeX = 0),
			(this.ItemSizeY = 0),
			(this.Gap = 0),
			(this.ShowItemNum = 0),
			(this.DataLength = 0),
			(this.CurrentShowItemIndex = 0),
			(this.Width = 0),
			(this.Height = 0),
			(this.IEt = 0),
			(this.SupportVelocity = !0),
			(this.CurrentVelocity = 0),
			(this.VelocityDirection = 0),
			(this.VelocityMoveState = !1),
			(this.CurrentVelocityTime = 0),
			(this.VelocityFactor = 30),
			(this.BoundDistance = 0),
			(this.DebugMode = !1),
			(this.CurrentSelectState = !1),
			(this.TEt = 0),
			(this.LEt = 0),
			(this.OnPointerBeginDrag = (t) => {
				(this.DragState = !0),
					(this.InertiaState = !1),
					(this.VelocityMoveState = !1),
					(this.wje = t.GetWorldPointInPlane()),
					(this.Bje = t.GetWorldPointInPlane());
				for (let t = 0; t < this.Items.length; t++)
					this.Items[t].OnControllerDragStart();
			}),
			(this.OnPointerDrag = (t) => {
				var e = t.GetWorldPointInPlane();
				this.Bje = t.GetWorldPointInPlane();
				let i = 0;
				0 !=
					(i =
						0 === this.CurrentDirection
							? e.X - this.wje.X
							: e.Z - this.wje.Z) && (this.MoveItems(i), (this.wje = e));
			}),
			(this.OnPointerEndDrag = (t) => {
				for (let t = 0; t < this.Items.length; t++)
					this.Items[t].OnControllerDragEnd();
				if (((this.DragState = !1), (this.LEt = 0), this.SupportVelocity)) {
					t = t.GetWorldPointInPlane();
					let e = 0;
					(e =
						0 === this.CurrentDirection ? t.X - this.Bje.X : t.Z - this.Bje.Z),
						Math.abs(e) < this.VelocityFactor
							? ((t = this.FindAutoAttachItem()),
								this.ScrollToIndex(this.AttachTime, t.ShowItemIndex))
							: ((this.VelocityMoveState = !0),
								(this.CurrentVelocity = e),
								(this.VelocityDirection = 0 < this.CurrentVelocity ? 1 : -1),
								(this.CurrentVelocityTime = 0));
				} else
					(t = this.FindAutoAttachItem()),
						this.ScrollToIndex(this.AttachTime, t.ShowItemIndex);
			}),
			(this.Actor = t),
			(this.ItemActor = t.GetComponentByClass(UE.UIItem.StaticClass()));
	}
	get Direction() {
		return this.CurrentDirection;
	}
	SetVelocitySupport(t) {
		this.SupportVelocity = t;
	}
	SetVelocityFactor(t) {
		this.VelocityFactor = t;
	}
	SetItemOnSelectTime(t) {
		this.IEt = t;
	}
	SetBoundDistance(t) {
		this.BoundDistance = t;
	}
	GetDataLength() {
		return this.DataLength;
	}
	Destroy() {
		this.Actor && ActorSystem_1.ActorSystem.Put(this.Actor),
			(this.Actor = void 0);
	}
	CreateItems(t, e, i, s, h) {
		this.AddDragEvent(),
			(this.CreateItemFunction = s),
			(this.CreateSourceActor = t),
			(this.CreateSourceUiActor = this.CreateSourceActor.GetComponentByClass(
				UE.UIItem.StaticClass(),
			)),
			(this.ShowItemNum = e),
			this.DEt(),
			(this.Gap = i);
	}
	DEt() {
		(this.ItemSizeX = this.CreateSourceUiActor.GetWidth()),
			(this.ItemSizeY = this.CreateSourceUiActor.GetHeight()),
			(this.Width = this.ItemActor.GetWidth()),
			(this.Height = this.ItemActor.GetHeight()),
			0 === this.CurrentDirection
				? (this.BoundDistance = this.ItemSizeX)
				: (this.BoundDistance = this.ItemSizeY);
	}
	ReloadView(t, e) {}
	DisableDragEvent() {
		var t;
		this.Actor &&
			(t = this.Actor.GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)) &&
			(t.OnPointerBeginDragCallBack.Unbind(),
			t.OnPointerDragCallBack.Unbind(),
			t.OnPointerEndDragCallBack.Unbind());
	}
	AddDragEvent() {
		var t;
		this.Actor &&
			(t = this.Actor.GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)) &&
			(t.OnPointerBeginDragCallBack.Bind((t) => {
				this.OnPointerBeginDrag(t);
			}),
			t.OnPointerDragCallBack.Bind((t) => {
				this.OnPointerDrag(t);
			}),
			t.OnPointerEndDragCallBack.Bind((t) => {
				this.OnPointerEndDrag(t);
			}));
	}
	SetData(t) {
		for (let e = 0; e < this.Items.length; e++) this.Items[e].SetData(t);
	}
	InitItems() {
		for (let t = 0; t < this.Items.length; t++) this.Items[t].Init(this);
		this.RefreshItemsView();
	}
	ForceUnSelectItems() {
		for (let t = 0; t < this.Items.length; t++)
			this.Items[t].ForceUnSelectItem();
		this.CurrentSelectState = !1;
	}
	SetAttachTime(t) {
		this.AttachTime = t;
	}
	RefreshItemsView() {
		for (let t = 0; t < this.Items.length; t++) this.Items[t].RefreshItem();
	}
	FindNearestMiddleItem() {
		let t = this.Items[0];
		if (t) {
			let e = 0;
			e =
				0 === this.CurrentDirection
					? Math.abs(this.Items[0].GetItemPositionX())
					: Math.abs(this.Items[0].GetItemPositionY());
			for (let i = 0; i < this.Items.length; i++) {
				let s = 0;
				(s =
					0 === this.CurrentDirection
						? Math.abs(this.Items[i].GetItemPositionX())
						: Math.abs(this.Items[i].GetItemPositionY())) < e &&
					((t = this.Items[i]), (e = s));
			}
			return t;
		}
	}
	GetItems() {
		return this.Items;
	}
	GetItemByShowIndex(t) {
		for (const e of this.Items) if (e.ShowItemIndex === t) return e;
	}
	ScrollToItem(t, e) {
		if (!this.InertiaState) {
			var i = e;
			let s = 0;
			(s =
				0 === this.CurrentDirection
					? i.GetItemPositionX()
					: i.GetItemPositionY()),
				(this.Distance = -s);
			for (let t = 0; t < this.Items.length; t++) this.Items[t].UnSelect();
			(this.CurrentSelectState = !1),
				(this.CurrentShowItemIndex = e.ShowItemIndex),
				0 === t
					? this.MoveItems(-s)
					: ((this.LEt = 0), (this.TEt = t), (this.InertiaState = !0));
		}
	}
	ScrollToIndex(t, e) {
		this.AttachToIndex(t, e);
	}
	AttachToIndex(t, e) {
		this.REt(t, e);
	}
	REt(t, e) {
		if (!this.InertiaState) {
			var i = this.GetShowIndexItem(e);
			if (i) this.ScrollToItem(t, i);
			else {
				for (let t = 0; t < this.Items.length; t++) this.Items[t].UnSelect();
				if (
					((this.CurrentSelectState = !1),
					(this.CurrentShowItemIndex = e),
					(i = this.FindNearestMiddleItem()))
				) {
					e -= i.ShowItemIndex;
					let s = 0;
					(s =
						0 === this.CurrentDirection
							? (this.ItemSizeX + this.Gap) * e - i.GetItemPositionX()
							: -1 * ((this.ItemSizeY + this.Gap) * e - i.GetItemPositionY())),
						(this.Distance = -s),
						0 === t
							? this.MoveItems(-s)
							: ((this.LEt = 0), (this.TEt = t), (this.InertiaState = !0));
				}
			}
		}
	}
	Tick(t) {
		if (this.DragState || (!this.InertiaState && !this.VelocityMoveState)) {
			if (
				this.InertiaState &&
				((this.InertiaState = !1), (this.LEt = 0), !this.CurrentSelectState) &&
				1 === this.IEt
			)
				for (let t = 0; t < this.Items.length; t++) {
					var e = this.Items[t];
					e.ShowItemIndex !== this.CurrentShowItemIndex ||
						e.GetSelectState() ||
						(e.Select(), (this.CurrentSelectState = !0));
				}
			this.VelocityMoveState = !1;
		} else
			this.VelocityMoveState
				? ((this.CurrentVelocity = this.ReCalculateOffset(
						this.CurrentVelocity,
					)),
					this.rWe(t))
				: this.LEt < this.TEt
					? this.nWe()
					: (this.InertiaState = !1);
	}
	rWe(t) {
		(this.CurrentVelocityTime = this.CurrentVelocityTime + t / 100),
			0 < this.VelocityDirection
				? (this.MoveItems(this.CurrentVelocity),
					(this.CurrentVelocity -=
						this.VelocityFactor * this.CurrentVelocityTime),
					this.CurrentVelocity <= 0 && this.EndVelocityMove())
				: this.VelocityDirection < 0 &&
					(this.MoveItems(this.CurrentVelocity),
					(this.CurrentVelocity +=
						this.VelocityFactor * this.CurrentVelocityTime),
					0 <= this.CurrentVelocity) &&
					this.EndVelocityMove();
	}
	ReCalculateOffset(t) {
		return t;
	}
	EndVelocityMove() {
		(this.VelocityMoveState = !1), (this.InertiaState = !1);
		var t = this.FindAutoAttachItem();
		this.ScrollToIndex(this.AttachTime, t.ShowItemIndex);
	}
	nWe() {
		this.MoveItems(this.Distance / this.TEt), this.LEt++;
	}
	MoveItems(t) {
		for (let i = 0; i < this.Items.length; i++) {
			var e = this.Items[i];
			e.MoveItem(t),
				this.DebugMode &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("UiCommon", 28, "Test"),
				this.CurrentSelectState ||
					0 !== this.IEt ||
					e.ShowItemIndex !== this.CurrentShowItemIndex ||
					e.GetSelectState() ||
					(e.Select(), (this.CurrentSelectState = !0));
		}
	}
	MovingState() {
		return this.DragState || this.InertiaState;
	}
	GetShowIndexItem(t) {
		let e;
		for (let i = 0; i < this.Items.length; i++)
			if (this.Items[i].ShowItemIndex === t) {
				e = this.Items[i];
				break;
			}
		return e;
	}
	AttachItem(t) {}
	FindAutoAttachItem() {
		return this.FindNearestMiddleItem();
	}
	GetWidth() {
		return this.Width;
	}
	GetHeight() {
		return this.Height;
	}
	Clear() {
		for (let t = 0; t < this.Items.length; t++) this.Items[t].Clear();
	}
}
exports.AutoAttachExhibitionView = AutoAttachExhibitionView;
