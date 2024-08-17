"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillTreeByNodeIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SkillTree_1 = require("../Config/SkillTree"),
	DB = "db_skilltree.db",
	FILE = "j.技能树.xlsx",
	TABLE = "SkillTree",
	COMMAND = "select BinData from `SkillTree` where NodeGroup = ?",
	KEY_PREFIX = "SkillTreeByNodeIndex",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configSkillTreeByNodeIndex.GetConfigList(";
exports.configSkillTreeByNodeIndex = {
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
				const l = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (l) return l;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const l = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"NodeGroup",
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
							["NodeGroup", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = SkillTree_1.SkillTree.getRootAsSkillTree(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					l.push(r);
				}
				return (
					e &&
						((n = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, l, l.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					l
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SkillTreeByNodeIndex.js.map
