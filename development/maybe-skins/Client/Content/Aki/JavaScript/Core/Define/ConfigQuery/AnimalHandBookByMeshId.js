"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAnimalHandBookByMeshId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AnimalHandBook_1 = require("../Config/AnimalHandBook"),
	DB = "db_handbook.db",
	FILE = "t.图鉴系统.xlsx",
	TABLE = "AnimalHandBook",
	COMMAND = "select BinData from `AnimalHandBook` where MeshId = ?",
	KEY_PREFIX = "AnimalHandBookByMeshId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configAnimalHandBookByMeshId.GetConfig(";
exports.configAnimalHandBookByMeshId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (a) return a;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"MeshId",
							o,
						]))
			) {
				var e,
					i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MeshId", o],
					)),
					e)
				) {
					const a = AnimalHandBook_1.AnimalHandBook.getRootAsAnimalHandBook(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AnimalHandBookByMeshId.js.map
