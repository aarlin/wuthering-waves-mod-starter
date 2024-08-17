"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBuildingUpGradeCurveByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BuildingUpGradeCurve_1 = require("../Config/BuildingUpGradeCurve"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "BuildingUpGradeCurve",
	COMMAND = "select BinData from `BuildingUpGradeCurve` where GroupId=?",
	KEY_PREFIX = "BuildingUpGradeCurveByGroupId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX =
		"configBuildingUpGradeCurveByGroupId.GetConfigList(";
exports.configBuildingUpGradeCurveByGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, i = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (d) return d;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const d = new Array();
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
					r =
						BuildingUpGradeCurve_1.BuildingUpGradeCurve.getRootAsBuildingUpGradeCurve(
							new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
						);
					d.push(r);
				}
				return (
					i &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, d, d.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					d
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BuildingUpGradeCurveByGroupId.js.map
