"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopUtils = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine"),
	EXP_ID = 1,
	GOLD_ID = 2,
	DIAMOND_ID = 3;
class ShopUtils {
	static GetResource(e) {
		return 1 === e
			? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(1) || 0
			: 2 === e
				? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(2) || 0
				: 3 === e
					? ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(3) ||
						0
					: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							e,
						);
	}
	static FormatTime(e) {
		var t = Math.trunc(e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY),
			r = Math.trunc(
				(e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY) /
					TimeOfDayDefine_1.TOD_SECOND_PER_HOUR,
			),
			i = Math.trunc(
				(e % TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
					TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE,
			);
		e = Math.trunc(e) % TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
		return 0 < t
			? StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr1"),
					t.toString(),
					r.toString(),
				)
			: 0 < r
				? StringUtils_1.StringUtils.Format(
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"ShopTimeStr2",
						),
						r.toString(),
						i.toString(),
					)
				: 0 < i
					? StringUtils_1.StringUtils.Format(
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								"ShopTimeStr3",
							),
							i.toString(),
						)
					: StringUtils_1.StringUtils.Format(
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								"ShopTimeStr4",
							),
							e.toString(),
						);
	}
}
exports.ShopUtils = ShopUtils;
