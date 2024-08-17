"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillDescriptionBySkillLevelGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SkillDescription_1 = require("../Config/SkillDescription"),
	DB = "db_skill.db",
	FILE = "j.技能.xlsx",
	TABLE = "SkillDescription",
	COMMAND =
		"select BinData from `SkillDescription` where SkillLevelGroupId = ?",
	KEY_PREFIX = "SkillDescriptionBySkillLevelGroupId",
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
		"configSkillDescriptionBySkillLevelGroupId.GetConfigList(";
exports.configSkillDescriptionBySkillLevelGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, o = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			if (
				(e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"SkillLevelGroupId",
							i,
						])
					)
						break;
					var l = void 0;
					if (
						(([e, l] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["SkillLevelGroupId", i],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					l = SkillDescription_1.SkillDescription.getRootAsSkillDescription(
						new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
					);
					r.push(l);
				}
				return (
					o &&
						((n = KEY_PREFIX + `#${i})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SkillDescriptionBySkillLevelGroupId.js.map
