"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	InputSettings_1 = require("../../InputSettings/InputSettings"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	AdviceController_1 = require("../Advice/AdviceController"),
	CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	MenuDefine_1 = require("./MenuDefine"),
	MenuFunction_1 = require("./MenuFunction");
class MenuController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			MenuController.r2e(),
			MenuController.RefreshCurrentSetting(),
			MenuController.AutoDoConfigFunction(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Menu", 8, "设置系统Controller初始化"),
			!0
		);
	}
	static RefreshCurrentSetting() {
		MenuController.JPi();
	}
	static JPi() {
		if (ModelManager_1.ModelManager.MenuModel) {
			var e,
				n = UE.GameUserSettings.GetGameUserSettings().GetFullscreenMode();
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Menu", 8, "刷新当前全屏模式", ["fullscreenMode", n]),
				0 <= UE.KismetSystemLibrary.GetCommandLine().search("-windowed"))
			)
				(e =
					GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
						MenuDefine_1.WINDOWS_RESOLUTION_INDEX,
					)),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Menu",
							8,
							"刷新当前全屏模式-使用-windowed参数启动，将全屏模式设为窗口，并且设置分辨率",
							["fullscreenMode", n],
							["resolution", e],
						),
					this.yOn(5, 1),
					this.yOn(6, MenuDefine_1.WINDOWS_RESOLUTION_INDEX);
			else {
				var t = this.GetTargetMenuData(5);
				if (t)
					switch (n) {
						case 0:
						case 1:
							this.TOn(t, 0), this.DOn(t, 0);
							break;
						case 2:
							this.TOn(t, 1), this.DOn(t, 1);
					}
			}
		}
	}
	static RebuildConfigData() {
		ModelManager_1.ModelManager.MenuModel.CreateConfigByLocalConfig();
	}
	static GetMainTypeList() {
		return ModelManager_1.ModelManager.MenuModel.GetMainTypeList();
	}
	static GetTargetMainInfo(e) {
		return ModelManager_1.ModelManager.MenuModel.GetTargetMainInfo(e);
	}
	static GetTargetBaseConfigData(e) {
		return ModelManager_1.ModelManager.MenuModel.GetTargetConfigData(e);
	}
	static SetTargetConfig(e, n) {
		ModelManager_1.ModelManager.MenuModel.SetTargetConfig(e, n);
	}
	static ApplyTargetConfig(e, n) {
		var t;
		MenuController.CheckIfServerConfig(e)
			? MenuController.DoSetServerConfigFunction(e)
			: (t = this.GetTargetMenuData(e)) &&
				0 !== (e = this.yOn(e, n)) &&
				(2 === e &&
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"SettingSystem1",
					),
				this.IOn(t, n));
	}
	static yOn(e, n) {
		var t, i;
		return (e = this.GetTargetMenuData(e))
			? ((t = this.TOn(e, n)),
				(i = this.LOn(e, n)),
				this.DOn(e, n),
				t || i ? 2 : 1)
			: 0;
	}
	static IOn(e, n) {
		void 0 !== (e = e.ValueTipsMap.get(n)) &&
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				e,
			);
	}
	static GetTargetConfig(e) {
		return this.CheckIfServerConfig(e)
			? this.GetServerConfigValue(e)
			: ModelManager_1.ModelManager.MenuModel.GetTargetConfig(e) ?? 0;
	}
	static SetRestartMap(e, n) {
		ModelManager_1.ModelManager.MenuModel.SetRestartMap(e, n);
	}
	static CheckRestartValueChange(e, n) {
		return ModelManager_1.ModelManager.MenuModel.CheckRestartValueChange(e, n);
	}
	static CheckRestartMap() {
		return ModelManager_1.ModelManager.MenuModel.CheckRestartMap();
	}
	static SaveLocalConfig() {
		ModelManager_1.ModelManager.MenuModel.SaveLocalConfig();
	}
	static ClearRestartMap() {
		ModelManager_1.ModelManager.MenuModel.ClearRestartMap();
	}
	static GetTargetMenuData(e) {
		return ModelManager_1.ModelManager.MenuModel.GetTargetMenuData(e);
	}
	static GetServerConfigValue(e) {
		return 59 !== e ||
			ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()
			? 0
			: 1;
	}
	static CheckIfServerConfig(e) {
		return 59 === e;
	}
	static zPi() {
		var e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get(),
			n = this.GetTargetConfig(6);
		return e.GetResolutionByList(n).ToString();
	}
	static ReportSettingMenuLogEvent() {
		var e = new LogReportDefine_1.SettingMenuLogEvent();
		(e.i_image_quality = this.GetTargetConfig(10)),
			(e.i_display_mode = this.GetTargetConfig(5)),
			(e.s_resolution = this.zPi()),
			(e.i_brightness = this.GetTargetConfig(7)),
			(e.i_highest_fps = this.GetTargetConfig(11)),
			(e.i_shadow_quality = this.GetTargetConfig(54)),
			(e.i_niagara_quality = this.GetTargetConfig(55)),
			(e.i_fsr = this.GetTargetConfig(87)),
			(e.i_image_detail = this.GetTargetConfig(56)),
			(e.i_scene_ao = this.GetTargetConfig(58)),
			(e.i_volume_Fog = this.GetTargetConfig(63)),
			(e.i_volume_light = this.GetTargetConfig(64)),
			(e.i_motion_blur = this.GetTargetConfig(65)),
			(e.i_anti_aliasing = this.GetTargetConfig(57)),
			(e.i_pcv_sync = this.GetTargetConfig(66)),
			(e.i_horizontal_view_sensitivity = this.GetTargetConfig(89)),
			(e.i_vertical_view_sensitivity = this.GetTargetConfig(90)),
			(e.i_aim_horizontal_view_sensitivity = this.GetTargetConfig(91)),
			(e.i_aim_vertical_view_sensitivity = this.GetTargetConfig(92)),
			(e.f_camera_shake_strength = this.GetTargetConfig(93)),
			(e.i_common_spring_arm_length = this.GetTargetConfig(99)),
			(e.i_fight_spring_arm_length = this.GetTargetConfig(100)),
			(e.i_reset_focus_enable = this.GetTargetConfig(101)),
			(e.i_side_step_camera_enable = this.GetTargetConfig(102)),
			(e.i_soft_lock_camera_enable = this.GetTargetConfig(103)),
			(e.i_joystick_shake_strength = this.GetTargetConfig(104)),
			(e.i_joystick_shake_type = this.GetTargetConfig(105)),
			(e.f_walk_or_run_rate = this.GetTargetConfig(106)),
			(e.i_advice_setting = this.GetTargetConfig(59)),
			LogReportController_1.LogReportController.LogReport(e);
	}
	static DoSetServerConfigFunction(e) {
		59 === e &&
			((e = !ModelManager_1.ModelManager.AdviceModel.GetAdviceShowSetting()),
			AdviceController_1.AdviceController.RequestSetAdviceShowState(e));
	}
	static DoConfigFunction(e) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 69:
			case 70:
				MenuFunction_1.MenuFunction.SetAudioVolume(e);
				break;
			case 10:
				MenuFunction_1.MenuFunction.SetImageQuality(e);
				break;
			case 11:
				MenuFunction_1.MenuFunction.SetHighFps(e);
				break;
			case 54:
				MenuFunction_1.MenuFunction.SetShadowQuality(e);
				break;
			case 55:
				MenuFunction_1.MenuFunction.SetNiagaraQuality(e);
				break;
			case 56:
				MenuFunction_1.MenuFunction.SetImageDetail(e);
				break;
			case 57:
				MenuFunction_1.MenuFunction.SetAntiAliasing(e);
				break;
			case 58:
				MenuFunction_1.MenuFunction.SetSceneAo(e);
				break;
			case 63:
				MenuFunction_1.MenuFunction.SetVolumeFog(e);
				break;
			case 64:
				MenuFunction_1.MenuFunction.SetVolumeLight(e);
				break;
			case 65:
				MenuFunction_1.MenuFunction.SetMotionBlur(e);
				break;
			case 66:
				MenuFunction_1.MenuFunction.SetPcVsync(e);
				break;
			case 67:
				MenuFunction_1.MenuFunction.SetMobileResolution(e);
				break;
			case 68:
				MenuFunction_1.MenuFunction.SetSuperResolution(e);
				break;
			case 51:
				MenuFunction_1.MenuFunction.SetTextLanguage(e);
				break;
			case 52:
				MenuFunction_1.MenuFunction.SetLanguageAudio(e);
				break;
			case 5:
				MenuFunction_1.MenuFunction.SetDisplayMode(e);
				break;
			case 7:
				MenuFunction_1.MenuFunction.SetBrightness(e);
				break;
			case 6:
				MenuFunction_1.MenuFunction.SetResolution(e);
				break;
			case 79:
				MenuFunction_1.MenuFunction.SetNpcDensity(e);
				break;
			case 81:
				MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingEnable(e);
				break;
			case 82:
				MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingFrameGenerate(e);
				break;
			case 83:
				MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingMode(e);
				break;
			case 84:
				MenuFunction_1.MenuFunction.SetNvidiaSuperSamplingSharpness(e);
				break;
			case 85:
				MenuFunction_1.MenuFunction.SetNvidiaReflex(e);
				break;
			case 87:
				MenuFunction_1.MenuFunction.SetFsrEnable(e);
				break;
			case 125:
				MenuFunction_1.MenuFunction.SetXessEnable(e);
				break;
			case 126:
				MenuFunction_1.MenuFunction.SetXessQuality(e);
				break;
			case 127:
				MenuFunction_1.MenuFunction.SetMetalFxEnable(e);
				break;
			case 128:
				MenuFunction_1.MenuFunction.SetIrxEnable(e);
				break;
			case 132:
				MenuFunction_1.MenuFunction.SetBloomEnable(e);
				break;
			case 89:
				MenuFunction_1.MenuFunction.SetHorizontalViewSensitivity(e);
				break;
			case 90:
				MenuFunction_1.MenuFunction.SetVerticalViewSensitivity(e);
				break;
			case 91:
				MenuFunction_1.MenuFunction.SetAimHorizontalViewSensitivity(e);
				break;
			case 92:
				MenuFunction_1.MenuFunction.SetAimVerticalViewSensitivity(e);
				break;
			case 93:
				MenuFunction_1.MenuFunction.SetCameraShakeStrength(e);
				break;
			case 94:
				MenuFunction_1.MenuFunction.SetMobileHorizontalViewSensitivity(e);
				break;
			case 95:
				MenuFunction_1.MenuFunction.SetMobileVerticalViewSensitivity(e);
				break;
			case 96:
				MenuFunction_1.MenuFunction.SetMobileAimHorizontalViewSensitivity(e);
				break;
			case 97:
				MenuFunction_1.MenuFunction.SetMobileAimVerticalViewSensitivity(e);
				break;
			case 98:
				MenuFunction_1.MenuFunction.SetMobileCameraShakeStrength(e);
				break;
			case 99:
				MenuFunction_1.MenuFunction.SetCommonSpringArmLength(e);
				break;
			case 100:
				MenuFunction_1.MenuFunction.SetFightSpringArmLength(e);
				break;
			case 101:
				MenuFunction_1.MenuFunction.SetResetFocusEnable(e);
				break;
			case 102:
				MenuFunction_1.MenuFunction.SetIsSidestepCameraEnable(e);
				break;
			case 103:
				MenuFunction_1.MenuFunction.SetIsSoftLockCameraEnable(e);
				break;
			case 104:
				MenuFunction_1.MenuFunction.SetJoystickShakeStrength(e);
				break;
			case 105:
				MenuFunction_1.MenuFunction.SetJoystickShakeType(e);
				break;
			case 106:
				MenuFunction_1.MenuFunction.SetWalkOrRunRate(e);
				break;
			case 108:
				MenuFunction_1.MenuFunction.SetJoystickMode(e);
				break;
			case 109:
				MenuFunction_1.MenuFunction.SetSkillButtonMode(e);
				break;
			case 121:
				MenuFunction_1.MenuFunction.SetPushEnableState(e);
				break;
			case 122:
				MenuFunction_1.MenuFunction.SetAimAssistEnable(e);
				break;
			case 130:
				MenuFunction_1.MenuFunction.SetHorizontalViewRevert(e);
				break;
			case 131:
				MenuFunction_1.MenuFunction.SetVerticalViewRevert(e);
		}
	}
	static AutoDoConfigFunction() {
		var e = ModelManager_1.ModelManager.MenuModel.GetMenuDataKeys();
		if (e)
			for (const n of e)
				switch (n) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 69:
					case 70:
						MenuFunction_1.MenuFunction.SetAudioVolume(n);
				}
	}
	static NoticeChange(e) {
		switch (
			(10 === e && MenuFunction_1.MenuNoticeFunction.ImageQuality(e), e)
		) {
			case MenuDefine_1.EImageConfig.IMAGEQUALITY:
			case MenuDefine_1.EImageConfig.HIGHESTFPS:
			case MenuDefine_1.EImageConfig.SHADOWQUALITY:
			case MenuDefine_1.EImageConfig.NIAGARAQUALITY:
			case MenuDefine_1.EImageConfig.IMAGEDETAIL:
			case MenuDefine_1.EImageConfig.ANTIALISING:
			case MenuDefine_1.EImageConfig.SCENEAO:
			case MenuDefine_1.EImageConfig.VOLUMEFOG:
			case MenuDefine_1.EImageConfig.VOLUMELIGHT:
			case MenuDefine_1.EImageConfig.MOTIONBLUR:
			case MenuDefine_1.EImageConfig.PCVSYNC:
			case MenuDefine_1.EImageConfig.MOBILERESOLUTION:
			case MenuDefine_1.EImageConfig.SUPERRESOLUTION:
			case MenuDefine_1.EImageConfig.RESOLUTION:
			case MenuDefine_1.EImageConfig.DISPLAYMODE:
			case MenuDefine_1.EImageConfig.NPCDENSITY:
			case MenuDefine_1.EImageConfig.NVIDIADLSS:
			case MenuDefine_1.EImageConfig.NVIDIADLSSFG:
			case MenuDefine_1.EImageConfig.NVIDIADLSSMODE:
			case MenuDefine_1.EImageConfig.NVIDIADLSSSHARPNESS:
			case MenuDefine_1.EImageConfig.NVIDIAREFLEX:
			case MenuDefine_1.EImageConfig.FSR:
			case MenuDefine_1.EImageConfig.XESS:
			case MenuDefine_1.EImageConfig.XESS_QUALITY:
			case MenuDefine_1.EImageConfig.METALFX:
			case MenuDefine_1.EImageConfig.IRX:
			case MenuDefine_1.EImageConfig.BLOOM:
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ConfigLoadChange,
					e,
				);
		}
	}
	static LOn(e, n) {
		if (!e) return !1;
		if (!e.CanAffectedFunction(n)) return !1;
		let t = !1;
		var i = e.AffectedFunction;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Menu",
				8,
				"[ApplyAffectedFunction]设置此选项时，影响其他设置项",
				["functionId", e.MenuDataFunctionId],
				["value", n],
				["affectedFunction", i],
			);
		for (const [e, n] of i) {
			var a = this.yOn(e, n);
			0 !== a &&
				(2 === a && (t = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ChangeConfigValue,
					e,
					n,
				));
		}
		return t;
	}
	static TOn(e, n) {
		return (
			(e = e.MenuDataFunctionId),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Menu",
					8,
					"[ApplyCommonFunction]设置选项",
					["functionId", e],
					["value", n],
				),
			MenuDefine_1.needRestart.includes(e)
				? !!MenuController.CheckRestartValueChange(e, n) &&
					(MenuController.SetRestartMap(e, n),
					MenuController.SetTargetConfig(e, n),
					!0)
				: (MenuController.SetTargetConfig(e, n),
					MenuController.DoConfigFunction(e),
					!1)
		);
	}
	static DOn(e, n) {
		if (e && e.HasDisableFunction()) {
			var t = !e.IsAffectedDisable(n),
				i = e.DisableFunction;
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Menu",
					8,
					"[ApplyDisableFunction]设置此选项时，禁用其他设置项",
					["functionId", e.MenuDataFunctionId],
					["value", n],
					["disableFunction", i],
				);
			for (const e of i) {
				var a = this.GetTargetMenuData(e);
				a &&
					((a.IsEnable = t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnMenuDataEnableChanged,
						e,
						t,
					));
			}
		}
	}
	static GetTargetConfigOptionString(e) {
		var n = this.GetTargetConfig(e);
		if ((e = this.GetTargetMenuData(e)))
			return (
				(e = e.MenuDataOptionsNameList[n]),
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)
			);
	}
	static BeforeViewClose() {
		MenuFunction_1.MenuFunction.ApplyNvidiaSuperSamplingMode();
	}
	static GetResolutionList(e) {
		var n = MenuController.ZPi(e),
			t =
				GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList(),
			i = [];
		for (let e = 0; e < t.length; ++e) {
			var a = (a = t[e]).X + "*" + a.Y;
			n.includes(a) && i.push(e);
		}
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Menu",
					8,
					"获得当前设置面板分辨率列表",
					["optionsNameList", e],
					["resultOptionsNameList", n],
					["resolutionList", t],
					["data", i],
				),
			i
		);
	}
	static ZPi(e) {
		var n = [];
		for (const i of e) {
			var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
			n.push(t);
		}
		return n;
	}
	static r2e() {
		this.OpenViewFuncMap.set("LogUploadView", this.exi),
			this.OpenViewFuncMap.set("CdKeyInputView", this.txi);
	}
	static IsInputControllerTypeIncludeKey(e, n) {
		switch (e) {
			case 1:
				return (
					InputSettings_1.InputSettings.IsKeyboardKey(n) ||
					InputSettings_1.InputSettings.IsMouseButton(n)
				);
			case 2:
				return InputSettings_1.InputSettings.IsGamepadKey(n);
			default:
				return !1;
		}
	}
}
((exports.MenuController = MenuController).OpenViewFuncMap = new Map()),
	(MenuController.exi = () => {
		UiManager_1.UiManager.OpenView("LogUploadView", 2);
	}),
	(MenuController.txi = () => {
		CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
	});
