"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configInterjectionByTimberIdAndUniversalToneId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Interjection_1 = require("../Config/Interjection"),
	DB = "db_audio_interjection.db",
	FILE = "k.可视化编辑/c.Csv/y.音频/y.音色语音事件映射/*.csv*",
	TABLE = "Interjection",
	COMMAND =
		"select BinData from `Interjection` where TimberId = ? AND UniversalToneId = ?",
	KEY_PREFIX = "InterjectionByTimberIdAndUniversalToneId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX =
		"configInterjectionByTimberIdAndUniversalToneId.GetConfig(";
exports.configInterjectionByTimberIdAndUniversalToneId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o, e = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + `#${n}#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (t) return t;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["TimberId", n],
							["UniversalToneId", o],
						))
			) {
				var r,
					i = void 0;
				if (
					(([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["TimberId", n],
						["UniversalToneId", o],
					)),
					r)
				) {
					const t = Interjection_1.Interjection.getRootAsInterjection(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						e &&
							((r = KEY_PREFIX + `#${n}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=InterjectionByTimberIdAndUniversalToneId.js.map
