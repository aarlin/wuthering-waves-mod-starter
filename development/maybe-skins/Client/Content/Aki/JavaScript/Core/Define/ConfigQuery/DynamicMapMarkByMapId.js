"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDynamicMapMarkByMapId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DynamicMapMark_1 = require("../Config/DynamicMapMark"),
	DB = "db_map_mark.db",
	FILE = "d.地图标记.xlsx",
	TABLE = "DynamicMapMark",
	COMMAND = "select BinData from `DynamicMapMark` where MapId=?",
	KEY_PREFIX = "DynamicMapMarkByMapId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configDynamicMapMarkByMapId.GetConfigList(";
exports.configDynamicMapMarkByMapId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n = !0) => {
		var a;
		if (
			(a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var i = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (r) return r;
			}
			if (
				(a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"MapId",
							o,
						])
					)
						break;
					var e = void 0;
					if (
						(([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["MapId", o],
						)),
						!a)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = DynamicMapMark_1.DynamicMapMark.getRootAsDynamicMapMark(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					r.push(e);
				}
				return (
					n &&
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
//# sourceMappingURL=DynamicMapMarkByMapId.js.map
