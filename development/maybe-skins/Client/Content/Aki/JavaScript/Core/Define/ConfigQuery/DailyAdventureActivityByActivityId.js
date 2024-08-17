"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDailyAdventureActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DailyAdventureActivity_1 = require("../Config/DailyAdventureActivity"),
	DB = "db_activity.db",
	FILE = "r.日常探险活动.xlsx",
	TABLE = "DailyAdventureActivity",
	COMMAND = "select BinData from `DailyAdventureActivity` where ActivityId=?",
	KEY_PREFIX = "DailyAdventureActivityByActivityId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configDailyAdventureActivityByActivityId.GetConfig(";
exports.configDailyAdventureActivityByActivityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (i, t = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (t) {
				var o = KEY_PREFIX + `#${i})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (n) return n;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ActivityId",
							i,
						]))
			) {
				var e,
					o = void 0;
				if (
					(([e, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ActivityId", i],
					)),
					e)
				) {
					const n =
						DailyAdventureActivity_1.DailyAdventureActivity.getRootAsDailyAdventureActivity(
							new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
						);
					return (
						t &&
							((e = KEY_PREFIX + `#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=DailyAdventureActivityByActivityId.js.map
