"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSkillButtonByRoleId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	SkillButton_1 = require("../Config/SkillButton"),
	DB = "db_skillbutton.db",
	FILE = "j.技能按钮.xlsx",
	TABLE = "SkillButton",
	COMMAND = "select BinData from `SkillButton` where RoleId=?",
	KEY_PREFIX = "SkillButtonByRoleId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configSkillButtonByRoleId.GetConfigList(";
exports.configSkillButtonByRoleId = {
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
				const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
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
							"RoleId",
							o,
						])
					)
						break;
					var t = void 0;
					if (
						(([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["RoleId", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t = SkillButton_1.SkillButton.getRootAsSkillButton(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					l.push(t);
				}
				return (
					n &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, l, l.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					l
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=SkillButtonByRoleId.js.map
