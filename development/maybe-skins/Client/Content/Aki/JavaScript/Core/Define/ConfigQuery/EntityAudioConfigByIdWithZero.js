"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configEntityAudioConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	EntityAudioConfig_1 = require("../Config/EntityAudioConfig"),
	DB = "db_entity_audio.db",
	FILE = "y.音频组件配置.xlsx",
	TABLE = "EntityAudioConfig",
	COMMAND =
		"select BinData from `EntityAudioConfig` where id=0 AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) >0;",
	KEY_PREFIX = "EntityAudioConfigByIdWithZero",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configEntityAudioConfigByIdWithZero.GetConfig(";
exports.configEntityAudioConfigByIdWithZero = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, n, t = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (t) {
				var d = KEY_PREFIX + `#${o}#${i}#${n})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(d);
				if (C) return C;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["Id", o],
							["Id", i],
							["Id", n],
						))
			) {
				var e,
					d = void 0;
				if (
					(([e, d] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
						["Id", i],
						["Id", n],
					)),
					e)
				) {
					const C =
						EntityAudioConfig_1.EntityAudioConfig.getRootAsEntityAudioConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
						);
					return (
						t &&
							((e = KEY_PREFIX + `#${o}#${i}#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						C
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=EntityAudioConfigByIdWithZero.js.map
