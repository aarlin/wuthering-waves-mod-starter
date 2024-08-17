"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configPayShopTabByShopIdAndTabId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	PayShopTab_1 = require("../Config/PayShopTab"),
	DB = "db_payshop.db",
	FILE = "s.商业化商城.xlsx",
	TABLE = "PayShopTab",
	COMMAND = "select BinData from `PayShopTab` where ShopId=? And TabId=?",
	KEY_PREFIX = "PayShopTabByShopIdAndTabId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configPayShopTabByShopIdAndTabId.GetConfig(";
exports.configPayShopTabByShopIdAndTabId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, a = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (a) {
				var i = KEY_PREFIX + `#${o}#${n})`;
				const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (d) return d;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["ShopId", o],
							["TabId", n],
						))
			) {
				var e,
					i = void 0;
				if (
					(([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ShopId", o],
						["TabId", n],
					)),
					e)
				) {
					const d = PayShopTab_1.PayShopTab.getRootAsPayShopTab(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						a &&
							((e = KEY_PREFIX + `#${o}#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, d)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						d
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=PayShopTabByShopIdAndTabId.js.map
