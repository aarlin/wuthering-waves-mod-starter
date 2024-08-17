"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMotionByRoleIdAndType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Motion_1 = require("../Config/Motion"),
	DB = "db_motion.db",
	FILE = "d.动作.xlsx",
	TABLE = "Motion",
	COMMAND =
		"select BinData from `Motion` where RoleId=? And Type=? Order By Sort",
	KEY_PREFIX = "MotionByRoleIdAndType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configMotionByRoleIdAndType.GetConfigList(";
exports.configMotionByRoleIdAndType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n, i = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var t = KEY_PREFIX + `#${o}#${n})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (d) return d;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
			) {
				const d = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["RoleId", o],
							["Type", n],
						)
					)
						break;
					var r = void 0;
					if (
						(([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["RoleId", o],
							["Type", n],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = Motion_1.Motion.getRootAsMotion(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					d.push(r);
				}
				return (
					i &&
						((t = KEY_PREFIX + `#${o}#${n})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(t, d, d.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					d
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MotionByRoleIdAndType.js.map
