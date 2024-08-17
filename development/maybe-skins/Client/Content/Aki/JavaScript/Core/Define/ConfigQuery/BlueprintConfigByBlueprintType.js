"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBlueprintConfigByBlueprintType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BlueprintConfig_1 = require("../Config/BlueprintConfig"),
	DB = "db_blueprint.db",
	FILE = "UniverseEditor/Entity/Blueprint.csv",
	TABLE = "BlueprintConfig",
	COMMAND = "select BinData from `BlueprintConfig` where BlueprintType=?",
	KEY_PREFIX = "BlueprintConfigByBlueprintType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configBlueprintConfigByBlueprintType.GetConfig(";
exports.configBlueprintConfigByBlueprintType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, i = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var o = KEY_PREFIX + `#${n})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (t) return t;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"BlueprintType",
							n,
						]))
			) {
				var e,
					o = void 0;
				if (
					(([e, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["BlueprintType", n],
					)),
					e)
				) {
					const t = BlueprintConfig_1.BlueprintConfig.getRootAsBlueprintConfig(
						new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
					);
					return (
						i &&
							((e = KEY_PREFIX + `#${n})`),
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
//# sourceMappingURL=BlueprintConfigByBlueprintType.js.map
