"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Info = void 0);
const UE = require("ue"),
	InfoDefine_1 = require("./InfoDefine"),
	Log_1 = require("./Log");
class Info {
	static get GameInstance() {
		return this.f8;
	}
	static get World() {
		return this.f8 ? this.f8.GetWorld() : void 0;
	}
	static Initialize(t) {
		(this.f8 = t),
			(this.Environment = 1),
			(this.p8 = UE.KuroStaticLibrary.IsEditor(t)),
			(this.v8 = UE.KuroStaticLibrary.IsBuildShipping()),
			(this.M8 = UE.KuroStaticLibrary.IsBuildTest()),
			(this.E8 = !this.v8 && !this.M8),
			(this.S8 =
				this.p8 &&
				0 <
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
						"r.Kuro.Movie.EnableCGMovieRendering",
					)),
			this.y8(),
			this.uXi();
	}
	static get IsPlayInEditor() {
		return this.p8;
	}
	static get IsBuildShipping() {
		return this.v8;
	}
	static get IsBuildTest() {
		return this.M8;
	}
	static get IsBuildDevelopmentOrDebug() {
		return this.E8;
	}
	static IsGameRunning() {
		return 1 === this.Environment;
	}
	static IsInCg() {
		return this.S8;
	}
	static get PlatformType() {
		return this.sXi;
	}
	static get InputControllerType() {
		return this.ega;
	}
	static get InputControllerMainType() {
		return this.tga;
	}
	static get OperationType() {
		return this.aXi;
	}
	static y8() {
		switch (UE.GameplayStatics.GetPlatformName()) {
			case "IOS":
				this.sXi = 1;
				break;
			case "Android":
				this.sXi = 2;
				break;
			case "Windows":
				this.sXi = 3;
				break;
			case "Mac":
				this.sXi = 4;
				break;
			case "Linux":
				this.sXi = 5;
				break;
			case "XboxOne":
				this.sXi = 6;
				break;
			case "PS4":
				this.sXi = 7;
				break;
			case "PS5":
				this.sXi = 8;
				break;
			default:
				this.sXi = 0;
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Platform", 25, "初始化平台类型", [
				"PlatformType",
				this.sXi,
			]);
		var t = InfoDefine_1.defaultPlatformAndInputControllerMap.get(this.sXi);
		void 0 !== t
			? this.SwitchInputControllerType(t, "InitializePlatformType")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Platform", 11, "找不到平台默认对应的输入类型", [
					"PlatformType",
					this.sXi,
				]);
	}
	static uXi() {
		(this.lXi =
			UE.KismetSystemLibrary.GetCommandLine()?.includes("-CloudGame") ?? !1),
			this.lXi &&
				(this.SwitchInputControllerType(5, "InitCloudGame"),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Platform", 17, "初始化云游戏");
	}
	static cXi(t, i) {
		var s;
		this.ega !== t &&
			(1 === t &&
				5 === this.ega &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Platform",
					8,
					"[PlatformDebug]从Touch输入方式切换成了键鼠的输入方式",
					["lastInputController", this.ega],
					["inputController", t],
				),
			(s = this.ega),
			(this.ega = t),
			this.oga(),
			Info.CMa?.(s, this.ega),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Platform",
				17,
				"设置输入方式",
				["lastInputController", s],
				["InputController", this.ega],
				["Reason", i],
			);
	}
	static nga(t) {
		var i,
			t = InfoDefine_1.showTypeAndInputControllerMap[t];
		t !== this.aXi && ((i = this.aXi), (this.aXi = t), Info.gMa?.(i, t));
	}
	static oga() {
		var t,
			i = InfoDefine_1.inputControllerMainTypeMap[this.ega];
		i !== this.tga && ((t = this.tga), (this.tga = i), Info.fMa?.(t, i));
	}
	static IsPcOrGamepadPlatform() {
		return this.IsPcPlatform() || this.IsGamepadPlatform();
	}
	static IsPcPlatform() {
		return 3 === this.sXi || 4 === this.sXi || 5 === this.sXi;
	}
	static IsMobilePlatform() {
		return 1 === this.sXi || 2 === this.sXi;
	}
	static IsGamepadPlatform() {
		return 6 === this.sXi || 7 === this.sXi || 8 === this.sXi;
	}
	static IsPs5Platform() {
		return 8 === this.sXi;
	}
	static IsInKeyBoard() {
		return 0 === this.InputControllerMainType;
	}
	static IsInTouch() {
		return 2 === this.InputControllerMainType;
	}
	static IsInGamepad() {
		return 1 === this.InputControllerMainType;
	}
	static IsXboxGamepad() {
		return this.IsInGamepad() && 2 === this.InputControllerType;
	}
	static IsPsGamepad() {
		return (
			this.IsInGamepad() &&
			(3 === this.InputControllerType || 4 === this.InputControllerType)
		);
	}
	static SwitchInputControllerType(t, i) {
		this.IsGmLockGamepad || (this.cXi(t, i), this.nga(t));
	}
	static SetInputTypeChangeFunc(t) {
		Info.CMa = t;
	}
	static ClearInputTypeChangeFunc() {
		Info.CMa = void 0;
	}
	static SetShowTypeChangeFunc(t) {
		Info.gMa = t;
	}
	static ClearShowTypeChangeFunc() {
		Info.gMa = void 0;
	}
	static SetInputMainTypeChangeFunc(t) {
		Info.fMa = t;
	}
	static ClearInputMainTypeChangeFunc() {
		Info.fMa = void 0;
	}
}
((exports.Info = Info).Version = "1.0.0"),
	(Info.Environment = 0),
	(Info.EnableForceTick = !1),
	(Info.p8 = !0),
	(Info.v8 = !0),
	(Info.M8 = !1),
	(Info.E8 = !1),
	(Info.S8 = !1),
	(Info.UseFastInputCallback = !0),
	(Info.AxisInputOptimize = !1),
	(Info.sXi = 0),
	(Info.ega = void 0),
	(Info.tga = void 0),
	(Info.aXi = 0),
	(Info.IsGmLockGamepad = !1),
	(Info.lXi = !1),
	(Info.CMa = void 0),
	(Info.gMa = void 0),
	(Info.fMa = void 0);
//# sourceMappingURL=Info.js.map
