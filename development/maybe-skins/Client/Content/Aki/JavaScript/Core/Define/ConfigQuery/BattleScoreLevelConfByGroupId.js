"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBattleScoreLevelConfByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BattleScoreLevelConf_1 = require("../Config/BattleScoreLevelConf"),
	DB = "db_battlescore.db",
	FILE = "z.战斗评分.xlsx",
	TABLE = "BattleScoreLevelConf",
	COMMAND = "select BinData from `BattleScoreLevelConf` where GroupId=?",
	KEY_PREFIX = "BattleScoreLevelConfByGroupId",
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
		"configBattleScoreLevelConfByGroupId.GetConfigList(";
exports.configBattleScoreLevelConfByGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var r = KEY_PREFIX + `#${o})`;
				const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (i) return i;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const i = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"GroupId",
							o,
						])
					)
						break;
					var t = void 0;
					if (
						(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["GroupId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t =
						BattleScoreLevelConf_1.BattleScoreLevelConf.getRootAsBattleScoreLevelConf(
							new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
						);
					i.push(t);
				}
				return (
					e &&
						((r = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					i
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BattleScoreLevelConfByGroupId.js.map
