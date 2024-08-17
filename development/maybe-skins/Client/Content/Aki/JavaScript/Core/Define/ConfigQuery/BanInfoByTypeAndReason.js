"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configBanInfoByTypeAndReason = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	BanInfo_1 = require("../Config/BanInfo"),
	DB = "db_report.db",
	FILE = "f.封禁处罚.xlsx",
	TABLE = "BanInfo",
	COMMAND = "select BinData from `BanInfo` where BanType=? AND BanReason=?",
	KEY_PREFIX = "BanInfoByTypeAndReason",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configBanInfoByTypeAndReason.GetConfig(";
exports.configBanInfoByTypeAndReason = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (n, o, e = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var a = KEY_PREFIX + `#${n}#${o})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (f) return f;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["BanType", n],
							["BanReason", o],
						))
			) {
				var i,
					a = void 0;
				if (
					(([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["BanType", n],
						["BanReason", o],
					)),
					i)
				) {
					const f = BanInfo_1.BanInfo.getRootAsBanInfo(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						e &&
							((i = KEY_PREFIX + `#${n}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=BanInfoByTypeAndReason.js.map
