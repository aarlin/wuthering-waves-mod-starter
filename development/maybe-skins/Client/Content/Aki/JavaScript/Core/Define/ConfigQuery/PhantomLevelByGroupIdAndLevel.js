"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomLevelByGroupIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomLevel_1 = require("../Config/PhantomLevel"),
	DB = "db_phantom.db",
	FILE = "h.幻象.xlsx",
	TABLE = "PhantomLevel",
	COMMAND = "select BinData from `PhantomLevel` where GroupId=? AND Level=?",
	KEY_PREFIX = "PhantomLevelByGroupIdAndLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPhantomLevelByGroupIdAndLevel.GetConfig(";
exports.configPhantomLevelByGroupIdAndLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e, n = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o}#${e})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (r) return r;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["GroupId", o],
							["Level", e],
						))
			) {
				var t,
					i = void 0;
				if (
					(([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["GroupId", o],
						["Level", e],
					)),
					t)
				) {
					const r = PhantomLevel_1.PhantomLevel.getRootAsPhantomLevel(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						n &&
							((t = KEY_PREFIX + `#${o}#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomLevelByGroupIdAndLevel.js.map
