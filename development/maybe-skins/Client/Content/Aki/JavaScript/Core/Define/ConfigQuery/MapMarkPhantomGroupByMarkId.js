"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMapMarkPhantomGroupByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MapMarkPhantomGroup_1 = require("../Config/MapMarkPhantomGroup"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "MapMarkPhantomGroup",
	COMMAND = "select BinData from `MapMarkPhantomGroup` where MarkId=?",
	KEY_PREFIX = "MapMarkPhantomGroupByMarkId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configMapMarkPhantomGroupByMarkId.GetConfig(";
exports.configMapMarkPhantomGroupByMarkId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${o})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (e) return e;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"MarkId",
							o,
						]))
			) {
				var r,
					a = void 0;
				if (
					(([r, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MarkId", o],
					)),
					r)
				) {
					const e =
						MapMarkPhantomGroup_1.MapMarkPhantomGroup.getRootAsMapMarkPhantomGroup(
							new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
						);
					return (
						n &&
							((r = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MapMarkPhantomGroupByMarkId.js.map
