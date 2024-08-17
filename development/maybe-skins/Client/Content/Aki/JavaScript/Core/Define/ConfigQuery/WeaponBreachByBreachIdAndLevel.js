"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configWeaponBreachByBreachIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	WeaponBreach_1 = require("../Config/WeaponBreach"),
	DB = "db_weapon.db",
	FILE = "w.武器基础配置.xlsx",
	TABLE = "WeaponBreach",
	COMMAND =
		"select BinData from `WeaponBreach` where BreachId = ? AND Level = ?",
	KEY_PREFIX = "WeaponBreachByBreachIdAndLevel",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configWeaponBreachByBreachIdAndLevel.GetConfig(";
exports.configWeaponBreachByBreachIdAndLevel = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${e}#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (r) return r;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["BreachId", e],
							["Level", o],
						))
			) {
				var i,
					a = void 0;
				if (
					(([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["BreachId", e],
						["Level", o],
					)),
					i)
				) {
					const r = WeaponBreach_1.WeaponBreach.getRootAsWeaponBreach(
						new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${e}#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=WeaponBreachByBreachIdAndLevel.js.map
