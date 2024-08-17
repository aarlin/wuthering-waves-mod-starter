"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLoadingTipsTextAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LoadingTipsText_1 = require("../Config/LoadingTipsText"),
	DB = "db_loadingtips.db",
	FILE = "z.载入提示.xlsx",
	TABLE = "LoadingTipsText",
	COMMAND = "select BinData from `LoadingTipsText`",
	KEY_PREFIX = "LoadingTipsTextAll",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0;
exports.configLoadingTipsTextAll = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o = !0) => {
		var i;
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var n = KEY_PREFIX + ")";
				const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
				if (t) return t;
			}
			const t = new Array();
			for (;;) {
				if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
					break;
				var e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
					)),
					!i)
				)
					return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
				e = LoadingTipsText_1.LoadingTipsText.getRootAsLoadingTipsText(
					new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
				);
				t.push(e);
			}
			return (
				o &&
					((n = KEY_PREFIX + ")"),
					ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
				ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
				t
			);
		}
	},
};
//# sourceMappingURL=LoadingTipsTextAll.js.map
