"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem");
class UiCameraComponent {
	constructor() {
		(this.OwnerUiCamera = void 0),
			(this.CameraActor = void 0),
			(this.CineCameraComponent = void 0),
			(this.P$i = TickSystem_1.TickSystem.InvalidId),
			(this.iRo = !1),
			(this.r6 = (e) => {
				this.OnTick(e);
			});
	}
	Initialize(e) {
		(this.OwnerUiCamera = e),
			(this.CameraActor = this.OwnerUiCamera.GetCameraActor()),
			this.CameraActor.SetTickableWhenPaused(!0),
			(this.CineCameraComponent = this.OwnerUiCamera.GetCineCameraComponent()),
			this.CineCameraComponent?.SetTickableWhenPaused(!0),
			this.OnInitialize();
	}
	Destroy() {
		(this.CameraActor = void 0),
			(this.CineCameraComponent = void 0),
			this.Deactivate(),
			this.OnDestroy();
	}
	Activate() {
		this.iRo ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCamera", 8, "激活相机组件", [
					"Name",
					this.constructor.name,
				]),
			this.OnAddEvents(),
			this.OnActivate(),
			(this.iRo = !0));
	}
	Deactivate() {
		this.iRo &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCamera", 8, "休眠相机组件", [
					"Name",
					this.constructor.name,
				]),
			this.RemoveTick(),
			this.OnRemoveEvents(),
			this.OnDeactivate(),
			(this.iRo = !1));
	}
	EnableTick() {
		this.P$i === TickSystem_1.TickSystem.InvalidId &&
			(this.P$i = TickSystem_1.TickSystem.Add(
				this.r6,
				this.constructor.name,
				0,
				!0,
			).Id);
	}
	ResumeTick() {
		this.P$i !== TickSystem_1.TickSystem.InvalidId &&
			TickSystem_1.TickSystem.Resume(this.P$i);
	}
	PauseTick() {
		this.P$i !== TickSystem_1.TickSystem.InvalidId &&
			TickSystem_1.TickSystem.Pause(this.P$i);
	}
	RemoveTick() {
		this.P$i !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.P$i),
			(this.P$i = TickSystem_1.TickSystem.InvalidId));
	}
	OnInitialize() {}
	OnDestroy() {}
	OnActivate() {}
	OnDeactivate() {}
	OnAddEvents() {}
	OnRemoveEvents() {}
	OnTick(e) {}
	GetIsActivate() {
		return this.iRo;
	}
	GetCameraStructure() {
		return this.OwnerUiCamera.GetStructure();
	}
}
exports.UiCameraComponent = UiCameraComponent;
