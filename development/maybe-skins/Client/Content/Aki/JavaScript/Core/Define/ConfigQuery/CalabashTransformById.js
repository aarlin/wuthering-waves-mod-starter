"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCalabashTransformById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CalabashTransform_1 = require("../Config/CalabashTransform"),
	DB = "db_calabash.db",
	FILE = "h.葫芦.xlsx",
	TABLE = "CalabashTransform",
	COMMAND = "select BinData from `CalabashTransform` where Id=?",
	KEY_PREFIX = "CalabashTransformById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCalabashTransformById.GetConfig(";
exports.configCalabashTransformById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, a = !0) => {
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (a) {
				var n = KEY_PREFIX + `#${o})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (e) return e;
			}
			if (
				(r =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var r,
					n = void 0;
				if (
					(([r, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					r)
				) {
					const e =
						CalabashTransform_1.CalabashTransform.getRootAsCalabashTransform(
							new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
						);
					return (
						a &&
							((r = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(r, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CalabashTransformById.js.map
