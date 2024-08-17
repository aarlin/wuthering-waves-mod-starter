"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSubtitleTextByRowNameAndDatatableName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SubtitleText_1 = require("../Config/SubtitleText"),
	DB = "db_subtitle_text.db",
	FILE = "k.可视化编辑/j.剧情/字幕*",
	TABLE = "SubtitleText",
	COMMAND =
		"select BinData from `SubtitleText` where RowName = ? AND DatatableName = ?",
	KEY_PREFIX = "SubtitleTextByRowNameAndDatatableName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configSubtitleTextByRowNameAndDatatableName.GetConfig(";
exports.configSubtitleTextByRowNameAndDatatableName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o, t = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (t) {
				var n = KEY_PREFIX + `#${e}#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["RowName", e],
							["DatatableName", o],
						))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["RowName", e],
						["DatatableName", o],
					)),
					i)
				) {
					const a = SubtitleText_1.SubtitleText.getRootAsSubtitleText(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						t &&
							((i = KEY_PREFIX + `#${e}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SubtitleTextByRowNameAndDatatableName.js.map
