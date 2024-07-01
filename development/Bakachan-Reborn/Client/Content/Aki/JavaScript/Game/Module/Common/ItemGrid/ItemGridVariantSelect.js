"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridVariantSelect = void 0);
const UE = require("ue"),
	ItemGridAbstract_1 = require("./ItemGridAbstract"),
	ItemGridVariantOne_1 = require("./ItemGridVariantOne");
class ItemGridVariantSelect extends ItemGridAbstract_1.ItemGridAbstract {
	constructor() {
		super(...arguments),
			(this.IsItemGridVariantOne = !0),
			(this.IsItemGrid = !0),
			(this.IsItemGridVariantSelect = !0),
			(this.aAt = void 0),
			(this.hAt = void 0),
			(this.lAt = void 0),
			(this.Xpt = () => {
				this.aAt?.();
			});
	}
	RefreshItemShowState(t) {
		this.GetItem(0).SetUIActive(t);
	}
	RefreshReduceButtonShowState(t) {
		this.GetButton(4).RootUIComp.SetUIActive(t);
	}
	GetFinishSelectItem() {
		return this.GetItem(1);
	}
	GetFinishMiddleItem() {
		return this.GetItem(2);
	}
	GetControlItem() {
		return this.GetItem(3);
	}
	GetReduceButton() {
		return this.GetButton(4);
	}
	GetAddButton() {
		return this.GetButton(5);
	}
	SetAddButtonCallBack(t) {
		this.aAt = t;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[
					5,
					() => {
						this.Xpt();
					},
				],
				[
					4,
					() => {
						this.hAt?.();
					},
				],
			]);
	}
	OnStart() {
		(this.lAt = new ItemGridVariantOne_1.ItemGridVariantOne(
			this.GetItem(0).GetOwner(),
			this,
			this.GetBelongView(),
		)),
			this.RefreshReduceButtonShowState(!1);
	}
	RefreshQualitySprite() {
		this.lAt.RefreshQualitySprite();
	}
	RefreshTextureIcon() {
		this.lAt.RefreshTextureIcon();
	}
	RefreshTextDown(t, e) {
		this.lAt.RefreshTextDown(t, e);
	}
	RefreshTextDownByTextId(t, e, ...i) {
		this.lAt.RefreshTextDownByTextId(t, e, ...i);
	}
	SetReduceClickEvent(t) {
		this.hAt = t;
	}
	SetToggleClickEvent(t) {
		this.lAt.SetToggleClickEvent(t);
	}
	SetToggleClickStateEvent(t) {
		this.lAt.SetToggleClickStateEvent(t);
	}
	BindRedPointWithKeyAndId(t, e) {
		this.lAt.BindRedPointWithKeyAndId(t, e);
	}
	RefreshCdPanel(t, e, i) {
		this.lAt.RefreshCdPanel(t, e, i);
	}
	RefreshDarkSprite(t) {
		this.lAt.RefreshDarkSprite(t);
	}
	RefreshLockSprite(t) {
		this.lAt.RefreshLockSprite(t);
	}
	RefreshStar(t) {
		this.lAt.RefreshStar(t);
	}
	RefreshRecoverSprite(t) {
		this.lAt.RefreshRecoverSprite(t);
	}
	RefreshRightDownLockSprite(t) {
		this.lAt.RefreshRightDownLockSprite(t);
	}
	RefreshUpgradePanel(t, e) {
		this.lAt.RefreshUpgradePanel(t, e);
	}
	GetClickToggle() {
		return this.lAt.GetClickToggle();
	}
	GetDownText() {
		return this.lAt.GetDownText();
	}
	GetConfigId() {
		return this.GetItemId();
	}
	OnBeforeDestroy() {
		this.lAt.Destroy();
	}
}
exports.ItemGridVariantSelect = ItemGridVariantSelect;
