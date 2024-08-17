"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configItemExchangeContentAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ItemExchangeContent_1 = require("../Config/ItemExchangeContent"),
	DB = "db_item_exchange.db",
	FILE = "d.道具兑换.xlsx",
	TABLE = "ItemExchangeContent",
	COMMAND = "select BinData from `ItemExchangeContent`",
	KEY_PREFIX = "ItemExchangeContentAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configItemExchangeContentAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (n = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var o = KEY_PREFIX + ")";
				const i = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (i) return i;
			}
			const i = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var t = void 0;
				if (
					(([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!e)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				t =
					ItemExchangeContent_1.ItemExchangeContent.getRootAsItemExchangeContent(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
				i.push(t);
			}
			return (
				n &&
					((o = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(o, i, i.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				i
			);
		}
	},
};
//# sourceMappingURL=ItemExchangeContentAll.js.map
