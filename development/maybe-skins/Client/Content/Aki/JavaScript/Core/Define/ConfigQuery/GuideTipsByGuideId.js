"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGuideTipsByGuideId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GuideTips_1 = require("../Config/GuideTips"),
	DB = "db_guide_new.db",
	FILE = "y.引导(新).xlsx",
	TABLE = "GuideTips",
	COMMAND = "select BinData from `GuideTips` where GuideId=?",
	KEY_PREFIX = "GuideTipsByGuideId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configGuideTipsByGuideId.GetConfig(";
exports.configGuideTipsByGuideId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (i, o = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + `#${i})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (d) return d;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"GuideId",
							i,
						]))
			) {
				var n,
					e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["GuideId", i],
					)),
					n)
				) {
					const d = GuideTips_1.GuideTips.getRootAsGuideTips(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						o &&
							((n = KEY_PREFIX + `#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=GuideTipsByGuideId.js.map
