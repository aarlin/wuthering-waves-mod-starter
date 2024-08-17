"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configItemExchangeContentByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ItemExchangeContent_1 = require("../Config/ItemExchangeContent"),
	DB = "db_item_exchange.db",
	FILE = "d.道具兑换.xlsx",
	TABLE = "ItemExchangeContent",
	COMMAND = "select BinData from `ItemExchangeContent` where ItemId=?",
	KEY_PREFIX = "ItemExchangeContentByItemId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configItemExchangeContentByItemId.GetConfig(";
exports.configItemExchangeContentByItemId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, n = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var o = KEY_PREFIX + `#${e})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (i) return i;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ItemId",
							e,
						]))
			) {
				var t,
					o = void 0;
				if (
					(([t, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ItemId", e],
					)),
					t)
				) {
					const i =
						ItemExchangeContent_1.ItemExchangeContent.getRootAsItemExchangeContent(
							new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
						);
					return (
						n &&
							((t = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ItemExchangeContentByItemId.js.map
