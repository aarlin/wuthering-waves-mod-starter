"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configQualityIconTagById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	QualityIconTag_1 = require("../Config/QualityIconTag"),
	DB = "db_component_config.db",
	FILE = "t.通用组件配置.xlsx",
	TABLE = "QualityIconTag",
	COMMAND = "select BinData from `QualityIconTag` where Id=?",
	KEY_PREFIX = "QualityIconTagById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configQualityIconTagById.GetConfig(";
exports.configQualityIconTagById = {
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
				const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (t) return t;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
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
						["Id", o],
					)),
					e)
				) {
					const t = QualityIconTag_1.QualityIconTag.getRootAsQualityIconTag(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
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
//# sourceMappingURL=QualityIconTagById.js.map
