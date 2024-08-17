"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configLangOfLogoByName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	LangOfLogo_1 = require("../Config/LangOfLogo"),
	DB = "db_langoflogo.db",
	FILE = "l.Logo多语言表.xlsx",
	TABLE = "LangOfLogo",
	COMMAND = "select BinData from `LangOfLogo` where Name=?",
	KEY_PREFIX = "LangOfLogoByName",
	logPair = [
		["数据库", DB],
		["文件", FILE],
		["表名", TABLE],
		["语句", COMMAND],
	];
let handleId = 0;
const initStat = void 0,
	getConfigStat = void 0,
	CONFIG_STAT_PREFIX = "configLangOfLogoByName.GetConfig(";
exports.configLangOfLogoByName = {
	Init: () => {
		handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
			handleId,
			DB,
			COMMAND,
		);
	},
	GetConfig: (o, n = !0) => {
		if (
			(i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
		) {
			if (n) {
				var e = KEY_PREFIX + `#${o})`;
				const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
				if (g) return g;
			}
			if (
				(i =
					ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
							"Name",
							o,
						]))
			) {
				var i,
					e = void 0;
				if (
					(([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
						handleId,
						0,
						...logPair,
						["Name", o],
					)),
					i)
				) {
					const g = LangOfLogo_1.LangOfLogo.getRootAsLangOfLogo(
						new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
					);
					return (
						n &&
							((i = KEY_PREFIX + `#${o})`),
							ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
						ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
						g
					);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
		}
	},
};
//# sourceMappingURL=LangOfLogoByName.js.map
