"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponItemData = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	AttributeItemData_1 = require("./AttributeItemData");
class WeaponItemData extends AttributeItemData_1.AttributeItemData {
	GetConfig() {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
			this.ConfigId,
		);
	}
	GetMainType() {
		return 2;
	}
	GetType() {
		return 2;
	}
	GetQuality() {
		return this.GetConfig()?.QualityId;
	}
	GetSortIndex() {
		return this.GetConfig()?.SortIndex;
	}
	GetItemAccess() {
		return this.GetConfig()?.ItemAccess;
	}
	GetMaxStackCount() {
		return 1;
	}
	GetDefaultDownText() {
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
				"LevelShow",
			);
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
	}
	GetRedDotDisableRule() {
		return this.GetConfig().RedDotDisableRule;
	}
}
exports.WeaponItemData = WeaponItemData;
