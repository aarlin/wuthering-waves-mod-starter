"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.configSpeakerLang = void 0);
const LanguageSystem_1 = require("../../Common/LanguageSystem"),
	Stats_1 = require("../../Common/Stats"),
	ConfigCommon_1 = require("../../Config/ConfigCommon"),
	DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
	StringUtils_1 = require("../../Utils/StringUtils"),
	CommonDefine_1 = require("../CommonDefine"),
	TEXTNOTFOUNT = "text not found",
	DB = "lang_speaker.db",
	TABLE = "Speaker",
	COMMAND = "select content from `Speaker` where id = ?",
	logPair = [
		["数据库", DB],
		["表名", TABLE],
		["语句", COMMAND],
	],
	langCache = new Map(),
	initStat = void 0,
	getLocalTextStat = void 0,
	LOCAL_TEXT_STAT_PREFIX = "configSpeakerLang.GetLocalText(";
exports.configSpeakerLang = {
	Init: () => {
		ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
	},
	GetLocalText: (e, o = void 0) => {
		if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey)
			return (
				(n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o)),
				TABLE + `|${e}|` + n
			);
		let i = langCache.get(e);
		i || ((i = new Map()), langCache.set(e, i));
		var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
		let t = i.get(n);
		if (t) return t;
		var r = ConfigCommon_1.ConfigCommon.GetLangStatementId(
			TABLE,
			DB,
			COMMAND,
			n,
		);
		if (
			(g =
				ConfigCommon_1.ConfigCommon.CheckStatement(r) &&
				ConfigCommon_1.ConfigCommon.BindInt(r, 1, e, ...logPair, ["Id", e]) &&
				0 <
					ConfigCommon_1.ConfigCommon.Step(
						r,
						!0,
						...logPair,
						["传入语言", o],
						["查询语言", n],
						["文本Id", e],
					))
		) {
			var a = void 0;
			if (
				(([g, a] = ConfigCommon_1.ConfigCommon.GetValue(
					r,
					0,
					...logPair,
					["传入语言", o],
					["查询语言", n],
					["文本Id", e],
				)),
				g)
			) {
				var g = DeserializeConfig_1.DeserializeConfig.ParseStringRange(
					a,
					0,
					a.byteLength,
					...logPair,
					["传入语言", o],
					["查询语言", n],
					["文本Id", e],
				);
				if (g.Success)
					return (
						(t = g.Value),
						ConfigCommon_1.ConfigCommon.Reset(r),
						StringUtils_1.StringUtils.IsEmpty(t) &&
							o !== CommonDefine_1.CHS &&
							((a = exports.configSpeakerLang.GetLocalText(
								e,
								CommonDefine_1.CHS,
							)),
							StringUtils_1.StringUtils.IsEmpty(a) ||
								((g = void 0 === o ? "" : "|" + o),
								(t = TEXTNOTFOUNT + "|" + e + g))),
						i.set(n, t),
						t
					);
			}
		}
		ConfigCommon_1.ConfigCommon.Reset(r);
	},
};
//# sourceMappingURL=SpeakerLang.js.map
