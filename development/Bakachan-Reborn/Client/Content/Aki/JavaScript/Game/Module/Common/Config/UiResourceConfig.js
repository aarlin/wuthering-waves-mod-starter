"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiResourceConfig = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	LangOfLogoByName_1 = require("../../../../Core/Define/ConfigQuery/LangOfLogoByName"),
	UiResourceById_1 = require("../../../../Core/Define/ConfigQuery/UiResourceById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class UiResourceConfig extends ConfigBase_1.ConfigBase {
	GetResourcePath(e) {
		return (
			(e = UiResourceById_1.configUiResourceById.GetConfig(e)),
			UiResourceConfig.GetResourcePathNormal(e)
		);
	}
	GetResourceConfig(e) {
		return UiResourceById_1.configUiResourceById.GetConfig(e);
	}
	GetLogoPathByLanguage(e) {
		var o = LangOfLogoByName_1.configLangOfLogoByName.GetConfig(e);
		switch (LanguageSystem_1.LanguageSystem.PackageLanguage) {
			case CommonDefine_1.ENGLISH_ISO639_1:
				return o.EnLogo;
			case CommonDefine_1.CHS:
				return o.ZhHansLogo;
			case CommonDefine_1.JAPANESE_ISO639_1:
				return o.JpLogo;
			case CommonDefine_1.CHT:
				return o.ZhHantLogo;
			case CommonDefine_1.KOREAN_ISO639_1:
				return o.KrLogo;
			default:
				return o.EnLogo;
		}
	}
}
((exports.UiResourceConfig = UiResourceConfig).IsPcPlatform = !1),
	(UiResourceConfig.GetResourcePathNormal = (e) =>
		!ModelManager_1.ModelManager.PlatformModel.IsMobile() && e.PcPath
			? e.PcPath
			: e.Path);
