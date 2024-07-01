"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById"),
	BackgroundCardById_1 = require("../../../Core/Define/ConfigQuery/BackgroundCardById"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	ItemMainTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeAll"),
	ItemMainTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeById"),
	ItemShowTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemShowTypeById"),
	PackageCapacityAll_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityAll"),
	PackageCapacityByPackageId_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityByPackageId"),
	PhantomCustomizeItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomCustomizeItemByItemId"),
	PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId"),
	PhantomItemByMonsterId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByMonsterId"),
	PreviewItemById_1 = require("../../../Core/Define/ConfigQuery/PreviewItemById"),
	QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById"),
	RogueCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueCurrencyById"),
	TypeInfoById_1 = require("../../../Core/Define/ConfigQuery/TypeInfoById"),
	WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	InventoryDefine_1 = require("./InventoryDefine"),
	ItemConfig_1 = require("./ItemConfig");
class InventoryConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.Sui = new Map()),
			(this.Eui = new Map()),
			(this.yui = new Map()),
			(this.$0t = new ItemConfig_1.ItemConfig());
	}
	GetAllMainTypeConfig() {
		return ItemMainTypeAll_1.configItemMainTypeAll.GetConfigList();
	}
	GetItemMainTypeConfig(e) {
		return ItemMainTypeById_1.configItemMainTypeById.GetConfig(e);
	}
	GetItemMainTypeFilterSortUseWayId(e) {
		if ((e = this.GetItemMainTypeConfig(e))) return e.UseWayId;
	}
	GetAccessPathConfig(e) {
		return AccessPathById_1.configAccessPathById.GetConfig(e);
	}
	GetItemQualityConfig(e) {
		return QualityInfoById_1.configQualityInfoById.GetConfig(e);
	}
	GetItemConfigData(e, n = !1) {
		return n
			? ((n = new ItemConfig_1.ItemConfig()),
				this.GetItemConfigDataRef(e, n),
				n)
			: (this.GetItemConfigDataRef(e, this.$0t), this.$0t);
	}
	GetItemConfigDataRef(e, n) {
		if (!n) return !1;
		let t;
		switch (this.GetItemDataTypeByConfigId(e)) {
			case 2:
				t = this.GetWeaponItemConfig(e);
				break;
			case 3:
				t = this.GetPhantomItemConfig(e);
				break;
			case 4:
				var o = this.GetPhantomCustomizeItemConfig(e);
				o && (t = this.GetPhantomItemConfig(o.PhantomId));
				break;
			case 0:
			case 5:
				t = this.GetItemConfig(e);
				break;
			case 1:
				t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
				break;
			case 6:
				t = BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
				break;
			case 7:
				t = this.GetPreviewItemConfig(e);
				break;
			case 8:
				t = RogueCurrencyById_1.configRogueCurrencyById.GetConfig(e);
		}
		return !!t && (n?.Refresh(t), !0);
	}
	GetItemDataTypeByConfigId(e) {
		return e >= InventoryDefine_1.weaponIdRange[0] &&
			e <= InventoryDefine_1.weaponIdRange[1]
			? 2
			: e >= InventoryDefine_1.phantomIdRange[0] &&
					e <= InventoryDefine_1.phantomIdRange[1]
				? 3
				: e >= InventoryDefine_1.phantomSpecificIdRange[0] &&
						e <= InventoryDefine_1.phantomSpecificIdRange[1]
					? 4
					: e >= InventoryDefine_1.roleIdRange[0] &&
							e <= InventoryDefine_1.roleIdRange[1]
						? 1
						: e >= InventoryDefine_1.virtualIdRange[0] &&
								e <= InventoryDefine_1.virtualIdRange[1]
							? 5
							: e >= InventoryDefine_1.cardIdRange[0] &&
									e <= InventoryDefine_1.cardIdRange[1]
								? 6
								: e >= InventoryDefine_1.previewItemIdRange[0] &&
										e <= InventoryDefine_1.previewItemIdRange[1]
									? 7
									: e >= InventoryDefine_1.rogueCurrencyIdRange[0] &&
											e <= InventoryDefine_1.rogueCurrencyIdRange[1]
										? 8
										: 0;
	}
	GetItemConfig(e) {
		return ItemInfoById_1.configItemInfoById.GetConfig(e);
	}
	GetPreviewItemConfig(e) {
		return PreviewItemById_1.configPreviewItemById.GetConfig(e);
	}
	GetWeaponItemConfig(e) {
		return WeaponConfByItemId_1.configWeaponConfByItemId.GetConfig(e);
	}
	GetPhantomItemConfig(e) {
		return PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e);
	}
	GetPhantomCustomizeItemConfig(e) {
		return PhantomCustomizeItemByItemId_1.configPhantomCustomizeItemByItemId.GetConfig(
			e,
		);
	}
	GetPhantomItemConfigListByMonsterId(e) {
		var n =
			PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(e);
		return (
			n ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Config", 9, "表格查询不到配置ID", ["MonsterId", e])),
			n
		);
	}
	GetCardItemConfig(e) {
		return BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
	}
	GetAllPackageConfig() {
		return PackageCapacityAll_1.configPackageCapacityAll.GetConfigList();
	}
	GetPackageConfig(e) {
		return PackageCapacityByPackageId_1.configPackageCapacityByPackageId.GetConfig(
			e,
		);
	}
	GetItemTypeConfig(e) {
		return TypeInfoById_1.configTypeInfoById.GetConfig(e);
	}
	GetItemShowTypeConfig(e) {
		return ItemShowTypeById_1.configItemShowTypeById.GetConfig(e);
	}
	OnClear() {
		return this.Sui.clear(), this.Eui.clear(), this.yui.clear(), !0;
	}
}
(exports.InventoryConfig = InventoryConfig).Iui = void 0;
