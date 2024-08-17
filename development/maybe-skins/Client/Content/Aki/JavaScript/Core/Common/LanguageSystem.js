"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LanguageSystem =
		exports.languageCultureMap =
		exports.languageSpeechMapping =
		exports.LanguageDefine =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CommonDefine_1 = require("../Define/CommonDefine"),
	LanguageDefineByLanguageCode_1 = require("../Define/ConfigQuery/LanguageDefineByLanguageCode"),
	Info_1 = require("./Info"),
	Log_1 = require("./Log");
class LanguageDefine {
	constructor(e, n, a) {
		(this.LanguageType = e), (this.LanguageCode = n), (this.AudioCode = a);
	}
}
(exports.LanguageDefine = LanguageDefine),
	(exports.languageSpeechMapping = new Map([
		[0, 0],
		[1, 1],
		[2, 2],
		[3, 3],
		[4, 1],
		[5, 0],
		[6, 1],
		[7, 1],
		[8, 1],
		[9, 1],
		[10, 1],
		[11, 1],
		[12, 1],
	]));
const languageList = [
		new LanguageDefine(0, "zh-Hans", "zh"),
		new LanguageDefine(1, "en", "en"),
		new LanguageDefine(2, "ja", "ja"),
		new LanguageDefine(3, "ko", "ko"),
		new LanguageDefine(4, "ru", "en"),
		new LanguageDefine(5, "zh-Hant", "zh"),
		new LanguageDefine(6, "de", "en"),
		new LanguageDefine(7, "es", "en"),
		new LanguageDefine(8, "pt", "en"),
		new LanguageDefine(9, "id", "en"),
		new LanguageDefine(10, "fr", "en"),
		new LanguageDefine(11, "vi", "en"),
		new LanguageDefine(12, "th", "en"),
	],
	languageTypeMap =
		((exports.languageCultureMap = new Map([
			["zh-Hans", 11],
			["en", 0],
			["ja", 10],
			["ko", 9],
			["ru", 6],
			["zh-Hant", 12],
			["de", 3],
			["es", 4],
			["pt", 14],
			["id", 16],
			["fr", 1],
			["vi", 17],
			["th", 18],
		])),
		new Map()),
	languageCodeMap = new Map();
for (const d of languageList)
	languageTypeMap.set(d.LanguageType, d),
		languageCodeMap.set(d.LanguageCode, d);
class LanguageSystem {
	static get PackageLanguage() {
		return LanguageSystem.T8 ?? CommonDefine_1.CHS;
	}
	static set PackageLanguage(e) {
		var n = LanguageSystem.T8;
		(LanguageSystem.T8 = e),
			UE.LGUIFontData.SetAllFontCurrentCulture(
				exports.languageCultureMap.get(e),
			),
			Info_1.Info.IsPlayInEditor ||
				UE.KismetInternationalizationLibrary.SetCurrentCulture(e, !0),
			e !== n && UE.UIText.OnTsLanguageChange();
	}
	static get PackageAudio() {
		return LanguageSystem.L8 ?? CommonDefine_1.CHS_AUDIO;
	}
	static SetPackageAudio(n, e) {
		LanguageSystem.L8 = n;
		const a = (e) => {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Config",
					31,
					"SetCurrentAudioCultureAsync",
					["Success", e],
					["Code", n],
				),
				(0, puerts_1.releaseManualReleaseDelegate)(a);
		};
		UE.AkGameplayStatics.SetCurrentAudioCultureAsync(
			n,
			(0, puerts_1.toManualReleaseDelegate)(a),
		);
	}
	static D8(e) {
		return e.includes(CommonDefine_1.CHINESE_ISO639_1)
			? CommonDefine_1.CHS
			: CommonDefine_1.ENGLISH_ISO639_1;
	}
	static FirstTimeSetLanguage(e) {
		var n = UE.KismetSystemLibrary.GetDefaultLanguage(),
			a = UE.NewArray(UE.BuiltinString);
		for (const i of CommonDefine_1.AVAILABLE_LANGUAGES) a.Add(i);
		var g = this.D8(n),
			t = UE.KismetInternationalizationLibrary.GetSuitableCulture(a, n, g),
			u =
				LanguageDefineByLanguageCode_1.configLanguageDefineByLanguageCode.GetConfig(
					t,
				),
			u = !!u?.IsShow && u.IsShow,
			t = u ? t : this.D8(t),
			u =
				(u ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Config",
							11,
							"当前语种表格配置不允许生效",
							["targetLanguage", t],
							["currentCulture", n],
						)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Config",
						31,
						"第一次设置语言",
						["设备默认语言", n],
						["查找不到时匹配默认语言", g],
						["最合适语言", t],
					),
				languageCodeMap.get(t));
		u
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Config",
						31,
						"FirstTimeSetLanguage",
						["Text", u.LanguageCode],
						["Audio", u.AudioCode],
					),
				(LanguageSystem.PackageLanguage = u.LanguageCode),
				this.SetPackageAudio(u.AudioCode, e))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Config", 31, "设置系统找不到配置", [
						"语种识别码",
						t,
					]),
				(LanguageSystem.PackageLanguage = CommonDefine_1.ENGLISH_ISO639_1),
				this.SetPackageAudio(CommonDefine_1.ENGLISH_ISO639_1, e));
	}
	static GetAllLanguageDefines() {
		return languageList;
	}
	static GetLanguageDefineByType(e) {
		return languageTypeMap.get(e);
	}
	static GetLanguageDefineByCode(e) {
		return languageCodeMap.get(e);
	}
	static GetCultureOrDefault(e) {
		return e && 0 !== e.length ? e : LanguageSystem.PackageLanguage;
	}
	static GetSpeechTypeByLanguageType(e) {
		return exports.languageSpeechMapping.get(e);
	}
}
(exports.LanguageSystem = LanguageSystem).GmShowLanguageKey = !1;
//# sourceMappingURL=LanguageSystem.js.map
