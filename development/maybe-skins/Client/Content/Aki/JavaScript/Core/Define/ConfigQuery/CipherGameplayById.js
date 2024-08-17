"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCipherGameplayById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	CipherGameplay_1 = require("../Config/CipherGameplay"),
	DB = "db_ciphergameplay.db",
	FILE = "k.可视化编辑/c.Csv/u.UI玩法/m.密码锁/*.csv*",
	TABLE = "CipherGameplay",
	COMMAND = "select BinData from `CipherGameplay` where Id=?",
	KEY_PREFIX = "CipherGameplayById",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configCipherGameplayById.GetConfig(";
exports.configCipherGameplayById = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, o = !0) => {
		if (
			(n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (o) {
				var i = KEY_PREFIX + `#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
				if (a) return a;
			}
			if (
				(n =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Id",
							e,
						]))
			) {
				var n,
					i = void 0;
				if (
					(([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Id", e],
					)),
					n)
				) {
					const a = CipherGameplay_1.CipherGameplay.getRootAsCipherGameplay(
						new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
					);
					return (
						o &&
							((n = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=CipherGameplayById.js.map
