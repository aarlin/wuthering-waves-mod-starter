"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMapMarkHasEntityConfigId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MapMark_1 = require("../Config/MapMark"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "MapMark",
	COMMAND = "select BinData from `MapMark` where EntityConfigId > 0",
	KEY_PREFIX = "MapMarkHasEntityConfigId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configMapMarkHasEntityConfigId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (r) return r;
			}
			const r = new Array();
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
				e = MapMark_1.MapMark.getRootAsMapMark(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				r.push(e);
			}
			return (
				o &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=MapMarkHasEntityConfigId.js.map
