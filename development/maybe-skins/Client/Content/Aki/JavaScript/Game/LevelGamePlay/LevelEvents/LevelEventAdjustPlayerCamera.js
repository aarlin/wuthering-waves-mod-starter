"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventAdjustPlayerCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	RenderUtil_1 = require("../../Render/Utils/RenderUtil"),
	ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	IMMEDIATELY_FADE_CAMERA_TIME = 0.1,
	noAimGameplayTag = -1036349300;
class LevelEventAdjustPlayerCamera extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.yLe = void 0);
	}
	ExecuteNew(e, t) {
		const o = e;
		if (
			(o || this.FinishExecute(!1),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 39, "进入相机调整"),
			this.ILe(o))
		)
			switch (o.Option.Type) {
				case IAction_1.EAdjustPlayerCamera.Horizontal:
					this.TLe(o, -1036349300),
						CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(
							o.Option.SplineEntityId,
							o.Option.YawAngle,
							o.Option.PitchAngle,
							o.Option.FadeInTime,
						),
						void 0 !== o.Option.DepthOfField
							? CameraController_1.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(
									o.Option.DepthOfField.Fstop,
									o.Option.DepthOfField.Distance,
									o.Option.DepthOfField.BlurAmount,
									o.Option.DepthOfField.BlurRadius,
								)
							: CameraController_1.CameraController.FightCamera.LogicComponent.ExitDepthOfField(),
						CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
							!1,
						),
						RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
					break;
				case IAction_1.EAdjustPlayerCamera.Dialog:
					this.TLe(o);
					let e = o.Option.PitchAngle,
						t = (void 0 !== e && (e = -e), o.Option.YawAngle);
					void 0 !== t && (t += 180);
					var r = this.yLe.DefaultConfig.get(1);
					CameraController_1.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(
						o.Option.CenterPos,
						e,
						t,
						r,
					);
					break;
				case IAction_1.EAdjustPlayerCamera.Fixed:
					this.TLe(o);
					r = Vector_1.Vector.Create();
					var n = Rotator_1.Rotator.Create();
					r.Set(
						o.Option.CenterPos.X ?? 0,
						o.Option.CenterPos.Y ?? 0,
						o.Option.CenterPos.Z ?? 0,
					),
						n.Set(
							o.Option.CenterRot.Y ?? 0,
							o.Option.CenterRot.Z ?? 0,
							o.Option.CenterRot.X ?? 0,
						),
						CameraController_1.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(
							r,
							n,
							o.Option.Fov,
							o.Option.FadeInTime,
							o.Option.FadeOutTime,
							1,
						);
					break;
				case IAction_1.EAdjustPlayerCamera.Basic:
					this.TLe(o),
						o.Option.SightUi &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.SetCameraAimVisible,
								!0,
								0,
								o.Option.SightUi,
							);
					break;
				case IAction_1.EAdjustPlayerCamera.AxisLock:
					if (
						((r = o.Option.AxisRotate.Y ?? 0),
						(n = o.Option.AxisRotate.Z ?? 0),
						this.yLe.DefaultConfig.set(45, r),
						this.yLe.DefaultConfig.set(46, r),
						this.yLe.DefaultConfig.set(60, n),
						this.yLe.DefaultConfig.set(61, n),
						o.Option.ScreenConfig)
					)
						if (
							Math.abs(
								CameraController_1.CameraController.CameraRotator.Pitch - r,
							) <= o.Option.ScreenConfig.TriggerAngle &&
							Math.abs(
								CameraController_1.CameraController.CameraRotator.Yaw - n,
							) <= o.Option.ScreenConfig.TriggerAngle
						)
							this.TLe(o, -1036349300);
						else {
							r = o.Option.ScreenConfig.FadeInTime;
							const e = o.Option.ScreenConfig.FadeOutTime;
							LevelLoadingController_1.LevelLoadingController.OpenLoading(
								0,
								3,
								() => {
									(this.yLe.FadeInTime = 0.1),
										this.TLe(o, -1036349300),
										LevelLoadingController_1.LevelLoadingController.CloseLoading(
											0,
											void 0,
											e,
										);
								},
								r,
							);
						}
					else this.TLe(o, -1036349300);
			}
		else this.FinishExecute(!1);
	}
	ILe(e) {
		var t,
			o =
				CameraController_1.CameraController.FightCamera.LogicComponent
					.CameraConfigController;
		return o
			? ((t = e.Option.Type),
				(o = o.GetCameraConfigByTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t),
				))
					? (((this.yLe = o).Priority = e.Option.Priority),
						(o.FadeInTime = e.Option.FadeInTime),
						(o.FadeOutTime = e.Option.FadeOutTime),
						e.Option.FadeInCurve
							? (o.FadeInCurve =
									ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
										e.Option.FadeInCurve,
									))
							: (o.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
						e.Option.FadeOutCurve
							? (o.FadeOutCurve =
									ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
										e.Option.FadeOutCurve,
									))
							: (o.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
						e.Option.ArmLength && 0 !== e.Option.ArmLength
							? o.DefaultConfig.set(1, e.Option.ArmLength)
							: o.DefaultConfig.delete(1),
						e.Option.MinumArmLength && 0 !== e.Option.MinumArmLength
							? o.DefaultConfig.set(2, e.Option.MinumArmLength)
							: o.DefaultConfig.delete(2),
						e.Option.MaxiumArmLength && 0 !== e.Option.MaxiumArmLength
							? o.DefaultConfig.set(3, e.Option.MaxiumArmLength)
							: o.DefaultConfig.delete(3),
						e.Option.Offset.X && 0 !== e.Option.Offset.X
							? o.DefaultConfig.set(6, e.Option.Offset.X)
							: o.DefaultConfig.delete(6),
						e.Option.Offset.Y && 0 !== e.Option.Offset.Y
							? o.DefaultConfig.set(7, e.Option.Offset.Y)
							: o.DefaultConfig.delete(7),
						e.Option.Offset.Z && 0 !== e.Option.Offset.Z
							? o.DefaultConfig.set(8, e.Option.Offset.Z)
							: o.DefaultConfig.delete(8),
						e.Option.Fov && 0 !== e.Option.Fov
							? o.DefaultConfig.set(5, e.Option.Fov)
							: o.DefaultConfig.delete(5),
						void 0 === e.Option.IsDisableResetFocus
							? o.DefaultConfig.delete(56)
							: o.DefaultConfig.set(56, e.Option.IsDisableResetFocus ? 1 : 0),
						!0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 39, "没有找到对应Tag的镜头配置", [
								"tag",
								t,
							]),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 39, "CameraConfigController不存在"),
				!1);
	}
	TLe(e, t = 0) {
		CameraController_1.CameraController.FightCamera.LogicComponent?.CameraConfigController.EnableHookConfig(
			e.Option.Type,
			-1036349300,
		);
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.AddGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "RestorePlayerCameraAdjustment" },
		);
	}
}
exports.LevelEventAdjustPlayerCamera = LevelEventAdjustPlayerCamera;
