"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemFilter = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonFilter_1 = require("./CommonFilter");
class ItemFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.XTt = (e) => {
				var t = e.GetConfigId();
				if (
					3 ===
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
						t,
					)
				)
					return (
						(t = e.GetUniqueId()),
						(e =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								t,
							))
							? e.GetMonsterId()
							: void 0
					);
			});
	}
	OnInitFilterMap() {
		this.FilterMap.set(3, this.XTt),
			this.FilterMap.set(18, this.XTt),
			this.FilterMap.set(19, this.XTt),
			this.FilterMap.set(20, this.XTt),
			this.FilterMap.set(21, this.XTt);
	}
}
exports.ItemFilter = ItemFilter;
