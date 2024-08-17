"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDebugEntranceTypeConfigAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DebugEntranceTypeConfig_1 = require("../Config/DebugEntranceTypeConfig"),
	DB = "db_debugview.db",
	FILE = "t.调试界面.xlsx",
	TABLE = "DebugEntranceTypeConfig",
	COMMAND = "select BinData from `DebugEntranceTypeConfig`",
	KEY_PREFIX = "DebugEntranceTypeConfigAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configDebugEntranceTypeConfigAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (n = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var o = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (r) return r;
			}
			const r = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!e)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i =
					DebugEntranceTypeConfig_1.DebugEntranceTypeConfig.getRootAsDebugEntranceTypeConfig(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
				r.push(i);
			}
			return (
				n &&
					((o = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(o, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=DebugEntranceTypeConfigAll.js.map
