"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTrackMoonHandbookRewardAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TrackMoonHandbookReward_1 = require("../Config/TrackMoonHandbookReward"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "TrackMoonHandbookReward",
	COMMAND = "select BinData from `TrackMoonHandbookReward`",
	KEY_PREFIX = "TrackMoonHandbookRewardAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configTrackMoonHandbookRewardAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + ")";
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			const a = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var r = void 0;
				if (
					(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				r =
					TrackMoonHandbookReward_1.TrackMoonHandbookReward.getRootAsTrackMoonHandbookReward(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
				a.push(r);
			}
			return (
				o &&
					((e = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				a
			);
		}
	},
};
//# sourceMappingURL=TrackMoonHandbookRewardAll.js.map
