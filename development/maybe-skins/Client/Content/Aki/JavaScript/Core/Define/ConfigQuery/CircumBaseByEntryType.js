"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCircumBaseByEntryType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CircumBase_1 = require("../Config/CircumBase"),
	DB = "db_activity.db",
	FILE = "h.回流活动.xlsx",
	TABLE = "CircumBase",
	COMMAND = "select BinData from `CircumBase` where EntryType=?",
	KEY_PREFIX = "CircumBaseByEntryType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configCircumBaseByEntryType.GetConfigList(";
exports.configCircumBaseByEntryType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, e = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var n = KEY_PREFIX + `#${o})`;
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const t = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"EntryType",
							o,
						])
					)
						break;
					var r = void 0;
					if (
						(([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["EntryType", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = CircumBase_1.CircumBase.getRootAsCircumBase(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					t.push(r);
				}
				return (
					e &&
						((n = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					t
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CircumBaseByEntryType.js.map
