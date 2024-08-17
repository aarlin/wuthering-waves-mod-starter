"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAbpMontageDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AbpMontageData_1 = require("../Config/AbpMontageData"),
	DB = "db_abpmontagedata.db",
	FILE = "k.可视化编辑/c.Csv/a.ABP蒙太奇映射表/*.csv*",
	TABLE = "AbpMontageData",
	COMMAND = "select BinData from `AbpMontageData` where Id=?",
	KEY_PREFIX = "AbpMontageDataById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configAbpMontageDataById.GetConfig(";
exports.configAbpMontageDataById = {
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
				var a = KEY_PREFIX + `#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (t) return t;
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
					a = void 0;
				if (
					(([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const t = AbpMontageData_1.AbpMontageData.getRootAsAbpMontageData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						t
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AbpMontageDataById.js.map
