"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoCircleAttachView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	AutoAttachBaseView_1 = require("./AutoAttachBaseView"),
	FLOATDURABLENUM = 0.01;
class NoCircleAttachView extends AutoAttachBaseView_1.AutoAttachBaseView {
	constructor() {
		super(...arguments),
			(this.LWe = void 0),
			(this.U1e = void 0),
			(this.DWe = !1);
	}
	SetIfNeedFakeItem(t) {
		this.DWe = t;
	}
	SetControllerItem(t) {
		(this.ControllerItem = t),
			(this.ControllerWidth = t.GetWidth()),
			(this.ControllerHeight = t.GetHeight());
	}
	FindAutoAttachItem() {
		return this.RWe();
	}
	RWe() {
		let t,
			e = 1e7;
		var i = this.Items.length;
		for (let r = 0; r < i; r++) {
			var s = Math.abs(this.Items[r].GetCurrentPosition()),
				h =
					0 <= this.Items[r].GetCurrentShowItemIndex() &&
					this.Items[r].GetCurrentShowItemIndex() < this.DataLength;
			s < e && h && ((t = this.Items[r]), (e = s));
		}
		return (
			void 0 === t &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("UiCommon", 28, "找不到可附着物体，拿第一个做保底"),
				(t = this.Items[0])),
			t
		);
	}
	UWe() {
		if (void 0 === this.LWe) {
			let t = 0;
			for (let e = 0; e < 1; e += 0.01) {
				t +=
					0.01 * this.GetCurveValue(this.BoundaryCurve, e) * this.MoveBoundary;
			}
			this.LWe = t;
		}
		return this.LWe;
	}
	RecalculateMoveOffset(t) {
		if (((t = this.AWe(t)), 0 === this.AttachDirection)) {
			if (!this.PWe(t)) return 0;
		} else if (!this.xWe(t)) return 0;
		return t;
	}
	wWe(t) {
		var e = this.FindNearestMiddleItem(),
			i = e.GetCurrentPosition();
		return 0 < t
			? 0 === this.GetCurrentMoveDirection()
				? e.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + i
				: (this.DataLength - 1 - e.GetCurrentShowItemIndex()) *
						(this.GetItemSize() + this.Gap) *
						-1 +
					i
			: 0 === this.GetCurrentMoveDirection()
				? (this.DataLength - 1 - e.GetCurrentShowItemIndex()) *
						(this.GetItemSize() + this.Gap) *
						-1 +
					i
				: e.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + i;
	}
	AWe(t) {
		let e = 0 < t ? 0 : this.DataLength - 1;
		0 !== this.AttachDirection && (e = 0 < t ? this.DataLength - 1 : 0);
		var i,
			s = this.GetShowIndexItem(e);
		if (!s) return (i = this.wWe(t)), Math.abs(i) < Math.abs(t) ? i : t;
		let h = s.GetCurrentPosition(),
			r = (h = -0.01 < h && h < 0.01 ? 0 : h) + t;
		if ((0 !== this.AttachDirection && (r = h - t), 0 < t)) {
			if (r < 0) return t;
		} else if (0 < r) return t;
		return this.BWe(t, h);
	}
	BWe(t, e) {
		let i = 0,
			s = 0;
		0 < t ? e < 0 && (s = 0 - e) : 0 < e && (s = 0 - e);
		var h = t - (i = 0 + s),
			r = e + (h = i + h * (r = this.bWe(t, e)));
		return 0 < t
			? r >= this.qWe()
				? 0 < s
					? s + this.qWe()
					: this.qWe() - e
				: h
			: r <= -1 * this.qWe()
				? s < 0
					? s + -1 * this.qWe()
					: -1 * (this.qWe() + e)
				: h;
	}
	qWe() {
		if (void 0 === this.U1e) {
			let t = 0;
			for (let e = 0; e < this.MoveBoundary; e += 1) {
				t += +this.bWe(1, e);
			}
			this.U1e = t;
		}
		return this.U1e;
	}
	bWe(t, e) {
		return this.UWe() <= 0
			? 0
			: ((e = Math.abs(e) / this.UWe()),
				this.GetCurveValue(this.BoundaryCurve, (e = 1 < e ? 1 : e)));
	}
	PWe(t) {
		let e;
		var i = this.Items.length;
		for (let t = 0; t < i - 1; t++)
			if (0 === this.Items[t].GetCurrentShowItemIndex()) {
				e = this.Items[t];
				break;
			}
		if (e && 0 < t) {
			var s = e.GetCurrentPosition() + t;
			if (
				(this.GetItemSize() + this.Gap) *
					Math.ceil((this.ShowItemNum + 1) / 2) <
				s
			)
				return !1;
		} else if (t < 0)
			for (let e = 0; e < i; e++)
				if (
					this.Items[e].GetCurrentShowItemIndex() === this.DataLength - 1 &&
					this.Items[e].GetCurrentPosition() + t <
						-(this.GetItemSize() + this.Gap) * Math.ceil(this.ShowItemNum / 2)
				)
					return !1;
		return !0;
	}
	xWe(t) {
		let e;
		var i = this.Items.length;
		for (let t = 0; t < i - 1; t++)
			if (0 === this.Items[t].GetCurrentShowItemIndex()) {
				e = this.Items[t];
				break;
			}
		if (0 < t) {
			for (let e = 0; e < i; e++)
				if (this.Items[e].GetCurrentShowItemIndex() === this.DataLength - 1) {
					var s = this.Items[e].GetCurrentPosition() + t;
					if (0 - this.Items[e].GetCurrentPosition() + this.UWe() < s)
						return !1;
				}
		} else if (e && t < 0) {
			var h = e.GetCurrentPosition() + t,
				r = e.GetCurrentPosition() + this.UWe();
			if (Math.abs(h) > Math.abs(r)) return !1;
		}
		return !0;
	}
	FindNextDirectionItem(t) {
		let e = 0;
		var i = this.FindNearestMiddleItem().GetCurrentShowItemIndex();
		return (
			(e =
				0 < t
					? i + t < this.DataLength
						? i + t
						: this.DataLength - 1
					: 0 < i + t
						? i + t
						: 0),
			this.GetShowIndexItem(e)
		);
	}
	ReloadItems(t, e) {
		var i,
			s = t > this.ShowItemNum || this.DWe ? this.ShowItemNum + 1 : t;
		for (let t = 0; t < this.Items.length; t++) this.Items[t].SetUiActive(!1);
		for (let t = 0; t < s; t++)
			t >= this.Items.length &&
				((i = LguiUtil_1.LguiUtil.DuplicateActor(
					this.SourceActor,
					this.ControllerItem,
				)),
				(i = this.CreateItemFunction(i, t, this.ShowItemNum)).SetSourceView(
					this,
				),
				this.Items.push(i)),
				this.Items[t].SetIfNeedShowFakeItem(this.DWe),
				this.Items[t].SetItemIndex(t),
				this.Items[t].SetUiActive(!0),
				this.Items[t].SetData(e),
				this.Items[t].InitItem();
		this.RefreshItems(), this.ForceUnSelectItems(), this.AttachToIndex(0, !0);
	}
	GetIfCircle() {
		return !1;
	}
}
exports.NoCircleAttachView = NoCircleAttachView;
