"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleAudioById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleAudio_1 = require("../Config/RoleAudio"),
	DB = "db_audio.db",
	FILE = "y.音频.xlsx",
	TABLE = "RoleAudio",
	COMMAND = "select BinData from `RoleAudio` where Id=?",
	KEY_PREFIX = "RoleAudioById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configRoleAudioById.GetConfig(";
exports.configRoleAudioById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (d) return d;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var n,
					e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					n)
				) {
					const d = RoleAudio_1.RoleAudio.getRootAsRoleAudio(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						i &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleAudioById.js.map
