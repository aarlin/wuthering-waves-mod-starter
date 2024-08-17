"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBackgroundCardAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BackgroundCard_1 = require("../Config/BackgroundCard"),
	DB = "db_personal_card.db",
	FILE = "m.名片.xlsx",
	TABLE = "BackgroundCard",
	COMMAND = "select BinData from `BackgroundCard`",
	KEY_PREFIX = "BackgroundCardAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configBackgroundCardAll = {
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
				e = BackgroundCard_1.BackgroundCard.getRootAsBackgroundCard(
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
//# sourceMappingURL=BackgroundCardAll.js.map
