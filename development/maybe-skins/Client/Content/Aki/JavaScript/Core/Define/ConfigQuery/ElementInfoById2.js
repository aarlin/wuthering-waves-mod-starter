"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configElementInfoById2 = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ElementInfo_1 = require("../Config/ElementInfo"),
	DB = "db_element_info.db",
	FILE = "y.元素属性.xlsx",
	TABLE = "ElementInfo",
	COMMAND = "select BinData from `ElementInfo` where Id<>?",
	KEY_PREFIX = "ElementInfoById2",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configElementInfoById2.GetConfigList(";
exports.configElementInfoById2 = {
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
				var i = KEY_PREFIX + `#${o})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (f) return f;
			}
			if (
				(e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
			) {
				const f = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
							"Id",
							o,
						])
					)
						break;
					var t = void 0;
					if (
						(([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["Id", o],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					t = ElementInfo_1.ElementInfo.getRootAsElementInfo(
						new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
					);
					f.push(t);
				}
				return (
					n &&
						((i = KEY_PREFIX + `#${o})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					f
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ElementInfoById2.js.map
