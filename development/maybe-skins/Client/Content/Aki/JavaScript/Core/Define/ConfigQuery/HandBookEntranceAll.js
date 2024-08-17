"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configHandBookEntranceAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	HandBookEntrance_1 = require("../Config/HandBookEntrance"),
	DB = "db_handbook_entrance.db",
	FILE = "t.图鉴入口.xlsx",
	TABLE = "HandBookEntrance",
	COMMAND = "select BinData from `HandBookEntrance`",
	KEY_PREFIX = "HandBookEntranceAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configHandBookEntranceAll = {
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
				const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (i) return i;
			}
			const i = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var r = void 0;
				if (
					(([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				r = HandBookEntrance_1.HandBookEntrance.getRootAsHandBookEntrance(
					new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
				);
				i.push(r);
			}
			return (
				o &&
					((e = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				i
			);
		}
	},
};
//# sourceMappingURL=HandBookEntranceAll.js.map
