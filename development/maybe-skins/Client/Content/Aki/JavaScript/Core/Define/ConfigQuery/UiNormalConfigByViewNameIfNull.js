"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUiNormalConfigByViewNameIfNull = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UiNormalConfig_1 = require("../Config/UiNormalConfig"),
	DB = "db_ui.db",
	FILE = "u.UiNormal层级队列配置.csv",
	TABLE = "UiNormalConfig",
	COMMAND =
		'select BinData from `UiNormalConfig` where ViewName = ? AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) > 0 OR ViewName = "DefaultView" AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) <= 0',
	KEY_PREFIX = "UiNormalConfigByViewNameIfNull",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configUiNormalConfigByViewNameIfNull.GetConfig(";
exports.configUiNormalConfigByViewNameIfNull = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, i, e, n = !0) => {
		if (
			(m = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${o}#${i}#${e})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (f) return f;
			}
			if (
				(m =
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
				var m,
					a = void 0;
				if (
					(([m, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ViewName", o],
						["ViewName", i],
						["ViewName", e],
					)),
					m)
				) {
					const f = UiNormalConfig_1.UiNormalConfig.getRootAsUiNormalConfig(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						n &&
							((m = KEY_PREFIX + `#${o}#${i}#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(m, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=UiNormalConfigByViewNameIfNull.js.map
