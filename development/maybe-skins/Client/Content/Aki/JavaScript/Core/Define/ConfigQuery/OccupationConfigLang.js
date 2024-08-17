"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configOccupationConfigLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
	StringUtils_1 = require("../../Utils/StringUtils"),
	CommonDefine_1 = require("../CommonDefine"),
	TEXTNOTFOUNT = "text not found",
	DB = "lang_occupation.db",
	TABLE = "OccupationConfig",
	COMMAND = "select content from `OccupationConfig` where id = ?",
	logPair = [
		["数据库", DB],
		["表名", TABLE],
		["语句", COMMAND],
	],
	langCache = new Map(),
	initStat = void 0,
	getLocalTextStat = void 0,
	LOCAL_TEXT_STAT_PREFIX = "configOccupationConfigLang.GetLocalText(";
exports.configOccupationConfigLang = {
	Init: () => {
		ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
	},
	GetLocalText: (o, e = void 0) => {
		if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
			return (
				(n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e)),
				TABLE + `|${o}|` + n
			);
		let i = langCache.get(o);
		i || ((i = new Map()), langCache.set(o, i));
		var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e);
		let t = i.get(n);
		if (t) return t;
		var a = ConfigCommon_1.ConfigCommon.GetLangStatementId(
			TABLE,
			DB,
			COMMAND,
			n,
		);
		if (
			(C =
				ConfigCommon_1.ConfigCommon.CheckStatement(a) &&
				ConfigCommon_1.ConfigCommon.BindInt(a, 1, o, ...logPair, ["Id", o]) &&
				0 <
					ConfigCommon_1.ConfigCommon.Step(
						a,
						!0,
						...logPair,
						["传入语言", e],
						["查询语言", n],
						["文本Id", o],
					))
		) {
			var g = void 0;
			if (
				(([C, g] = ConfigCommon_1.ConfigCommon.GetValue(
					a,
					0,
					...logPair,
					["传入语言", e],
					["查询语言", n],
					["文本Id", o],
				)),
				C)
			) {
				var C = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
					g,
					0,
					g.byteLength,
					...logPair,
					["传入语言", e],
					["查询语言", n],
					["文本Id", o],
				);
				if (C.Success)
					return (
						(t = C.Value),
						ConfigCommon_1.ConfigCommon.Reset(a),
						StringUtils_1.StringUtils.IsEmpty(t) &&
							e !== CommonDefine_1.CHS &&
							((g = exports.configOccupationConfigLang.GetLocalText(
								o,
								CommonDefine_1.CHS,
							)),
							StringUtils_1.StringUtils.IsEmpty(g) ||
								((C = void 0 === e ? "" : "|" + e),
								(t = TEXTNOTFOUNT + "|" + o + C))),
						i.set(n, t),
						t
					);
			}
		}
		ConfigCommon_1.ConfigCommon.Reset(a);
	},
};
//# sourceMappingURL=OccupationConfigLang.js.map
