"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SeamlessTravelController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	InputController_1 = require("../../Input/InputController"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GameModePromise_1 = require("../../World/Define/GameModePromise"),
	WorldGlobal_1 = require("../../World/WorldGlobal");
class SeamlessTravelController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
	static StartTravel(e) {
		var a;
		return ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
			? (a =
					ModelManager_1.ModelManager.SeamlessTravelModel
						.SeamlessTravelController)?.IsValid()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:开始]"),
					(ModelManager_1.ModelManager.SeamlessTravelModel.InSeamlessTraveling =
						!0),
					WorldGlobal_1.WorldGlobal.PlayerClientTravel(a, e),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SeamlessTravel",
							30,
							"[无缝加载:失败]PlayerController无效",
						),
					!1)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SeamlessTravel",
						30,
						"[无缝加载:失败]未开启无缝加载模式",
					),
				!1);
	}
	static EnableSeamlessTravel(e, a, o) {
		if (!a?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SeamlessTravel",
						30,
						"[开启无缝加载:失败]PlayerController无效",
					),
				!1
			);
		const r = ModelManager_1.ModelManager.SeamlessTravelModel;
		(r.SeamlessTravelPlayer = e),
			(r.SeamlessTravelController = a),
			SeamlessTravelController.AddSeamlessTravelActor(e);
		var l =
			CameraController_1.CameraController.FightCamera.LogicComponent
				.CameraActor;
		return (
			(a.bUseSeamlessCameraActor = !0),
			(a.SeamlessCameraActor = l),
			SeamlessTravelController.AddSeamlessTravelActor(l),
			(r.SeamlessTravelCamera = l),
			o?.EffectPath &&
				((r.SeamlessTravelEffectPromise =
					new GameModePromise_1.GameModePromise()),
				(r.SeamlessTravelEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(
					a.GetWorld(),
					e.GetTransform(),
					o?.EffectPath,
					"无缝加载:过渡特效开始",
					void 0,
					3,
					void 0,
					(e, a) => {
						5 === e
							? (r.SeamlessTravelEffectPromise.SetResult(!0),
								SeamlessTravelController.AddSeamlessTravelActor(
									EffectSystem_1.EffectSystem.GetSureEffectActor(a),
								))
							: r.SeamlessTravelEffectPromise.SetResult(!1);
					},
					void 0,
					!1,
					!0,
				))),
			(r.IsSeamlessTravel = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:开启无缝加载模式]"),
			!0
		);
	}
	static AddSeamlessTravelActor(e) {
		ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e);
	}
	static SetSeamlessTravelPlayerEntity(e) {
		for (const a of e.Entity.Components)
			(0, RegisterComponent_1.isComponentInstance)(a, 3) ||
				(0, RegisterComponent_1.isComponentInstance)(a, 161) ||
				(0, RegisterComponent_1.isComponentInstance)(a, 52) ||
				(0, RegisterComponent_1.isComponentInstance)(a, 160) ||
				(0, RegisterComponent_1.isComponentInstance)(a, 82) ||
				a.Disable("无缝加载:关闭实体组件Tick");
		ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelPlayerEntity =
			e;
	}
	static PreLeaveLevel() {
		ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:PreLeaveLevel完成]");
	}
	static PostLeaveLevel() {
		ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:PostLeaveLevel完成]");
	}
	static async PreOpenLevel() {
		return (
			!!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			(ModelManager_1.ModelManager.SeamlessTravelModel
				.SeamlessTravelEffectPromise &&
				(
					await ModelManager_1.ModelManager.SeamlessTravelModel
						.SeamlessTravelEffectPromise.Promise
				).valueOf() &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:过渡特效加载完成]"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:PreOpenLevel完成]"),
			!0)
		);
	}
	static PostOpenLevel() {
		ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnEnterTransitionMap,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:PostOpenLevel完成]");
	}
	static PostLoadedLevel() {
		var e;
		ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			((e =
				ModelManager_1.ModelManager.SeamlessTravelModel
					.SeamlessTravelPlayerEntity)?.Valid ||
				((e = e.Entity.GetComponent(52)),
				InputController_1.InputController.RemoveInputHandler(e)),
			ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelPlayer.CharacterMovement.SetMovementMode(
				0,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:PostLoadedLevel完成]");
	}
	static FixBornLocation(e) {
		var a, o;
		ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			(Global_1.Global.BaseCharacter.CharacterMovement.SetMovementMode(0),
			Global_1.Global.BaseCharacter) &&
			(Global_1.Global.BaseCharacter.CharacterActorComponent.FixBornLocation(
				"[无缝加载:修正地面]",
				!0,
			),
			(o =
				CameraController_1.CameraController.FightCamera.LogicComponent
					.CameraRotation),
			(o =
				ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelPlayer.K2_GetActorRotation()
					.Yaw - o.Yaw),
			(e = e.BornRotation[2]),
			(o = new UE.Rotator(0, e + o, 0)),
			Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(
				o,
				"[无缝加载:修正朝向]",
			),
			Global_1.Global.BaseCharacter.CharacterMovement.SetMovementMode(1),
			(a = (o =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.Entity).GetComponent(160)) &&
				a.MainAnimInstance?.SyncAnimStates(void 0),
			o.GetComponent(161)?.StopAllAddMove(),
			o.GetComponent(158)?.ResetCharState(),
			(a =
				CameraController_1.CameraController.FightCamera.LogicComponent
					.InitialCameraPitch),
			(o = new UE.Rotator(a, e, 0)),
			CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
				o,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:FixBornLocation完成]");
	}
	static FinishSeamlessTravel() {
		var e = ModelManager_1.ModelManager.SeamlessTravelModel;
		EffectSystem_1.EffectSystem.StopEffectById(
			e.SeamlessTravelEffectHandle,
			"无缝加载:过渡特效结束",
			!1,
		),
			(e.SeamlessTravelEffectHandle = 0),
			(e.SeamlessTravelEffectPromise = void 0),
			(e.SeamlessTravelController.bUseSeamlessCameraActor = !1),
			(e.SeamlessTravelController.SeamlessCameraActor = void 0),
			(e.SeamlessTravelController = void 0),
			(e.SeamlessTravelPlayer = void 0),
			(e.SeamlessTravelCamera = void 0);
		var a =
			e.SeamlessTravelPlayerEntity.Entity.GetComponent(
				0,
			)?.GetCreatureDataId() ?? 0;
		ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
			a,
			"FinishSeamlessTravel",
			Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
		) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SeamlessTravel",
					30,
					"[SeamlessTravelController.FinishSeamlessTravel] 销毁主角实体失败。",
					["CreatureDataId", a],
				)),
			(e.SeamlessTravelPlayerEntity = void 0),
			ModelManager_1.ModelManager.SeamlessTravelModel.ClearSeamlessTravelActor(),
			(e.InSeamlessTraveling = !1),
			(e.IsSeamlessTravel = !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SeamlessTravel", 30, "[无缝加载:完成]");
	}
}
exports.SeamlessTravelController = SeamlessTravelController;
