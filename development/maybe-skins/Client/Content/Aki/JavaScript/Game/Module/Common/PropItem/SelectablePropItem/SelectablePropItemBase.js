"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropItemBase = void 0);
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	SelectablePropTypeItemVariantSelect_1 = require("./SelectablePropTypeItemVariantSelect"),
	SelectablePropTypeOne_1 = require("./SelectablePropTypeOne");
class SelectablePropItemBase extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e = 1) {
		super(),
			(this.PropData = void 0),
			(this.OnToggleClick = (e) => {}),
			(this.Wwt = void 0),
			(this.ComponentType = e);
	}
	OnRegisterComponent() {
		0 === this.ComponentType
			? (this.Wwt = new SelectablePropTypeOne_1.SelectablePropTypeOne(
					this.RootItem,
				))
			: 1 === this.ComponentType &&
				(this.Wwt =
					new SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect(
						this.RootItem,
					)),
			this.Wwt.SetToggleClick(this.OnToggleClick);
	}
	GetSelectItem() {
		return this.Wwt.GetSelectItem();
	}
	GetReduceButton() {
		return this.Wwt.GetReduceButton();
	}
	GetControlItem() {
		return this.Wwt.GetControlItem();
	}
	GetFinishSelectItem() {
		return this.Wwt.GetFinishSelectItem();
	}
	GetSelectNumberText() {
		return this.Wwt.GetSelectNumberText();
	}
	GetSelectableToggle() {
		return this.Wwt.GetSelectableToggle();
	}
	SetRoleIconState() {
		this.Wwt.SetRoleIconState();
	}
	ShowDefaultDownText() {
		this.Wwt instanceof
			SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect &&
			this.Wwt.ShowDefaultDownText();
	}
	RefreshRightDownLockSprite(e) {
		this.Wwt instanceof
			SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect &&
			this.Wwt.RefreshRightDownLockSprite(e);
	}
	Refresh(e, t, r) {
		(this.PropData = e), this.Wwt.Refresh(e, t, r), this.OnRefresh(t, r);
	}
	OnRefresh(e, t) {}
	Clear() {}
}
exports.SelectablePropItemBase = SelectablePropItemBase;
