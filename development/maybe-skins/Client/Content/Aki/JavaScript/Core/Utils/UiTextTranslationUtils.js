"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTextTranslationUtils = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../Common/Log"),
	ConfigDefine_1 = require("../Define/ConfigDefine"),
	MultiTextLang_1 = require("../Define/ConfigQuery/MultiTextLang"),
	PrefabTextItemByItemId_1 = require("../Define/ConfigQuery/PrefabTextItemByItemId");
class UiTextTranslationUtils {
	static Kz(e) {
		1 === e.overflowType && (e.bBestFit = !0);
	}
	static Initialize() {
		UE.UIText.SetTextTranslateDelegate(
			(0, puerts_1.toManualReleaseDelegate)(
				UiTextTranslationUtils.TranslateText,
			),
		),
			UE.UIText.SetLocalTextDelegate(
				(0, puerts_1.toManualReleaseDelegate)(
					UiTextTranslationUtils.GetLocalText,
				),
			),
			UE.UIText.SetLocalTextNewDelegate(
				(0, puerts_1.toManualReleaseDelegate)(
					UiTextTranslationUtils.GetLocalTextNew,
				),
			);
	}
	static Destroy() {
		UE.UIText.SetTextTranslateDelegate(void 0),
			UE.UIText.SetLocalTextDelegate(void 0),
			UE.UIText.SetLocalTextNewDelegate(void 0),
			(0, puerts_1.releaseManualReleaseDelegate)(
				UiTextTranslationUtils.TranslateText,
			),
			(0, puerts_1.releaseManualReleaseDelegate)(
				UiTextTranslationUtils.GetLocalText,
			),
			(0, puerts_1.releaseManualReleaseDelegate)(
				UiTextTranslationUtils.GetLocalTextNew,
			);
	}
}
((exports.UiTextTranslationUtils = UiTextTranslationUtils).TranslateText = (
	t,
) => {
	if (t.TranslateId) {
		let e = void 0;
		(e =
			0 !== t.TranslateId
				? PrefabTextItemByItemId_1.configPrefabTextItemByItemId.GetConfig(
						BigInt(t.TranslateId),
					)
				: e) && (UiTextTranslationUtils.Kz(t), t.ShowTextNew(e.Text));
	} else t.text = "";
}),
	(UiTextTranslationUtils.GetLocalText = (e, t, i) => {
		let a = void 0;
		return (
			(a = (0, ConfigDefine_1.getLangInterface)(e)?.GetLocalText(t)),
			i
				? (void 0 === a &&
						((a = i.GetText()), Log_1.Log.CheckWarn()) &&
						Log_1.Log.Warn(
							"TextLanguageSearch",
							11,
							"[GetLocalText]配置表文本获取失败，文本控件显示自身文本",
							["控件Id", i.TranslateId],
							["控件自身文本", a],
						),
					a !== i.GetText() && UiTextTranslationUtils.Kz(i))
				: void 0 === a &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"TextLanguageSearch",
						11,
						"[GetLocalText]格式化字符串传入的表名与文本id无效",
						["表名", e],
						["文本id", t],
					),
			a
		);
	}),
	(UiTextTranslationUtils.GetLocalTextNew = (e, t) => {
		let i = void 0;
		return (
			(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
			t
				? (void 0 === i &&
						((i = t.GetText()), Log_1.Log.CheckWarn()) &&
						Log_1.Log.Warn(
							"TextLanguageSearch",
							11,
							"[GetLocalTextNew]预制体固定文本多语言切换失败，该文本控件Id还没有收集到，将显示预制体上的文本",
							["控件Id", t.TranslateId],
							["控件自身文本", i],
						),
					i !== t.GetText() && UiTextTranslationUtils.Kz(t))
				: void 0 === i &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"TextLanguageSearch",
						11,
						"[GetLocalTextNew]格式化字符串传入的表名与文本id无效",
						["文本id", e],
					),
			i
		);
	});
//# sourceMappingURL=UiTextTranslationUtils.js.map
