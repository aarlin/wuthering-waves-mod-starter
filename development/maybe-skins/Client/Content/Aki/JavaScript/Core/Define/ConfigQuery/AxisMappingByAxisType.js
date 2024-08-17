"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAxisMappingByAxisType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AxisMapping_1 = require("../Config/AxisMapping"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "AxisMapping",
	COMMAND = "select BinData from `AxisMapping` where AxisType=?",
	KEY_PREFIX = "AxisMappingByAxisType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configAxisMappingByAxisType.GetConfigList(";
exports.configAxisMappingByAxisType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var e = KEY_PREFIX + `#${i})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (t) return t;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"AxisType",
							i,
						])
					)
						break;
					var r = void 0;
					if (
						(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["AxisType", i],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = AxisMapping_1.AxisMapping.getRootAsAxisMapping(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					o &&
						((e = KEY_PREFIX + `#${i})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AxisMappingByAxisType.js.map
