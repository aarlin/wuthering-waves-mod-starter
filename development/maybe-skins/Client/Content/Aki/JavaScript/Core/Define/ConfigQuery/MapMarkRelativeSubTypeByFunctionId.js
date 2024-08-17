"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMapMarkRelativeSubTypeByFunctionId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MapMarkRelativeSubType_1 = require("../Config/MapMarkRelativeSubType"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "MapMarkRelativeSubType",
	COMMAND = "select BinData from `MapMarkRelativeSubType` where FunctionId=?",
	KEY_PREFIX = "MapMarkRelativeSubTypeByFunctionId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configMapMarkRelativeSubTypeByFunctionId.GetConfig(";
exports.configMapMarkRelativeSubTypeByFunctionId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"FunctionId",
							e,
						]))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["FunctionId", e],
					)),
					i)
				) {
					const a =
						MapMarkRelativeSubType_1.MapMarkRelativeSubType.getRootAsMapMarkRelativeSubType(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						o &&
							((i = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MapMarkRelativeSubTypeByFunctionId.js.map
