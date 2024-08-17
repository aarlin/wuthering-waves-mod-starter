"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configOpenAndCloseViewHotKeyByActionName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "OpenAndCloseViewHotKey",
	COMMAND = "select BinData from `OpenAndCloseViewHotKey` where ActionName=?",
	KEY_PREFIX = "OpenAndCloseViewHotKeyByActionName",
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
		"configOpenAndCloseViewHotKeyByActionName.GetConfigList(";
exports.configOpenAndCloseViewHotKeyByActionName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var i = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (r) return r;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"ActionName",
							o,
						])
					)
						break;
					var t = void 0;
					if (
						(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["ActionName", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t =
						OpenAndCloseViewHotKey_1.OpenAndCloseViewHotKey.getRootAsOpenAndCloseViewHotKey(
							new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
						);
					r.push(t);
				}
				return (
					e &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=OpenAndCloseViewHotKeyByActionName.js.map
