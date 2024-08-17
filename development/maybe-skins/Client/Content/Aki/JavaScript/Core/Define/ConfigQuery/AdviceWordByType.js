"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAdviceWordByType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AdviceWord_1 = require("../Config/AdviceWord"),
	DB = "db_advice.db",
	FILE = "s.溯言.xlsx",
	TABLE = "AdviceWord",
	COMMAND = "select BinData from `AdviceWord` where Type=?",
	KEY_PREFIX = "AdviceWordByType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configAdviceWordByType.GetConfigList(";
exports.configAdviceWordByType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (d) return d;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const d = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Type",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["Type", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = AdviceWord_1.AdviceWord.getRootAsAdviceWord(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					d.push(r);
				}
				return (
					e &&
						((n = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, d, d.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					d
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AdviceWordByType.js.map
