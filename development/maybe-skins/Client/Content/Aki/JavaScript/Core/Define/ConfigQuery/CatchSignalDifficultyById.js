"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCatchSignalDifficultyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CatchSignalDifficulty_1 = require("../Config/CatchSignalDifficulty"),
	DB = "db_catchsignaldifficulty.db",
	FILE = "k.可视化编辑/c.Csv/m.捕获信号玩法难度/*.csv*",
	TABLE = "CatchSignalDifficulty",
	COMMAND = "select BinData from `CatchSignalDifficulty` where Id=?",
	KEY_PREFIX = "CatchSignalDifficultyById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCatchSignalDifficultyById.GetConfig(";
exports.configCatchSignalDifficultyById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (i, o = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${i})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (f) return f;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							i,
						]))
			) {
				var t,
					n = void 0;
				if (
					(([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", i],
					)),
					t)
				) {
					const f =
						CatchSignalDifficulty_1.CatchSignalDifficulty.getRootAsCatchSignalDifficulty(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						o &&
							((t = KEY_PREFIX + `#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CatchSignalDifficultyById.js.map
