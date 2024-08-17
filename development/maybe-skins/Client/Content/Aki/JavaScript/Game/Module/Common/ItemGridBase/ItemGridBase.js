"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LongPressButtonItem_1 = require("../Button/LongPressButtonItem");
class ItemGridBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this._At = new Map()),
			(this.uAt = new Set()),
			(this.cAt = new Set()),
			(this.mAt = []),
			(this.dAt = []),
			(this.CAt = void 0),
			(this.gAt = void 0),
			(this.LongPressButton = new LongPressButtonItem_1.LongPressButtonItem()),
			(this.IsHover = !1),
			(this.IsSelected = !1),
			(this.IsForceSelected = !1),
			(this.fAt = !0),
			(this.pAt = !1),
			(this.vAt = void 0),
			(this.MAt = void 0),
			(this.SAt = void 0),
			(this.EAt = void 0),
			(this.yAt = void 0),
			(this.IAt = void 0),
			(this.TAt = void 0),
			(this.LAt = () => {
				var t;
				this.OnExtendTogglePress(),
					this.MAt &&
						((t = {
							MediumItemGrid: this,
							State: this.GetItemGridExtendToggle().GetToggleState(),
							Data: this.Data,
						}),
						this.MAt(t));
			}),
			(this.DAt = () => {
				var t;
				this.OnExtendToggleRelease(),
					this.SAt &&
						((t = {
							MediumItemGrid: this,
							State: this.GetItemGridExtendToggle().GetToggleState(),
							Data: this.Data,
						}),
						this.SAt(t)),
					this.OnExtendToggleClicked(),
					this.EAt &&
						((t = {
							MediumItemGrid: this,
							State: this.GetItemGridExtendToggle().GetToggleState(),
							Data: this.Data,
						}),
						this.EAt(t));
			}),
			(this.RAt = (t) => {
				this.OnExtendToggleStateChanged(t),
					this.vAt &&
						((t = { MediumItemGrid: this, State: t, Data: this.Data }),
						this.vAt(t));
			}),
			(this.T7e = () =>
				this.yAt
					? this.yAt(
							this.Data,
							this.IsForceSelected,
							this.GetItemGridExtendToggle().GetToggleState(),
						)
					: this.OnCanExecuteChange()),
			(this.UAt = () => {
				this.IsHover = !0;
			}),
			(this.AAt = () => {
				this.IsHover = !1;
			}),
			(this.OnLongPressActivate = (t) => {
				this.IAt && this.IAt(t, this, this.Data);
			}),
			(this.CanItemLongPressClick = () =>
				!this.TAt || this.TAt(this, this.Data)),
			(this.PAt = (t) => {
				this.xAt(t),
					this.uAt.delete(t),
					0 < this.uAt.size ||
						((this.pAt = !1),
						this.RefreshComponentVisible(),
						this.RefreshComponentHierarchyIndex());
			});
	}
	Initialize(t) {
		t && this.CreateThenShowByActor(t);
	}
	OnStartImplement() {
		(this.CAt = this.OnSetTopAdditionItem()),
			(this.gAt = this.OnSetBottomAdditionItem()),
			this.LongPressButton.Initialize(
				this.GetItemGridExtendToggle(),
				this.OnLongPressActivate,
				this.LAt,
				this.DAt,
			),
			this.LongPressButton.SetTickConditionDelegate(this.CanItemLongPressClick),
			this.AddEvents();
	}
	OnBeforeDestroyImplement() {
		(this.CAt = void 0),
			(this.gAt = void 0),
			(this.mAt.length = 0),
			(this.dAt.length = 0),
			this.LongPressButton?.Clear(),
			(this.LongPressButton = void 0),
			(this.pAt = !1),
			this.UnBindOnExtendTogglePress(),
			this.UnBindOnExtendToggleRelease(),
			this.UnBindOnExtendToggleStateChanged(),
			this.UnBindOnExtendToggleClicked(),
			this.UnBindOnCanExecuteChange(),
			this.UnBindLongPress(),
			this.UnBindComponentEvents(),
			this.ClearVisibleComponent(),
			this.ClearItemGridComponents(),
			this.RemoveEvents();
	}
	OnSetBottomAdditionItem() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Inventory", 8, "没有实现OnSetBottomAdditionItem");
	}
	OnSetTopAdditionItem() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Inventory", 8, "没有实现OnSetBottomAdditionItem");
	}
	GetItemGridExtendToggle() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Inventory", 8, "没有实现GetItemGridExtendToggle");
	}
	AddEvents() {
		var t = this.GetItemGridExtendToggle();
		t.OnStateChange.Add(this.RAt),
			t.CanExecuteChange.Bind(this.T7e),
			t.OnHover.Add(this.UAt),
			t.OnUnHover.Add(this.AAt),
			this.OnAddEvents();
	}
	RemoveEvents() {
		var t = this.GetItemGridExtendToggle();
		t.OnStateChange.Remove(this.RAt),
			t.CanExecuteChange.Unbind(),
			t.OnHover.Remove(this.UAt),
			t.OnUnHover.Remove(this.AAt),
			this.OnRemoveEvents();
	}
	UnBindComponentEvents() {}
	OnAddEvents() {}
	OnRemoveEvents() {}
	OnExtendTogglePress() {}
	OnExtendToggleRelease() {}
	OnExtendToggleClicked() {}
	OnExtendToggleStateChanged(t) {}
	OnCanExecuteChange() {
		return !0;
	}
	SetSelected(t, e = !1) {
		var i = this.GetItemGridExtendToggle();
		t
			? e
				? i.SetToggleStateForce(1, !1)
				: i.SetToggleState(1, !1)
			: e
				? i.SetToggleStateForce(0, !1)
				: i.SetToggleState(0, !1),
			(this.IsSelected = t),
			(this.IsForceSelected = e);
	}
	SetExtendToggleEnable(t, e = !1) {
		var i;
		(this.fAt === t && !e) ||
			((this.fAt = t),
			(i = this.GetItemGridExtendToggle()),
			t ? this.SetSelected(this.IsSelected, e) : i.SetToggleState(2));
	}
	BindOnExtendTogglePress(t) {
		this.MAt = t;
	}
	UnBindOnExtendTogglePress() {
		this.MAt = void 0;
	}
	BindOnExtendToggleRelease(t) {
		this.SAt = t;
	}
	UnBindOnExtendToggleRelease() {
		this.SAt = void 0;
	}
	BindOnExtendToggleStateChanged(t) {
		this.vAt = t;
	}
	UnBindOnExtendToggleStateChanged() {
		this.vAt = void 0;
	}
	BindOnExtendToggleClicked(t) {
		this.EAt = t;
	}
	UnBindOnExtendToggleClicked() {
		this.EAt = void 0;
	}
	BindOnCanExecuteChange(t) {
		this.yAt = t;
	}
	UnBindOnCanExecuteChange() {
		this.yAt = void 0;
	}
	BindLongPress(t, e, i) {
		this.LongPressButton.Deactivate(),
			this.LongPressButton.Activate(t),
			(this.IAt = e),
			(this.TAt = i);
	}
	UnBindLongPress() {
		(this.IAt = void 0), (this.TAt = void 0);
	}
	RefreshComponent(t, e, i) {
		let s = this.GetItemGridComponent(t);
		return (
			void 0 === i
				? (s?.SetActive(!1), this.cAt.delete(s))
				: (s = !s && e ? this.wAt(t) : s) &&
					(s.Refresh(i), this.BAt(s), s.IsCreating || this.xAt(s)),
			s
		);
	}
	xAt(t) {
		t.IsShowOrShowing ? this.cAt.add(t) : this.cAt.delete(t);
	}
	SetComponentVisible(t, e) {
		t && (e ? this.cAt.add(t) : this.cAt.delete(t), t.SetActive(e));
	}
	wAt(t) {
		var e = this._At.get(t);
		if (!e) {
			switch ((e = new t()).GetLayoutLevel()) {
				case 0:
					e.Initialize(this.CAt);
					break;
				case 1:
					e.Initialize(this.gAt);
			}
			this._At.set(t, e),
				this.uAt.add(e),
				(this.pAt = !0),
				e.Load().then(this.PAt, () => {});
		}
		return e;
	}
	RefreshComponentVisible() {
		for (const t of this._At.values()) this.cAt.has(t) || t.SetActive(!1);
	}
	ClearVisibleComponent() {
		this.cAt.clear();
	}
	BAt(t) {
		switch (t.GetLayoutLevel()) {
			case 0:
				this.dAt.push(t);
				break;
			case 1:
				this.mAt.push(t);
		}
	}
	ClearComponentList() {
		(this.mAt.length = 0), (this.dAt.length = 0);
	}
	RefreshComponentHierarchyIndex() {
		if (!this.pAt) {
			for (let t = 0; t < this.dAt.length; t++)
				this.dAt[t].SetHierarchyIndex(t);
			for (let t = 0; t < this.mAt.length; t++)
				this.mAt[t].SetHierarchyIndex(t);
		}
	}
	GetItemGridComponent(t) {
		if ((t = this._At.get(t))) return t;
	}
	HiddenAllItemGridComponents() {
		for (const t of this._At.values()) t.SetActive(!1);
	}
	SetItemGridComponentVisible(t, e) {
		this._At.get(t)?.SetActive(e);
	}
	ClearItemGridComponents() {
		this._At.clear(), this.uAt.clear(), this.ClearComponentList();
	}
	SetToggleInteractive(t) {
		this.GetItemGridExtendToggle().SetSelfInteractive(t);
	}
}
exports.ItemGridBase = ItemGridBase;
