"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFlowTemplateDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FlowTemplateData_1 = require("../Config/FlowTemplateData"),
	DB = "db_flowtemplatedata.db",
	FILE = "UniverseEditor/CameraTemplate/FlowTemplateCamera.csv",
	TABLE = "FlowTemplateData",
	COMMAND = "select BinData from `FlowTemplateData` where Id=?",
	KEY_PREFIX = "FlowTemplateDataById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configFlowTemplateDataById.GetConfig(";
exports.configFlowTemplateDataById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, e = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var a = KEY_PREFIX + `#${o})`;
				const n = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (n) return n;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var t,
					a = void 0;
				if (
					(([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					t)
				) {
					const n =
						FlowTemplateData_1.FlowTemplateData.getRootAsFlowTemplateData(
							new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
						);
					return (
						e &&
							((t = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, n)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						n
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=FlowTemplateDataById.js.map
