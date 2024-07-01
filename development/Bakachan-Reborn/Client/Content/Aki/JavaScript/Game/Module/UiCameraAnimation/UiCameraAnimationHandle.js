"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraAnimationHandle = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UiManager_1 = require("../../Ui/UiManager"),
	UiCameraAnimationManager_1 = require("./UiCameraAnimationManager"),
	UiCameraLoadingAnimation_1 = require("./UiCameraLoadingAnimation");
class UiCameraAnimationHandle {
	constructor() {
		(this.JUo = void 0),
			(this.zUo = void 0),
			(this.iRo = !1),
			(this.ZUo = void 0),
			(this.eAo = void 0),
			(this.IsViewInLoading = !1),
			(this.tAo = !1),
			(this.iAo = !1),
			(this.oAo = () => {
				this.rAo();
			});
	}
	Initialize() {
		(this.eAo = new UiCameraLoadingAnimation_1.UiCameraLoadingAnimation()),
			this.eAo.Initialize(),
			(this.iRo = !1);
	}
	Reset() {
		this.Deactivate(),
			(this.zUo = void 0),
			(this.JUo = void 0),
			(this.eAo = void 0),
			(this.IsViewInLoading = !1),
			(this.tAo = !1),
			(this.ZUo = void 0);
	}
	Tick(e) {
		this.eAo?.Tick(e);
	}
	SetHandleData(e) {
		this.zUo = e;
	}
	Activate(e, a = !0, i = !0) {
		(this.zUo = e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("CameraAnimation", 8, "激活界面镜头状态", [
					"HandleData",
					this.zUo.ToString(),
				]);
		var t,
			n,
			o = this.zUo.GetUiCameraAnimationConfig();
		o
			? e.IsEmptyState
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"CameraAnimation",
							8,
							"激活界面镜头状态时，激活了一个空状态",
							["HandleData", this.zUo.ToString()],
						),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
						e,
					))
				: ((this.JUo = o),
					(this.iAo = !1),
					2 ===
					(n = this.nAo(
						o.BlendInCameraSequence,
						o.BlendInCameraSequencePlayRate,
						o.bRevertBlendInCameraSequence,
						() => {
							(this.iAo = !1),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnUiBlendInCameraSequenceFinished,
									e,
								);
						},
					))
						? ((this.iAo = !1),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"CameraAnimation",
									8,
									"激活界面镜头状态时，填了BlendInCameraSequence，但是目标Actor无法找到，直接休眠UI相机状态",
									["HandleData", this.zUo.ToString()],
								),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
								this.zUo,
							),
							this.Deactivate())
						: 0 === n
							? ((this.iAo = !0),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"CameraAnimation",
										8,
										"激活界面镜头状态时，填了BlendInCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
										["HandleData", this.zUo.ToString()],
									),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
									e,
								))
							: UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera
								? ((this.tAo = !1),
									(n = this.zUo.GetTargetLocation()),
									(t = this.zUo.GetTargetRotation()),
									n && t
										? (this.StopSequence(),
											this.SetUiCameraAnimationRotation(t),
											this.SetUiCameraAnimationLocation(n),
											this.SetSpringArmLength(this.zUo.GetTargetArmLength()),
											this.SetSpringArmRelativeLocation(
												this.zUo.GetTargetArmOffsetLocation(),
											),
											this.SetSprintArmRelativeRotation(
												this.zUo.GetTargetArmOffsetRotation(),
											),
											this.sAo(this.zUo.GetTargetArmCollisionTest()),
											this.SetCameraFieldOfView(
												this.zUo.GetTargetFieldOfView(),
											),
											this.SetCameraPostProcessBlendWeight(
												this.zUo.GetTargetPostProcessBlendWeight(),
											),
											this.SetWidgetCameraAttachToAnimationActor(),
											UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
												a ? o.BlendInTime : 0,
												o.BlendInFunction,
												o.BlendInExp,
											),
											this.JUo.bResetCameraTransform &&
												UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation(),
											(t = this.zUo.ViewName),
											(n = this.zUo.UiCameraMappingConfig),
											t &&
											UiManager_1.UiManager.IsViewCreating(t) &&
											n?.bPlayLoadingCameraAnimation
												? (Log_1.Log.CheckInfo() &&
														Log_1.Log.Info(
															"CameraAnimation",
															8,
															"激活界面镜头状态时，当前界面在加载中，过渡到模糊镜头效果",
															["HandleData", this.zUo.ToString()],
														),
													this.eAo.Play(
														UiCameraAnimationManager_1.UiCameraAnimationManager
															.LoadingViewCameraAnimationLength,
														UiCameraAnimationManager_1.UiCameraAnimationManager
															.LoadingViewManualFocusDistance,
														UiCameraAnimationManager_1.UiCameraAnimationManager
															.LoadingViewAperture,
													),
													(this.IsViewInLoading = !0))
												: (Log_1.Log.CheckInfo() &&
														Log_1.Log.Info(
															"CameraAnimation",
															8,
															"激活界面镜头状态时，当前界面不在加载中，所以停止模糊效果",
															["HandleData", this.zUo.ToString()],
														),
													(this.IsViewInLoading = !1),
													this.eAo.Stop(),
													this.SetCameraFocalDistance(
														this.zUo.GetTargetFocalDistance(),
													),
													this.SetCameraAperture(this.zUo.GetTargetAperture()),
													i &&
														this.aAo(
															o.BlendInSequence,
															o.BlendInPlayRate,
															o.bBlendInSequenceReverse,
														)),
											(this.iRo = !0),
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName
													.OnActivateUiCameraAnimationHandle,
												e,
											))
										: (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"CameraAnimation",
													8,
													"激活界面镜头状态时，找不到对应位置或旋转，可能是对应目标无法找到",
													["HandleData", this.zUo.ToString()],
													["ReplaceCameraTag", this.zUo.ReplaceCameraTag],
													[
														"ReplaceCameraIsValid",
														this.zUo.GetReplaceCameraActor()?.IsValid(),
													],
												),
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName
													.OnActivateUiCameraAnimationHandleFail,
												this.zUo,
											),
											this.Deactivate()))
								: (EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName
											.OnActivateUiCameraAnimationHandleFail,
										this.zUo,
									),
									this.Deactivate()))
			: EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
					this.zUo,
				);
	}
	Deactivate() {
		this.iRo && (this.eAo?.IsPlaying && this.eAo.Stop(), (this.iRo = !1));
	}
	GetHandleData() {
		return this.zUo;
	}
	GetIsActivate() {
		return this.iRo;
	}
	Revert(e = !0, a = void 0) {
		var i,
			t,
			n,
			o,
			r,
			m,
			s = this.zUo.GetUiCameraAnimationConfig();
		s
			? ((i = (this.JUo = s).BlendOutCameraSequence),
				(t = s.BlendOutCameraSequencePlayRate),
				(s = s.bRevertBlendOutCameraSequence),
				(this.ZUo = a),
				0 ===
				this.nAo(i, t, s, () => {
					this.rAo();
				})
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"CameraAnimation",
							8,
							"还原界面镜头状态时，填了BlendOutCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
							["HandleData", this.zUo.ToString()],
						)
					: ((i = this.JUo.BlendOutTime),
						(t = this.JUo.BlendOutFunction),
						(s = this.JUo.BlendOutExp),
						(n = this.JUo.bResetCameraTransform),
						(o = this.JUo.BlendOutSequence),
						(r = this.JUo.bBlendOutSequenceReverse),
						(m = this.JUo.BlendOutPlayRate),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("CameraAnimation", 8, "还原镜头至战斗镜头", [
								"HandleData",
								this.zUo.ToString(),
							]),
						n &&
							UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation(),
						UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Exit(
							i,
							t,
							s,
						),
						(this.tAo = !0),
						e && UE.KismetSystemLibrary.IsValidSoftObjectReference(o)
							? this.aAo(o, m, r).then(
									() => {
										UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(
											this.oAo,
										);
									},
									() => {},
								)
							: this.rAo()))
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"CameraAnimation",
						8,
						"找不到镜头配置，强制还原镜头至战斗镜头",
						["HandleData", this.zUo.ToString()],
					),
				a && a(),
				this.Reset());
	}
	rAo() {
		this.zUo
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"CameraAnimation",
						8,
						"界面镜头状态 Revert(BlendOut) 完成",
						["HandleData", this.zUo.ToString()],
					),
				this.ZUo && this.ZUo(),
				this.Reset())
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"CameraAnimation",
					8,
					"界面镜头状态 Revert(BlendOut) 完成时已被重置",
				);
	}
	GetIsPendingRevert() {
		return this.tAo;
	}
	StopSequence() {
		UiCameraAnimationManager_1.UiCameraAnimationManager
			.UiCameraSequenceComponent &&
			UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.DestroyUiCameraSequence(
				!0,
				1,
			);
	}
	GetViewName() {
		return this.zUo?.ViewName;
	}
	GetIsPlayingBlendInSequence() {
		return this.iAo;
	}
	get GetUiCameraAnimationActor() {
		return UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.GetOwnActor();
	}
	nAo(e, a, i, t) {
		var n;
		return UE.KismetSystemLibrary.IsValidSoftObjectReference(e)
			? (n = this.zUo.GetTargetActor())?.IsValid()
				? (this.SetWidgetCameraDetachFromAnimationActor(),
					this.aAo(e, a, i, n).then(
						() => {
							var e = this.zUo.GetUiCameraAnimationConfig();
							UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
								e.BlendInTime,
								e.BlendInFunction,
								e.BlendInExp,
							);
						},
						() => {},
					),
					UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(
						t,
					),
					0)
				: 2
			: 1;
	}
	SetUiCameraAnimationLocation(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorLocation(
			e,
		);
	}
	SetUiCameraAnimationRelativeLocation(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRelativeLocation(
			e,
		);
	}
	SetUiCameraAnimationRotation(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRotation(
			e,
		);
	}
	SetSpringArmLength(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmLength(
			e,
		);
	}
	SetSprintArmRelativeRotation(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSprintArmRelativeRotation(
			e,
		);
	}
	SetSpringArmRelativeLocation(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmRelativeLocation(
			e,
		);
	}
	sAo(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCollisionTest(
			e,
		);
	}
	SetCameraFieldOfView(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFieldOfView(
			e,
		);
	}
	SetCameraFocalDistance(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFocalDistance(
			e,
		);
	}
	SetCameraAperture(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraAperture(
			e,
		);
	}
	SetCameraPostProcessBlendWeight(e) {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraPostProcessBlendWeight(
			e,
		);
	}
	SetWidgetCameraAttachToAnimationActor() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorAttachToSpringActor(),
			UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(
				Vector_1.Vector.ZeroVector,
			);
	}
	SetWidgetCameraDetachFromAnimationActor() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorDetachFromSpringActor();
	}
	async aAo(e, a, i, t) {
		if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e))
			return (
				this.StopSequence(),
				UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.LoadAndPlayUiCameraSequence(
					e,
					a,
					i,
					t,
				)
			);
	}
}
exports.UiCameraAnimationHandle = UiCameraAnimationHandle;
