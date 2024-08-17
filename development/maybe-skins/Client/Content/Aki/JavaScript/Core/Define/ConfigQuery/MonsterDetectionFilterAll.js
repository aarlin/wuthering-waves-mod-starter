"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configMonsterDetectionFilterAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	MonsterDetectionFilter_1 = require("../Config/MonsterDetectionFilter"),
	DB = "db_adventure_detect.db",
	FILE = "k.开拓探测.xlsx",
	TABLE = "MonsterDetectionFilter",
	COMMAND = "select BinData from `MonsterDetectionFilter`",
	KEY_PREFIX = "MonsterDetectionFilterAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configMonsterDetectionFilterAll = {
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
				var t = KEY_PREFIX + ")";
				const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (i) return i;
			}
			const i = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var n = void 0;
				if (
					(([o, n] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!o)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				n =
					MonsterDetectionFilter_1.MonsterDetectionFilter.getRootAsMonsterDetectionFilter(
						new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
					);
				i.push(n);
			}
			return (
				e &&
					((t = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(t, i, i.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				i
			);
		}
	},
};
//# sourceMappingURL=MonsterDetectionFilterAll.js.map
