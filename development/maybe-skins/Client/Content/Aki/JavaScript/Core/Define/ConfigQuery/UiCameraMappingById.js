"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUiCameraMappingById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UiCameraMapping_1 = require("../Config/UiCameraMapping"),
	DB = "db_uicamera.db",
	FILE = "u.Ui相机.xlsx",
	TABLE = "UiCameraMapping",
	COMMAND = "select BinData from `UiCameraMapping` where Id=?",
	KEY_PREFIX = "UiCameraMappingById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configUiCameraMappingById.GetConfig(";
exports.configUiCameraMappingById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (i, o = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + `#${i})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							i,
						]))
			) {
				var e,
					n = void 0;
				if (
					(([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", i],
					)),
					e)
				) {
					const a = UiCameraMapping_1.UiCameraMapping.getRootAsUiCameraMapping(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
					return (
						o &&
							((e = KEY_PREFIX + `#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=UiCameraMappingById.js.map
