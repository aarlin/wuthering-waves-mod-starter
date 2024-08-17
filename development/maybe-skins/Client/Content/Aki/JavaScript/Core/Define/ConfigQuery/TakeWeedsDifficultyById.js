"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTakeWeedsDifficultyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TakeWeedsDifficulty_1 = require("../Config/TakeWeedsDifficulty"),
	DB = "db_activity.db",
	FILE = "g.割草活动.xlsx",
	TABLE = "TakeWeedsDifficulty",
	COMMAND = "select BinData from `TakeWeedsDifficulty` where Id=?",
	KEY_PREFIX = "TakeWeedsDifficultyById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configTakeWeedsDifficultyById.GetConfig(";
exports.configTakeWeedsDifficultyById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, i = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var o = KEY_PREFIX + `#${e})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (f) return f;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var n,
					o = void 0;
				if (
					(([n, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					n)
				) {
					const f =
						TakeWeedsDifficulty_1.TakeWeedsDifficulty.getRootAsTakeWeedsDifficulty(
							new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
						);
					return (
						i &&
							((n = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TakeWeedsDifficultyById.js.map
