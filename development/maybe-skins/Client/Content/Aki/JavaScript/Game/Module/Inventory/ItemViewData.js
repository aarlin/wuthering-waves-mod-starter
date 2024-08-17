"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemViewData = void 0);
const UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ItemViewData {
	constructor(e) {
		this.Lci = e;
	}
	SetItemViewInfo(e) {
		this.Lci = e;
	}
	GetItemViewInfo() {
		return this.Lci;
	}
	Dci(e) {
		this.Lci.IsNewItem = e;
	}
	SetIsLock(e) {
		this.Lci.IsLock = e;
	}
	SetHasRedDot(e) {
		this.Lci.HasRedDot = e;
	}
	GetRedDotDisableRule() {
		var e = this.GetConfigId();
		return (e =
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e))
			? e.RedDotDisableRule
			: 0;
	}
	GetConfigId() {
		return this.Lci.ConfigId;
	}
	GetUniqueId() {
		return this.GetItemDataBase()?.GetUniqueId();
	}
	GetQuality() {
		return this.GetItemDataBase()?.GetQuality();
	}
	SetCount(e) {
		this.Lci.Count = e;
	}
	GetCount() {
		return this.Lci.Count;
	}
	SetStackId(e) {
		this.Lci.StackId = e;
	}
	GetStackId() {
		return this.Lci.StackId;
	}
	SetSelectOn(e) {
		this.Lci.IsSelectOn = e;
	}
	GetSelectOn() {
		return this.Lci.IsSelectOn;
	}
	SetSelectNum(e) {
		this.Lci.SelectOnNum = e;
	}
	GetSelectNum() {
		return this.Lci.SelectOnNum;
	}
	GetItemDataBase() {
		return this.Lci.ItemDataBase;
	}
	GetItemDataType() {
		return this.Lci.ItemDataType;
	}
	GetSortIndex() {
		return this.GetItemDataBase().GetSortIndex();
	}
	RemoveNewItem() {
		var e = ModelManager_1.ModelManager.InventoryModel,
			t = this.GetItemDataType(),
			a = this.GetConfigId(),
			i = this.GetUniqueId();
		0 === t ? e.RemoveNewCommonItem(a, i) : e.RemoveNewAttributeItem(i),
			this.Dci(!1);
	}
	RemoveRedDotItem() {
		var e = ModelManager_1.ModelManager.InventoryModel,
			t = this.GetItemDataType(),
			a = this.GetConfigId(),
			i = this.GetUniqueId();
		0 === t ? e.RemoveRedDotCommonItem(a, i) : e.RemoveRedDotAttributeItem(i),
			this.SetHasRedDot(!1);
	}
	IsBuffItem() {
		return ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(
			this.GetConfigId(),
		);
	}
	IsTeamBuffItem() {
		return ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(
			this.GetConfigId(),
		);
	}
	GetUiPlayItem() {
		var e = this.GetConfigId();
		return UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
	}
	GetItemType() {
		return this.GetItemDataBase()?.GetType();
	}
	GetAttributeLevel() {
		var e,
			t = this.GetItemDataType(),
			a = this.GetUniqueId();
		return 3 === t
			? (e =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
						a,
					))
				? e.GetPhantomLevel()
				: 0
			: 2 === t
				? ModelManager_1.ModelManager.WeaponModel.GetWeaponLevelById(a)
				: 0;
	}
	GetItemOperationType() {
		return this.Lci.ItemOperationMode;
	}
	IsItemCanDestroy() {
		switch (this.GetItemDataType()) {
			case 0:
				return this.GetItemDataBase().GetConfig().Destructible;
			case 2:
				var e = (e = (i = this.GetItemDataBase()).GetUniqueId())
						? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)
						: void 0,
					t = i.GetIsLock(),
					a = !!e && 0 !== e.GetRoleId(),
					i = i.GetConfig().Destructible;
				e = !!e && e.HasWeaponCultivated();
				return i && !t && !a && !e;
			case 3:
				return (
					(t = (i = this.GetItemDataBase()).GetUniqueId()),
					(a = i.GetIsLock()),
					(t =
						!!(e =
							ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
								t,
							)) && 0 !== e),
					i.GetConfig().Destructible && !a && !t
				);
		}
		return !1;
	}
	IsEqual(e, t) {
		var a = this.GetConfigId() === e.GetConfigId(),
			i = this.GetUniqueId() === e.GetUniqueId();
		e = this.GetStackId() === e.GetStackId();
		return t ? a && i && e : a && i;
	}
}
exports.ItemViewData = ItemViewData;
