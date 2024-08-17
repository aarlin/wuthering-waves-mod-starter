"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLevelPlayDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LevelPlayData_1 = require("../Config/LevelPlayData"),
	DB = "db_levelplaydata.db",
	FILE = "UniverseEditor/LevelPlay/玩法*",
	TABLE = "LevelPlayData",
	COMMAND = "select BinData from `LevelPlayData` where LevelPlayId=?",
	KEY_PREFIX = "LevelPlayDataById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configLevelPlayDataById.GetConfig(";
exports.configLevelPlayDataById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var a = KEY_PREFIX + `#${e})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (i) return i;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"LevelPlayId",
							e,
						]))
			) {
				var n,
					a = void 0;
				if (
					(([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["LevelPlayId", e],
					)),
					n)
				) {
					const i = LevelPlayData_1.LevelPlayData.getRootAsLevelPlayData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						o &&
							((n = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						i
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LevelPlayDataById.js.map
