"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SingleItemSelect = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSelectView_1 = require("../../Common/CommonItemSelectView"),
	MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
	SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent"),
	AttributeItemData_1 = require("../../Inventory/ItemData/AttributeItemData"),
	PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData"),
	WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData");
class SingleItemSelect {
	constructor() {
		(this.KNo = void 0),
			(this.Jwt = void 0),
			(this.TGt = void 0),
			(this.QNo = void 0),
			(this.XNo =
				new CommonItemSelectView_1.CommonItemSelectViewOpenViewData()),
			(this.$No = new SelectableComponent_1.SelectableComponentData()),
			(this.YNo = 0),
			(this.e6i = 0),
			(this.JNo = !1),
			(this.OpenItemSelectView = () => {
				var e = [];
				this.KNo && e.push(this.KNo),
					(this.XNo.ItemDataBaseList = this.TGt()),
					(this.XNo.SelectedDataList = e),
					(this.XNo.UseWayId = this.e6i),
					(this.XNo.InitSortToggleState = this.JNo),
					0 === this.YNo
						? UiManager_1.UiManager.OpenView(
								"CommonItemSelectViewRight",
								this.XNo,
							)
						: UiManager_1.UiManager.OpenView(
								"CommonItemSelectViewLeft",
								this.XNo,
							);
			}),
			(this.zNo = (e, t) => {
				(this.KNo = 0 < e?.length ? e[0] : void 0), this.ZNo();
			}),
			(this.eOo = (e, t, o, i) =>
				!(this.KNo && t === this.KNo.IncId && o === this.KNo.ItemId && 0 < i));
	}
	Init(e, t = 0) {
		(this.Jwt = new MediumItemGrid_1.MediumItemGrid()),
			this.Jwt.Initialize(e.GetOwner()),
			this.Jwt.Apply({ Type: 1 }),
			(this.YNo = t),
			this.Jwt.BindEmptySlotButtonCallback(this.OpenItemSelectView),
			this.Jwt.BindReduceButtonCallback(this.OpenItemSelectView),
			this.Jwt.BindOnExtendToggleStateChanged(this.OpenItemSelectView),
			this.Jwt.SetReduceButton(void 0),
			(this.$No.IsSingleSelected = !0),
			(this.$No.OnChangeSelectedFunction = this.zNo),
			(this.$No.CheckIfCanAddFunction = this.eOo),
			(this.XNo.SelectableComponentData = this.$No);
	}
	SetUseWayId(e) {
		this.e6i = e;
	}
	SetInitSortToggleState(e) {
		this.JNo = e;
	}
	ZNo() {
		if (void 0 === this.KNo)
			this.Jwt.SetSelected(!1), this.Jwt.Apply({ Type: 1 });
		else {
			var e = this.KNo.IncId,
				t = this.KNo.ItemId;
			let n = (a =
				ModelManager_1.ModelManager.InventoryModel).GetAttributeItemData(e);
			var o,
				i,
				a = {
					Type: 4,
					ItemConfigId: t,
					StarLevel: (n = n || a.GetCommonItemData(t)).GetQuality(),
				};
			n instanceof AttributeItemData_1.AttributeItemData
				? ((a.BottomTextId = "Text_LevelShow_Text"),
					n instanceof PhantomItemData_1.PhantomItemData &&
						((t =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
								t,
							)),
						(o = (i =
							ModelManager_1.ModelManager
								.PhantomBattleModel).GetPhantomBattleData(e)),
						(i = i.GetPhantomBattleData(e).GetPhantomLevel()),
						(a.BottomTextParameter = [i]),
						(a.BottomTextId = t.Name),
						(a.StarLevel = t.QualityId),
						(a.Level = o.GetCost()),
						(a.IsLevelTextUseChangeColor = !0)),
					n instanceof WeaponItemData_1.WeaponItemData &&
						((t = (i =
							ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
								e,
							)).GetLevel()),
						(a.Level = i.GetResonanceLevel()),
						(a.BottomTextParameter = [t])))
				: (a.BottomText = this.KNo.SelectedCount.toString()),
				this.Jwt.Apply(a),
				this.Jwt.SetSelected(!0);
		}
		this.QNo(this.KNo);
	}
	ClearSelectData() {
		(this.KNo = void 0), this.ZNo();
	}
	SetItemSelectChangeCallBack(e) {
		this.QNo = e;
	}
	SetGetItemListFunction(e) {
		this.TGt = e;
	}
	GetCurrentSelectedData() {
		return this.KNo;
	}
}
exports.SingleItemSelect = SingleItemSelect;
