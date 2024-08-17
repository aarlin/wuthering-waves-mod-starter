"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configUiDynamicTabByParentViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	UiDynamicTab_1 = require("../Config/UiDynamicTab"),
	DB = "db_ui.db",
	FILE = "u.UI动态页签.csv",
	TABLE = "UiDynamicTab",
	COMMAND = "select BinData from `UiDynamicTab` where ParentViewName = ?",
	KEY_PREFIX = "UiDynamicTabByParentViewName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configUiDynamicTabByParentViewName.GetConfigList(";
exports.configUiDynamicTabByParentViewName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i, n = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${i})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(o = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"ParentViewName",
							i,
						])
					)
						break;
					var a = void 0;
					if (
						(([o, a] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ParentViewName", i],
						)),
						!o)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					a = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					r.push(a);
				}
				return (
					n &&
						((e = KEY_PREFIX + `#${i})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=UiDynamicTabByParentViewName.js.map
