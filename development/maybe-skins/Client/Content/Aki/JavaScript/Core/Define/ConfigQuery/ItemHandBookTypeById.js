"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configItemHandBookTypeById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ItemHandBookType_1 = require("../Config/ItemHandBookType"),
	DB = "db_handbook.db",
	FILE = "t.图鉴系统.xlsx",
	TABLE = "ItemHandBookType",
	COMMAND = "select BinData from `ItemHandBookType` where Id=?",
	KEY_PREFIX = "ItemHandBookTypeById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configItemHandBookTypeById.GetConfig(";
exports.configItemHandBookTypeById = {
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
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
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
						["Id", o],
					)),
					i)
				) {
					const t =
						ItemHandBookType_1.ItemHandBookType.getRootAsItemHandBookType(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						e &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ItemHandBookTypeById.js.map
