"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGatherActivityAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GatherActivity_1 = require("../Config/GatherActivity"),
	DB = "db_collectionactivity.db",
	FILE = "s.收集活动.xlsx",
	TABLE = "GatherActivity",
	COMMAND = "select BinData from `GatherActivity`",
	KEY_PREFIX = "GatherActivityAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configGatherActivityAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (i = !0) => {
		var o;
		if (
			(o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var t = KEY_PREFIX + ")";
				const n = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (n) return n;
			}
			const n = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e = GatherActivity_1.GatherActivity.getRootAsGatherActivity(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				n.push(e);
			}
			return (
				i &&
					((t = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(t, n, n.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				n
			);
		}
	},
};
//# sourceMappingURL=GatherActivityAll.js.map
