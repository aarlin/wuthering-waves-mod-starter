"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.IconItem =
		exports.ConfirmButtonCompose =
		exports.MachiningClueExItem =
		exports.MachiningClueItem =
		exports.MaterialItem =
		exports.CookItemView =
			void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	CookController_1 = require("../CookController"),
	CookDefine_1 = require("../CookDefine");
class CookItemView extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dqt = void 0),
			(this.Wgt = void 0),
			(this.UIt = (t) => {
				this.Wgt && (this.Wgt(this.dqt), this.xqt());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[6, UE.UIExtendToggle],
			[10, UE.UISprite],
			[11, UE.UITexture],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[12, UE.UIText],
		]),
			(this.BtnBindInfo = [[6, this.UIt]]);
	}
	Refresh(t, e, i) {
		(this.dqt = t),
			this.Pqt(),
			this.Kbe(),
			this.IPt(),
			this.wqt(),
			this.xqt(),
			this.C4e(),
			this.IVe(e, !1);
	}
	Pqt() {
		var t;
		0 === this.dqt.MainType
			? 0 === this.dqt.SubType
				? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
						this.dqt.ItemId,
					)),
					this.SetItemQualityIcon(this.GetSprite(10), t.FoodItemId))
				: this.SetItemQualityIcon(this.GetSprite(10), this.dqt.ItemId)
			: ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
					this.dqt.ItemId,
				)),
				this.SetItemQualityIcon(this.GetSprite(10), t.FinalItemId));
	}
	Kbe() {
		var t;
		0 === this.dqt.MainType
			? 0 === this.dqt.SubType
				? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
						this.dqt.ItemId,
					)),
					this.SetItemIcon(this.GetTexture(11), t.FoodItemId))
				: this.SetItemIcon(this.GetTexture(11), this.dqt.ItemId)
			: ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
					this.dqt.ItemId,
				)),
				this.SetItemIcon(this.GetTexture(11), t.FinalItemId));
	}
	C4e() {
		var t;
		this.dqt &&
			(0 === this.dqt.MainType
				? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
						this.dqt.ItemId,
					)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name))
				: ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
						this.dqt.ItemId,
					)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name)));
	}
	IPt() {
		var t;
		this.dqt.MainType, (t = this.dqt), this.GetItem(7).SetUIActive(!t.IsUnLock);
	}
	wqt() {
		var t;
		1 === this.dqt.MainType
			? ((t = this.dqt),
				(t =
					CookController_1.CookController.CheckCanProcessed(t.ItemId) &&
					t.IsUnLock),
				this.GetItem(8).SetUIActive(!t))
			: 6e4 === (t = this.dqt).SubType
				? this.GetItem(8).SetUIActive(!1)
				: ((t = CookController_1.CookController.CheckCanCook(t.ItemId)),
					this.GetItem(8).SetUIActive(!t));
	}
	xqt() {
		this.GetItem(9).SetUIActive(this.dqt.IsNew);
	}
	BindOnClickedCallback(t) {
		this.Wgt = t;
	}
	OnSelected(t) {
		this.IVe(!0);
	}
	OnDeselected(t) {
		this.IVe(!1);
	}
	IVe(t, e = !0) {
		var i = this.GetExtendToggle(6);
		t ? i.SetToggleState(1, e) : i.SetToggleState(0, !1);
	}
}
exports.CookItemView = CookItemView;
class MaterialItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.ItemData = void 0),
			(this.ItemInfo = void 0),
			(this.Index = 0),
			(this.Wgt = void 0),
			(this.OnClick = (t) => {
				this.Wgt && this.Wgt(this.ItemData, this.Index);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[4, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.OnClick]]);
	}
	Update(t, e) {
		(this.ItemData = t),
			(this.Index = e),
			0 !== this.ItemData.G3n
				? (this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
						this.ItemData.G3n,
					))
				: (this.ItemInfo = void 0),
			this.RefreshNeed(),
			this.RefreshHave(),
			this.Kbe(),
			this.Pqt();
	}
	RefreshNeed(t = 1) {
		let e = this.ItemData.k4n;
		1 !== t && (e *= t), this.GetText(2).SetText(e.toString());
	}
	RefreshHave() {
		var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			this.ItemData.G3n,
		);
		let e;
		(e = this.ItemData.m3n
			? t < this.ItemData.k4n
				? `<color=#dc0300>${t}</color>`
				: `<color=#ffffff>${t}</color>`
			: "<color=#ffffff>--</color>"),
			this.GetText(1).SetText(e);
	}
	Kbe() {
		this.ItemData.m3n
			? (this.GetTexture(3).SetUIActive(!0),
				this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3)))
			: this.GetTexture(3).SetUIActive(!1);
	}
	Pqt() {
		this.ItemData.m3n
			? (this.GetSprite(4).SetUIActive(!0),
				this.SetItemQualityIcon(this.GetSprite(4), this.ItemData.G3n))
			: this.GetSprite(4).SetUIActive(!1);
	}
	BindOnClickedCallback(t) {
		this.Wgt = t;
	}
}
exports.MaterialItem = MaterialItem;
class MachiningClueItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	Update(t, e) {
		this.GetSprite(0).SetUIActive(t),
			this.GetText(1).SetText(e),
			t
				? this.GetText(1).SetColor(
						UE.Color.FromHex(CookDefine_1.INVENTORY_ACTIVE_COLOR),
					)
				: this.GetText(1).SetColor(
						UE.Color.FromHex(CookDefine_1.INVENTORY_DEACTIVE_COLOR),
					);
	}
}
exports.MachiningClueItem = MachiningClueItem;
class MachiningClueExItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	Update(t, e) {
		this.GetSprite(0).SetUIActive(t),
			this.GetText(2).SetUIActive(t),
			this.GetText(1).SetUIActive(!t),
			(t ? this.GetText(2) : this.GetText(1)).SetText(e);
	}
}
exports.MachiningClueExItem = MachiningClueExItem;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Bqt = void 0),
			(this.Kyt = () => {
				this.Bqt();
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	UpdateText(t) {
		this.GetText(1).SetText(t);
	}
	RefreshButton(t) {
		this.GetButton(0)
			.GetOwner()
			.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
			.SetInteractable(t);
	}
	BindClickFunction(t) {
		this.Bqt = t;
	}
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
class IconItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[3, UE.UITexture],
			[4, UE.UISprite],
		];
	}
	SetIcon(t) {
		this.SetItemIcon(this.GetTexture(3), t);
	}
	SetQuality(t) {
		this.SetItemQualityIcon(this.GetSprite(4), t);
	}
}
exports.IconItem = IconItem;
