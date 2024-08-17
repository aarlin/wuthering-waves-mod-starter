"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configAnimalHandBookAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	AnimalHandBook_1 = require("../Config/AnimalHandBook"),
	DB = "db_handbook.db",
	FILE = "t.图鉴系统.xlsx",
	TABLE = "AnimalHandBook",
	COMMAND = "select BinData from `AnimalHandBook`",
	KEY_PREFIX = "AnimalHandBookAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configAnimalHandBookAll = {
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
				var i = KEY_PREFIX + ")";
				const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (a) return a;
			}
			const a = new Array();
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
				e = AnimalHandBook_1.AnimalHandBook.getRootAsAnimalHandBook(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				a.push(e);
			}
			return (
				o &&
					((i = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				a
			);
		}
	},
};
//# sourceMappingURL=AnimalHandBookAll.js.map
