"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFogBlockByBlock = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FogBlock_1 = require("../Config/FogBlock"),
	DB = "db_mapfog.db",
	FILE = "d.地图迷雾.xlsx",
	TABLE = "FogBlock",
	COMMAND = "select BinData from `FogBlock` where Block=?",
	KEY_PREFIX = "FogBlockByBlock",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configFogBlockByBlock.GetConfig(";
exports.configFogBlockByBlock = {
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
				const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (l) return l;
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
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Block", o],
					)),
					i)
				) {
					const l = FogBlock_1.FogBlock.getRootAsFogBlock(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, l)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						l
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FogBlockByBlock.js.map
