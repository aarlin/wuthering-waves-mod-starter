"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomSkillByPhantomSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomSkill_1 = require("../Config/PhantomSkill"),
	DB = "db_phantom.db",
	FILE = "h.幻象.xlsx",
	TABLE = "PhantomSkill",
	COMMAND = "select BinData from `PhantomSkill` where PhantomSkillId=?",
	KEY_PREFIX = "PhantomSkillByPhantomSkillId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configPhantomSkillByPhantomSkillId.GetConfigList(";
exports.configPhantomSkillByPhantomSkillId = {
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
				var t = KEY_PREFIX + `#${o})`;
				const l = ConfigCommon_1.ConfigCommon.GetConfig(t);
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
							"PhantomSkillId",
							o,
						])
					)
						break;
					var e = void 0;
					if (
						(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["PhantomSkillId", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = PhantomSkill_1.PhantomSkill.getRootAsPhantomSkill(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					l.push(e);
				}
				return (
					n &&
						((t = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(t, l, l.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					l
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomSkillByPhantomSkillId.js.map
