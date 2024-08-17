"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configExploreToolsByPhantomSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ExploreTools_1 = require("../Config/ExploreTools"),
	DB = "db_explore_skill.db",
	FILE = "t.探索工具.xlsx",
	TABLE = "ExploreTools",
	COMMAND = "select BinData from `ExploreTools` where PhantomSkillId=?",
	KEY_PREFIX = "ExploreToolsByPhantomSkillId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configExploreToolsByPhantomSkillId.GetConfig(";
exports.configExploreToolsByPhantomSkillId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (l) return l;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"PhantomSkillId",
							o,
						]))
			) {
				var i,
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["PhantomSkillId", o],
					)),
					i)
				) {
					const l = ExploreTools_1.ExploreTools.getRootAsExploreTools(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, l)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						l
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ExploreToolsByPhantomSkillId.js.map
