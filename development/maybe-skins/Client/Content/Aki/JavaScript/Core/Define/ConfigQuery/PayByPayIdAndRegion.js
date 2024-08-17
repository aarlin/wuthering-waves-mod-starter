"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPayByPayIdAndRegion = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	Pay_1 = require("../Config/Pay"),
	DB = "db_paycurrency.db",
	FILE = "c.充值.xlsx",
	TABLE = "Pay",
	COMMAND = "select BinData from `Pay` where PayId=? AND Region=?",
	KEY_PREFIX = "PayByPayIdAndRegion",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigListStat = void 0,
	CONFIG_LIST_STAT_PREFIX = "configPayByPayIdAndRegion.GetConfigList(";
exports.configPayByPayIdAndRegion = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfigList: (o, n, i = !0) => {
		var e;
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var a = KEY_PREFIX + `#${o}#${n})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (d) return d;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair))
			) {
				const d = new Array();
				for (;;) {
					if (
						1 !==
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!1,
							...logPair,
							["PayId", o],
							["Region", n],
						)
					)
						break;
					var r = void 0;
					if (
						(([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
							handleId,
							0,
							...logPair,
							["PayId", o],
							["Region", n],
						)),
						!e)
					)
						return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
					r = Pay_1.Pay.getRootAsPay(
						new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
					);
					d.push(r);
				}
				return (
					i &&
						((a = KEY_PREFIX + `#${o}#${n})`),
						ConfigCommon_1.ConfigCommon.SaveConfig(a, d, d.length)),
					ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
					d
				);
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PayByPayIdAndRegion.js.map
