"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTrackMoonActivityRewardAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TrackMoonActivityReward_1 = require("../Config/TrackMoonActivityReward"),
	DB = "db_activity.db",
	FILE = "z.追月节活动.xlsx",
	TABLE = "TrackMoonActivityReward",
	COMMAND = "select BinData from `TrackMoonActivityReward`",
	KEY_PREFIX = "TrackMoonActivityRewardAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configTrackMoonActivityRewardAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			const r = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!i)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e =
					TrackMoonActivityReward_1.TrackMoonActivityReward.getRootAsTrackMoonActivityReward(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
				r.push(e);
			}
			return (
				o &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=TrackMoonActivityRewardAll.js.map
