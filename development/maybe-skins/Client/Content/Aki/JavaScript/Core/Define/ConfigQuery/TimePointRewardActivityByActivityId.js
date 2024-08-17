"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTimePointRewardActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TimePointRewardActivity_1 = require("../Config/TimePointRewardActivity"),
	DB = "db_activity.db",
	FILE = "d.定点奖励领取活动.xlsx",
	TABLE = "TimePointRewardActivity",
	COMMAND =
		"select BinData from `TimePointRewardActivity` where ActivityId = ?",
	KEY_PREFIX = "TimePointRewardActivityByActivityId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX =
		"configTimePointRewardActivityByActivityId.GetConfigList(";
exports.configTimePointRewardActivityByActivityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, o = !0) => {
		var t;
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + `#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"ActivityId",
							i,
						])
					)
						break;
					var n = void 0;
					if (
						(([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ActivityId", i],
						)),
						!t)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					n =
						TimePointRewardActivity_1.TimePointRewardActivity.getRootAsTimePointRewardActivity(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					r.push(n);
				}
				return (
					o &&
						((e = KEY_PREFIX + `#${i})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TimePointRewardActivityByActivityId.js.map
