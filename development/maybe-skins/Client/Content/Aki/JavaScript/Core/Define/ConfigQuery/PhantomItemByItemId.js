"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomItemByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomItem_1 = require("../Config/PhantomItem"),
	DB = "db_phantom.db",
	FILE = "h.幻象.xlsx",
	TABLE = "PhantomItem",
	COMMAND = "select BinData from `PhantomItem` where ItemId=?",
	KEY_PREFIX = "PhantomItemByItemId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPhantomItemByItemId.GetConfig(";
exports.configPhantomItemByItemId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (m) return m;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ItemId",
							o,
						]))
			) {
				var t,
					e = void 0;
				if (
					(([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ItemId", o],
					)),
					t)
				) {
					const m = PhantomItem_1.PhantomItem.getRootAsPhantomItem(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((t = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, m)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						m
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomItemByItemId.js.map
