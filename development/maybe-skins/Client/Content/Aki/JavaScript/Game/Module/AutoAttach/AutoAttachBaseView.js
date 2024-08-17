"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AutoAttachBaseView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	AutoAttachDefine_1 = require("./AutoAttachDefine"),
	ENDMOVEFLOAT = 0.01,
	MOVEMULFACTOR = 5,
	VERYBIGDISTANCE = 99999,
	DISTANCETOMIDDLE = 0.5,
	DEFALTAUDIO = "ui_common_picker_tick";
class AutoAttachBaseView {
	constructor(t) {
		(this.SourceActor = void 0),
			(this.SourceItem = void 0),
			(this.SourceItemHeight = 0),
			(this.SourceItemWidth = 0),
			(this.ControllerActor = void 0),
			(this.ControllerItem = void 0),
			(this.ControllerHeight = 0),
			(this.ControllerWidth = 0),
			(this.Gap = 0),
			(this.ShowItemNum = 0),
			(this.DataLength = 0),
			(this.MoveBoundary = 0),
			(this.InertiaState = !1),
			(this.xje = !1),
			(this.DragState = !1),
			(this.VelocityMoveState = !1),
			(this.wje = void 0),
			(this.Bje = void 0),
			(this.bje = !0),
			(this.qje = 0),
			(this.CurrentVelocityRunningTime = 0),
			(this.Gje = void 0),
			(this.Nje = void 0),
			(this.BoundaryCurve = void 0),
			(this.Oje = 0),
			(this.kje = 0),
			(this.Fje = 0),
			(this.Vje = 0),
			(this.Hje = 0),
			(this.jje = new Map()),
			(this.Items = new Array()),
			(this.AttachDirection = void 0),
			(this.CurrentSelectState = !1),
			(this.Wje = 0),
			(this.Kje = 0),
			(this.Qje = 1),
			(this.Xje = TickSystem_1.TickSystem.InvalidId),
			(this.$je = 5),
			(this.Yje = DEFALTAUDIO),
			(this.Jje = void 0),
			(this.CreateItemFunction = (t, e, i) => {}),
			(this.zje = !1),
			(this.Zje = void 0),
			(this.r6 = (t) => {
				if (
					(this.eWe &&
						((this.tWe += 1), 1 <= this.tWe) &&
						((this.eWe = !1), this.iWe(this.oWe)),
					this.DragState || (!this.InertiaState && !this.VelocityMoveState))
				) {
					if (
						this.xje &&
						((this.xje = !1), (this.Kje = 0), !this.CurrentSelectState) &&
						1 === this.Qje
					) {
						var e = this.Items.length;
						for (let t = 0; t < e; t++) {
							var i = this.Items[t];
							i.GetCurrentShowItemIndex() !== this.Wje ||
								i.GetSelectedState() ||
								(i.Select(), (this.CurrentSelectState = !0));
						}
					}
					this.VelocityMoveState = !1;
				} else
					this.VelocityMoveState
						? this.rWe(t)
						: this.Kje < this.kje
							? this.nWe(t)
							: ((this.xje = !0), (this.InertiaState = !1));
				this.zje !== this.MovingState() &&
					((this.zje = this.MovingState()), this.zje) &&
					this.Zje?.();
			}),
			(this.sWe = (t) => {
				(this.DragState = !0),
					(this.InertiaState = !1),
					(this.xje = !1),
					(this.VelocityMoveState = !1),
					(this.wje = t.GetWorldPointInPlane()),
					(this.Bje = t.GetWorldPointInPlane());
				var e = this.Items.length;
				for (let t = 0; t < e; t++) this.Items[t].OnControllerDragStart();
				this.Zje?.();
			}),
			(this.tWe = 0),
			(this.eWe = !1),
			(this.oWe = void 0),
			(this.aWe = (t) => {
				(this.tWe = 0), (this.eWe = !0);
				t = (this.oWe = t).GetWorldPointInPlane();
				var e = this.hWe(t) - this.hWe(this.wje);
				0 != e &&
					(this.SetMoveTypeOffset(1, e),
					(e = this.RecalculateMoveOffset(e)),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("UiCommon", 28, "OnpointerDrag", ["result", e]),
					this.lWe(e),
					(this.wje = t));
			}),
			(this._We = (t) => {
				var e = this.Items.length;
				for (let t = 0; t < e; t++) this.Items[t].OnControllerDragEnd();
				if (
					((this.DragState = !1),
					(this.Kje = 0),
					(this.Vje = 0),
					(this.Fje = 0),
					this.bje)
				) {
					t = t.GetWorldPointInPlane();
					let e = 0;
					this.Bje && (e = (this.hWe(t) - this.hWe(this.Bje)) * this.$je),
						Math.abs(e) < this.Hje
							? ((t = this.FindAutoAttachItem()),
								this.AttachToIndex(t.GetCurrentShowItemIndex()))
							: ((this.VelocityMoveState = !0),
								this.SetMoveTypeOffset(0, e),
								(this.qje = 0 < e ? 1 : -1),
								(this.CurrentVelocityRunningTime = 0));
				} else
					(t = this.FindAutoAttachItem()),
						this.AttachToIndex(t.GetCurrentShowItemIndex());
			}),
			(this.ControllerActor = t),
			(this.ControllerItem = t.GetComponentByClass(UE.UIItem.StaticClass())),
			(this.ControllerHeight = this.ControllerItem.Height),
			(this.ControllerWidth = this.ControllerItem.Width),
			this.jje.set(0, 0),
			this.jje.set(1, 0),
			(this.Xje = TickSystem_1.TickSystem.Add(
				this.r6,
				"AutoAttachBaseView",
				0,
				!0,
			).Id),
			(this.Gje = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				AutoAttachDefine_1.VELOCITY_CURVE_PATH,
				UE.CurveFloat,
			)),
			(this.Nje = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				AutoAttachDefine_1.INERTIA_CURVE_PATH,
				UE.CurveFloat,
			)),
			(this.BoundaryCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				AutoAttachDefine_1.BOUNDARY_CURVE_PATH,
				UE.CurveFloat,
			)),
			(this.Oje =
				ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachVelocityTime()),
			(this.kje =
				ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachInertiaTime()),
			(this.zje = !1);
	}
	SetItemSelectMode(t) {
		this.Qje = t;
	}
	SetMoveMultiFactor(t) {
		this.$je = t;
	}
	SetDragBeginCallback(t) {
		this.Zje = t;
	}
	SetAudioEvent(t) {
		this.Yje = t;
	}
	IsVelocityMoveState() {
		return this.VelocityMoveState;
	}
	CreateItems(t, e, i, s = 0) {
		this.EnableDragEvent(),
			(this.CreateItemFunction = i),
			(this.SourceActor = t),
			(this.SourceItem = this.SourceActor.GetComponentByClass(
				UE.UIItem.StaticClass(),
			)),
			(this.Gap = e),
			(this.AttachDirection = s),
			(this.SourceItemHeight = this.SourceItem.Height),
			(this.SourceItemWidth = this.SourceItem.Width),
			(this.ShowItemNum = this.uWe()),
			(this.Hje = (this.GetItemSize() + this.Gap) / 2),
			this.cWe();
	}
	SetMoveBoundary(t) {
		this.MoveBoundary = t;
	}
	GetCurrentMoveDirection() {
		return this.AttachDirection;
	}
	cWe() {
		this.MoveBoundary = this.GetItemSize();
	}
	SetBoundDistance(t) {
		this.MoveBoundary = t;
	}
	uWe() {
		let t = 0;
		t =
			0 === this.AttachDirection ? this.ControllerWidth : this.ControllerHeight;
		var e = this.GetItemSize() + this.Gap;
		return (e = Math.ceil(t / e)) % 2 == 0 ? e - 1 : e;
	}
	EnableDragEvent() {
		var t;
		this.ControllerActor &&
			(t = this.ControllerActor.GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)) &&
			(t.OnPointerBeginDragCallBack.Bind((t) => {
				this.sWe(t);
			}),
			t.OnPointerDragCallBack.Bind((t) => {
				this.aWe(t);
			}),
			t.OnPointerEndDragCallBack.Bind((t) => {
				this._We(t);
			}),
			t.NavigateToPrevDelegate.Bind(() => {
				this.AttachToNextItem(-1);
			}),
			t.NavigateToNextDelegate.Bind(() => {
				this.AttachToNextItem(1);
			}));
	}
	DisableDragEvent() {
		var t;
		this.ControllerActor &&
			(t = this.ControllerActor.GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)) &&
			(t.OnPointerBeginDragCallBack.Unbind(),
			t.OnPointerDragCallBack.Unbind(),
			t.OnPointerEndDragCallBack.Unbind(),
			t.NavigateToPrevDelegate.Unbind(),
			t.NavigateToNextDelegate.Unbind());
	}
	GetGap() {
		return this.Gap;
	}
	GetItemSize() {
		return 0 === this.AttachDirection
			? this.SourceItemWidth
			: this.SourceItemHeight;
	}
	GetViewSize() {
		return 0 === this.AttachDirection
			? this.ControllerWidth
			: this.ControllerHeight;
	}
	rWe(t) {
		var e = this.GetMoveTypeOffset(0),
			i = e / this.Oje,
			s =
				((this.CurrentVelocityRunningTime =
					this.CurrentVelocityRunningTime + t),
				this.CurrentVelocityRunningTime / this.Oje);
		i = i * this.GetCurveValue(this.Gje, (s = 1 < s ? 1 : s)) * t;
		let h = this.RecalculateMoveOffset(i);
		Math.abs(h) < 0.01 && (h = 0),
			(i = this.Vje + h),
			Math.abs(i) > Math.abs(e) && (h = e - this.Vje),
			this.lWe(h),
			(this.Vje += h),
			0 < this.qje
				? h <= 0 && this.mWe()
				: this.qje < 0 && 0 <= h && this.mWe(),
			1 <= s &&
				(Math.abs(this.Vje) < Math.abs(e)
					? (this.CurrentVelocityRunningTime -= t)
					: this.mWe());
	}
	nWe(t) {
		var e = this.GetMoveTypeOffset(1),
			i = e / this.kje,
			s = ((this.Kje = this.Kje + t), this.Kje / this.kje);
		let h = i * this.GetCurveValue(this.Nje, (s = 1 < s ? 1 : s)) * t;
		(i = this.Fje + h),
			Math.abs(i) > Math.abs(e) && (h = e - this.Fje),
			this.lWe(h),
			(this.Fje += h),
			1 <= s && Math.abs(this.Fje) < Math.abs(e) && (this.Kje -= t);
	}
	GetCurveValue(t, e) {
		return t.GetFloatValue(e);
	}
	mWe() {
		(this.VelocityMoveState = !1), (this.InertiaState = !1);
		var t = this.FindAutoAttachItem();
		this.ScrollToItem(t);
	}
	ReloadView(t, e) {
		(this.DataLength = t), this.ReloadItems(t, e);
	}
	GetShowItemNum() {
		return this.ShowItemNum;
	}
	GetDataLength() {
		return this.DataLength;
	}
	RefreshItems() {
		var t = this.Items.length;
		for (let e = 0; e < t; e++) this.Items[e].RefreshItem();
	}
	FindNearestMiddleItem() {
		let t = this.Items[0];
		if (t) {
			let s = 0;
			s = Math.abs(this.Items[0].GetCurrentPosition());
			var e = this.Items.length;
			for (let h = 0; h < e; h++) {
				var i;
				(i = Math.abs(this.Items[h].GetCurrentPosition())) < s &&
					((t = this.Items[h]), (s = i));
			}
			return t;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("UiCommon", 28, "列表没有数据，找不到中间物体");
	}
	GetItems() {
		return this.Items;
	}
	GetShowIndexItem(t) {
		let e;
		var i = this.Items.length;
		for (let s = 0; s < i; s++)
			if (this.Items[s].GetCurrentShowItemIndex() === t) {
				e = this.Items[s];
				break;
			}
		return e;
	}
	GetItemByShowIndex(t) {
		for (const e of this.Items) if (e.GetCurrentShowItemIndex() === t) return e;
	}
	ForceUnSelectItems() {
		var t = this.Items.length;
		for (let e = 0; e < t; e++) this.Items[e].ForceUnSelectItem();
		this.CurrentSelectState = !1;
	}
	ScrollToItem(t, e = !1) {
		var i;
		this.InertiaState ||
			((i = t.GetCurrentPosition()),
			this.SetMoveTypeOffset(1, -i),
			this.ForceUnSelectItems(),
			(this.Wje = t.GetCurrentShowItemIndex()),
			e
				? (this.SetMoveTypeOffset(1, -i),
					(t = this.RecalculateMoveOffset(-i)),
					this.lWe(t, e))
				: ((this.Kje = 0), (this.InertiaState = !0)));
	}
	AttachToNextItem(t) {
		(t = this.FindNextDirectionItem(t)) &&
			this.AttachToIndex(t.GetCurrentShowItemIndex());
	}
	AttachToIndex(t, e = !1) {
		var i;
		this.InertiaState ||
			((i = this.GetShowIndexItem(t))
				? this.ScrollToItem(i, e)
				: (this.ForceUnSelectItems(),
					(this.Wje = t),
					(i = this.FindNearestMiddleItem()) &&
						((t -= i.GetCurrentShowItemIndex()),
						(t =
							this.dWe() * (this.GetItemSize() + this.Gap) * t -
							i.GetCurrentPosition()),
						this.SetMoveTypeOffset(1, -t),
						e
							? (this.SetMoveTypeOffset(1, -t),
								(i = this.RecalculateMoveOffset(-t)),
								this.lWe(i, e))
							: ((this.Kje = 0), (this.InertiaState = !0)))));
	}
	dWe() {
		return 0 === this.AttachDirection ? 1 : -1;
	}
	GetCurrentSelectIndex() {
		return this.Wje;
	}
	MovingState() {
		return this.DragState || this.InertiaState;
	}
	iWe(t) {
		this.Bje = t.GetWorldPointInPlane();
	}
	hWe(t) {
		return 0 === this.AttachDirection ? t.X : t.Z;
	}
	GetMoveTypeOffset(t) {
		return this.jje.get(t);
	}
	SetMoveTypeOffset(t, e) {
		this.jje.set(t, e), 1 === t && (this.Fje = 0);
	}
	lWe(t, e = !1) {
		let i,
			s = 99999;
		var h = this.Items.length;
		for (let a = 0; a < h; a++) {
			var r = this.Items[a],
				o =
					(r.MoveItem(t),
					((this.CurrentSelectState || 0 !== this.Qje) && !e) ||
						r.GetCurrentShowItemIndex() !== this.Wje ||
						r.GetSelectedState() ||
						(r.Select(), (this.CurrentSelectState = !0)),
					r.GetCurrentMovePercentage());
			(o = Math.abs(o - 0.5)) < s && ((s = o), (i = r.GetItemIndex()));
		}
		this.Jje !== i &&
			((this.Jje = i), e || AudioSystem_1.AudioSystem.PostEvent(this.Yje));
	}
	Clear() {
		this.Items.forEach((t) => {
			t.Destroy();
		}),
			(this.Items = []),
			this.Xje !== TickSystem_1.TickSystem.InvalidId &&
				TickSystem_1.TickSystem.Remove(this.Xje);
	}
}
exports.AutoAttachBaseView = AutoAttachBaseView;
