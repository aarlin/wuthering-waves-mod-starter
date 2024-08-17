"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLevelPlayNodeDataByKey = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LevelPlayNodeData_1 = require("../Config/LevelPlayNodeData"),
	DB = "db_levelplaynodedata.db",
	FILE = "UniverseEditor/LevelPlay/节点_*",
	TABLE = "LevelPlayNodeData",
	COMMAND = "select BinData from `LevelPlayNodeData` where Key=?",
	KEY_PREFIX = "LevelPlayNodeDataByKey",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configLevelPlayNodeDataByKey.GetConfig(";
exports.configLevelPlayNodeDataByKey = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (i) return i;
			}
			if (
				(a =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Key",
							e,
						]))
			) {
				var a,
					n = void 0;
				if (
					(([a, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Key", e],
					)),
					a)
				) {
					const i =
						LevelPlayNodeData_1.LevelPlayNodeData.getRootAsLevelPlayNodeData(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						o &&
							((a = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LevelPlayNodeDataByKey.js.map
