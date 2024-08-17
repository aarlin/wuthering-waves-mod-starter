"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configCommonParamLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
	DB = "lang_common_param.db",
	TABLE = "CommonParam",
	COMMAND = "select content from `CommonParam` where id = ?",
	logPair = [
		["数据库", DB],
		["表名", TABLE],
		["语句", COMMAND],
	],
	langCache = new Map(),
	initStat = void 0,
	getLocalTextStat = void 0,
	LOCAL_TEXT_STAT_PREFIX = "configCommonParamLang.GetLocalText(";
exports.configCommonParamLang = {
	Init: () => {
		ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
	},
	GetLocalText: (o, e = void 0) => {
		if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
			return (
				`CommonParam|${o}|` +
				LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e)
			);
		let n = langCache.get(o);
		n || ((n = new Map()), langCache.set(o, n));
		var a = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e),
			i = n.get(a);
		if (i) return i;
		var m = ConfigCommon_1.ConfigCommon.GetLangStatementId(
			TABLE,
			DB,
			COMMAND,
			e,
		);
		if ((g = ConfigCommon_1.ConfigCommon.CheckStatement(m))) {
			if (
				(g =
					(g = ConfigCommon_1.ConfigCommon.BindInt(m, 1, o, ...logPair, [
						"Id",
						o,
					])) &&
					0 <
						ConfigCommon_1.ConfigCommon.Step(
							m,
							!0,
							...logPair,
							["传入语言", e],
							["查询语言", a],
							["文本Id", o],
						))
			) {
				var C = void 0;
				if (
					(([g, C] = ConfigCommon_1.ConfigCommon.GetValue(
						m,
						0,
						...logPair,
						["传入语言", e],
						["查询语言", a],
						["文本Id", o],
					)),
					g)
				) {
					var g = DeserializeConfig_1.DeserializeConfig.ParseString(
						C,
						0,
						...logPair,
						["传入语言", e],
						["查询语言", a],
						["文本Id", o],
					);
					if (g.Success)
						return (
							(i = g.Value),
							n.set(a, i),
							ConfigCommon_1.ConfigCommon.Reset(m),
							i
						);
				}
			}
			ConfigCommon_1.ConfigCommon.Reset(m);
		}
	},
};
//# sourceMappingURL=CommonParamLang.js.map
