"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUiFloatConfigByViewNameIfNull = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UiFloatConfig_1 = require("../Config/UiFloatConfig"),
	DB = "db_ui.db",
	FILE = "u.UiFloat层级配置.csv",
	TABLE = "UiFloatConfig",
	COMMAND =
		'select BinData from `UiFloatConfig` where ViewName = ? AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) > 0 OR ViewName = "DefaultView" AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) <= 0',
	KEY_PREFIX = "UiFloatConfigByViewNameIfNull",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configUiFloatConfigByViewNameIfNull.GetConfig(";
exports.configUiFloatConfigByViewNameIfNull = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, e, n = !0) => {
		if (
			(f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${o}#${i}#${e})`;
				const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (C) return C;
			}
			if (
				(f =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 3, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["ViewName", o],
							["ViewName", i],
							["ViewName", e],
						))
			) {
				var f,
					a = void 0;
				if (
					(([f, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ViewName", o],
						["ViewName", i],
						["ViewName", e],
					)),
					f)
				) {
					const C = UiFloatConfig_1.UiFloatConfig.getRootAsUiFloatConfig(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						n &&
							((f = KEY_PREFIX + `#${o}#${i}#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(f, C)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						C
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=UiFloatConfigByViewNameIfNull.js.map
