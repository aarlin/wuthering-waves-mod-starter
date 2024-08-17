"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCombinationActionByActionType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CombinationAction_1 = require("../Config/CombinationAction"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "CombinationAction",
	COMMAND = "select BinData from `CombinationAction` where ActionType=?",
	KEY_PREFIX = "CombinationActionByActionType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX =
		"configCombinationActionByActionType.GetConfigList(";
exports.configCombinationActionByActionType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var t = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (r) return r;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"ActionType",
							o,
						])
					)
						break;
					var e = void 0;
					if (
						(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ActionType", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = CombinationAction_1.CombinationAction.getRootAsCombinationAction(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					r.push(e);
				}
				return (
					n &&
						((t = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CombinationActionByActionType.js.map
