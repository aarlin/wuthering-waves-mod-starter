"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRogueQualityConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RogueQualityConfig_1 = require("../Config/RogueQualityConfig"),
	DB = "db_rogue.db",
	FILE = "r.肉鸽.xlsx",
	TABLE = "RogueQualityConfig",
	COMMAND = "select BinData from `RogueQualityConfig` where Id=?",
	KEY_PREFIX = "RogueQualityConfigById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configRogueQualityConfigById.GetConfig(";
exports.configRogueQualityConfigById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var n = KEY_PREFIX + `#${o})`;
				const g = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (g) return g;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var e,
					n = void 0;
				if (
					(([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const g =
						RogueQualityConfig_1.RogueQualityConfig.getRootAsRogueQualityConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						i &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, g)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						g
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RogueQualityConfigById.js.map
