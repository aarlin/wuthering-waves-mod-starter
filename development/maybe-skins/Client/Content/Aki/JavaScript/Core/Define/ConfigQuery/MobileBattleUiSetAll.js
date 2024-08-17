"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMobileBattleUiSetAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet"),
	DB = "db_mobile_battle_ui_set.db",
	FILE = "y.移动端主界面键位配置.xlsx",
	TABLE = "MobileBattleUiSet",
	COMMAND = "select BinData from `MobileBattleUiSet`",
	KEY_PREFIX = "MobileBattleUiSetAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configMobileBattleUiSetAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + ")";
				const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (n) return n;
			}
			const n = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var t = void 0;
				if (
					(([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				t = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(
					new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
				);
				n.push(t);
			}
			return (
				e &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				n
			);
		}
	},
};
//# sourceMappingURL=MobileBattleUiSetAll.js.map
