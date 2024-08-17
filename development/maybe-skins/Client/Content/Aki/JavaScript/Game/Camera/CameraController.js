"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, a, t, r) {
		var o,
			i = arguments.length,
			n =
				i < 3
					? a
					: null === r
						? (r = Object.getOwnPropertyDescriptor(a, t))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(e, a, t, r);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(o = e[l]) && (n = (i < 3 ? o(n) : 3 < i ? o(a, t, n) : o(a, t)) || n);
		return 3 < i && n && Object.defineProperty(a, t, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Log_1 = require("../../Core/Common/Log"),
	Time_1 = require("../../Core/Common/Time"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	Global_1 = require("../Global"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CameraParams_1 = require("./CameraParams"),
	CameraUtility_1 = require("./CameraUtility"),
	author = 15,
	SECOND_TO_MILLISECOND = 1e3;
class CameraController extends ControllerBase_1.ControllerBase {
	static get Model() {
		return ModelManager_1.ModelManager.CameraModel;
	}
	static get FightCamera() {
		return this.Model.FightCamera;
	}
	static get SequenceCamera() {
		return this.Model.SequenceCamera;
	}
	static get WidgetCamera() {
		return this.Model.WidgetCamera;
	}
	static get SceneCamera() {
		return this.Model.SceneCamera;
	}
	static get OrbitalCamera() {
		return this.Model.OrbitalCamera;
	}
	static get CameraLocation() {
		return this.Model.CameraLocation;
	}
	static get CameraRotator() {
		return this.Model.CameraRotator;
	}
	static get CameraDitherStartHideDistance() {
		return this.Model.CameraDitherStartHideDistance;
	}
	static OnPossess(e) {
		this.FightCamera.LogicComponent.SetPawn(e),
			this.SequenceCamera.PlayerComponent.SetPawn(e);
	}
	static SetViewTarget(e, a, t = 0, r = 0, o = 0, i, n) {
		var l;
		e?.IsValid()
			? (l = this.GetPlayerController()) &&
				((l.bShouldPerformFullTickWhenPaused = !0),
				(this.Model.CurrentCameraActor = e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						34,
						"绑定相机 SetViewTarget",
						["name", e.GetName()],
						["blendTime", t],
						["reason", a],
					),
				l.SetViewTargetWithBlend(
					e,
					CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : t,
					r,
					o,
					i ?? !1,
					n ?? !1,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CameraViewTargetChanged,
					CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Camera", 6, "Camera not valid");
	}
	static ResetViewTarget(e = 0, a = 0, t = 0) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 34, "绑定相机 ResetViewTarget", [
				"name",
				this.Model.CurrentCameraActor.GetName(),
			]),
			this.GetPlayerController().SetViewTargetWithBlend(
				this.Model.CurrentCameraActor,
				e,
				a,
				t,
				!0,
				!0,
			);
	}
	static OnTick(e) {
		var a, t;
		this.Model.CurrentCameraActor?.IsValid() &&
			(this.Model.CameraLocation.FromUeVector(
				this.Model.CurrentCameraActor.K2_GetActorLocation(),
			),
			this.Model.CameraRotator.DeepCopy(
				this.Model.CurrentCameraActor.K2_GetActorRotation(),
			),
			(this.Model.CameraTransform =
				this.Model.CurrentCameraActor.GetTransform()),
			(t =
				!(a = Global_1.Global.BaseCharacter?.CharacterActorComponent)?.Actor ||
				a.Actor.bHidden),
			1 === this.Model.CameraMode && t
				? this.GetPlayerController()?.SetAudioListenerOverride(
						void 0,
						this.Model.CameraLocation.ToUeVector(),
						this.Model.CameraRotator.ToUeRotator(),
					)
				: this.GetPlayerController()?.SetAudioListenerOverride(
						void 0,
						a?.ActorLocation,
						this.Model.CameraRotator.ToUeRotator(),
					),
			this.UpdateCameraDitherRadius());
	}
	static EnterCameraMode(e, a = 0, t = 0, r = 0, o = () => {}, i = !1) {
		return 0 === e
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Camera",
						15,
						"战斗镜头不应主动切换，应由其他镜头退出时被动切换",
					),
				!1)
			: (this.Model.EnableMode(e),
				this.Model.IsInHigherMode(e)
					? (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Camera",
								6,
								"意图进入较低优先级的镜头",
								["CurrentMode", this.Model.CameraMode],
								["NewMode", e],
							),
						i && o && o(),
						!1)
					: this.uhe(e, a, t, r, o));
	}
	static ExitCameraMode(e, a = 0, t = 0, r = 0, o = () => {}) {
		return 0 === e
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Camera",
						15,
						"战斗镜头不应主动切换，应由其他镜头退出时被动切换",
					),
				!1)
			: (this.Model.DisableMode(e),
				this.uhe(this.Model.GetNextMode(), a, t, r, o));
	}
	static uhe(e, a = 0, t = 0, r = 0, o = () => {}) {
		var i = this.Model;
		if (i.CameraMode === e) return !1;
		let n;
		switch (
			(i.SetCameraMode(e),
			(1 !== e && 3 !== e) ||
				Global_1.Global.CharacterCameraManager.StopAllCameraShakes(),
			e)
		) {
			case 0:
				n = this.FightCamera.DisplayComponent.CameraActor;
				break;
			case 1:
				n = this.SequenceCamera.DisplayComponent.CineCamera;
				break;
			case 2:
				n = this.WidgetCamera.DisplayComponent.CineCamera;
				break;
			case 3:
				n = this.SceneCamera.DisplayComponent.CineCamera;
				break;
			case 4:
				n = this.OrbitalCamera.DisplayComponent.CineCamera;
				break;
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							15,
							"CameraManager.SwitchCameraMode: 错误的镜头模式 ",
							["mode", e],
						),
					!1
				);
		}
		return (
			this.SetViewTarget(n, "SwitchMode", a, t, r, !0, !0),
			0 < a
				? TimerSystem_1.TimerSystem.Delay(() => {
						o && o();
					}, 1e3 * a)
				: o && o(),
			!0
		);
	}
	static RefreshSequenceCamera() {
		1 === this.Model.CameraMode &&
			this.SetViewTarget(
				this.SequenceCamera.DisplayComponent.CineCamera,
				"RefreshMode",
			);
	}
	static EnterDialogueMode(e, a = !1) {
		this.FightCamera.LogicComponent.EnterSequenceDialogue(e, a);
	}
	static ExitDialogMode() {
		this.FightCamera.LogicComponent.ExitSequenceDialogue();
	}
	static EnterCameraExplore(e, a, t, r, o, i, n) {
		this.FightCamera.LogicComponent.EnterCameraExplore(e, a, t, r, o, i, n);
	}
	static ExitCameraExplore(e) {
		this.FightCamera.LogicComponent.ExitCameraExplore(e);
	}
	static SpawnCameraActor() {
		var e = this.SpawnActor(UE.CameraActor.StaticClass());
		return (e.CameraComponent.bConstrainAspectRatio = !1), e;
	}
	static SetInputEnable(e, a) {
		this.FightCamera.LogicComponent.CameraInputController.SetInputEnable(e, a);
	}
	static SpawnCineCamera() {
		return this.SpawnActor(UE.BP_CineCamera_C.StaticClass());
	}
	static SpawnActor(e) {
		return ActorSystem_1.ActorSystem.Get(
			e,
			MathUtils_1.MathUtils.DefaultTransform,
		);
	}
	static GetCharacter() {
		return Global_1.Global.BaseCharacter;
	}
	static GetPlayerController() {
		return Global_1.Global.CharacterController;
	}
	static GetCameraConfigs(e = void 0) {
		var a = (0, puerts_1.$ref)(UE.NewArray(UE.SCamera_Setting));
		return (
			UE.BPL_CameraUtility_C.DtGetCameraConfigs(
				a,
				e,
				GlobalData_1.GlobalData.World,
			),
			(0, puerts_1.$unref)(a)
		);
	}
	static GetCameraConfigList(e = void 0) {
		var a = (0, puerts_1.$ref)(UE.NewArray(UE.SCameraConfig));
		return (
			UE.BPL_CameraUtility_C.DtGetCameraConfigList(
				a,
				e,
				GlobalData_1.GlobalData.World,
			),
			(0, puerts_1.$unref)(a)
		);
	}
	static GetPlayerCameraManager() {
		return Global_1.Global.CharacterCameraManager;
	}
	static SetTimeDilation(e) {
		ModelManager_1.ModelManager.CameraModel.FightCamera.SetTimeDilation(e),
			ModelManager_1.ModelManager.CameraModel.SequenceCamera.SetTimeDilation(e),
			ModelManager_1.ModelManager.CameraModel.WidgetCamera.SetTimeDilation(e),
			ModelManager_1.ModelManager.CameraModel.OrbitalCamera.SetTimeDilation(e);
	}
	static PlayWorldCameraShake(e, a, t, r, o, i) {
		this.IsSettlementCamera() ||
			(0 < CameraController.Model.ShakeModify &&
				UE.GameplayStatics.PlayWorldCameraShakeWithModifier(
					GlobalData_1.GlobalData.World,
					e,
					a,
					t,
					r,
					o,
					i,
					CameraController.Model.ShakeModify,
				),
			this.PlayForceFeedbackFromCameraShake(e));
	}
	static PlayCameraShake(e, a = void 0, t = void 0, r = void 0, o = !1) {
		!Global_1.Global.CharacterCameraManager?.IsValid() ||
			this.IsSettlementCamera() ||
			(Global_1.Global.CharacterCameraManager.StartCameraShake(e, a, t, r),
			o && this.PlayForceFeedbackFromCameraShake(e));
	}
	static PlayForceFeedbackFromCameraShake(e) {
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			e?.IsChildOf(UE.BP_CameraShakeAndForceFeedback_C.StaticClass()) &&
			(e = UE.KuroStaticLibrary.GetDefaultObject(e).ForceFeedbackEffect) &&
			Global_1.Global.CharacterController &&
			Global_1.Global.CharacterController.PlayKuroForceFeedback(
				e,
				void 0,
				!1,
				!1,
				!1,
			);
	}
	static LoadCharacterCameraConfig(e) {
		this.FightCamera.LogicComponent.CameraConfigController.LoadCharacterConfig(
			e,
		);
	}
	static UnloadCharacterCameraConfig(e) {
		this.FightCamera.LogicComponent.CameraConfigController.UnloadCharacterConfig(
			e,
		);
	}
	static ReturnLockOnCameraMode(e = 0, a = 0, t = 0, r = () => {}) {
		if (0 !== this.Model.CameraMode) {
			let o = this.Model.CameraMode;
			for (; 0 !== o; )
				this.Model.DisableMode(o), (o = this.Model.GetNextMode());
			this.uhe(o, e, a, t, r);
		}
	}
	static IsSequenceCameraInCinematic() {
		var e = CameraController.SequenceCamera?.GetComponent(10);
		return !!e?.Valid && e.GetIsInCinematic();
	}
	static UpdateCameraDitherRadius() {
		if (!(Time_1.Time.Now < this.Model.NextFindStartHideDistanceTime)) {
			this.Model.NextFindStartHideDistanceTime =
				Time_1.Time.Now + CameraParams_1.FIND_DITHER_START_HIDE_DISTANCE_PERIOD;
			var e,
				a = [];
			ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
				CameraParams_1.DITHER_START_HIDE_DISTANCE_THRESHOLD,
				2,
				a,
			),
				(this.Model.CameraDitherStartHideDistance =
					this.FightCamera.LogicComponent.StartHideDistance);
			for (const t of a)
				t.Entity?.Active &&
					(!(e = t.Entity.GetComponent(3)) ||
						e.StartHideDistance <= this.Model.CameraDitherStartHideDistance ||
						(this.Model.CameraDitherStartHideDistance = e.StartHideDistance));
		}
	}
	static IsSettlementCamera() {
		return (
			!!this.FightCamera?.LogicComponent?.SettlementCamera &&
			this.FightCamera.LogicComponent.SettlementCamera.IsPlayingSettlementCamera()
		);
	}
	static StopAllCameraShakes() {
		Global_1.Global.CharacterCameraManager.StopAllCameraShakes();
	}
}
__decorate(
	[
		(0, PerformanceDecorators_1.PerformanceFunctionEx)(
			"CameraController.OnTick",
		),
	],
	CameraController,
	"OnTick",
	null,
),
	(exports.CameraController = CameraController);
