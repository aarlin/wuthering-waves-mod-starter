"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, a, r, t) {
		var o,
			n = arguments.length,
			C =
				n < 3
					? a
					: null === t
						? (t = Object.getOwnPropertyDescriptor(a, r))
						: t;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			C = Reflect.decorate(e, a, r, t);
		else
			for (var i = e.length - 1; 0 <= i; i--)
				(o = e[i]) && (C = (n < 3 ? o(C) : 3 < n ? o(a, r, C) : o(a, r)) || C);
		return 3 < n && C && Object.defineProperty(a, r, C), C;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneCameraPlayerComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CameraController_1 = require("./CameraController");
let SceneCameraPlayerComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments), (this.yxr = void 0), (this.Fxr = void 0);
	}
	OnStart() {
		return (
			(this.yxr = this.Entity.GetComponent(7)),
			(this.Fxr = new Array()),
			this.yxr.Valid
		);
	}
	OnEnd() {
		return (this.yxr = void 0), !(this.Fxr = void 0);
	}
	ExitCameraMode(e = () => {}, a, r) {
		CameraController_1.CameraController.ExitCameraMode(
			3,
			r && 1 === r ? 0 : a ? a.FadeOut : 1,
			0,
			0,
			e,
		) || e();
	}
	ExitSceneSubCamera(e, a = () => {}, r) {
		this.yxr.RemoveBoundSceneCamera(e),
			ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
				? this.ExitCameraMode(a, e, r)
				: this.yxr.IsIdle()
					? (ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3) ||
							(this.yxr.UpdateViewTarget(0),
							CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
								new UE.Rotator(
									CameraController_1.CameraController.FightCamera.LogicComponent
										.CameraRotation.Pitch,
									this.yxr.CineCamera.K2_GetActorRotation().Yaw,
									CameraController_1.CameraController.FightCamera.LogicComponent
										.CameraRotation.Roll,
								),
							)),
						this.ExitCameraMode(a, e, r))
					: (this.yxr.UpdateViewTarget(), a());
	}
	EnterSceneSubCamera(e) {
		e === this.yxr.CurSceneSubCamera && this.yxr.UpdateViewTarget();
	}
	EnterFixSceneSubCamera(e, a, r, t, o, n) {
		ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
			(CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
				!1,
			),
			((n = this.yxr.GetUnBoundSceneCamera(n)).FadeIn = t),
			(n.FadeOut = o),
			n.Camera.GetCineCameraComponent().SetFieldOfView(r),
			(n.Camera.CameraComponent.bConstrainAspectRatio = !1),
			n.Camera.K2_SetActorTransform(
				new UE.Transform(
					a.ToUeRotator(),
					e.ToUeVector(),
					new UE.Vector(1, 1, 1),
				),
				!1,
				void 0,
				!0,
			),
			this.Fxr.push(n),
			3 === ModelManager_1.ModelManager.CameraModel.CameraMode
				? this.EnterSceneSubCamera(n)
				: (UE.KismetSystemLibrary.ExecuteConsoleCommand(
						GlobalData_1.GlobalData.World,
						"r.Shadow.EnableCSMStable 0",
					),
					CameraController_1.CameraController.EnterCameraMode(3, t, 0, 0)));
	}
	ExitFixSceneSubCamera() {
		var e = () => {
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Shadow.EnableCSMStable 1",
			);
		};
		if (this.Fxr.length) {
			let r;
			for (
				CameraController_1.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(
					!0,
				),
					1 === this.yxr.CurSceneSubCamera.Type &&
						this.yxr.DefaultSceneSubCamera !== this.yxr.CurSceneSubCamera &&
						(r = this.yxr.CurSceneSubCamera);
				this.Fxr.length;
			) {
				var a = this.Fxr.pop();
				this.yxr.RemoveBoundSceneCamera(a);
			}
			if (3 === ModelManager_1.ModelManager.CameraModel.CameraMode)
				return this.yxr.IsIdle()
					? ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)
						? void this.ExitCameraMode(e)
						: (r &&
								(this.yxr.DefaultSceneSubCamera.CopyData(r),
								this.yxr.UpdateViewTarget(0)),
							CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
								new UE.Rotator(
									CameraController_1.CameraController.FightCamera.LogicComponent
										.CameraRotation.Pitch,
									this.yxr.CineCamera.K2_GetActorRotation().Yaw,
									CameraController_1.CameraController.FightCamera.LogicComponent
										.CameraRotation.Roll,
								),
							),
							void CameraController_1.CameraController.ExitCameraMode(
								3,
								this.yxr.DefaultSceneSubCamera.FadeOut,
								0,
								0,
								e,
							))
					: void this.yxr.UpdateViewTarget();
		}
	}
};
(SceneCameraPlayerComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(8)],
	SceneCameraPlayerComponent,
)),
	(exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent);
