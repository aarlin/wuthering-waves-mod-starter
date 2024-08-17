"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configOpenAndCloseViewHotKeyAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	OpenAndCloseViewHotKey_1 = require("../Config/OpenAndCloseViewHotKey"),
	DB = "db_input_settings.db",
	FILE = "s.输入配置.xlsx",
	TABLE = "OpenAndCloseViewHotKey",
	COMMAND = "select BinData from `OpenAndCloseViewHotKey`",
	KEY_PREFIX = "OpenAndCloseViewHotKeyAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configOpenAndCloseViewHotKeyAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			const t = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([o, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					OpenAndCloseViewHotKey_1.OpenAndCloseViewHotKey.getRootAsOpenAndCloseViewHotKey(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				t.push(i);
			}
			return (
				e &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=OpenAndCloseViewHotKeyAll.js.map
