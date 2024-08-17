"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRewardViewFromSourceAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RewardViewFromSource_1 = require("../Config/RewardViewFromSource"),
	DB = "db_rewardui.db",
	FILE = "j.奖励界面表现.xlsx",
	TABLE = "RewardViewFromSource",
	COMMAND = "select BinData from `RewardViewFromSource`",
	KEY_PREFIX = "RewardViewFromSourceAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configRewardViewFromSourceAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var r = KEY_PREFIX + ")";
				const n = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (n) return n;
			}
			const n = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!e)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					RewardViewFromSource_1.RewardViewFromSource.getRootAsRewardViewFromSource(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				n.push(i);
			}
			return (
				o &&
					((r = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(r, n, n.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				n
			);
		}
	},
};
//# sourceMappingURL=RewardViewFromSourceAll.js.map
