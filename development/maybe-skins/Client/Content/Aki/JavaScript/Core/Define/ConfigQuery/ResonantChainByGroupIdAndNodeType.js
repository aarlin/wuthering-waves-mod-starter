"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configResonantChainByGroupIdAndNodeType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ResonantChain_1 = require("../Config/ResonantChain"),
	DB = "db_resonate_chain.db",
	FILE = "g.共鸣链.xlsx",
	TABLE = "ResonantChain",
	COMMAND =
		"select BinData from `ResonantChain` where GroupId=? AND NodeType=?",
	KEY_PREFIX = "ResonantChainByGroupIdAndNodeType",
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
		"configResonantChainByGroupIdAndNodeType.GetConfigList(";
exports.configResonantChainByGroupIdAndNodeType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n, e = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var a = KEY_PREFIX + `#${o}#${n})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (t) return t;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["GroupId", o],
							["NodeType", n],
						)
					)
						break;
					var r = void 0;
					if (
						(([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["GroupId", o],
							["NodeType", n],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = ResonantChain_1.ResonantChain.getRootAsResonantChain(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					e &&
						((a = KEY_PREFIX + `#${o}#${n})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(a, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ResonantChainByGroupIdAndNodeType.js.map
