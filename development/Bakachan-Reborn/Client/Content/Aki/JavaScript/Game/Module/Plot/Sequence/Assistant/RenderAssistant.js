"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderAssistant = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	GameQualitySettingsManager_1 = require("../../../../GameQualitySettings/GameQualitySettingsManager"),
	GlobalData_1 = require("../../../../GlobalData"),
	RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager"),
	RenderUtil_1 = require("../../../../Render/Utils/RenderUtil"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class RenderAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments),
			(this.Cto = !1),
			(this.gto = !1),
			(this.fto = new UE.FName("LightDisableSwitch")),
			(this.pto = 0);
	}
	PreAllPlay() {
		(this.pto = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
			"r.Mobile.EnableKuroSpotlightsShadow",
		)),
			RenderUtil_1.RenderUtil.CloseToonSceneShadow(),
			RenderUtil_1.RenderUtil.OpenMobileSpotLightShadow(),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.SetSequenceFrameRateLimit(),
			GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() &&
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.Kuro.AutoExposure 0",
				),
			0 === this.Model.GetType() &&
				((this.Model.PreviousMotionBlur =
					UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
						"r.MotionBlur.Amount",
					)),
				0 !== this.Model.PreviousMotionBlur) &&
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlur.Amount 0",
				),
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				GlobalData_1.GlobalData.World,
				RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(),
				this.fto,
				0,
			),
			(this.gto = !0);
	}
	PreEachPlay() {
		var e = this.Model.GetCurrentSequence();
		UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "关闭纹理流送", ["Seq", e.GetName()]),
			(this.Cto = !0);
	}
	EachStop() {
		var e = this.Model.GetCurrentSequence();
		UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !1),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "开启纹理流送", ["Seq", e.GetName()]),
			(this.Cto = !1);
	}
	AllStop() {
		RenderUtil_1.RenderUtil.OpenToonSceneShadow(),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Mobile.EnableKuroSpotlightsShadow " + this.pto,
			),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.CancleSequenceFrameRateLimit(),
			GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() &&
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.Kuro.AutoExposure 1",
				),
			0 === this.Model.GetType() &&
				0 !== this.Model.PreviousMotionBlur &&
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlur.Amount " + this.Model.PreviousMotionBlur,
				),
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				GlobalData_1.GlobalData.World,
				RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(),
				this.fto,
				1,
			),
			this.ReleaseSeqStreamingData(),
			(this.gto = !1);
	}
	End() {
		this.Cto && this.EachStop(), this.gto && this.AllStop();
	}
	CheckSeqStreamingData() {
		let e = !0;
		var t = this.Model.SequenceData;
		for (let o = 0; o < t.剧情资源.Num(); o++) {
			var a = t.剧情资源.Get(o);
			UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(a, !0) ||
				(e = !1);
		}
		return (
			this.Model.SequenceData.NeedSwitchMainCharacter &&
				this.Model.MainSeqCharacterMesh &&
				(UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
					this.Model.MainSeqCharacterMesh,
				) ||
					(e = !1)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "检查手动流送", ["是否流送完成", e]),
			e
		);
	}
	ReleaseSeqStreamingData() {
		if (this.Cto) {
			var e = this.Model.SequenceData;
			for (let a = 0; a < e.剧情资源.Num(); a++) {
				var t = e.剧情资源.Get(a);
				UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(t, !1);
			}
			this.Model.SequenceData.NeedSwitchMainCharacter &&
				this.Model.MainSeqCharacterMesh &&
				UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
					this.Model.MainSeqCharacterMesh,
					!1,
				),
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "关闭手动流送");
		}
	}
	SetMotionBlurState(e) {
		e
			? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "打开动态模糊"),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlurQuality 4",
				))
			: (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "关闭动态模糊"),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"r.MotionBlurQuality 0",
				));
	}
}
exports.RenderAssistant = RenderAssistant;
