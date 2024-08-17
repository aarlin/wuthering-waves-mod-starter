"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDynamicMapMarkByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DynamicMapMark_1 = require("../Config/DynamicMapMark"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "DynamicMapMark",
	COMMAND = "select BinData from `DynamicMapMark` where MarkId=?",
	KEY_PREFIX = "DynamicMapMarkByMarkId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configDynamicMapMarkByMarkId.GetConfig(";
exports.configDynamicMapMarkByMarkId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (r) return r;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"MarkId",
							o,
						]))
			) {
				var i,
					a = void 0;
				if (
					(([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MarkId", o],
					)),
					i)
				) {
					const r = DynamicMapMark_1.DynamicMapMark.getRootAsDynamicMapMark(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=DynamicMapMarkByMarkId.js.map
