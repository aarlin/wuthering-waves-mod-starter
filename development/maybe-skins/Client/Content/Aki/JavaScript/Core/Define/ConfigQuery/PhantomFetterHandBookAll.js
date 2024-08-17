"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPhantomFetterHandBookAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PhantomFetterHandBook_1 = require("../Config/PhantomFetterHandBook"),
	DB = "db_handbook.db",
	FILE = "t.图鉴系统.xlsx",
	TABLE = "PhantomFetterHandBook",
	COMMAND = "select BinData from `PhantomFetterHandBook`",
	KEY_PREFIX = "PhantomFetterHandBookAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configPhantomFetterHandBookAll = {
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
				var t = void 0;
				if (
					(([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!n)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				t =
					PhantomFetterHandBook_1.PhantomFetterHandBook.getRootAsPhantomFetterHandBook(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
				i.push(t);
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
//# sourceMappingURL=PhantomFetterHandBookAll.js.map
