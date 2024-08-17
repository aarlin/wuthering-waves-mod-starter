"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFogTextureConfigByBlock = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FogTextureConfig_1 = require("../Config/FogTextureConfig"),
	DB = "db_mapfog.db",
	FILE = "d.地图迷雾.xlsx",
	TABLE = "FogTextureConfig",
	COMMAND = "select BinData from `FogTextureConfig` where Block=?",
	KEY_PREFIX = "FogTextureConfigByBlock",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configFogTextureConfigByBlock.GetConfig(";
exports.configFogTextureConfigByBlock = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const g = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (g) return g;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Block",
							o,
						]))
			) {
				var i,
					n = void 0;
				if (
					(([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Block", o],
					)),
					i)
				) {
					const g =
						FogTextureConfig_1.FogTextureConfig.getRootAsFogTextureConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						e &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						g
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FogTextureConfigByBlock.js.map
