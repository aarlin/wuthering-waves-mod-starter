"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSignRewardByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SignReward_1 = require("../Config/SignReward"),
	DB = "db_activity.db",
	FILE = "h.回流活动.xlsx",
	TABLE = "SignReward",
	COMMAND = "select BinData from `SignReward` where ActivityId=?",
	KEY_PREFIX = "SignRewardByActivityId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configSignRewardByActivityId.GetConfigList(";
exports.configSignRewardByActivityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + `#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
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
					var t = void 0;
					if (
						(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ActivityId", i],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t = SignReward_1.SignReward.getRootAsSignReward(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					r.push(t);
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
//# sourceMappingURL=SignRewardByActivityId.js.map
