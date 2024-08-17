"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configRoleDevelopCurveByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	RoleDevelopCurve_1 = require("../Config/RoleDevelopCurve"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "RoleDevelopCurve",
	COMMAND = "select BinData from `RoleDevelopCurve` where GroupId=?",
	KEY_PREFIX = "RoleDevelopCurveByGroupId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configRoleDevelopCurveByGroupId.GetConfigList(";
exports.configRoleDevelopCurveByGroupId = {
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
				const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (C) return C;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const C = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"GroupId",
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
							["GroupId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = RoleDevelopCurve_1.RoleDevelopCurve.getRootAsRoleDevelopCurve(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					C.push(r);
				}
				return (
					e &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, C, C.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					C
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=RoleDevelopCurveByGroupId.js.map
