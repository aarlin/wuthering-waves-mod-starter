"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomItemByMonsterId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomItem_1 = require("../Config/PhantomItem"),
	DB = "db_phantom.db",
	FILE = "h.幻象.xlsx",
	TABLE = "PhantomItem",
	COMMAND = "select BinData from `PhantomItem` where MonsterId=?",
	KEY_PREFIX = "PhantomItemByMonsterId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configPhantomItemByMonsterId.GetConfigList(";
exports.configPhantomItemByMonsterId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var t = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
				if (r) return r;
			}
			if (
				(e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const r = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"MonsterId",
							o,
						])
					)
						break;
					var i = void 0;
					if (
						(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["MonsterId", o],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					i = PhantomItem_1.PhantomItem.getRootAsPhantomItem(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					r.push(i);
				}
				return (
					n &&
						((t = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					r
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PhantomItemByMonsterId.js.map
