"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTurntableActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TurntableActivity_1 = require("../Config/TurntableActivity"),
	DB = "db_activity.db",
	FILE = "z.转盘活动.xlsx",
	TABLE = "TurntableActivity",
	COMMAND = "select BinData from `TurntableActivity` where ActivityId = ?",
	KEY_PREFIX = "TurntableActivityByActivityId",
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
		"configTurntableActivityByActivityId.GetConfigList(";
exports.configTurntableActivityByActivityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, t = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (t) {
				var n = KEY_PREFIX + `#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			if (
				(o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
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
					var e = void 0;
					if (
						(([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ActivityId", i],
						)),
						!o)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = TurntableActivity_1.TurntableActivity.getRootAsTurntableActivity(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					r.push(e);
				}
				return (
					t &&
						((n = KEY_PREFIX + `#${i})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TurntableActivityByActivityId.js.map
