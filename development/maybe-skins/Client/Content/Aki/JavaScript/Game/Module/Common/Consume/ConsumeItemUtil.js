"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConsumeItemUtil = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ConsumeItem_1 = require("./ConsumeItem");
class ConsumeItemUtil {
	static GetConsumeItemData(e, t) {
		if ((e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(e)[0]))
			return 2 === e.GetType()
				? this.WeaponConsumeData(e)
				: this.MaterialConsumeData(e, t);
	}
	static WeaponConsumeData(e) {
		var t = new ConsumeItem_1.ConsumeItemData(),
			a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				e.GetUniqueId(),
			);
		return (
			(t.IncId = e.GetUniqueId()),
			(t.ItemId = e.GetConfigId()),
			(t.ResonanceLevel = a.GetResonanceLevel()),
			(t.BottomText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"LevelShow",
			).replace("{0}", a.GetLevel().toString())),
			t
		);
	}
	static MaterialConsumeData(e, t) {
		var a = new ConsumeItem_1.ConsumeItemData();
		return (
			(a.IncId = e.GetUniqueId()),
			(a.ItemId = e.GetConfigId()),
			(a.BottomText = t + "/" + e.GetCount()),
			a
		);
	}
}
exports.ConsumeItemUtil = ConsumeItemUtil;
