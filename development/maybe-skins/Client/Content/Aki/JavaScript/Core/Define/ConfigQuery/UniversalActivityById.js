"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUniversalActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UniversalActivity_1 = require("../Config/UniversalActivity"),
	DB = "db_activity.db",
	FILE = "t.通用活动.xlsx",
	TABLE = "UniversalActivity",
	COMMAND = "select BinData from `UniversalActivity` where Id=?",
	KEY_PREFIX = "UniversalActivityById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configUniversalActivityById.GetConfig(";
exports.configUniversalActivityById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (i, o = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${i})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							i,
						]))
			) {
				var e,
					n = void 0;
				if (
					(([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", i],
					)),
					e)
				) {
					const t =
						UniversalActivity_1.UniversalActivity.getRootAsUniversalActivity(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						o &&
							((e = KEY_PREFIX + `#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=UniversalActivityById.js.map
