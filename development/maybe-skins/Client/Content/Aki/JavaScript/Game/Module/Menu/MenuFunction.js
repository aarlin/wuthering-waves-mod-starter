"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuNoticeFunction = exports.MenuFunction = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	GlobalData_1 = require("../../GlobalData"),
	KuroPushController_1 = require("../../KuroPushSdk/KuroPushController"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	MenuController_1 = require("./MenuController"),
	MenuDefine_1 = require("./MenuDefine"),
	MenuTool_1 = require("./MenuTool"),
	FUNCTIONID_2_VOUMETAG = new Map([
		[1, new UE.FName("Master_Audio_Bus_Volume")],
		[2, new UE.FName("Vocal_Audio_Bus_Volume")],
		[3, new UE.FName("Music_Audio_Bus_Volume")],
		[4, new UE.FName("SFX_Audio_Bus_Volume")],
		[69, new UE.FName("AMB_Audio_Bus_Volume")],
		[70, new UE.FName("UI_Audio_Bus_Volume")],
	]);
class MenuFunction {
	static SetImageQuality(e) {
		var t,
			n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			a = MenuController_1.MenuController.GetTargetMenuData(e);
		a
			? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
				(a = a.MenuDataOptionsValueList[t]),
				(t = n.GetQualityInfoByType(a)),
				Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetImageQuality"),
				n.ApplyQualityInfoToCurrentQualityInfo(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SetImageQuality,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Menu",
					8,
					"[SetImageQuality]对应硬件可能不支持或不属于当前平台",
					["functionId", e],
				);
	}
	static SetHighFps(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		e = t.GetFrameByList(e);
		n.SetFrameRate(e),
			n.ApplyFrameRate(),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetHighFps"),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetShadowQuality(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetShadowQuality(e),
			n.ApplyShadowQuality(),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 8, "SetShadowQuality"),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNiagaraQuality(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetNiagaraQuality(e),
			n.ApplyNiagaraQuality(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetImageDetail(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetImageDetail(e),
			n.ApplyImageDetail(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetAntiAliasing(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetAntiAliasing(e),
			n.ApplyAntiAliasing(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetSceneAo(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetSceneAo(e), n.ApplySceneAo(), t.SaveCurrentQualityInfoToQualityData();
	}
	static SetVolumeFog(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetVolumeFog(e),
			n.ApplyVolumeFog(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetVolumeLight(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetVolumeLight(e),
			n.ApplyVolumeLight(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMotionBlur(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMotionBlur(e),
			n.ApplyMotionBlur(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetPcVsync(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetPcVsync(e), n.ApplyPcVsync(), t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileResolution(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileResolution(e),
			n.ApplyMobileResolution(),
			t.SaveCurrentQualityInfoToQualityData(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
	}
	static SetSuperResolution(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetSuperResolution(e),
			n.ApplySuperResolution(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetTextLanguage(e) {
		var t;
		e = MenuController_1.MenuController.GetTargetConfig(e);
		(e = MenuTool_1.MenuTool.GetLanguageCodeById(e)) &&
			((t = LanguageSystem_1.LanguageSystem.PackageLanguage),
			(LanguageSystem_1.LanguageSystem.PackageLanguage = e),
			ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
				16,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TextLanguageChange,
				t,
				e,
			));
	}
	static SetLanguageAudio(e) {
		(e = MenuController_1.MenuController.GetTargetConfig(e)),
			(e = MenuTool_1.MenuTool.GetAudioCodeById(e)) &&
				LanguageSystem_1.LanguageSystem.SetPackageAudio(
					e,
					GlobalData_1.GlobalData.World,
				);
	}
	static SetDisplayMode(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		e = t.GetFullScreenModeByList(e);
		n.SetPcFullScreenMode(e),
			n.ApplyFullscreenMode(),
			t.SaveCurrentQualityInfoToQualityData(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDisplayMode);
	}
	static SetResolution(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		e = t.GetResolutionByList(e);
		n.SetResolution(e),
			n.ApplyScreenResolution(),
			t.SaveCurrentQualityInfoToQualityData(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetResolution);
	}
	static SetBrightness(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetBrightness(e),
			n.ApplyBrightness(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNpcDensity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetNpcDensity(e),
			n.ApplyNpcDensity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNvidiaSuperSamplingEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetNvidiaSuperSamplingEnable(e),
			n.ApplyNvidiaSuperSamplingEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNvidiaSuperSamplingFrameGenerate(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetNvidiaSuperSamplingFrameGenerate(e),
			n.ApplyNvidiaSuperSamplingFrameGenerate(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNvidiaSuperSamplingMode(e) {
		var t,
			n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			a = MenuController_1.MenuController.GetTargetMenuData(e);
		a
			? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
				(a = a.MenuDataOptionsValueList[t]),
				n.GetCurrentQualityInfo().SetNvidiaSuperSamplingMode(a),
				n.SaveCurrentQualityInfoToQualityData())
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Menu",
					8,
					"[SetNvidiaSuperSamplingMode]对应硬件可能不支持或不属于当前平台",
					["functionId", e],
				);
	}
	static ApplyNvidiaSuperSamplingMode() {
		GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
			.GetCurrentQualityInfo()
			.ApplyNvidiaSuperSamplingMode();
	}
	static SetNvidiaSuperSamplingSharpness(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetNvidiaSuperSamplingSharpness(e),
			n.ApplyNvidiaSuperSamplingSharpness(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetNvidiaReflex(e) {
		var t,
			n = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			a = MenuController_1.MenuController.GetTargetMenuData(e);
		a
			? ((t = MenuController_1.MenuController.GetTargetConfig(e)),
				(a = a.MenuDataOptionsValueList[t]),
				(t = n.GetCurrentQualityInfo()).SetNvidiaReflex(a),
				t.ApplyNvidiaReflex(),
				n.SaveCurrentQualityInfoToQualityData())
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Menu",
					8,
					"[SetNvidiaReflex]对应硬件可能不支持或不属于当前平台",
					["functionId", e],
				);
	}
	static SetFsrEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetFsrEnable(e),
			n.ApplyFsrEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetXessEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetXessEnable(e),
			n.ApplyXessEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetXessQuality(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetXessQuality(e),
			n.ApplyXessQuality(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMetalFxEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMetalFxEnable(e),
			n.ApplyMetalFxEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetIrxEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetIrxEnable(e),
			n.ApplyIrxEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetBloomEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetBloomEnable(e),
			n.ApplyBloomEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetAudioVolume(e) {
		var t = MenuController_1.MenuController.GetTargetConfig(e);
		UE.AkGameplayStatics.SetRTPCValue(
			void 0,
			t,
			0,
			void 0,
			FUNCTIONID_2_VOUMETAG.get(e),
		);
	}
	static SetHorizontalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetHorizontalViewSensitivity(e),
			n.ApplyHorizontalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetVerticalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetVerticalViewSensitivity(e),
			n.ApplyVerticalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetAimHorizontalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetAimHorizontalViewSensitivity(e),
			n.ApplyAimHorizontalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetAimVerticalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetAimVerticalViewSensitivity(e),
			n.ApplyAimVerticalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetCameraShakeStrength(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetCameraShakeStrength(e),
			n.ApplyCameraShakeStrength(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileHorizontalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileHorizontalViewSensitivity(e),
			n.ApplyMobileHorizontalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileVerticalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileVerticalViewSensitivity(e),
			n.ApplyMobileVerticalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileAimHorizontalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileAimHorizontalViewSensitivity(e),
			n.ApplyMobileAimHorizontalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileAimVerticalViewSensitivity(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileAimVerticalViewSensitivity(e),
			n.ApplyMobileAimVerticalViewSensitivity(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetMobileCameraShakeStrength(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetMobileCameraShakeStrength(e),
			n.ApplyMobileCameraShakeStrength(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetCommonSpringArmLength(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetCommonSpringArmLength(e),
			n.ApplyCommonSprintArmLength(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetFightSpringArmLength(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetFightSpringArmLength(e),
			n.ApplyFightSpringArmLength(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetResetFocusEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetResetFocusEnable(e),
			n.ApplyResetFocusEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetIsSidestepCameraEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetIsSidestepCameraEnable(e),
			n.ApplyIsSidestepCameraEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetIsSoftLockCameraEnable(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetIsSoftLockCameraEnable(e),
			n.ApplyIsSoftLockCameraEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetJoystickShakeStrength(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetJoystickShakeStrength(e),
			n.ApplyJoystickShake(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetJoystickShakeType(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetJoystickShakeType(e),
			n.ApplyJoystickShake(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetWalkOrRunRate(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				t.GetCurrentQualityInfo());
		n.SetWalkOrRunRate(e),
			n.ApplyWalkOrRunRate(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetJoystickMode(e) {
		e = MenuController_1.MenuController.GetTargetConfig(e);
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = t.GetCurrentQualityInfo();
		n.SetJoystickMode(e),
			n.ApplyJoystickMode(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetSkillButtonMode(e) {
		e = MenuController_1.MenuController.GetTargetConfig(e);
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = t.GetCurrentQualityInfo();
		n.SetAutoSwitchSkillButtonMode(e),
			n.ApplyAutoSwitchSkillButtonMode(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetPushEnableState(e) {
		0 === MenuController_1.MenuController.GetTargetConfig(e)
			? KuroPushController_1.KuroPushController.TurnOffPush()
			: KuroPushController_1.KuroPushController.TurnOnPush();
	}
	static SetAimAssistEnable(e) {
		e = MenuController_1.MenuController.GetTargetConfig(e);
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = t.GetCurrentQualityInfo();
		n.SetAimAssistEnable(e),
			n.ApplyAimAssistEnable(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetHorizontalViewRevert(e) {
		e = MenuController_1.MenuController.GetTargetConfig(e);
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = t.GetCurrentQualityInfo();
		n.SetHorizontalViewRevert(e),
			n.ApplyHorizontalViewRevert(),
			t.SaveCurrentQualityInfoToQualityData();
	}
	static SetVerticalViewRevert(e) {
		e = MenuController_1.MenuController.GetTargetConfig(e);
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = t.GetCurrentQualityInfo();
		n.SetVerticalViewRevert(e),
			n.ApplyVerticalViewRevert(),
			t.SaveCurrentQualityInfoToQualityData();
	}
}
exports.MenuFunction = MenuFunction;
class MenuNoticeFunction {
	static ImageQuality(e) {
		var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = MenuController_1.MenuController.GetTargetMenuData(e),
			a =
				((e = MenuController_1.MenuController.GetTargetConfig(e)),
				(n = n.MenuDataOptionsValueList[e]),
				t.GetQualityInfoByType(n));
		for (const e in MenuDefine_1.EImageConfig) {
			var i = Number(e);
			if (!isNaN(i))
				switch (i) {
					case MenuDefine_1.EImageConfig.HIGHESTFPS:
						var r = t.GetFrameIndexByList(a.GetFrameRate());
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.HIGHESTFPS,
							r,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.HIGHESTFPS,
								r,
							);
						break;
					case MenuDefine_1.EImageConfig.SHADOWQUALITY:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.SHADOWQUALITY,
							a.ShadowQuality,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.SHADOWQUALITY,
								a.ShadowQuality,
							);
						break;
					case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.NIAGARAQUALITY,
							a.NiagaraQuality,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.NIAGARAQUALITY,
								a.NiagaraQuality,
							);
						break;
					case MenuDefine_1.EImageConfig.IMAGEDETAIL:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.IMAGEDETAIL,
							a.ImageDetail,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.IMAGEDETAIL,
								a.ImageDetail,
							);
						break;
					case MenuDefine_1.EImageConfig.ANTIALISING:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.ANTIALISING,
							a.AntiAliasing,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.ANTIALISING,
								a.AntiAliasing,
							);
						break;
					case MenuDefine_1.EImageConfig.SCENEAO:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.SCENEAO,
							a.SceneAo,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.SCENEAO,
								a.SceneAo,
							);
						break;
					case MenuDefine_1.EImageConfig.VOLUMEFOG:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.VOLUMEFOG,
							a.VolumeFog,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.VOLUMEFOG,
								a.VolumeFog,
							);
						break;
					case MenuDefine_1.EImageConfig.VOLUMELIGHT:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.VOLUMELIGHT,
							a.VolumeLight,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.VOLUMELIGHT,
								a.VolumeLight,
							);
						break;
					case MenuDefine_1.EImageConfig.MOTIONBLUR:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.MOTIONBLUR,
							a.MotionBlur,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.MOTIONBLUR,
								a.MotionBlur,
							);
						break;
					case MenuDefine_1.EImageConfig.PCVSYNC:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.PCVSYNC,
							a.PcVsync,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.PCVSYNC,
								a.PcVsync,
							);
						break;
					case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.MOBILERESOLUTION,
							a.MobileResolution,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.MOBILERESOLUTION,
								a.MobileResolution,
							);
						break;
					case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.SUPERRESOLUTION,
							a.SuperResolution,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.SUPERRESOLUTION,
								a.SuperResolution,
							);
						break;
					case MenuDefine_1.EImageConfig.RESOLUTION:
						(r = MenuController_1.MenuController.GetTargetConfig(
							MenuDefine_1.EImageConfig.RESOLUTION,
						)),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ChangeConfigValue,
								MenuDefine_1.EImageConfig.RESOLUTION,
								r,
							),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.RESOLUTION,
								r,
							);
						break;
					case MenuDefine_1.EImageConfig.BLOOM:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.BLOOM,
							a.BloomEnable,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.BLOOM,
								a.BloomEnable,
							);
						break;
					case MenuDefine_1.EImageConfig.NPCDENSITY:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeConfigValue,
							MenuDefine_1.EImageConfig.NPCDENSITY,
							a.NpcDensity,
						),
							MenuController_1.MenuController.ApplyTargetConfig(
								MenuDefine_1.EImageConfig.NPCDENSITY,
								a.NpcDensity,
							);
				}
		}
		MenuController_1.MenuController.SaveLocalConfig();
	}
}
exports.MenuNoticeFunction = MenuNoticeFunction;
