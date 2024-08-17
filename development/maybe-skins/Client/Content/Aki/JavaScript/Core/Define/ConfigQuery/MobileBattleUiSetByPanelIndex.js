"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMobileBattleUiSetByPanelIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet"),
	DB = "db_mobile_battle_ui_set.db",
	FILE = "y.移动端主界面键位配置.xlsx",
	TABLE = "MobileBattleUiSet",
	COMMAND = "select BinData from `MobileBattleUiSet` where PanelIndex=?",
	KEY_PREFIX = "MobileBattleUiSetByPanelIndex",
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
		"configMobileBattleUiSetByPanelIndex.GetConfigList(";
exports.configMobileBattleUiSetByPanelIndex = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e, o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"PanelIndex",
							e,
						])
					)
						break;
					var t = void 0;
					if (
						(([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["PanelIndex", e],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					a.push(t);
				}
				return (
					o &&
						((n = KEY_PREFIX + `#${e})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MobileBattleUiSetByPanelIndex.js.map
