"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, a) {
		var i,
			n = arguments.length,
			o =
				n < 3
					? t
					: null === a
						? (a = Object.getOwnPropertyDescriptor(t, r))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(e, t, r, a);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(i = e[s]) && (o = (n < 3 ? i(o) : 3 < n ? i(t, r, o) : i(t, r)) || o);
		return 3 < n && o && Object.defineProperty(t, r, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneCameraDisplayComponent = exports.SceneSubCamera = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	PriorityQueue_1 = require("../../Core/Container/PriorityQueue"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	UiLayerType_1 = require("../Ui/Define/UiLayerType"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
	InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine"),
	UiLayer_1 = require("../Ui/UiLayer"),
	CameraController_1 = require("./CameraController");
class SceneSubCamera {
	constructor() {
		(this.Type = 2),
			(this.Camera = void 0),
			(this.FadeIn = -0),
			(this.FadeOut = -0),
			(this.IsBinding = !1),
			(this.IsKeepUi = !1);
	}
	Clear() {
		this.Camera?.IsValid() &&
			(ActorSystem_1.ActorSystem.Put(this.Camera), (this.Camera = void 0));
	}
	CopyData(e) {
		e?.Camera?.IsValid() &&
			(this.Camera.K2_SetActorTransform(
				new UE.Transform(
					e.Camera.K2_GetActorRotation(),
					e.Camera.K2_GetActorLocation(),
					new UE.Vector(1, 1, 1),
				),
				!1,
				void 0,
				!0,
			),
			(this.FadeIn = e.FadeIn),
			(this.FadeOut = e.FadeOut),
			(this.IsKeepUi = e.IsKeepUi));
	}
}
(exports.SceneSubCamera = SceneSubCamera).Compare = (e, t) => {
	let r = e.Type - t.Type;
	return 0 === r && r--, r;
};
let SceneCameraDisplayComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.bxr = void 0),
			(this.qxr = void 0),
			(this.Gxr = void 0),
			(this.Nxr = void 0),
			(this.Oxr = 0),
			(this.OnModeChanged = (e, t) => {
				3 === e && this.IsIdle()
					? (CameraController_1.CameraController.ExitCameraMode(
							3,
							1,
							0,
							0,
							() => {
								UE.KismetSystemLibrary.ExecuteConsoleCommand(
									GlobalData_1.GlobalData.World,
									"r.Shadow.EnableCSMStable 1",
								);
							},
						),
						this.ClearRemovedSceneCamera())
					: 3 === t && e !== t && this.ClearRemovedSceneCamera();
			}),
			(this.nye = () => {
				(this.Nxr.Camera =
					CameraController_1.CameraController.SpawnCineCamera()),
					(this.bxr = this.Nxr.Camera),
					3 === CameraController_1.CameraController.Model.CameraMode &&
						CameraController_1.CameraController.SetViewTarget(
							this.bxr,
							"SceneCamera.OnWorldDone",
						);
			}),
			(this.uMe = () => {
				this.Nxr &&
					(ActorSystem_1.ActorSystem.Put(this.bxr),
					(this.Nxr.Camera = void 0),
					(this.bxr = void 0)),
					(this.Oxr = 0),
					this.ClearRemovedSceneCamera();
			});
	}
	get CineCamera() {
		return this.qxr.Top.Camera;
	}
	get CurSceneSubCamera() {
		return this.qxr?.Top;
	}
	get DefaultSceneSubCamera() {
		return this.Nxr;
	}
	OnInit() {
		return (
			(this.qxr = new PriorityQueue_1.PriorityQueue(SceneSubCamera.Compare)),
			(this.Gxr = new Array()),
			(this.Nxr = new SceneSubCamera()),
			(this.Nxr.Camera = CameraController_1.CameraController.SpawnCineCamera()),
			(this.Nxr.Type = 2),
			this.qxr.Push(this.Nxr),
			(this.bxr = this.Nxr.Camera),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			this.Ore(),
			!!this.bxr
		);
	}
	Ore() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.CameraModeChanged,
			this.OnModeChanged,
		) ||
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CameraModeChanged,
				this.OnModeChanged,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.CameraModeChanged,
			this.OnModeChanged,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CameraModeChanged,
				this.OnModeChanged,
			);
	}
	OnClear() {
		return (
			this.bxr &&
				(ActorSystem_1.ActorSystem.Put(this.bxr), (this.bxr = void 0)),
			this.kre(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			!0
		);
	}
	OnChangeTimeDilation(e) {
		this.bxr?.IsValid() && (this.bxr.CustomTimeDilation = e);
	}
	GetUnBoundSceneCamera(e) {
		var t;
		if (!this.qxr.Empty)
			return this.Nxr.IsBinding
				? (((t = new SceneSubCamera()).Camera =
						CameraController_1.CameraController.SpawnCineCamera()),
					(t.Type = e),
					this.qxr.Push(t),
					t)
				: (this.kxr(),
					(this.Nxr.Type = e),
					(this.Nxr.IsBinding = !0),
					this.qxr.Update(this.Nxr),
					this.Nxr);
	}
	RemoveBoundSceneCamera(e) {
		!this.qxr.Empty &&
			e &&
			((e.IsBinding = !1),
			this.Nxr === e
				? (this.kxr(), this.qxr.Update(this.Nxr))
				: (this.qxr.Remove(e),
					this.Gxr.push(e),
					this.IsIdle() && this.Nxr.CopyData(e)));
	}
	IsIdle() {
		return !this.qxr.Empty && this.qxr.Top === this.Nxr && !this.Nxr.IsBinding;
	}
	ClearRemovedSceneCamera() {
		for (const e of this.Gxr) e.Clear();
		this.Gxr.length = 0;
	}
	UpdateViewTarget(e) {
		void 0 !== e
			? CameraController_1.CameraController.SetViewTarget(
					this.CurSceneSubCamera.Camera,
					"SceneCamera.UpdateViewTarget",
					e,
					0,
					void 0,
					!0,
					!0,
				)
			: CameraController_1.CameraController.SetViewTarget(
					this.CurSceneSubCamera.Camera,
					"SceneCamera.UpdateViewTarget2",
					this.CurSceneSubCamera.FadeIn,
					0,
					void 0,
					!0,
					!0,
				);
	}
	kxr() {
		(this.Nxr.IsBinding = !1),
			(this.Nxr.Camera.CameraComponent.bConstrainAspectRatio = !1),
			(this.Nxr.Type = 2),
			(this.Nxr.IsKeepUi = !0);
	}
	SetUiActive(e) {
		e ? 0 < this.Oxr && this.Oxr-- : this.Oxr++,
			(0 !== this.Oxr && e) ||
				(1 < this.Oxr && !e) ||
				(UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, e),
				UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, e),
				e
					? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
							2,
						),
						ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTag(
							InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
						),
						InputDistributeController_1.InputDistributeController.RefreshInputTag())
					: (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
							2,
						),
						ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
							InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
						)));
	}
};
(SceneCameraDisplayComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(7)],
	SceneCameraDisplayComponent,
)),
	(exports.SceneCameraDisplayComponent = SceneCameraDisplayComponent);
