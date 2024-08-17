"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGachaAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Gacha_1 = require("../Config/Gacha"),
	DB = "db_gacha.db",
	FILE = "c.抽卡.xlsx",
	TABLE = "Gacha",
	COMMAND = "select BinData from `Gacha`",
	KEY_PREFIX = "GachaAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configGachaAll = {
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
				const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (a) return a;
			}
			const a = new Array();
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
				i = Gacha_1.Gacha.getRootAsGacha(
					new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
				);
				a.push(i);
			}
			return (
				o &&
					((e = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				a
			);
		}
	},
};
//# sourceMappingURL=GachaAll.js.map
