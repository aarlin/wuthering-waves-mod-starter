"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAdviceSentenceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AdviceSentence_1 = require("../Config/AdviceSentence"),
	DB = "db_advice.db",
	FILE = "s.溯言.xlsx",
	TABLE = "AdviceSentence",
	COMMAND = "select BinData from `AdviceSentence` where Id=?",
	KEY_PREFIX = "AdviceSentenceById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configAdviceSentenceById.GetConfig(";
exports.configAdviceSentenceById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var o = KEY_PREFIX + `#${e})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (t) return t;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var i,
					o = void 0;
				if (
					(([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					i)
				) {
					const t = AdviceSentence_1.AdviceSentence.getRootAsAdviceSentence(
						new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AdviceSentenceById.js.map
