"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomCustomizeItemByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomCustomizeItem_1 = require("../Config/PhantomCustomizeItem"),
	DB = "db_phantom.db",
	FILE = "h.幻象.xlsx",
	TABLE = "PhantomCustomizeItem",
	COMMAND = "select BinData from `PhantomCustomizeItem` where ItemId=?",
	KEY_PREFIX = "PhantomCustomizeItemByItemId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPhantomCustomizeItemByItemId.GetConfig(";
exports.configPhantomCustomizeItemByItemId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var t = KEY_PREFIX + `#${o})`;
				const m = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (m) return m;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ItemId",
							o,
						]))
			) {
				var n,
					t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ItemId", o],
					)),
					n)
				) {
					const m =
						PhantomCustomizeItem_1.PhantomCustomizeItem.getRootAsPhantomCustomizeItem(
							new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
						);
					return (
						e &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, m)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						m
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomCustomizeItemByItemId.js.map
