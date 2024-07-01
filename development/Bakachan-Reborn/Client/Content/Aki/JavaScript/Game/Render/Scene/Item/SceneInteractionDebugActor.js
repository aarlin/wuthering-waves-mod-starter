"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneInteractionDebugActor = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	RenderModuleController_1 = require("../../Manager/RenderModuleController"),
	SceneInteractionManager_1 = require("../Interaction/SceneInteractionManager");
class SceneInteractionDebugActor extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.HandleId = 0),
			(this.EffectKey = void 0),
			(this.DebugActorRef = void 0),
			(this.DebugActorKey = ""),
			(this.NeedTransition = !1),
			(this.Force = !1),
			(this.LevelName = ""),
			(this.InitState = void 0),
			(this.CountNumber = 1),
			(this.BaseForce = 0),
			(this.OriginOffset = new UE.Vector(0, 0, 0)),
			(this.DamageRadius = 0),
			(this.ImpluseFactor = 0);
	}
	ReceiveBeginPlay() {
		this.HandleId = -1;
	}
	ChangeState1() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state1"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				0,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState2() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state2"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				1,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState3() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state3"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				2,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState4() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state4"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				3,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState5() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state5"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				4,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState6() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state6"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				5,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState7() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state7"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				6,
				this.NeedTransition,
				this.Force,
			);
	}
	ChangeState8() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderScene", 12, "change state8"),
			0 <= this.HandleId) &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.HandleId,
				7,
				this.NeedTransition,
				this.Force,
			);
	}
	Create() {
		if (RenderModuleController_1.RenderModuleController.IsRuntime()) {
			Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 12, "create"),
				0 <= this.HandleId && this.Remove();
			let e = this.LevelName;
			e.startsWith("World'") &&
				(e = (e = this.LevelName.replace("World'", "")).split(".")[0]),
				(this.HandleId =
					SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(
						e,
						this.InitState,
						this.K2_GetActorLocation(),
						this.K2_GetActorRotation(),
						() => {
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("RenderScene", 12, "level streaming complete");
						},
					));
		}
	}
	Remove() {
		RenderModuleController_1.RenderModuleController.IsRuntime() &&
			(Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 12, "remove"),
			0 <= this.HandleId) &&
			(SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(
				this.HandleId,
			),
			(this.HandleId = -1),
			(this.DebugActorRef = void 0));
	}
	PrintState() {
		0 <= this.HandleId
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"RenderScene",
					14,
					"当前状态",
					[
						"状态",
						SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionCurrentState(
							this.HandleId,
						) + 1,
					],
					["Actor", this.GetName()],
				)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderScene", 14, "SceneInteractionActor未生成", [
					"Actor",
					this.GetName(),
				]);
	}
	PlaySceneEffect() {
		0 <= this.HandleId
			? SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(
					this.HandleId,
					this.EffectKey,
				)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderScene", 14, "SceneInteractionActor未生成", [
					"Actor",
					this.GetName(),
				]);
	}
	ChangeDirection() {
		0 <= this.HandleId &&
			((this.CountNumber += 1),
			SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(
				this.HandleId,
				this.CountNumber % 2 == 0,
			));
	}
	GetDebugActorRefByKey() {
		var e;
		0 <= this.HandleId &&
			((e =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
					this.HandleId,
					this.DebugActorKey,
				)),
			(this.HandleId = -1),
			(this.DebugActorRef = e));
	}
	TestDestroyed() {
		var e =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
					this.HandleId,
				),
			n = (0, puerts_1.$ref)(void 0),
			t = (e?.GetAttachedActors(n), (0, puerts_1.$unref)(n));
		for (let e = 0; e < t.Num(); e++) {
			var o = t.Get(e);
			o &&
				((o.DamageRadius = this.DamageRadius),
				(o.OriginOffset = this.OriginOffset),
				(o.BaseForce = this.BaseForce),
				(o.ImpluseFactor = this.ImpluseFactor),
				Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("RenderScene", 14, "ceshi1" + o.DamageRadius),
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderScene", 14, "ceshi2");
		}
	}
}
(exports.SceneInteractionDebugActor = SceneInteractionDebugActor),
	(exports.default = SceneInteractionDebugActor);
