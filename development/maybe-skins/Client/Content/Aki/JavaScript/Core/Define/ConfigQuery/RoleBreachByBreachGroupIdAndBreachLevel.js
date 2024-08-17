"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleBreachByBreachGroupIdAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleBreach_1 = require("../Config/RoleBreach"),
	DB = "db_role_level.db",
	FILE = "j.角色升级突破.xlsx",
	TABLE = "RoleBreach",
	COMMAND =
		"select BinData from `RoleBreach` where BreachGroupId=? AND BreachLevel=?",
	KEY_PREFIX = "RoleBreachByBreachGroupIdAndBreachLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX =
		"configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig(";
exports.configRoleBreachByBreachGroupIdAndBreachLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o, r = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (r) {
				var n = KEY_PREFIX + `#${e}#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["BreachGroupId", e],
							["BreachLevel", o],
						))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["BreachGroupId", e],
						["BreachLevel", o],
					)),
					i)
				) {
					const a = RoleBreach_1.RoleBreach.getRootAsRoleBreach(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						r &&
							((i = KEY_PREFIX + `#${e}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleBreachByBreachGroupIdAndBreachLevel.js.map
