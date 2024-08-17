"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsComponentUtilTool = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ItemTipsDefine_1 = require("./ItemTipsDefine");
class ItemTipsComponentUtilTool {
	static GetTipsDataById(e, t) {
		var i =
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
				e,
			);
		if (void 0 !== i) {
			let o = ItemTipsComponentUtilTool.dPt.get(i);
			if (((o = o || 0), (i = ItemTipsComponentUtilTool.CPt[o])))
				return new i(e, t);
		}
	}
}
((exports.ItemTipsComponentUtilTool = ItemTipsComponentUtilTool).CPt = {
	0: ItemTipsDefine_1.TipsMaterialData,
	1: ItemTipsDefine_1.TipsWeaponData,
	2: ItemTipsDefine_1.TipsVisionData,
	3: ItemTipsDefine_1.TipsCharacterData,
}),
	(ItemTipsComponentUtilTool.dPt = new Map([
		[3, 2],
		[2, 1],
		[1, 3],
	]));
