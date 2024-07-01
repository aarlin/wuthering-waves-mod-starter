"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraAssistant = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CameraBlueprintFunctionLibrary_1 = require("../../../../Camera/CameraBlueprintFunctionLibrary"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiCameraPostEffectComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
	SequenceDefine_1 = require("../SequenceDefine"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class CameraAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments),
			(this.uto = !1),
			(this.c8s = void 0),
			(this.m8s = void 0);
	}
	PreAllPlay() {
		var e;
		this.Model.IsViewTargetControl &&
			((e = this.Model.SequenceData.CameraBlendInTime),
			CameraController_1.CameraController.EnterCameraMode(1, e),
			(this.uto = !0),
			ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming) &&
			(this.c8s ||
				(this.c8s = ActorSystem_1.ActorSystem.Spawn(
					UE.BP_StreamingSourceActor_C.StaticClass(),
					new UE.Transform(),
					void 0,
				)),
			this.m8s ||
				((this.m8s = ActorSystem_1.ActorSystem.Spawn(
					UE.BP_StreamingSourceActor_C.StaticClass(),
					new UE.Transform(),
					void 0,
				)),
				(e =
					ModelManager_1.ModelManager.CameraModel.SequenceCamera
						.DisplayComponent.CineCamera),
				this.m8s.K2_AttachToActor(e, void 0, 2, 1, 1, !1)));
	}
	PreEachPlay() {
		var e = UE.NewArray(UE.Actor),
			a =
				ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent
					.CineCamera;
		a.ResetSeqCineCamSetting(),
			e.Add(a),
			this.Model.CurLevelSeqActor.SetBindingByTag(
				SequenceDefine_1.CAMERA_TAG,
				e,
				!1,
				!0,
			),
			CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_SetActorTransform(
				ModelManager_1.ModelManager.CameraModel.CameraTransform,
				!1,
				void 0,
				!0,
			);
	}
	EachStop() {
		ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting();
	}
	AllStop() {
		var e, a, r;
		this.Model.IsViewTargetControl &&
			(this.Model.Config.KeepCamera
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "剧情Seq结束时相机状态: KeepCamera"),
					(this.uto = !1),
					(r = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera(),
					(r = r.GetSavedSeqCameraThings()) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Camera",
								8,
								"读取Sequence相机信息时，信息不存在",
							)),
					(e = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(
						r.CameraLocation,
					),
					e.SetWorldRotation(r.CameraRotation),
					(a = e.GetUiCameraComponent(
						UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
					)).SetCameraAperture(r.CurrentAperture),
					a.SetCameraFocalDistance(r.FocusSettings.ManualFocusDistance),
					a.SetCameraFieldOfView(r.FieldOfView),
					CameraController_1.CameraController.ExitCameraMode(1),
					e.Enter())
				: (this.Model.Config.ResetCamera
						? (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Plot",
									27,
									"剧情Seq结束时相机状态: ResetCamera",
								),
							CameraBlueprintFunctionLibrary_1.default.ResetFightCameraPitchAndArmLength())
						: (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Plot",
									27,
									"剧情Seq结束时相机状态: 继承seq相机",
								),
							((a =
								CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation()).Roll =
								0),
							CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
								a,
							)),
					(r = this.Model.SequenceData.CameraBlendOutTime),
					(this.uto = !1),
					CameraController_1.CameraController.ExitCameraMode(1, r, 0, 0)));
	}
	End() {
		this.uto && CameraController_1.CameraController.ExitCameraMode(1),
			ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
			this.c8s &&
				this.c8s.WorldPartitionStreamingSource?.DisableStreamingSource(),
			this.m8s &&
				this.m8s.WorldPartitionStreamingSource?.DisableStreamingSource();
	}
	CalcPreloadLocation() {
		if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming) {
			this.m8s?.WorldPartitionStreamingSource?.EnableStreamingSource();
			var e =
				this.Model.CurLevelSeqActor.SequencePlayer.GetCurrentTime().Time
					.FrameNumber.Value;
			let o = SequenceDefine_1.MAX_FRAME,
				t = !1;
			for (const a of this.Model.CurShotStartFrames)
				if (a > e) {
					(o = a + 1), (t = !0);
					break;
				}
			var a = this.Model.CurLevelSeqActor?.GetSequence(),
				r = (0, puerts_1.$ref)(void 0);
			t &&
			UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransformByTag(
				a,
				SequenceDefine_1.CAMERA_TAG,
				o,
				r,
			)
				? (this.c8s?.K2_SetActorTransform(
						(0, puerts_1.$unref)(r),
						!1,
						void 0,
						!0,
					),
					this.c8s?.WorldPartitionStreamingSource?.EnableStreamingSource(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							39,
							"演出相机预流送",
							["CurFrame", e],
							["TarFrame", o],
							[
								"curPos",
								ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorLocation(),
							],
							["tarPos", this.c8s?.K2_GetActorLocation()],
						))
				: this.c8s?.WorldPartitionStreamingSource?.DisableStreamingSource();
		}
	}
}
exports.CameraAssistant = CameraAssistant;
