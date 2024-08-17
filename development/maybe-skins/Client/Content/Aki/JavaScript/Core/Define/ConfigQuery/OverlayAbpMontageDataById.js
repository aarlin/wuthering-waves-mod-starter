"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configOverlayAbpMontageDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	OverlayAbpMontageData_1 = require("../Config/OverlayAbpMontageData"),
	DB = "db_overlayabpmontagedata.db",
	FILE = "k.可视化编辑/c.Csv/a.ABP叠加蒙太奇映射表/*.csv*",
	TABLE = "OverlayAbpMontageData",
	COMMAND = "select BinData from `OverlayAbpMontageData` where Id=?",
	KEY_PREFIX = "OverlayAbpMontageDataById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configOverlayAbpMontageDataById.GetConfig(";
exports.configOverlayAbpMontageDataById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, a = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (a) {
				var e = KEY_PREFIX + `#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (t) return t;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
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
						["Id", o],
					)),
					n)
				) {
					const t =
						OverlayAbpMontageData_1.OverlayAbpMontageData.getRootAsOverlayAbpMontageData(
							new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
						);
					return (
						a &&
							((n = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=OverlayAbpMontageDataById.js.map
