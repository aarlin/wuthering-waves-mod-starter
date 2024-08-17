"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformController = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils");
class PlatformController extends ControllerBase_1.ControllerBase {
	static Init() {
		return this.ControlScreenSaver(!1), this.rQi(), this.nQi(), this.OnInit();
	}
	static OnClear() {
		return this.sQi(), !0;
	}
	static nQi() {
		InputDistributeController_1.InputDistributeController.BindAxis(
			InputMappingsDefine_1.axisMappings.MouseMove,
			this.aQi,
		);
	}
	static sQi() {
		InputDistributeController_1.InputDistributeController.UnBindAxis(
			InputMappingsDefine_1.axisMappings.MouseMove,
			this.aQi,
		);
	}
	static rQi() {
		ModelManager_1.ModelManager.PlatformModel?.RefreshPlatformByDevice();
	}
	static ControlScreenSaver(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Platform", 28, "控制屏幕", ["state", e]),
			UE.KismetSystemLibrary.ControlScreensaver(e);
	}
	static SendClientBasicInfo() {
		var e = new Protocol_1.Aki.Protocol.gWn(),
			t = PlatformController.PackageClientBasicInfo();
		(e.u6n = t),
			Net_1.Net.Call(7034, e, () => {}),
			t &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Platform",
					8,
					"客户端上报一些设备基础信息",
					["CPU", t.C8n],
					["DeviceId", t.g8n],
					["Model", t.f8n],
					["NetStatus", t.p8n],
					["Platform", t.U6n],
				);
	}
	static PackageClientBasicInfo() {
		var e = new Protocol_1.Aki.Protocol.u6n(),
			t =
				((e.p8n = ModelManager_1.ModelManager.PlatformModel.GetNetStatus()),
				(e.U6n = ModelManager_1.ModelManager.PlatformModel.GetPlatformName()),
				ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo());
		(e.C8n = t?.CPUModelName ?? ""),
			(e.g8n = t?.DeviceId ?? ""),
			(e.f8n = t?.ModelName ?? ""),
			(e.v8n = UE.ThinkingAnalytics.GetDeviceId()),
			(e.d5n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
				LanguageSystem_1.LanguageSystem.PackageLanguage,
			).LanguageType),
			(t = UE.KuroStaticLibrary.GetMacAddress());
		return StringUtils_1.StringUtils.IsEmpty(t) || (e.M8n = t), e;
	}
	static IsPc() {
		return ModelManager_1.ModelManager.PlatformModel.IsPc();
	}
	static IsMobile() {
		return ModelManager_1.ModelManager.PlatformModel.IsMobile();
	}
}
(exports.PlatformController = PlatformController).aQi = (e, t) => {
	0 === t ||
		!(t = ModelManager_1.ModelManager.PlatformModel) ||
		t.IsPc() ||
		t.IsMobileSource() ||
		t.SwitchInputControllerType(0);
};
