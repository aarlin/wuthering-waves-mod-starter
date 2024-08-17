"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemConfig = void 0);
const BackgroundCard_1 = require("../../../Core/Define/Config/BackgroundCard"),
	ItemInfo_1 = require("../../../Core/Define/Config/ItemInfo"),
	PhantomItem_1 = require("../../../Core/Define/Config/PhantomItem"),
	PreviewItem_1 = require("../../../Core/Define/Config/PreviewItem"),
	RogueCurrency_1 = require("../../../Core/Define/Config/RogueCurrency"),
	RoleInfo_1 = require("../../../Core/Define/Config/RoleInfo"),
	WeaponConf_1 = require("../../../Core/Define/Config/WeaponConf"),
	ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class ItemConfig {
	constructor() {
		(this.ItemDataType = 0),
			(this.ItemType = void 0),
			(this.MainTypeId = 1),
			(this.Name = ""),
			(this.TypeDescription = void 0),
			(this.AttributesDescription = ""),
			(this.ObtainedShowDescription = ""),
			(this.BgDescription = void 0),
			(this.ShowInBag = !1),
			(this.Icon = ""),
			(this.IconMiddle = void 0),
			(this.IconSmall = void 0),
			(this.Mesh = void 0),
			(this.QualityId = 0),
			(this.ItemAccess = void 0),
			(this.SortIndex = 0),
			(this.RedDotDisableRule = 0),
			(this.Parameters = new Map()),
			(this.ItemBuffType = 0),
			(this.ShowTypes = void 0);
	}
	Refresh(e) {
		(this.Icon = e.Icon),
			(this.QualityId = e.QualityId),
			(this.AttributesDescription = e.AttributesDescription),
			e instanceof PreviewItem_1.PreviewItem ||
				((this.ShowInBag = e.ShowInBag),
				(this.ObtainedShowDescription = e.ObtainedShowDescription)),
			e instanceof ItemInfo_1.ItemInfo
				? this.Cci(e)
				: e instanceof PhantomItem_1.PhantomItem
					? this.gci(e)
					: e instanceof WeaponConf_1.WeaponConf
						? this.fci(e)
						: (e instanceof RoleInfo_1.RoleInfo && this.pci(e),
							e instanceof BackgroundCard_1.BackgroundCard && this.vci(e),
							e instanceof PreviewItem_1.PreviewItem && this.Mci(e),
							e instanceof RogueCurrency_1.RogueCurrency && this.Sci(e));
	}
	Cci(e) {
		(this.ItemDataType = 0),
			(this.ItemType = e.ItemType),
			(this.MainTypeId = e.MainTypeId),
			(this.Name = e.Name),
			(this.ItemBuffType = e.ItemBuffType);
		var i,
			t,
			s = e.ShowTypes[0];
		for ([i, t] of (s
			? (s =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(
						s,
					)) && (this.TypeDescription = s.Name)
			: (this.TypeDescription = void 0),
		(this.BgDescription = e.BgDescription),
		(this.IconMiddle = e.IconMiddle),
		(this.IconSmall = e.IconSmall),
		(this.Mesh = e.Mesh),
		(this.ItemAccess = e.ItemAccess),
		(this.RedDotDisableRule = e.RedDotDisableRule),
		this.Parameters.clear(),
		e.Parameters))
			this.Parameters.set(i, t);
		(this.SortIndex = e.SortIndex), (this.ShowTypes = e.ShowTypes);
	}
	gci(e) {
		(this.ItemDataType = 3),
			(this.ItemType = 9),
			(this.MainTypeId = 3),
			(this.Name = e.MonsterName),
			(this.TypeDescription = e.TypeDescription),
			(this.IconMiddle = e.IconMiddle),
			(this.IconSmall = e.IconSmall),
			(this.Mesh = e.Mesh),
			(this.ItemAccess = e.ItemAccess),
			this.Parameters.clear(),
			(this.SortIndex = e.SortIndex),
			(this.RedDotDisableRule = e.RedDotDisableRule),
			(this.ItemBuffType = 0);
	}
	Sci(e) {
		(this.ItemDataType = 8),
			(this.QualityId = e.QualityId),
			(this.ItemType = 15),
			(this.MainTypeId = 1),
			(this.TypeDescription = e.TypeDescription),
			(this.BgDescription = e.BgDescription),
			(this.IconMiddle = e.IconMiddle),
			(this.IconSmall = e.IconSmall),
			(this.ItemAccess = e.ItemAccess),
			this.Parameters.clear(),
			(this.SortIndex = e.SortIndex),
			(this.RedDotDisableRule = e.RedDotDisableRule),
			(this.ItemBuffType = 0),
			(this.Name = e.Title);
	}
	fci(e) {
		(this.ItemDataType = 2),
			(this.ItemType = 2),
			(this.MainTypeId = 2),
			(this.Name = e.WeaponName),
			(this.TypeDescription = e.TypeDescription),
			(this.BgDescription = e.BgDescription),
			(this.IconMiddle = e.IconMiddle),
			(this.IconSmall = e.IconSmall),
			(this.Mesh = e.Mesh),
			(this.ItemAccess = e.ItemAccess),
			this.Parameters.clear(),
			(this.SortIndex = e.SortIndex),
			(this.RedDotDisableRule = e.RedDotDisableRule),
			(this.ItemBuffType = 0);
	}
	pci(e) {
		var i = ModelUtil_1.ModelUtil.GetModelConfig(e.MeshId);
		(this.ItemDataType = 1),
			(this.ItemType = void 0),
			(this.MainTypeId = 1),
			(this.Name = e.Name),
			(this.TypeDescription = void 0),
			(this.BgDescription = void 0),
			(this.IconMiddle = e.RoleHeadIconBig),
			(this.IconSmall = e.RoleHeadIcon),
			(this.Icon = e.RoleHeadIconLarge),
			(this.Mesh = i?.网格体.ToAssetPathName()),
			(this.ItemAccess = void 0),
			this.Parameters.clear(),
			(this.SortIndex = 0),
			(this.RedDotDisableRule = e.RedDotDisableRule),
			(this.ItemBuffType = 0);
	}
	vci(e) {
		(this.ItemDataType = 6),
			(this.ItemType = 14),
			(this.MainTypeId = 8),
			(this.Name = e.Title),
			(this.TypeDescription = e.TypeDescription),
			(this.BgDescription = e.BgDescription),
			(this.IconMiddle = e.IconMiddle),
			(this.IconSmall = e.IconSmall),
			(this.Mesh = void 0),
			(this.ItemAccess = e.ItemAccess),
			this.Parameters.clear(),
			(this.SortIndex = 0),
			(this.RedDotDisableRule = e.RedDotDisableRule),
			(this.ItemBuffType = 0);
	}
	Mci(e) {
		(this.ItemDataType = 7),
			(this.ItemType = 9),
			(this.MainTypeId = 3),
			(this.Name = e.Name);
		var i = e.ShowTypes[0];
		i
			? (i =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(
						i,
					)) && (this.TypeDescription = i.Name)
			: (this.TypeDescription = void 0),
			(this.BgDescription = e.BgDescription),
			(this.IconMiddle = e.IconMiddle),
			(this.IconSmall = e.IconSmall),
			(this.Mesh = void 0),
			(this.ItemAccess = e.PreviewItemAccess),
			this.Parameters.clear(),
			(this.SortIndex = 0),
			(this.RedDotDisableRule = 0),
			(this.ItemBuffType = 0),
			(this.ShowTypes = e.ShowTypes);
	}
}
exports.ItemConfig = ItemConfig;
