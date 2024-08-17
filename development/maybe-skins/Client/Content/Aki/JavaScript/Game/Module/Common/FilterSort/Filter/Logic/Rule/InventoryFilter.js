"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryFilter = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonFilter_1 = require("./CommonFilter"),
	VisionDestroyFilterLogic_1 = require("./VisionDestroyFilterLogic");
class InventoryFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.KTt = (t) => t.GetQuality()),
			(this.QTt = (t) => {
				var e = t.GetConfigId();
				if (
					2 ===
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
						e,
					)
				)
					return (
						(e = t.GetUniqueId()),
						(t =
							ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(e))
							? t.GetConfig().WeaponType
							: void 0
					);
			}),
			(this.XTt = (t) => {
				var e = t.GetConfigId();
				if (
					3 ===
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
						e,
					)
				)
					return (
						(e = t.GetUniqueId()),
						(t =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								e,
							))
							? t.GetMonsterId()
							: void 0
					);
			}),
			(this.$Tt = (t) => {
				var e = t.GetSelectOn();
				t = 1 === t.GetItemOperationType();
				return e && t;
			});
	}
	OnInitFilterMap() {
		this.FilterMap.set(22, this.KTt),
			this.FilterMap.set(2, this.QTt),
			this.FilterMap.set(3, this.XTt),
			this.FilterMap.set(18, this.XTt),
			this.FilterMap.set(19, this.XTt),
			this.FilterMap.set(20, this.XTt),
			this.FilterMap.set(21, this.XTt),
			this.FilterMap.set(
				14,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomRarity,
			),
			this.FilterMap.set(
				23,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomCost,
			),
			this.FilterMap.set(
				24,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomQuality,
			),
			this.FilterMap.set(
				25,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
					.GetVisionDestroyFetterGroup,
			),
			this.FilterMap.set(
				26,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
					.GetVisionDestroyAttribute,
			);
	}
	DefaultFilterList() {
		return [this.$Tt];
	}
}
exports.InventoryFilter = InventoryFilter;
