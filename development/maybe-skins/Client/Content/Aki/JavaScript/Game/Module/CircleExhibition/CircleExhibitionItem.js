"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircleExhibitionItem = void 0);
const UE = require("ue"),
	AutoAttachExhibitionItem_1 = require("./AutoAttachExhibitionItem");
class CircleExhibitionItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItem {
	constructor() {
		super(...arguments), (this.MoveCircleState = !1);
	}
	OnInit() {
		this.vWe(), this.UEt();
	}
	UEt() {
		this.Index < this.DataLength
			? (this.ShowItemIndex = this.Index)
			: (this.ShowItemIndex = this.Index - this.ShowItemNum);
	}
	vWe() {
		var t, e;
		this.ExhibitionView &&
			((t = Math.floor(this.ShowItemNum / 2)),
			0 === this.CurrentDirection
				? ((e = 0),
					(e = (this.Index - t) * (this.FullSizeX + this.InitGap)),
					this.Actor.SetAnchorOffset(new UE.Vector2D(e, 0)))
				: ((e = 0),
					(e = (this.Index - t) * (this.FullSizeY + this.InitGap)),
					this.Actor.SetAnchorOffset(new UE.Vector2D(0, e))));
	}
	OnMoveItem(t) {
		let e = 0;
		(this.MoveCircleState = !1),
			0 === this.CurrentDirection
				? ((e = this.Actor.GetAnchorOffsetX() + t), this.AEt(e))
				: ((e = this.Actor.GetAnchorOffsetY() + t), this.PEt(e));
	}
	AEt(t) {
		let e = t;
		if (this.xEt(e)) {
			if (!this.wEt(e)) {
				for (; !this.wEt(e); )
					e +=
						(this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
				for (
					this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1);
					this.ShowItemIndex >= this.DataLength;
				)
					this.ShowItemIndex = this.ShowItemIndex - this.DataLength;
				this.RefreshItem(),
					this.OnMoveFromLeftToRight(),
					(this.MoveCircleState = !0);
			}
		} else {
			for (; !this.xEt(e); )
				e -= (this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
			for (
				this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1);
				this.ShowItemIndex < 0;
			)
				this.ShowItemIndex = this.DataLength + this.ShowItemIndex;
			this.RefreshItem(),
				this.OnMoveFromRightToLeft(),
				(this.MoveCircleState = !0);
		}
		this.Actor.SetAnchorOffsetX(e);
	}
	PEt(t) {
		let e = t;
		if (this.BEt(e)) {
			if (!this.bEt(e)) {
				for (; !this.bEt(e); )
					e +=
						(this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
				for (
					this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1);
					this.ShowItemIndex >= this.DataLength;
				)
					this.ShowItemIndex = this.ShowItemIndex - this.DataLength;
				this.RefreshItem(),
					this.OnMoveFromDownToUp(),
					(this.MoveCircleState = !0);
			}
		} else {
			for (; !this.BEt(e); )
				e -= (this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
			for (
				this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1);
				this.ShowItemIndex < 0;
			)
				this.ShowItemIndex = this.DataLength + this.ShowItemIndex;
			this.RefreshItem(),
				this.OnMoveFromUpToDown(),
				(this.MoveCircleState = !0);
		}
		this.Actor.SetAnchorOffsetY(e);
	}
	xEt(t) {
		return !(
			(this.FullSizeX + this.InitGap) * Math.ceil((this.ShowItemNum + 1) / 2) <
			t
		);
	}
	wEt(t) {
		return !(
			t <
			-(this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum / 2)
		);
	}
	BEt(t) {
		return !(
			(this.FullSizeY + this.InitGap) * Math.ceil((this.ShowItemNum + 1) / 2) <
			t
		);
	}
	bEt(t) {
		return !(
			t <
			-(this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum / 2)
		);
	}
}
exports.CircleExhibitionItem = CircleExhibitionItem;
