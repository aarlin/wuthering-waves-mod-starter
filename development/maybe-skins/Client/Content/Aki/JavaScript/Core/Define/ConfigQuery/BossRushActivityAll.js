"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBossRushActivityAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BossRushActivity_1 = require("../Config/BossRushActivity"),
	DB = "db_activity.db",
	FILE = "b.bossrush活动.xlsx",
	TABLE = "BossRushActivity",
	COMMAND = "select BinData from `BossRushActivity`",
	KEY_PREFIX = "BossRushActivityAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configBossRushActivityAll = {
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
				var t = KEY_PREFIX + ")";
				const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (e) return e;
			}
			const e = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!i)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				n = BossRushActivity_1.BossRushActivity.getRootAsBossRushActivity(
					new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
				);
				e.push(n);
			}
			return (
				o &&
					((t = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(t, e, e.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				e
			);
		}
	},
};
//# sourceMappingURL=BossRushActivityAll.js.map
