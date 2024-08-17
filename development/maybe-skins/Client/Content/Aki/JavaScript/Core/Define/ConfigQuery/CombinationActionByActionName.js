"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCombinationActionByActionName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CombinationAction_1 = require("../Config/CombinationAction"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "CombinationAction",
	COMMAND = "select BinData from `CombinationAction` where ActionName=?",
	KEY_PREFIX = "CombinationActionByActionName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCombinationActionByActionName.GetConfig(";
exports.configCombinationActionByActionName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (e) return e;
			}
			if (
				(t =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ActionName",
							o,
						]))
			) {
				var t,
					i = void 0;
				if (
					(([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ActionName", o],
					)),
					t)
				) {
					const e =
						CombinationAction_1.CombinationAction.getRootAsCombinationAction(
							new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
						);
					return (
						n &&
							((t = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						e
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CombinationActionByActionName.js.map
