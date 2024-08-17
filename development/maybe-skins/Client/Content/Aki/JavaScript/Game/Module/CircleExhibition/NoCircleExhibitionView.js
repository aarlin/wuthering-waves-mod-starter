"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoCircleExhibitionView = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	AutoAttachExhibitionView_1 = require("./AutoAttachExhibitionView"),
	FLOATDURABLENUM = 0.01;
class NoCircleExhibitionView extends AutoAttachExhibitionView_1.AutoAttachExhibitionView {
	CreateItems(t, e, i, s, h) {
		(this.CurrentDirection = h || 0), super.CreateItems(t, e, i, s, h);
	}
	ReloadView(t, e) {
		var i,
			s = (this.DataLength = t) > this.ShowItemNum ? this.ShowItemNum + 1 : t;
		for (let t = 0; t < this.Items.length; t++) this.Items[t].SetActive(!1);
		for (let t = 0; t < s; t++)
			t >= this.Items.length &&
				((i = LguiUtil_1.LguiUtil.DuplicateActor(
					this.CreateSourceActor,
					this.ItemActor,
				)),
				((i = this.CreateItemFunction(i, t, this.ShowItemNum)).InitGap =
					this.Gap),
				this.Items.push(i)),
				this.Items[t].SetActive(!0);
		this.SetData(e),
			this.InitItems(),
			this.ForceUnSelectItems(),
			this.AttachToIndex(0, 0);
	}
	MoveItems(t) {
		if (0 === t) this.qEt();
		else {
			var e = this.ReCalculateOffset(t);
			if (0 === Math.abs(e) && this.VelocityMoveState) this.CurrentVelocity = 0;
			else if (this.GEt(e))
				for (let t = 0; t < this.Items.length; t++) {
					var i = this.Items[t],
						s =
							(i.MoveItem(e),
							0 <= i.ShowItemIndex && i.ShowItemIndex < this.DataLength);
					i.SetActive(s),
						i.ShowItemIndex === this.CurrentShowItemIndex &&
							!i.GetSelectState() &&
							s &&
							(i.Select(), (this.CurrentSelectState = !0));
				}
		}
	}
	qEt() {
		if (!this.CurrentSelectState)
			for (let i = 0; i < this.Items.length; i++) {
				var t = this.Items[i],
					e = 0 <= t.ShowItemIndex && t.ShowItemIndex < this.DataLength;
				t.ShowItemIndex === this.CurrentShowItemIndex &&
					!t.GetSelectState() &&
					e &&
					(t.Select(), (this.CurrentSelectState = !0));
			}
	}
	ReCalculateOffset(t) {
		return this.AWe(t);
	}
	AWe(t) {
		let e = 0 < t ? 0 : this.DataLength - 1;
		0 !== this.CurrentDirection && (e = 0 < t ? this.DataLength - 1 : 0);
		var i = this.GetShowIndexItem(e);
		if (!i) return t;
		let s = i.GetItemPositionX(),
			h =
				(0 !== this.CurrentDirection && (s = i.GetItemPositionY()),
				(s = -0.01 < s && s < 0.01 ? 0 : s) + t);
		if ((0 !== this.CurrentDirection && (h = s - t), 0 < t)) {
			if (h < 0) return t;
		} else if (0 < h) return t;
		return this.BWe(t, s);
	}
	BWe(t, e) {
		let i = 0,
			s = 0;
		0 < t ? e < 0 && (s = 0 - e) : 0 < e && (s = 0 - e);
		var h = t - (i = 0 + s),
			r = e + (h = i + h * (r = this.bWe(t, e)));
		return 0 < t
			? r >= this.BoundDistance
				? 0 < s
					? s + this.BoundDistance
					: this.BoundDistance - e
				: h
			: r <= -1 * this.BoundDistance
				? s < 0
					? s + -1 * this.BoundDistance
					: -1 * (this.BoundDistance + e)
				: h;
	}
	bWe(t, e) {
		if (this.BoundDistance <= 0) return 0;
		let i = 1;
		return (
			(i =
				1 <
				(i =
					(0 < t && 0 <= e) || (t < 0 && e <= 0)
						? Math.abs(e) / this.BoundDistance
						: i)
					? 1
					: i),
			MathUtils_1.MathUtils.Lerp(1, 0, i)
		);
	}
	FindAutoAttachItem() {
		return this.RWe();
	}
	RWe() {
		let t,
			e = 1e7;
		for (let s = 0; s < this.Items.length; s++) {
			let h = 0;
			h =
				0 === this.CurrentDirection
					? Math.abs(this.Items[s].GetItemPositionX())
					: Math.abs(this.Items[s].GetItemPositionY());
			var i =
				0 <= this.Items[s].ShowItemIndex &&
				this.Items[s].ShowItemIndex < this.DataLength;
			h < e && i && ((t = this.Items[s]), (e = h));
		}
		return (
			void 0 === t &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("UiCommon", 28, "找不到可附着物体，拿第一个做保底"),
				(t = this.Items[0])),
			t
		);
	}
	AttachItem(t) {
		let e = 0;
		var i = this.FindNearestMiddleItem().ShowItemIndex;
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
	GEt(t) {
		return 0 === this.CurrentDirection ? this.NEt(t) : this.OEt(t);
	}
	NEt(t) {
		let e;
		for (let t = 0; t < this.Items.length - 1; t++)
			if (0 === this.Items[t].ShowItemIndex) {
				e = this.Items[t];
				break;
			}
		if (e && 0 < t) {
			var i = e.GetItemPositionX() + t;
			if (
				(this.ItemSizeX + this.Gap) * Math.ceil((this.ShowItemNum + 1) / 2) <
				i
			)
				return !1;
		} else if (t < 0)
			for (let e = 0; e < this.Items.length; e++)
				if (
					this.Items[e].ShowItemIndex === this.DataLength - 1 &&
					this.Items[e].GetItemPositionX() + t <
						-(this.ItemSizeX + this.Gap) * Math.ceil(this.ShowItemNum / 2)
				)
					return !1;
		return !0;
	}
	OEt(t) {
		return !0;
	}
}
exports.NoCircleExhibitionView = NoCircleExhibitionView;
