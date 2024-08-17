"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoCircleExhibitionItem = void 0);
const UE = require("ue"),
	AutoAttachExhibitionItem_1 = require("./AutoAttachExhibitionItem");
class NoCircleExhibitionItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItem {
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
		var t, i;
		this.ExhibitionView &&
			((t = Math.floor(this.ShowItemNum / 2)),
			0 === this.CurrentDirection
				? ((i = 0),
					(i = (this.Index - t) * (this.FullSizeX + this.InitGap)),
					this.Actor.SetAnchorOffset(new UE.Vector2D(i, 0)))
				: ((i = 0),
					(i = (t - this.Index) * (this.FullSizeY + this.InitGap)),
					this.Actor.SetAnchorOffset(new UE.Vector2D(0, i))));
	}
	OnMoveItem(t) {
		let i = 0;
		(this.MoveCircleState = !1),
			0 === this.CurrentDirection
				? ((i = this.Actor.GetAnchorOffsetX() + t), this.AEt(i))
				: ((i = this.Actor.GetAnchorOffsetY() + t), this.PEt(i)),
			(t = 0 <= this.ShowItemIndex && this.ShowItemIndex < this.DataLength),
			this.Actor.SetActive(t);
	}
	AEt(t) {
		let i = t;
		if (this.xEt(i)) {
			if (!this.wEt(i)) {
				for (; !this.wEt(i); )
					(i +=
						(this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1)),
						(this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1));
				this.RefreshItem(),
					this.OnMoveFromLeftToRight(),
					(this.MoveCircleState = !0);
			}
		} else {
			for (; !this.xEt(i); )
				(i -=
					(this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1)),
					(this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1));
			this.RefreshItem(),
				this.OnMoveFromRightToLeft(),
				(this.MoveCircleState = !0);
		}
		this.Actor.SetAnchorOffsetX(i);
	}
	PEt(t) {
		let i = t;
		if (this.BEt(i)) {
			if (!this.bEt(i)) {
				for (; !this.bEt(i); )
					(i +=
						(this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1)),
						(this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1));
				this.RefreshItem(),
					this.OnMoveFromDownToUp(),
					(this.MoveCircleState = !0);
			}
		} else {
			for (; !this.BEt(i); )
				(i -=
					(this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1)),
					(this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1));
			this.RefreshItem(),
				this.OnMoveFromUpToDown(),
				(this.MoveCircleState = !0);
		}
		this.Actor.SetAnchorOffsetY(i);
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
exports.NoCircleExhibitionItem = NoCircleExhibitionItem;
