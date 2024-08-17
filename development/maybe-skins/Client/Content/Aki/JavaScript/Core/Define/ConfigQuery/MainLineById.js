"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMainLineById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MainLine_1 = require("../Config/MainLine"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "MainLine",
	COMMAND = "select BinData from `MainLine` where Id=?",
	KEY_PREFIX = "MainLineById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configMainLineById.GetConfig(";
exports.configMainLineById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + `#${n})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (a) return a;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							n,
						]))
			) {
				var e,
					i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", n],
					)),
					e)
				) {
					const a = MainLine_1.MainLine.getRootAsMainLine(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						o &&
							((e = KEY_PREFIX + `#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MainLineById.js.map
