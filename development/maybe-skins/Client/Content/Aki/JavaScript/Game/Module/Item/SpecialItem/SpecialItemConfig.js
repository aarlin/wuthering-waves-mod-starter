"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialItemConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById"),
	SpecialItemById_1 = require("../../../../Core/Define/ConfigQuery/SpecialItemById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
class SpecialItemConfig extends ConfigBase_1.ConfigBase {
	GetConfig(e) {
		var o = ItemInfoById_1.configItemInfoById.GetConfig(e);
		if (
			o &&
			o.SpecialItem &&
			(o = SpecialItemById_1.configSpecialItemById.GetConfig(e))
		)
			return o;
	}
	GetAllowTagIds(e) {
		var o = SpecialItemById_1.configSpecialItemById.GetConfig(e),
			a = new Array();
		for (const i of o.AllowTags) {
			var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
			r
				? a.push(r)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Item",
						40,
						"特殊道具Tag不存在,请检查配置",
						["configId", e],
						["tagName", i],
					);
		}
		return a;
	}
	GetBanTagIds(e) {
		var o = SpecialItemById_1.configSpecialItemById.GetConfig(e),
			a = new Array();
		for (const i of o.BanTags) {
			var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
			r
				? a.push(r)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Item",
						40,
						"特殊道具Tag不存在,请检查配置",
						["configId", e],
						["tagName", i],
					);
		}
		return a;
	}
}
exports.SpecialItemConfig = SpecialItemConfig;
