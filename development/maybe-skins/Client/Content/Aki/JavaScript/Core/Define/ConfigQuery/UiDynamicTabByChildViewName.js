"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUiDynamicTabByChildViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UiDynamicTab_1 = require("../Config/UiDynamicTab"),
	DB = "db_ui.db",
	FILE = "u.UI动态页签.csv",
	TABLE = "UiDynamicTab",
	COMMAND = "select BinData from `UiDynamicTab` where ChildViewName = ?",
	KEY_PREFIX = "UiDynamicTabByChildViewName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configUiDynamicTabByChildViewName.GetConfig(";
exports.configUiDynamicTabByChildViewName = {
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
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"ChildViewName",
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
						["ChildViewName", i],
					)),
					e)
				) {
					const a = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(
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
//# sourceMappingURL=UiDynamicTabByChildViewName.js.map
