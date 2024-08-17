"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLevelEntityConfigByMapIdAndEntityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LevelEntityConfig_1 = require("../Config/LevelEntityConfig"),
	DB = "db_level_entity.db",
	FILE = "UniverseEditor/Entity/LevelEntity.csv",
	TABLE = "LevelEntityConfig",
	COMMAND =
		"select BinData from `LevelEntityConfig` where MapId=? and EntityId=?",
	KEY_PREFIX = "LevelEntityConfigByMapIdAndEntityId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configLevelEntityConfigByMapIdAndEntityId.GetConfig(";
exports.configLevelEntityConfigByMapIdAndEntityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o, i = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${n}#${o})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (d) return d;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["MapId", n],
							["EntityId", o],
						))
			) {
				var t,
					e = void 0;
				if (
					(([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MapId", n],
						["EntityId", o],
					)),
					t)
				) {
					const d =
						LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
						);
					return (
						i &&
							((t = KEY_PREFIX + `#${n}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LevelEntityConfigByMapIdAndEntityId.js.map
