"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configEntityVoxelInfoByMapIdAndEntityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	EntityVoxelInfo_1 = require("../Config/EntityVoxelInfo"),
	DB = "db_entityvoxelinfo.db",
	FILE = "UniverseEditor/EntityVoxelInfo.csv",
	TABLE = "EntityVoxelInfo",
	COMMAND =
		"select BinData from `EntityVoxelInfo` where MapId=? and EntityId=?",
	KEY_PREFIX = "EntityVoxelInfoByMapIdAndEntityId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configEntityVoxelInfoByMapIdAndEntityId.GetConfig(";
exports.configEntityVoxelInfoByMapIdAndEntityId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, i = !0) => {
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
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["MapId", o],
							["EntityId", n],
						))
			) {
				var e,
					t = void 0;
				if (
					(([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MapId", o],
						["EntityId", n],
					)),
					e)
				) {
					const d = EntityVoxelInfo_1.EntityVoxelInfo.getRootAsEntityVoxelInfo(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					return (
						i &&
							((e = KEY_PREFIX + `#${o}#${n})`),
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
//# sourceMappingURL=EntityVoxelInfoByMapIdAndEntityId.js.map
