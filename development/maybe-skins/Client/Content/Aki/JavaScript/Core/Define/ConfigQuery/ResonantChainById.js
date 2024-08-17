"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configResonantChainById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ResonantChain_1 = require("../Config/ResonantChain"),
	DB = "db_resonate_chain.db",
	FILE = "g.共鸣链.xlsx",
	TABLE = "ResonantChain",
	COMMAND = "select BinData from `ResonantChain` where Id=?",
	KEY_PREFIX = "ResonantChainById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configResonantChainById.GetConfig(";
exports.configResonantChainById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + `#${n})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							n,
						]))
			) {
				var i,
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", n],
					)),
					i)
				) {
					const a = ResonantChain_1.ResonantChain.getRootAsResonantChain(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						o &&
							((i = KEY_PREFIX + `#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ResonantChainById.js.map
