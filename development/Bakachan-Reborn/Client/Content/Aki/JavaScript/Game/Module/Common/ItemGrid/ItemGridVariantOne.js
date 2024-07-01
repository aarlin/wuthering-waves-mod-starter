"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemGridVariantOne = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	ItemGrid_1 = require("./ItemGrid"),
	ItemGridAbstract_1 = require("./ItemGridAbstract");
class ItemGridVariantOne extends ItemGridAbstract_1.ItemGridAbstract {
	constructor() {
		super(...arguments),
			(this.ItemGrid = void 0),
			(this.StarLayoutItem = void 0),
			(this.IsItemGridVariantOne = !0),
			(this.IsItemGrid = !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIVerticalLayout],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UIText],
		];
	}
	OnStart() {
		(this.StarLayoutItem = new StarLayoutItem(this.GetItem(1))),
			(this.ItemGrid = new ItemGrid_1.ItemGrid(
				this.GetItem(0).GetOwner(),
				this,
			)),
			this.RefreshStar(void 0),
			this.RefreshRecoverSprite(!1),
			this.RefreshRightDownLockSprite(!1),
			this.RefreshUpgradePanel(!1, void 0);
	}
	RefreshQualitySprite() {
		this.ItemGrid.RefreshQualitySprite();
	}
	RefreshTextureByPath(e) {
		this.ItemGrid.RefreshTextureByPath(e);
	}
	RefreshTextureIcon() {
		this.ItemGrid.RefreshTextureIcon();
	}
	RefreshTextDown(e, t) {
		this.ItemGrid.RefreshTextDown(e, t);
	}
	RefreshTextDownByTextId(e, t, ...r) {
		this.ItemGrid.RefreshTextDownByTextId(e, t, ...r);
	}
	SetToggleClickEvent(e) {
		this.ItemGrid.SetToggleClickEvent(e);
	}
	SetToggleClickStateEvent(e) {
		this.ItemGrid.SetToggleClickStateEvent(e);
	}
	BindRedPointWithKeyAndId(e, t) {
		this.ItemGrid.BindRedPointWithKeyAndId(e, t);
	}
	RefreshCdPanel(e, t, r) {
		this.ItemGrid.RefreshCdPanel(e, t, r);
	}
	RefreshDarkSprite(e) {
		this.ItemGrid.RefreshDarkSprite(e);
	}
	RefreshLockSprite(e) {
		this.ItemGrid.RefreshLockSprite(e);
	}
	GetClickToggle() {
		return this.ItemGrid.GetClickToggle();
	}
	GetDownText() {
		return this.ItemGrid.GetDownText();
	}
	RefreshNewItem(e) {
		this.ItemGrid.RefreshNewItem(e);
	}
	RefreshStar(e) {
		this.StarLayoutItem.RefreshStar(e);
	}
	RefreshRecoverSprite(e) {
		this.GetSprite(3).SetUIActive(e);
	}
	RefreshRightDownLockSprite(e) {
		this.GetSprite(4).SetUIActive(e);
	}
	RefreshUpgradePanel(e, t) {
		this.GetItem(5).SetUIActive(e), e && this.GetText(6).SetText(t);
	}
	Refresh(e, t, r) {}
	OnBeforeDestroy() {
		this.StarLayoutItem?.Destroy(), this.ItemGrid.Destroy();
	}
}
exports.ItemGridVariantOne = ItemGridVariantOne;
class StarItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
}
class StarLayoutItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.StarLayout = void 0),
			(this.sAt = (e, t, r) => ({ Key: r, Value: new StarItem(t) })),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.StarLayout = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(0),
			this.sAt,
			this.GetItem(1),
		);
	}
	RefreshStar(e) {
		var t = e?.length ?? 0;
		this.GetVerticalLayout(0).RootUIComp.SetUIActive(0 < t),
			0 < t && this.StarLayout.RebuildLayoutByDataNew(e);
	}
	OnBeforeDestroy() {
		this.StarLayout.ClearChildren();
	}
}
