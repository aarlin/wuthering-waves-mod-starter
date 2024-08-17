"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCookLevelAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CookLevel_1 = require("../Config/CookLevel"),
	DB = "db_cook.db",
	FILE = "p.烹饪.xlsx",
	TABLE = "CookLevel",
	COMMAND = "select BinData from `CookLevel`",
	KEY_PREFIX = "CookLevelAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configCookLevelAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + ")";
				const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (r) return r;
			}
			const r = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!e)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				i = CookLevel_1.CookLevel.getRootAsCookLevel(
					new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
				);
				r.push(i);
			}
			return (
				o &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				r
			);
		}
	},
};
//# sourceMappingURL=CookLevelAll.js.map
