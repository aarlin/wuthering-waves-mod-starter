"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configDragonPoolAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DragonPool_1 = require("../Config/DragonPool"),
	DB = "db_dragon_ball.db",
	FILE = "m.鸣素体.xlsx",
	TABLE = "DragonPool",
	COMMAND = "select BinData from `DragonPool`",
	KEY_PREFIX = "DragonPoolAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configDragonPoolAll = {
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
				var r = KEY_PREFIX + ")";
				const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
				if (i) return i;
			}
			const i = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e = DragonPool_1.DragonPool.getRootAsDragonPool(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				i.push(e);
			}
			return (
				o &&
					((r = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				i
			);
		}
	},
};
//# sourceMappingURL=DragonPoolAll.js.map
