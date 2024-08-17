"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCircumEntryByEntryType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CircumEntry_1 = require("../Config/CircumEntry"),
	DB = "db_activity.db",
	FILE = "h.回流活动.xlsx",
	TABLE = "CircumEntry",
	COMMAND = "select BinData from `CircumEntry` where EntryType=?",
	KEY_PREFIX = "CircumEntryByEntryType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configCircumEntryByEntryType.GetConfigList(";
exports.configCircumEntryByEntryType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (n, o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var r = KEY_PREFIX + `#${n})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (t) return t;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"EntryType",
							n,
						])
					)
						break;
					var e = void 0;
					if (
						(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["EntryType", n],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					e = CircumEntry_1.CircumEntry.getRootAsCircumEntry(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					t.push(e);
				}
				return (
					o &&
						((r = KEY_PREFIX + `#${n})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(r, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CircumEntryByEntryType.js.map
