"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAdviceConjunctionAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AdviceConjunction_1 = require("../Config/AdviceConjunction"),
	DB = "db_advice.db",
	FILE = "s.溯言.xlsx",
	TABLE = "AdviceConjunction",
	COMMAND = "select BinData from `AdviceConjunction`",
	KEY_PREFIX = "AdviceConjunctionAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configAdviceConjunctionAll = {
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
				const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (t) return t;
			}
			const t = new Array();
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
				e = AdviceConjunction_1.AdviceConjunction.getRootAsAdviceConjunction(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				t.push(e);
			}
			return (
				o &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=AdviceConjunctionAll.js.map
