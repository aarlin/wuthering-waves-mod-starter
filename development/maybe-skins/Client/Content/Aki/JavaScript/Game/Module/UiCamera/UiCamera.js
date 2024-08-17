"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stack_1 = require("../../../Core/Container/Stack"),
	CameraController_1 = require("../../Camera/CameraController"),
	UiCameraPostEffectComponent_1 = require("./UiCameraComponent/UiCameraPostEffectComponent"),
	UiCameraSequenceComponent_1 = require("./UiCameraComponent/UiCameraSequenceComponent");
class UiCamera {
	constructor() {
		(this.CameraActor = void 0),
			(this.CineCameraComponent = void 0),
			(this.zDo = new Map()),
			(this.ZDo = new Stack_1.Stack()),
			(this.eRo = !1);
	}
	Initialize() {
		var e = CameraController_1.CameraController.WidgetCamera;
		return e
			? (e = e.GetComponent(12)).Valid
				? (e = e.CineCamera)?.IsValid()
					? ((this.CameraActor = e),
						this.CameraActor.SetTickableWhenPaused(!0),
						(this.CineCameraComponent = e.GetCineCameraComponent()),
						this.CineCameraComponent?.SetTickableWhenPaused(!0),
						this.AddUiCameraComponent(
							UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
						),
						this.AddUiCameraComponent(
							UiCameraSequenceComponent_1.UiCameraSequenceComponent,
						),
						!0)
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"UiCamera",
								8,
								"初始化界面摄像机时，CameraActor不可用",
							),
						!1)
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"UiCamera",
							8,
							"初始化界面摄像机时，找不到 WidgetCameraDisplayComponent 组件",
						),
					!1)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCamera",
						8,
						"初始化界面摄像机时，找不到 widgetCamera 组件",
					),
				!1);
	}
	Destroy(e = 0, t = 0, o = 0) {
		this.Exit(e, t, o),
			this.tRo(),
			(this.CameraActor = void 0),
			(this.CineCameraComponent = void 0);
	}
	SetWorldLocation(e) {
		this.CameraActor?.IsValid() &&
			this.CameraActor.K2_SetActorLocation(e, !1, void 0, !1);
	}
	SetWorldRotation(e) {
		this.CameraActor?.IsValid() && this.CameraActor.K2_SetActorRotation(e, !1);
	}
	Enter(e = 0, t = 0, o = 0) {
		if (this.eRo)
			CameraController_1.CameraController.EnterCameraMode(2, e, t, o);
		else {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCamera",
					8,
					"进入Ui相机",
					["blendTime", e],
					["blendFunction", t],
					["blendExp", o],
				);
			for (const e of this.zDo.values()) e.Activate();
			CameraController_1.CameraController.EnterCameraMode(2, e, t, o),
				(this.eRo = !0);
		}
	}
	Exit(e = 0, t = 0, o = 0) {
		if (this.eRo) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCamera",
					8,
					"退出Ui相机",
					["blendTime", e],
					["blendFunction", t],
					["blendExp", o],
				),
				CameraController_1.CameraController.ExitCameraMode(2, e, t, o);
			for (const e of this.zDo.values()) e.Deactivate();
			this.ClearStructure(), (this.eRo = !1);
		} else CameraController_1.CameraController.ExitCameraMode(2, e, t, o);
	}
	PushStructure(e) {
		if (e)
			return (
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCamera",
						46,
						"PushStructure:",
						[
							"this.UiCameraStructureStack.Peek()?.constructor.name",
							this.ZDo.Peek()?.constructor.name,
						],
						["uiCameraStructureClass.name", e.name],
					),
				this.ZDo.Peek()?.constructor.name === e.name
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"UiCamera",
								46,
								"PushStructure时，已经有相同的UiCameraStructure，直接返回此UiCameraStructure:",
								["Name", this.ZDo.Peek()?.constructor.name],
							),
						this.ZDo.Peek())
					: ((e = new e()).Initialize(this), e.Activate(), this.ZDo.Push(e), e)
			);
	}
	PopStructure() {
		this.ZDo.Pop().Destroy(), this.ZDo.Peek()?.Activate();
	}
	GetStructure() {
		return this.ZDo.Peek();
	}
	ClearStructure() {
		for (const e of this.ZDo) e.Destroy();
		this.ZDo.Clear();
	}
	AddUiCameraComponent(e, t = !0) {
		let o = this.zDo.get(e);
		return (
			o || ((o = new e()).Initialize(this), this.zDo.set(e, o)),
			this.eRo && t && o.Activate(),
			o
		);
	}
	DestroyUiCameraComponent(e) {
		var t = this.zDo.get(e);
		t && (t.Destroy(), this.zDo.delete(e));
	}
	tRo() {
		for (const e of this.zDo.values()) e.Destroy();
		this.zDo.clear();
	}
	GetUiCameraComponent(e) {
		return this.zDo.get(e);
	}
	GetCameraActor() {
		return this.CameraActor;
	}
	GetCineCameraComponent() {
		return this.CineCameraComponent;
	}
	GetIsEntered() {
		return this.eRo;
	}
}
exports.UiCamera = UiCamera;
