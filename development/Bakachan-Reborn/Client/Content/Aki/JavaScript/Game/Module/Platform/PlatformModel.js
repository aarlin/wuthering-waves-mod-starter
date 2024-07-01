"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformModel = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
	PlatformDefine_1 = require("./PlatformDefine");
class PlatformModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.hQi = 0),
			(this.lQi = 0),
			(this._Qi = 0),
			(this.IsGmLockGamepad = !1),
			(this.uQi = !1);
	}
	get PlatformType() {
		return this.hQi;
	}
	OnInit() {
		return this.RefreshPlatformType(), this.mQi(), !0;
	}
	mQi() {
		(this.uQi =
			UE.KismetSystemLibrary.GetCommandLine()?.includes("-CloudGame") ?? !1),
			this.uQi &&
				(this.SwitchInputControllerType(2), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Platform", 17, "初始化云游戏");
	}
	RefreshPlatformType() {
		let e = 0;
		switch (this.GetPlatformName()) {
			case "IOS":
				e = 1;
				break;
			case "Android":
				e = 2;
				break;
			case "Windows":
				e = 3;
				break;
			case "Mac":
				e = 4;
				break;
			case "Linux":
				e = 5;
				break;
			case "XboxOne":
				e = 6;
				break;
			case "PS4":
				e = 7;
		}
		var t = PlatformDefine_1.inputControllerMap.get(e);
		this.SwitchInputControllerType(t, e);
	}
	SwitchInputControllerType(e, t = void 0) {
		if (!this.IsGmLockGamepad)
			if ((this.dQi(e), t)) this.CQi(t);
			else
				for (var [r, o] of PlatformDefine_1.inputControllerMap)
					if (o === e) {
						this.CQi(r);
						break;
					}
	}
	dQi(e) {
		if (
			(0 === e &&
				2 === this._Qi &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Platform",
					8,
					"[PlatformDebug]从Touch输入方式切换成了键鼠的输入方式",
					["lastInputController", this._Qi],
					["inputController", e],
				),
			this._Qi !== e)
		) {
			var t = this._Qi;
			switch (
				((this._Qi = e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.InputControllerChange,
					t,
					this._Qi,
				),
				e)
			) {
				case 1:
					AudioSystem_1.AudioSystem.SetState(
						"input_controller_type",
						"gamepad",
					);
					break;
				case 0:
					AudioSystem_1.AudioSystem.SetState(
						"input_controller_type",
						"Keyboard",
					);
					break;
				default:
					AudioSystem_1.AudioSystem.SetState("input_controller_type", "touch");
			}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Platform",
					17,
					"设置输入方式",
					["lastInputController", t],
					["InputController", this._Qi],
				);
			let r = 0;
			switch (e) {
				case 0:
					r = 1;
					break;
				case 1:
					r = 2;
					break;
				case 2:
					r = 3;
			}
			(t =
				LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor),
				t?.IsValid() && t.SetCurrentInputKeyType(r);
		}
	}
	CQi(e) {
		var t, r;
		this.PlatformType !== e &&
			((t = this.lQi),
			(r = this.PlatformType),
			(this.hQi = e),
			(this.lQi = PlatformDefine_1.operationMap.get(e)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Platform",
					17,
					"设置平台类型",
					["PlatformType", this.PlatformType],
					["OperationType", this.lQi],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.PlatformType,
				t,
				this.lQi,
				r,
			));
	}
	OnPressAnyKey(e) {
		this.IsMobile() ||
			(UE.KismetInputLibrary.Key_IsGamepadKey(e)
				? this.RefreshPlatformByDevice() || this.SwitchInputControllerType(1, 6)
				: UE.KismetInputLibrary.Key_IsKeyboardKey(e) ||
						UE.KismetInputLibrary.Key_IsMouseButton(e)
					? this.SwitchInputControllerType(0)
					: this.SwitchInputControllerType(2));
	}
	RefreshPlatformByDevice() {
		var e = this.GetCurrentDeviceControllerPlatform();
		return 0 !== e && (this.SwitchInputControllerType(1, e), !0);
	}
	GetCurrentDeviceControllerPlatform() {
		var e = UE.RawInputFunctionLibrary.GetRegisteredDevices();
		if (e)
			for (let r = 0; r < e.Num(); r++) {
				var t = (t = e.Get(r)).VendorID + "_" + t.ProductID;
				if ((t = PlatformDefine_1.deviceIdMap.get(t))) return t;
			}
		return 0;
	}
	IsPc() {
		return (
			3 === this.PlatformType ||
			4 === this.PlatformType ||
			5 === this.PlatformType
		);
	}
	IsMobile() {
		return 1 === this.PlatformType || 2 === this.PlatformType;
	}
	IsGamepad() {
		return 6 === this.PlatformType || 7 === this.PlatformType;
	}
	IsMobileSource() {
		return Info_1.Info.IsMobile();
	}
	get SourcePlatformType() {
		return Info_1.Info.PlatformType;
	}
	get OperationType() {
		return this.lQi;
	}
	get InputController() {
		return this._Qi;
	}
	GetPlatformName() {
		return UE.GameplayStatics.GetPlatformName();
	}
	IsInGamepad() {
		return 1 === this._Qi;
	}
	IsInKeyBoard() {
		return 0 === this._Qi;
	}
	GetNetStatus() {
		return this.IsMobile()
			? UE.MobilePatchingLibrary.HasActiveWiFiConnection()
				? Protocol_1.Aki.Protocol.D2s.Proto_Wifi
				: UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
						NetworkDefine_1.ENetworkType.Cell
					? Protocol_1.Aki.Protocol.D2s.Proto_Stream
					: Protocol_1.Aki.Protocol.D2s.Proto_Other
			: this.IsPc()
				? Protocol_1.Aki.Protocol.D2s.Proto_Wired
				: Protocol_1.Aki.Protocol.D2s.Proto_Other;
	}
	IsKeyFromGamepadKey(e) {
		return (
			!e.KeyName.toString().includes("Android") &&
			UE.KismetInputLibrary.Key_IsGamepadKey(e)
		);
	}
}
exports.PlatformModel = PlatformModel;
