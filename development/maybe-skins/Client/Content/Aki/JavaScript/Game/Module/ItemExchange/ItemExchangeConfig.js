"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemExchangeConfig = void 0);
const ItemExchangeContentAll_1 = require("../../../Core/Define/ConfigQuery/ItemExchangeContentAll"),
	ItemExchangeContentByItemId_1 = require("../../../Core/Define/ConfigQuery/ItemExchangeContentByItemId"),
	ItemExchangeLimitByItemId_1 = require("../../../Core/Define/ConfigQuery/ItemExchangeLimitByItemId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ItemExchangeConfig extends ConfigBase_1.ConfigBase {
	GetExChangeConfigList(e) {
		var t = [];
		for (const n of ItemExchangeContentAll_1.configItemExchangeContentAll.GetConfigList())
			n.ItemId === e && t.push(n);
		return t?.sort((e, t) => e.Times - t.Times), t;
	}
	GetFirstExChangeConfigList(e) {
		return ItemExchangeContentByItemId_1.configItemExchangeContentByItemId.GetConfig(
			e,
		);
	}
	GetItemExchangeLimit(e) {
		return ItemExchangeLimitByItemId_1.configItemExchangeLimitByItemId.GetConfig(
			e,
		);
	}
}
exports.ItemExchangeConfig = ItemExchangeConfig;
