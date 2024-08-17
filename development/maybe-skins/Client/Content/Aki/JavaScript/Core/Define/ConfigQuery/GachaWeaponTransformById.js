"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configGachaWeaponTransformById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	GachaWeaponTransform_1 = require("../Config/GachaWeaponTransform"),
	DB = "db_gacha.db",
	FILE = "c.抽卡.xlsx",
	TABLE = "GachaWeaponTransform",
	COMMAND = "select BinData from `GachaWeaponTransform` where Id=?",
	KEY_PREFIX = "GachaWeaponTransformById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configGachaWeaponTransformById.GetConfig(";
exports.configGachaWeaponTransformById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var a = KEY_PREFIX + `#${o})`;
				const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
				if (r) return r;
			}
			if (
				(e =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							o,
						]))
			) {
				var e,
					a = void 0;
				if (
					(([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", o],
					)),
					e)
				) {
					const r =
						GachaWeaponTransform_1.GachaWeaponTransform.getRootAsGachaWeaponTransform(
							new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
						);
					return (
						n &&
							((e = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(e, r)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						r
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=GachaWeaponTransformById.js.map
