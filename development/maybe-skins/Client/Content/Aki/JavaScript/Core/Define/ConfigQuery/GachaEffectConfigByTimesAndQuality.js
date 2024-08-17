"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGachaEffectConfigByTimesAndQuality = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GachaEffectConfig_1 = require("../Config/GachaEffectConfig"),
	DB = "db_gacha.db",
	FILE = "c.抽卡.xlsx",
	TABLE = "GachaEffectConfig",
	COMMAND =
		"select BinData from `GachaEffectConfig` where Times=? AND Quality=?",
	KEY_PREFIX = "GachaEffectConfigByTimesAndQuality",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configGachaEffectConfigByTimesAndQuality.GetConfig(";
exports.configGachaEffectConfigByTimesAndQuality = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, n = !0) => {
		if (
			(f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o}#${i})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			if (
				(f =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["Times", o],
							["Quality", i],
						))
			) {
				var f,
					e = void 0;
				if (
					(([f, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Times", o],
						["Quality", i],
					)),
					f)
				) {
					const a =
						GachaEffectConfig_1.GachaEffectConfig.getRootAsGachaEffectConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
						);
					return (
						n &&
							((f = KEY_PREFIX + `#${o}#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(f, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=GachaEffectConfigByTimesAndQuality.js.map
