"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBossRushBuffAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BossRushBuff_1 = require("../Config/BossRushBuff"),
	DB = "db_activity.db",
	FILE = "b.bossrush活动.xlsx",
	TABLE = "BossRushBuff",
	COMMAND = "select BinData from `BossRushBuff`",
	KEY_PREFIX = "BossRushBuffAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configBossRushBuffAll = {
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
				var i = KEY_PREFIX + ")";
				const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (f) return f;
			}
			const f = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e = BossRushBuff_1.BossRushBuff.getRootAsBossRushBuff(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				f.push(e);
			}
			return (
				o &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				f
			);
		}
	},
};
//# sourceMappingURL=BossRushBuffAll.js.map
