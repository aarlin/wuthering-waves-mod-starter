"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFuncMenuWheelAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	FuncMenuWheel_1 = require("../Config/FuncMenuWheel"),
	DB = "db_roulette.db",
	FILE = "l.轮盘.xlsx",
	TABLE = "FuncMenuWheel",
	COMMAND = "select BinData from `FuncMenuWheel`",
	KEY_PREFIX = "FuncMenuWheelAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configFuncMenuWheelAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (e = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
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
					(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i = FuncMenuWheel_1.FuncMenuWheel.getRootAsFuncMenuWheel(
					new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
				);
				r.push(i);
			}
			return (
				e &&
					((o = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(o, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=FuncMenuWheelAll.js.map
