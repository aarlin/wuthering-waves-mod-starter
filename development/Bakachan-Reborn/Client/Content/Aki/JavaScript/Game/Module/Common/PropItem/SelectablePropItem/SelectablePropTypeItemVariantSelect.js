"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropTypeItemVariantSelect = void 0);
const ItemGridVariantSelect_1 = require("../../ItemGrid/ItemGridVariantSelect"),
	SelectablePropComponentBase_1 = require("./SelectablePropComponentBase");
class SelectablePropTypeItemVariantSelect extends SelectablePropComponentBase_1.SelectablePropComponentBase {
	constructor() {
		super(...arguments), (this.Jwt = void 0);
	}
	GetSelectableToggle() {
		return this.Jwt.GetClickToggle();
	}
	GetSelectItem() {
		return this.Jwt.GetFinishSelectItem();
	}
	GetReduceButton() {
		return this.Jwt.GetReduceButton();
	}
	GetControlItem() {
		return this.Jwt.GetControlItem();
	}
	GetFinishSelectItem() {}
	GetSelectNumberText() {
		return this.Jwt.GetDownText();
	}
	ShowDefaultDownText() {
		this.Jwt.ShowDefaultDownText();
	}
	RefreshRightDownLockSprite(e) {
		this.Jwt.RefreshRightDownLockSprite(e);
	}
	Refresh(e, t, r) {
		(e = [{ IncId: e.IncId, ItemId: e.ItemId }, e.Count]),
			this.Jwt.Refresh(e, t, r);
	}
	SetToggleClick(e) {
		this.Jwt.SetToggleClickStateEvent(e);
	}
	SetRoleIconState() {}
	OnStart() {
		(this.Jwt = new ItemGridVariantSelect_1.ItemGridVariantSelect(
			this.RootItem.GetOwner(),
		)),
			this.Jwt.GetFinishMiddleItem().SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.Jwt.Destroy();
	}
}
exports.SelectablePropTypeItemVariantSelect =
	SelectablePropTypeItemVariantSelect;
