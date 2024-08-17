"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRewardViewFromSourceBySourceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RewardViewFromSource_1 = require("../Config/RewardViewFromSource"),
	DB = "db_rewardui.db",
	FILE = "j.奖励界面表现.xlsx",
	TABLE = "RewardViewFromSource",
	COMMAND = "select BinData from `RewardViewFromSource` where RewardSourceId=?",
	KEY_PREFIX = "RewardViewFromSourceBySourceId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configRewardViewFromSourceBySourceId.GetConfig(";
exports.configRewardViewFromSourceBySourceId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var r = KEY_PREFIX + `#${o})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (n) return n;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"RewardSourceId",
							o,
						]))
			) {
				var i,
					r = void 0;
				if (
					(([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["RewardSourceId", o],
					)),
					i)
				) {
					const n =
						RewardViewFromSource_1.RewardViewFromSource.getRootAsRewardViewFromSource(
							new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
						);
					return (
						e &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RewardViewFromSourceBySourceId.js.map
