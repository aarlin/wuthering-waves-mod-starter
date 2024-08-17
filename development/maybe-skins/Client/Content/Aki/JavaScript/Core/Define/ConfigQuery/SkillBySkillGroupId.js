"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillBySkillGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Skill_1 = require("../Config/Skill"),
	DB = "db_skill.db",
	FILE = "j.技能.xlsx",
	TABLE = "Skill",
	COMMAND = "select BinData from `Skill` where SkillGroupId = ?",
	KEY_PREFIX = "SkillBySkillGroupId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configSkillBySkillGroupId.GetConfigList(";
exports.configSkillBySkillGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, i = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var l = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(l);
				if (r) return r;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"SkillGroupId",
							o,
						])
					)
						break;
					var e = void 0;
					if (
						(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["SkillGroupId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = Skill_1.Skill.getRootAsSkill(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					r.push(e);
				}
				return (
					i &&
						((l = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(l, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SkillBySkillGroupId.js.map
