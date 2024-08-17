"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionItemViewTool =
		exports.ImageConfigTool =
		exports.MenuTool =
			void 0);
const Application_1 = require("../../../Core/Application/Application"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PlatformController_1 = require("../Platform/PlatformController"),
	MenuDefine_1 = require("./MenuDefine");
class MenuTool {
	static CheckPlatform(e) {
		var a = ModelManager_1.ModelManager.MenuModel.SimulatedPlatform;
		if (-1 !== a)
			switch (e) {
				case 1:
					return 1 === a;
				case 2:
					return 2 === a || 4 === a || 3 === a;
				case 3:
					return 2 === a || 3 === a;
				case 4:
					return 2 === a || 4 === a;
				default:
					return !0;
			}
		switch (e) {
			case 1:
				return PlatformController_1.PlatformController.IsPc();
			case 2:
				return PlatformController_1.PlatformController.IsMobile();
			case 3:
				return 2 === ModelManager_1.ModelManager.PlatformModel.PlatformType;
			case 4:
				return 1 === ModelManager_1.ModelManager.PlatformModel.PlatformType;
			default:
				return !0;
		}
	}
	static CheckDeviceVendor(e) {
		var a =
				GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice(),
			n = !a && !0;
		switch (e) {
			case 81:
			case 83:
			case 84:
			case 85:
				return a;
			case 82:
			case 128:
			case 125:
			case 126:
				return !1;
			case 87:
				return n;
			case 127:
				return GameQualitySettingsManager_1.GameQualitySettingsManager.IsMetalFxDevice();
			case 58:
				return (
					!GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBad() &&
					!GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()
				);
			default:
				return !0;
		}
	}
	static GetLanguageDefineData() {
		return LanguageSystem_1.LanguageSystem.GetAllLanguageDefines();
	}
	static GetAudioCodeById(e) {
		var a = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
		return a
			? a.AudioCode
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Menu", 31, "LanguageSystem 未定义此语种", [
						"非法值",
						e,
					]),
				CommonDefine_1.ENGLISH_ISO639_1);
	}
	static GetLanguageCodeById(e) {
		var a = LanguageSystem_1.LanguageSystem.GetLanguageDefineByType(e);
		return a
			? a.LanguageCode
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Menu", 11, "LanguageSystem 未定义此语种", [
						"非法值",
						e,
					]),
				CommonDefine_1.ENGLISH_ISO639_1);
	}
	static GetLanguageIdByCode(e) {
		var a = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(e);
		return a
			? a.LanguageType
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Menu", 11, "LanguageSystem 未定义此语种", [
						"非法值",
						e,
					]),
				this.GetLanguageIdByCode(CommonDefine_1.ENGLISH_ISO639_1));
	}
	static GetSpeechTypeByLanguageType(e) {
		return LanguageSystem_1.LanguageSystem.GetSpeechTypeByLanguageType(e);
	}
	static IsExcludeLanguageSetting(e) {
		return 4 === e && Application_1.Application.IsPublicationApp();
	}
}
exports.MenuTool = MenuTool;
class ImageConfigTool {
	static ResetImageConfig(e) {
		var a = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = a.GetCurrentQualityInfo();
		for (const t of e.keys())
			switch (t) {
				case MenuDefine_1.EImageConfig.IMAGEQUALITY:
					e.set(t, n.GetGameQualitySettingLevel());
					break;
				case MenuDefine_1.EImageConfig.HIGHESTFPS:
					e.set(t, a.GetFrameIndexByList(n.GetFrameRate()));
					break;
				case MenuDefine_1.EImageConfig.SHADOWQUALITY:
					e.set(t, n.ShadowQuality);
					break;
				case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
					e.set(t, n.NiagaraQuality);
					break;
				case MenuDefine_1.EImageConfig.IMAGEDETAIL:
					e.set(t, n.ImageDetail);
					break;
				case MenuDefine_1.EImageConfig.ANTIALISING:
					e.set(t, n.AntiAliasing);
					break;
				case MenuDefine_1.EImageConfig.SCENEAO:
					e.set(t, n.SceneAo);
					break;
				case MenuDefine_1.EImageConfig.VOLUMEFOG:
					e.set(t, n.VolumeFog);
					break;
				case MenuDefine_1.EImageConfig.VOLUMELIGHT:
					e.set(t, n.VolumeLight);
					break;
				case MenuDefine_1.EImageConfig.MOTIONBLUR:
					e.set(t, n.MotionBlur);
					break;
				case MenuDefine_1.EImageConfig.PCVSYNC:
					e.set(t, n.PcVsync);
					break;
				case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
					e.set(t, n.MobileResolution);
					break;
				case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
					e.set(t, n.SuperResolution);
					break;
				case MenuDefine_1.EImageConfig.RESOLUTION:
					e.set(t, a.GetResolutionIndexByList(n.PcScreenResolution));
					break;
				case MenuDefine_1.EImageConfig.DISPLAYMODE:
					e.set(t, a.GetFullScreenModeIndexByList(n.PcFullScreenMode));
					break;
				case MenuDefine_1.EImageConfig.NPCDENSITY:
					e.set(t, n.NpcDensity);
					break;
				case MenuDefine_1.EImageConfig.NVIDIADLSS:
					e.set(t, n.NvidiaSuperSamplingEnable);
					break;
				case MenuDefine_1.EImageConfig.FSR:
					e.set(t, n.FsrEnable);
					break;
				case MenuDefine_1.EImageConfig.XESS:
					e.set(t, n.XessEnable);
					break;
				case MenuDefine_1.EImageConfig.XESS_QUALITY:
					e.set(t, n.XessQuality);
					break;
				case MenuDefine_1.EImageConfig.METALFX:
					e.set(t, n.MetalFxEnable);
					break;
				case MenuDefine_1.EImageConfig.IRX:
					e.set(t, n.IrxEnable);
					break;
				case MenuDefine_1.EImageConfig.BLOOM:
					e.set(t, n.BloomEnable);
			}
	}
}
exports.ImageConfigTool = ImageConfigTool;
class FunctionItemViewTool {
	static GetSliderPosition(e, a, n = 0) {
		var t = e[0];
		(e = e[1]), (t = MathUtils_1.MathUtils.GetRangePct(t, e, a));
		return MathUtils_1.MathUtils.GetFloatPointFloor(t * e, n);
	}
	static CheckNotice(e) {
		return (
			0 < e.MenuDataOptionsValueList?.length ||
			0 < e.MenuDataRelationFuncIds.length
		);
	}
}
exports.FunctionItemViewTool = FunctionItemViewTool;
