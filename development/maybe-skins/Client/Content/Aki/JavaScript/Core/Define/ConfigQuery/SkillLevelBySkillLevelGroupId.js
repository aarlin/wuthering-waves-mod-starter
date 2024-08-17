"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillLevelBySkillLevelGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SkillLevel_1 = require("../Config/SkillLevel"),
	DB = "db_skill.db",
	FILE = "j.技能.xlsx",
	TABLE = "SkillLevel",
	COMMAND = "select BinData from `SkillLevel` where SkillLevelGroupId = ?",
	KEY_PREFIX = "SkillLevelBySkillLevelGroupId",
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
		"configSkillLevelBySkillLevelGroupId.GetConfigList(";
exports.configSkillLevelBySkillLevelGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e, o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var l = KEY_PREFIX + `#${e})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(l);
				if (r) return r;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"SkillLevelGroupId",
							e,
						])
					)
						break;
					var n = void 0;
					if (
						(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["SkillLevelGroupId", e],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					n = SkillLevel_1.SkillLevel.getRootAsSkillLevel(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					r.push(n);
				}
				return (
					o &&
						((l = KEY_PREFIX + `#${e})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(l, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SkillLevelBySkillLevelGroupId.js.map
