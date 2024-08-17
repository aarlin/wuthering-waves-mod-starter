"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMultiMapAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MultiMap_1 = require("../Config/MultiMap"),
	DB = "db_map.db",
	FILE = "d.地图.xlsx",
	TABLE = "MultiMap",
	COMMAND = "select BinData from `MultiMap`",
	KEY_PREFIX = "MultiMapAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configMultiMapAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			const t = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!i)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e = MultiMap_1.MultiMap.getRootAsMultiMap(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				t.push(e);
			}
			return (
				o &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=MultiMapAll.js.map
