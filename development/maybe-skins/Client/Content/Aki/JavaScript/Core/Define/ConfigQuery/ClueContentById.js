"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configClueContentById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ClueContent_1 = require("../Config/ClueContent"),
	DB = "db_clue.db",
	FILE = "x.线索.xlsx",
	TABLE = "ClueContent",
	COMMAND = "select BinData from `ClueContent` where Id=?",
	KEY_PREFIX = "ClueContentById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configClueContentById.GetConfig(";
exports.configClueContentById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (C) return C;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var t,
					e = void 0;
				if (
					(([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					t)
				) {
					const C = ClueContent_1.ClueContent.getRootAsClueContent(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((t = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						C
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ClueContentById.js.map
