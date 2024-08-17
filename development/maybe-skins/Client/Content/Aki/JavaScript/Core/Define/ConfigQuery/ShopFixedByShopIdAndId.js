"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configShopFixedByShopIdAndId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	ShopFixed_1 = require("../Config/ShopFixed"),
	DB = "db_shop.db",
	FILE = "s.商城.xlsx",
	TABLE = "ShopFixed",
	COMMAND = "select BinData from `ShopFixed` where ShopId =? AND Id = ?",
	KEY_PREFIX = "ShopFixedByShopIdAndId",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configShopFixedByShopIdAndId.GetConfig(";
exports.configShopFixedByShopIdAndId = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, i = !0) => {
		if (
			(d = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (i) {
				var e = KEY_PREFIX + `#${o}#${n})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (r) return r;
			}
			if (
				(d =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["ShopId", o],
							["Id", n],
						))
			) {
				var d,
					e = void 0;
				if (
					(([d, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["ShopId", o],
						["Id", n],
					)),
					d)
				) {
					const r = ShopFixed_1.ShopFixed.getRootAsShopFixed(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						i &&
							((d = KEY_PREFIX + `#${o}#${n})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(d, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=ShopFixedByShopIdAndId.js.map
