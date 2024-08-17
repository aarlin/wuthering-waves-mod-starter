"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBuildingById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Building_1 = require("../Config/Building"),
	DB = "db_moonchasing.db",
	FILE = "z.追月节.xlsx",
	TABLE = "Building",
	COMMAND = "select BinData from `Building` where Id=?",
	KEY_PREFIX = "BuildingById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configBuildingById.GetConfig(";
exports.configBuildingById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var n = KEY_PREFIX + `#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (d) return d;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var e,
					n = void 0;
				if (
					(([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const d = Building_1.Building.getRootAsBuilding(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						i &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BuildingById.js.map
