"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCharacterAudioConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CharacterAudioConfig_1 = require("../Config/CharacterAudioConfig"),
	DB = "db_entity_audio.db",
	FILE = "y.音频组件配置.xlsx",
	TABLE = "CharacterAudioConfig",
	COMMAND = "select BinData from `CharacterAudioConfig` where Id=?",
	KEY_PREFIX = "CharacterAudioConfigById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCharacterAudioConfigById.GetConfig(";
exports.configCharacterAudioConfigById = {
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
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
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
					const r =
						CharacterAudioConfig_1.CharacterAudioConfig.getRootAsCharacterAudioConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						i &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CharacterAudioConfigById.js.map
