"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configEffectSpecDataByPath = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	EffectSpecData_1 = require("../Config/EffectSpecData"),
	DB = "db_effectspec.db",
	FILE = "UniverseEditor/EffectSpec.csv",
	TABLE = "EffectSpecData",
	COMMAND = "select BinData from `EffectSpecData` where Path=?",
	KEY_PREFIX = "EffectSpecDataByPath",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configEffectSpecDataByPath.GetConfig(";
exports.configEffectSpecDataByPath = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var t = KEY_PREFIX + `#${e})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (f) return f;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Path",
							e,
						]))
			) {
				var n,
					t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Path", e],
					)),
					n)
				) {
					const f = EffectSpecData_1.EffectSpecData.getRootAsEffectSpecData(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					return (
						o &&
							((n = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=EffectSpecDataByPath.js.map
