"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleInfluenceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleInfluence_1 = require("../Config/RoleInfluence"),
	DB = "db_roleinfluence.db",
	FILE = "j.角色势力.xlsx",
	TABLE = "RoleInfluence",
	COMMAND = "select BinData from `RoleInfluence` where Id=?",
	KEY_PREFIX = "RoleInfluenceById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configRoleInfluenceById.GetConfig(";
exports.configRoleInfluenceById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${e})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (f) return f;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					i)
				) {
					const f = RoleInfluence_1.RoleInfluence.getRootAsRoleInfluence(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						o &&
							((i = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleInfluenceById.js.map
