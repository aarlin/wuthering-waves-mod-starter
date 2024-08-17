"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFunctionOpenViewLimitAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FunctionOpenViewLimit_1 = require("../Config/FunctionOpenViewLimit"),
	DB = "db_function.db",
	FILE = "g.功能开启.xlsx",
	TABLE = "FunctionOpenViewLimit",
	COMMAND = "select BinData from `FunctionOpenViewLimit`",
	KEY_PREFIX = "FunctionOpenViewLimitAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configFunctionOpenViewLimitAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var o = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (t) return t;
			}
			const t = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e =
					FunctionOpenViewLimit_1.FunctionOpenViewLimit.getRootAsFunctionOpenViewLimit(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
				t.push(e);
			}
			return (
				i &&
					((o = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(o, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=FunctionOpenViewLimitAll.js.map
