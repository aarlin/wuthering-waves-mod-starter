"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCharacterAudioConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CharacterAudioConfig_1 = require("../Config/CharacterAudioConfig"),
	DB = "db_entity_audio.db",
	FILE = "y.音频组件配置.xlsx",
	TABLE = "CharacterAudioConfig",
	COMMAND =
		"select BinData from `CharacterAudioConfig` where id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) >0;",
	KEY_PREFIX = "CharacterAudioConfigByIdWithDefaultId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCharacterAudioConfigByIdWithDefaultId.GetConfig(";
exports.configCharacterAudioConfigByIdWithDefaultId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, n, e, C = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (C) {
				var d = KEY_PREFIX + `#${o}#${i}#${n}#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(d);
				if (a) return a;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["Id", o],
							["Id", i],
							["Id", n],
							["Id", e],
						))
			) {
				var r,
					d = void 0;
				if (
					(([r, d] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
						["Id", i],
						["Id", n],
						["Id", e],
					)),
					r)
				) {
					const a =
						CharacterAudioConfig_1.CharacterAudioConfig.getRootAsCharacterAudioConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
						);
					return (
						C &&
							((r = KEY_PREFIX + `#${o}#${i}#${n}#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CharacterAudioConfigByIdWithDefaultId.js.map
