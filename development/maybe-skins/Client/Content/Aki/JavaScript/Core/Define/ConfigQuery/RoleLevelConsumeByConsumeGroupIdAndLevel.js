"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleLevelConsume_1 = require("../Config/RoleLevelConsume"),
	DB = "db_role_level.db",
	FILE = "j.角色升级突破.xlsx",
	TABLE = "RoleLevelConsume",
	COMMAND =
		"select BinData from `RoleLevelConsume` where ConsumeGroupId=? AND Level=?",
	KEY_PREFIX = "RoleLevelConsumeByConsumeGroupIdAndLevel",
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
		"configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig(";
exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o, n = !0) => {
		if (
			(l = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${e}#${o})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (C) return C;
			}
			if (
				(l =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["ConsumeGroupId", e],
							["Level", o],
						))
			) {
				var l,
					i = void 0;
				if (
					(([l, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ConsumeGroupId", e],
						["Level", o],
					)),
					l)
				) {
					const C =
						RoleLevelConsume_1.RoleLevelConsume.getRootAsRoleLevelConsume(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						n &&
							((l = KEY_PREFIX + `#${e}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(l, C)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						C
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleLevelConsumeByConsumeGroupIdAndLevel.js.map
