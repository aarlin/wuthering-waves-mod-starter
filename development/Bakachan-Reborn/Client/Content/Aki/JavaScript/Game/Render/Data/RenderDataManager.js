"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderDataManager = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RenderConfig_1 = require("../Config/RenderConfig"),
	RenderModuleConfig_1 = require("../Manager/RenderModuleConfig");
class RenderDataManager {
	constructor() {
		(this.Valid = !1),
			(this.GlobalShaderParameters = void 0),
			(this.SceneInteractionMaterialParameterCollection = void 0),
			(this.UiShowBrightnessMaterialParameterCollection = void 0),
			(this.EyesParameterMaterialParameterCollection = void 0),
			(this.GlobalLensFlareConfig = void 0),
			(this.GlobalDecalShadowConfig = void 0),
			(this.PreviousCharacterPosition = void 0),
			(this.CurrentCharacterPosition = void 0),
			(this.CurrentCharacterForward = void 0),
			(this.CurrentCameraPosition = void 0),
			(this.CurrentCameraForward = void 0),
			(this.SceneTime = -0),
			(this.TempColor = void 0),
			(this.WriteTimeToCollection = !1),
			(this.IsInUiScene = !1),
			(this.Jhr = 60),
			(this.zhr = 1),
			(this.Zhr = 0);
	}
	static Get() {
		return (
			this.Instance ||
				((this.Instance = new RenderDataManager()), this.Instance.Init()),
			this.Instance
		);
	}
	Init() {
		(this.Valid = !1),
			this.LoadAssets(),
			(this.PreviousCharacterPosition = Vector_1.Vector.Create()),
			(this.CurrentCharacterPosition = Vector_1.Vector.Create()),
			(this.CurrentCharacterForward = Vector_1.Vector.Create()),
			(this.CurrentCameraPosition = Vector_1.Vector.Create()),
			(this.CurrentCameraForward = Vector_1.Vector.Create()),
			(this.TempColor = new UE.LinearColor()),
			(this.WriteTimeToCollection = !0);
	}
	GetRainIntensity() {
		return GlobalData_1.GlobalData.World && this.GlobalShaderParameters
			? UE.KismetMaterialLibrary.GetScalarParameterValue(
					GlobalData_1.GlobalData.World,
					this.GlobalShaderParameters,
					RenderConfig_1.RenderConfig.GlobalRainIntensity,
				)
			: 0;
	}
	GetSnowIntensity() {
		return GlobalData_1.GlobalData.World && this.GlobalShaderParameters
			? UE.KismetMaterialLibrary.GetScalarParameterValue(
					GlobalData_1.GlobalData.World,
					this.GlobalShaderParameters,
					RenderConfig_1.RenderConfig.GlobalSnowIntensity,
				)
			: 0;
	}
	SetGrassAo(e) {
		GlobalData_1.GlobalData.World &&
			this.GlobalShaderParameters &&
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				GlobalData_1.GlobalData.World,
				this.GlobalShaderParameters,
				RenderConfig_1.RenderConfig.GlobalGrassAO,
				e,
			);
	}
	GetMainLightVector(e = void 0) {
		if ((e = e || GlobalData_1.GlobalData.World) && this.GlobalShaderParameters)
			return (
				(e = UE.KismetMaterialLibrary.GetVectorParameterValue(
					e,
					this.GlobalShaderParameters,
					RenderConfig_1.RenderConfig.GlobalMainLightVector,
				)),
				Vector_1.Vector.Create(e.R, e.G, e.B)
			);
	}
	GetGlobalLensFlareConfig() {
		return this.Valid ? this.GlobalLensFlareConfig : void 0;
	}
	GetGlobalDecalShadowConfig() {
		return this.Valid ? this.GlobalDecalShadowConfig : void 0;
	}
	GetCurrentCharacterPosition() {
		return this.CurrentCharacterPosition;
	}
	GetPreviousCharacterPosition() {
		return this.PreviousCharacterPosition;
	}
	GetCurrentCharacterForward() {
		return this.CurrentCharacterForward;
	}
	GetCurrentCameraPosition() {
		return this.CurrentCameraPosition;
	}
	GetCurrentCameraForward() {
		return this.CurrentCameraForward;
	}
	GetGlobalShaderParameters() {
		return this.GlobalShaderParameters;
	}
	GetSceneInteractionMaterialParameterCollection() {
		return this.SceneInteractionMaterialParameterCollection;
	}
	GetUiShowBrightnessMaterialParameterCollection() {
		return this.UiShowBrightnessMaterialParameterCollection;
	}
	GetEyesParameterMaterialParameterCollection() {
		return this.EyesParameterMaterialParameterCollection;
	}
	GetSceneTime() {
		return this.SceneTime;
	}
	SetWriteTime(e) {
		this.WriteTimeToCollection = e;
	}
	TickForce(e) {
		var r, a, t;
		this.Valid &&
			((r = GlobalData_1.GlobalData.World),
			(t = Global_1.Global.CharacterCameraManager)) &&
			t.IsValid() &&
			((a = t.K2_GetActorLocation()),
			(t = t.GetActorForwardVector()),
			this.CurrentCameraPosition.FromUeVector(a),
			this.CurrentCameraForward.FromUeVector(t),
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				r,
				this.GlobalShaderParameters,
				RenderConfig_1.RenderConfig.GlobalCameraPosAndRadius,
				new UE.LinearColor(a.X, a.Y, a.Z, 0),
			),
			(t =
				Info_1.Info.IsGameRunning() &&
				(GlobalData_1.GlobalData.IsUiSceneOpen ||
					GlobalData_1.GlobalData.IsUiSceneLoading)) !== this.IsInUiScene) &&
			((this.IsInUiScene = t), this.WRn());
	}
	Tick(e) {
		var r, a, t;
		this.Valid &&
			((e *= TimeUtil_1.TimeUtil.Millisecond),
			(r = GlobalData_1.GlobalData.World),
			(a = Global_1.Global.PawnOrSpectator)) &&
			a.IsValid() &&
			((t = a.K2_GetActorLocation()),
			(a = a.GetActorForwardVector()),
			(this.PreviousCharacterPosition = this.CurrentCharacterPosition),
			this.CurrentCharacterPosition.FromUeVector(t),
			this.CurrentCharacterForward.FromUeVector(a),
			this.elr(this.PreviousCharacterPosition),
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				r,
				this.GlobalShaderParameters,
				RenderConfig_1.RenderConfig.GlobalCharacterPreviousWP,
				this.TempColor,
			),
			this.elr(this.CurrentCharacterPosition),
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				r,
				this.GlobalShaderParameters,
				RenderConfig_1.RenderConfig.GlobalCharacterWorldPosition,
				this.TempColor,
			),
			this.elr(this.CurrentCharacterForward),
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				r,
				this.GlobalShaderParameters,
				RenderConfig_1.RenderConfig.GlobalCharacterWorldForwardDirection,
				this.TempColor,
			),
			ModelManager_1.ModelManager.GameModeModel.InstanceType ===
				Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance &&
				(this.SceneTime =
					ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute),
			this.WriteTimeToCollection &&
				((t = Math.floor(this.SceneTime / this.Jhr)),
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					r,
					this.GlobalShaderParameters,
					RenderConfig_1.RenderConfig.GlobalTimeHour,
					t,
				),
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					r,
					this.GlobalShaderParameters,
					RenderConfig_1.RenderConfig.GlobalTimeMinutes,
					this.SceneTime - t * this.Jhr,
				)),
			this.SetAudioParameters(e));
	}
	LoadAssets() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			"/Game/Aki/Render/Data/DA_GlobalRenderDataReference.DA_GlobalRenderDataReference",
			UE.PDA_GlobalRenderDataReference_C,
			(e) => {
				ObjectUtils_1.ObjectUtils.IsValid(e)
					? ((this.Valid = !0),
						(this.GlobalShaderParameters = e.GlobalShaderParameters),
						ObjectUtils_1.ObjectUtils.IsValid(this.GlobalShaderParameters) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 33, "缺失全局材质参数文件")),
						(this.SceneInteractionMaterialParameterCollection =
							e.SceneInteractionShaderParameters),
						ObjectUtils_1.ObjectUtils.IsValid(
							this.SceneInteractionMaterialParameterCollection,
						) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 33, "缺失交互物着色器参数文件")),
						(this.GlobalLensFlareConfig = e.GlobalLensFlareConfig),
						ObjectUtils_1.ObjectUtils.IsValid(this.GlobalLensFlareConfig) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 33, "缺失LensFlare配置文件")),
						(this.UiShowBrightnessMaterialParameterCollection =
							e.MPC_ShowBrightness),
						ObjectUtils_1.ObjectUtils.IsValid(
							this.UiShowBrightnessMaterialParameterCollection,
						) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 33, "缺失UI_ShowBrightness配置文件")),
						(this.GlobalDecalShadowConfig = e.DefaultDecalShadow),
						ObjectUtils_1.ObjectUtils.IsValid(this.GlobalDecalShadowConfig) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 26, "缺失DecalShadow配置文件")),
						(this.EyesParameterMaterialParameterCollection = e.EyesParameters),
						ObjectUtils_1.ObjectUtils.IsValid(
							this.EyesParameterMaterialParameterCollection,
						) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 26, "缺失EyesParameters配置文件")))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Render", 26, "RenderDataManager缺失全局配置文件");
			},
		);
	}
	Destroy() {}
	SetAudioParameters(e) {
		var r;
		(this.Zhr -= e),
			0 < this.Zhr ||
				((this.Zhr = this.zhr),
				(e = this.GetRainIntensity()),
				(r = this.GetSnowIntensity()),
				AudioController_1.AudioController.SetRTPCValue(
					e / 5,
					AudioDefine_1.RTPCRAININTENSITY,
				),
				AudioController_1.AudioController.SetRTPCValue(
					r / 5,
					AudioDefine_1.RTPCSNOWINTENSITY,
				),
				AudioController_1.AudioController.SetRTPCValue(
					Math.max(e, r) / 5,
					AudioDefine_1.RTPCGLOBALWET,
				));
	}
	elr(e) {
		(this.TempColor.R = e.X),
			(this.TempColor.G = e.Y),
			(this.TempColor.B = e.Z);
	}
	WRn() {
		UE.KuroRenderingRuntimeBPPluginBPLibrary.SetClusteredStuffVisible(
			GlobalData_1.GlobalData.World,
			!this.IsInUiScene,
		);
	}
}
(exports.RenderDataManager = RenderDataManager).Instance = void 0;
