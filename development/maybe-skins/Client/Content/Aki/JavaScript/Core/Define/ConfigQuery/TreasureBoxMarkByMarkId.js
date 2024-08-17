"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configTreasureBoxMarkByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	TreasureBoxMark_1 = require("../Config/TreasureBoxMark"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "TreasureBoxMark",
	COMMAND = "select BinData from `TreasureBoxMark` where MarkId=?",
	KEY_PREFIX = "TreasureBoxMarkByMarkId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configTreasureBoxMarkByMarkId.GetConfig(";
exports.configTreasureBoxMarkByMarkId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, r = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (r) {
				var e = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"MarkId",
							o,
						]))
			) {
				var n,
					e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["MarkId", o],
					)),
					n)
				) {
					const a = TreasureBoxMark_1.TreasureBoxMark.getRootAsTreasureBoxMark(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						r &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=TreasureBoxMarkByMarkId.js.map
