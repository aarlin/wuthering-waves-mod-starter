"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMonthCardContentById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MonthCardContent_1 = require("../Config/MonthCardContent"),
	DB = "db_monthcardcontent.db",
	FILE = "y.月卡.xlsx",
	TABLE = "MonthCardContent",
	COMMAND = "select BinData from `MonthCardContent` where Id=?",
	KEY_PREFIX = "MonthCardContentById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configMonthCardContentById.GetConfig(";
exports.configMonthCardContentById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var t = KEY_PREFIX + `#${o})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (C) return C;
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
					t = void 0;
				if (
					(([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const C =
						MonthCardContent_1.MonthCardContent.getRootAsMonthCardContent(
							new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
						);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
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
//# sourceMappingURL=MonthCardContentById.js.map
