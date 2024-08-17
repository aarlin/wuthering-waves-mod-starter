"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDungeonDetectionAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DungeonDetection_1 = require("../Config/DungeonDetection"),
	DB = "db_adventure_detect.db",
	FILE = "k.开拓探测.xlsx",
	TABLE = "DungeonDetection",
	COMMAND = "select BinData from `DungeonDetection`",
	KEY_PREFIX = "DungeonDetectionAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configDungeonDetectionAll = {
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
				var e = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (t) return t;
			}
			const t = new Array();
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
				i = DungeonDetection_1.DungeonDetection.getRootAsDungeonDetection(
					new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
				);
				t.push(i);
			}
			return (
				o &&
					((e = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(e, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=DungeonDetectionAll.js.map
