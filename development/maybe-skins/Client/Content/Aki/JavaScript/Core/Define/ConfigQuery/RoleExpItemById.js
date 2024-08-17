"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleExpItemById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleExpItem_1 = require("../Config/RoleExpItem"),
	DB = "db_role.db",
	FILE = "j.角色.xlsx",
	TABLE = "RoleExpItem",
	COMMAND = "select BinData from `RoleExpItem` where Id=?",
	KEY_PREFIX = "RoleExpItemById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configRoleExpItemById.GetConfig(",
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configRoleExpItemById.GetConfigList(";
exports.configRoleExpItemById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var i,
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					i)
				) {
					const r = RoleExpItem_1.RoleExpItem.getRootAsRoleExpItem(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
	GetConfigList: (o, n = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (t) return t;
			}
			if (
				(e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Id",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["Id", o],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = RoleExpItem_1.RoleExpItem.getRootAsRoleExpItem(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					n &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleExpItemById.js.map
