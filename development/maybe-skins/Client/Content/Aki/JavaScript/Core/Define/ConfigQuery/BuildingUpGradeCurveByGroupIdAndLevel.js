"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBuildingUpGradeCurveByGroupIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BuildingUpGradeCurve_1 = require("../Config/BuildingUpGradeCurve"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "BuildingUpGradeCurve",
	COMMAND =
		"select BinData from `BuildingUpGradeCurve` where GroupId=? AND Level=?",
	KEY_PREFIX = "BuildingUpGradeCurveByGroupIdAndLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig(";
exports.configBuildingUpGradeCurveByGroupIdAndLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e, n = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o}#${e})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (d) return d;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["GroupId", o],
							["Level", e],
						))
			) {
				var r,
					i = void 0;
				if (
					(([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["GroupId", o],
						["Level", e],
					)),
					r)
				) {
					const d =
						BuildingUpGradeCurve_1.BuildingUpGradeCurve.getRootAsBuildingUpGradeCurve(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						n &&
							((r = KEY_PREFIX + `#${o}#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BuildingUpGradeCurveByGroupIdAndLevel.js.map
