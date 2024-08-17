"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBuffItemByPublicCdGroup = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BuffItem_1 = require("../Config/BuffItem"),
	DB = "db_itemattributereward.db",
	FILE = "s.属性奖励.xlsx",
	TABLE = "BuffItem",
	COMMAND = "select BinData from `BuffItem` where PublicCdGroup=?",
	KEY_PREFIX = "BuffItemByPublicCdGroup",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configBuffItemByPublicCdGroup.GetConfigList(";
exports.configBuffItemByPublicCdGroup = {
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
				const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (f) return f;
			}
			if (
				(i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const f = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"PublicCdGroup",
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
							["PublicCdGroup", o],
						)),
						!i)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = BuffItem_1.BuffItem.getRootAsBuffItem(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					f.push(r);
				}
				return (
					e &&
						((n = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(n, f, f.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					f
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BuffItemByPublicCdGroup.js.map
