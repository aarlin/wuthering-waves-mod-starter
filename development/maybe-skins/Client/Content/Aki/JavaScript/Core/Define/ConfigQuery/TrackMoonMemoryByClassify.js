"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTrackMoonMemoryByClassify = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TrackMoonMemory_1 = require("../Config/TrackMoonMemory"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "TrackMoonMemory",
	COMMAND = "select BinData from `TrackMoonMemory` where Classify = ?",
	KEY_PREFIX = "TrackMoonMemoryByClassify",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configTrackMoonMemoryByClassify.GetConfigList(";
exports.configTrackMoonMemoryByClassify = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Classify",
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
							["Classify", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = TrackMoonMemory_1.TrackMoonMemory.getRootAsTrackMoonMemory(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					a.push(r);
				}
				return (
					n &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TrackMoonMemoryByClassify.js.map
