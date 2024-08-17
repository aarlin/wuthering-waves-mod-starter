"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configInfluenceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Influence_1 = require("../Config/Influence"),
	DB = "db_influence.db",
	FILE = "s.势力.xlsx",
	TABLE = "Influence",
	COMMAND = "select BinData from `Influence` where Id=?",
	KEY_PREFIX = "InfluenceById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configInfluenceById.GetConfig(";
exports.configInfluenceById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, e = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var o = KEY_PREFIX + `#${n})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (f) return f;
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
					o = void 0;
				if (
					(([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", n],
					)),
					i)
				) {
					const f = Influence_1.Influence.getRootAsInfluence(
						new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
					);
					return (
						e &&
							((i = KEY_PREFIX + `#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=InfluenceById.js.map
