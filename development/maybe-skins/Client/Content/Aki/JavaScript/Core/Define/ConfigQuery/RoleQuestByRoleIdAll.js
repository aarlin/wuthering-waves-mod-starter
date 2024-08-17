"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleQuestByRoleIdAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleQuest_1 = require("../Config/RoleQuest"),
	DB = "db_rolequest.db",
	FILE = "j.角色任务.xlsx",
	TABLE = "RoleQuest",
	COMMAND = "select BinData from `RoleQuest` where RoleId =?",
	KEY_PREFIX = "RoleQuestByRoleIdAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configRoleQuestByRoleIdAll.GetConfigList(";
exports.configRoleQuestByRoleIdAll = {
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
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
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
							"RoleId",
							o,
						])
					)
						break;
					var t = void 0;
					if (
						(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["RoleId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t = RoleQuest_1.RoleQuest.getRootAsRoleQuest(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					r.push(t);
				}
				return (
					e &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleQuestByRoleIdAll.js.map
