"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAreaTaskExploreByAreaId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AreaTaskExplore_1 = require("../Config/AreaTaskExplore"),
	DB = "db_explore_progress.db",
	FILE = "t.探索度.xlsx",
	TABLE = "AreaTaskExplore",
	COMMAND = "select BinData from `AreaTaskExplore` where Area=?",
	KEY_PREFIX = "AreaTaskExploreByAreaId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configAreaTaskExploreByAreaId.GetConfigList(";
exports.configAreaTaskExploreByAreaId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var r;
		if (
			(r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (a) return a;
			}
			if (
				(r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const a = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Area",
							o,
						])
					)
						break;
					var i = void 0;
					if (
						(([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["Area", o],
						)),
						!r)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					i = AreaTaskExplore_1.AreaTaskExplore.getRootAsAreaTaskExplore(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					a.push(i);
				}
				return (
					e &&
						((n = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					a
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=AreaTaskExploreByAreaId.js.map
