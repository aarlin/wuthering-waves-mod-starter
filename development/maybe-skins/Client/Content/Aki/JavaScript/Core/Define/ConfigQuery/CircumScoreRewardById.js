"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCircumScoreRewardById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CircumScoreReward_1 = require("../Config/CircumScoreReward"),
	DB = "db_activity.db",
	FILE = "h.回流活动.xlsx",
	TABLE = "CircumScoreReward",
	COMMAND = "select BinData from `CircumScoreReward` where Id=?",
	KEY_PREFIX = "CircumScoreRewardById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCircumScoreRewardById.GetConfig(";
exports.configCircumScoreRewardById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + `#${o})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (n) return n;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var r,
					i = void 0;
				if (
					(([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					r)
				) {
					const n =
						CircumScoreReward_1.CircumScoreReward.getRootAsCircumScoreReward(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						e &&
							((r = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CircumScoreRewardById.js.map
