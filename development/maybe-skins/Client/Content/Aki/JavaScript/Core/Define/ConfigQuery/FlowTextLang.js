"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configFlowTextLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
	StringUtils_1 = require("../../Utils/StringUtils"),
	CommonDefine_1 = require("../CommonDefine"),
	TEXTNOTFOUNT = "text not found",
	DB = "lang_flow_text.db",
	TABLE = "FlowText",
	COMMAND = "select content from `FlowText` where id = ?",
	logPair = [
		["数据库", DB],
		["表名", TABLE],
		["语句", COMMAND],
	],
	langCache = new Map(),
	initStat = void 0,
	getLocalTextStat = void 0,
	LOCAL_TEXT_STAT_PREFIX = "configFlowTextLang.GetLocalText(";
exports.configFlowTextLang = {
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
		var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(
			TABLE,
			DB,
			COMMAND,
			n,
		);
		if (
			(a =
				ConfigCommon_1.ConfigCommon.CheckStatement(g) &&
				ConfigCommon_1.ConfigCommon.BindInt(g, 1, o, ...logPair, ["Id", o]) &&
				0 <
					ConfigCommon_1.ConfigCommon.Step(
						g,
						!0,
						...logPair,
						["传入语言", e],
						["查询语言", n],
						["文本Id", o],
					))
		) {
			var r = void 0;
			if (
				(([a, r] = ConfigCommon_1.ConfigCommon.GetValue(
					g,
					0,
					...logPair,
					["传入语言", e],
					["查询语言", n],
					["文本Id", o],
				)),
				a)
			) {
				var a = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
					r,
					0,
					r.byteLength,
					...logPair,
					["传入语言", e],
					["查询语言", n],
					["文本Id", o],
				);
				if (a.Success)
					return (
						(t = a.Value),
						ConfigCommon_1.ConfigCommon.Reset(g),
						StringUtils_1.StringUtils.IsEmpty(t) &&
							e !== CommonDefine_1.CHS &&
							((r = exports.configFlowTextLang.GetLocalText(
								o,
								CommonDefine_1.CHS,
							)),
							StringUtils_1.StringUtils.IsEmpty(r) ||
								((a = void 0 === e ? "" : "|" + e),
								(t = TEXTNOTFOUNT + "|" + o + a))),
						i.set(n, t),
						t
					);
			}
		}
		ConfigCommon_1.ConfigCommon.Reset(g);
	},
};
//# sourceMappingURL=FlowTextLang.js.map
