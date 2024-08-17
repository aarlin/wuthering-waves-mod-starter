"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMultiMapByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MultiMap_1 = require("../Config/MultiMap"),
	DB = "db_map.db",
	FILE = "d.地图.xlsx",
	TABLE = "MultiMap",
	COMMAND = "select BinData from `MultiMap` where GroupId=?",
	KEY_PREFIX = "MultiMapByGroupId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configMultiMapByGroupId.GetConfigList(";
exports.configMultiMapByGroupId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, i = !0) => {
		var n;
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (t) return t;
			}
			if (
				(n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"GroupId",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["GroupId", o],
						)),
						!n)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = MultiMap_1.MultiMap.getRootAsMultiMap(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					i &&
						((e = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=MultiMapByGroupId.js.map
