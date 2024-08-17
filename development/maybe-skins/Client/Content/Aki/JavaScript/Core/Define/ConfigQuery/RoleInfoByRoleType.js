"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleInfoByRoleType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleInfo_1 = require("../Config/RoleInfo"),
	DB = "db_role.db",
	FILE = "j.角色.xlsx",
	TABLE = "RoleInfo",
	COMMAND = "select BinData from `RoleInfo` where RoleType=?",
	KEY_PREFIX = "RoleInfoByRoleType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configRoleInfoByRoleType.GetConfigList(";
exports.configRoleInfoByRoleType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + `#${o})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (f) return f;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const f = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"RoleType",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["RoleType", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = RoleInfo_1.RoleInfo.getRootAsRoleInfo(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					f.push(r);
				}
				return (
					e &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					f
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleInfoByRoleType.js.map
