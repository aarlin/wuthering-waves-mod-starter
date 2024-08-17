"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configWeaponHideConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	WeaponHideConfig_1 = require("../Config/WeaponHideConfig"),
	DB = "db_weapon_visible.db",
	FILE = "w.武器显示配置.xlsx",
	TABLE = "WeaponHideConfig",
	COMMAND =
		"select BinData from `WeaponHideConfig` where id=0 AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) >0;",
	KEY_PREFIX = "WeaponHideConfigByIdWithZero",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configWeaponHideConfigByIdWithZero.GetConfig(";
exports.configWeaponHideConfigByIdWithZero = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n, i, e = !0) => {
		if (
			(C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (e) {
				var d = KEY_PREFIX + `#${o}#${n}#${i})`;
				const f = ConfigCommon_1.ConfigCommon.GetConfig(d);
				if (f) return f;
			}
			if (
				(C =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							handleId,
							!0,
							...logPair,
							["Id", o],
							["Id", n],
							["Id", i],
						))
			) {
				var C,
					d = void 0;
				if (
					(([C, d] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
						["Id", n],
						["Id", i],
					)),
					C)
				) {
					const f =
						WeaponHideConfig_1.WeaponHideConfig.getRootAsWeaponHideConfig(
							new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
						);
					return (
						e &&
							((C = KEY_PREFIX + `#${o}#${n}#${i})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(C, f)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						f
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=WeaponHideConfigByIdWithZero.js.map
