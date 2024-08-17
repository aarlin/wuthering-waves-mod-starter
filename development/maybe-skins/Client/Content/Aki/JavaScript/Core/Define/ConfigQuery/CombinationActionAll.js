"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCombinationActionAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CombinationAction_1 = require("../Config/CombinationAction"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "CombinationAction",
	COMMAND = "select BinData from `CombinationAction`",
	KEY_PREFIX = "CombinationActionAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configCombinationActionAll = {
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
				const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (e) return e;
			}
			const e = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				t = CombinationAction_1.CombinationAction.getRootAsCombinationAction(
					new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
				);
				e.push(t);
			}
			return (
				o &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				e
			);
		}
	},
};
//# sourceMappingURL=CombinationActionAll.js.map
