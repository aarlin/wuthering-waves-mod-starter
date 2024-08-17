"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLanguageDefineByLanguageType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LanguageDefine_1 = require("../Config/LanguageDefine"),
	DB = "db_menu.db",
	FILE = "s.设置系统.xlsx",
	TABLE = "LanguageDefine",
	COMMAND = "select BinData from `LanguageDefine` where LanguageType = ?",
	KEY_PREFIX = "LanguageDefineByLanguageType",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configLanguageDefineByLanguageType.GetConfig(";
exports.configLanguageDefineByLanguageType = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (e, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var o = KEY_PREFIX + `#${e})`;
				const a = ConfigCommon_1.ConfigCommon.GetConfig(o);
				if (a) return a;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"LanguageType",
							e,
						]))
			) {
				var i,
					o = void 0;
				if (
					(([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["LanguageType", e],
					)),
					i)
				) {
					const a = LanguageDefine_1.LanguageDefine.getRootAsLanguageDefine(
						new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${e})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						a
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LanguageDefineByLanguageType.js.map
