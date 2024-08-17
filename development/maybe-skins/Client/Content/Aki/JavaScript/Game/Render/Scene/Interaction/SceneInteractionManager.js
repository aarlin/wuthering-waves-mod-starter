"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneInteractionManager = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig"),
	SceneInteractionLevel_1 = require("../Item/SceneInteractionLevel");
class SceneInteractionManager {
	constructor() {
		(this.IsOnMobile = !1),
			(this.UniqueLevelInstanceId = 0),
			(this.AllSceneInteractionInfos = void 0),
			(this.TempCacheIds = new Array()),
			(this.ActorMap = void 0),
			(this.MainPlayerConfig = void 0),
			(this.WaterObjects = void 0),
			(this.TempVector = void 0),
			(this.xie = () => {
				this.nOn();
			});
	}
	static Get() {
		return this.Instanced;
	}
	static Initialize() {
		this.Instanced ||
			((this.Instanced = new SceneInteractionManager()), this.Instanced.Init());
	}
	static Tick(e) {
		this.Instanced && this.Instanced.Tick(e / 1e3);
	}
	Init() {
		(this.IsOnMobile =
			0 ===
			UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
				GlobalData_1.GlobalData.World,
			)),
			(this.UniqueLevelInstanceId = 1),
			(this.AllSceneInteractionInfos = new Map()),
			(this.TempCacheIds.length = 0),
			(this.ActorMap = new Map()),
			(this.TempVector = Vector_1.Vector.Create()),
			(this.WaterObjects = new Array()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.xie,
			),
			this.LoadAssets();
	}
	nOn() {
		for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
			var e = t.EntityHandle?.Entity?.GetComponent(3)?.Owner;
			e &&
				(t.IsControl()
					? e.CharRenderingComponent?.AddInteraction(
							this.MainPlayerConfig,
							t.IsMyRole() ? 1 : 2,
						)
					: e.CharRenderingComponent?.RemoveInteraction());
		}
	}
	LoadAssets() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			"/Game/Aki/Render/Data/Interaction/DA_InteractionMainPlayerConfig.DA_InteractionMainPlayerConfig",
			UE.PDA_InteractionPlayerConfig_C,
			(e) => {
				(this.MainPlayerConfig = e), this.xie();
			},
		);
	}
	CreateSceneInteractionLevel(e, t, n, r, i, o = !0, c = !1) {
		if (!(I = GlobalData_1.GlobalData.World))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderScene", 12, "错误，获取不到World"),
				-1
			);
		let a = e;
		e.includes(".") && (a = e.split(".")[0]);
		e = this.UniqueLevelInstanceId;
		var s = (0, puerts_1.$ref)(!1),
			l = "KuroSceneInteraction_" + e,
			I = UE.LevelStreamingDynamic.LoadLevelInstance(I, a, n, r, s, l);
		return (0, puerts_1.$unref)(s) && I
			? ((l = new SceneInteractionLevel_1.SceneInteractionLevel()).Init(
					I,
					a,
					n,
					r,
					e,
					t,
					i,
					o,
					c,
				),
				this.UniqueLevelInstanceId++,
				this.AllSceneInteractionInfos.set(e, l),
				e)
			: -1;
	}
	DestroySceneInteraction(e) {
		var t = this.AllSceneInteractionInfos.get(e);
		if (t) {
			t.Destroy(), this.AllSceneInteractionInfos.delete(e);
			var n = t.GetAllActor();
			if (n)
				for (let e = 0; e < n.Num(); e++) {
					var r = n.Get(n.GetKey(e));
					this.ActorMap.has(r) && this.ActorMap.delete(r);
				}
			return !0;
		}
		return !1;
	}
	SwitchSceneInteractionToState(e, t, n, r, i = !1) {
		return (
			!!(e = this.AllSceneInteractionInfos.get(e)) &&
			e.SwitchToState(t, n, r, i)
		);
	}
	GetSceneInteractionCurrentState(e) {
		return (e = this.AllSceneInteractionInfos.get(e))
			? e.GetCurrentState()
			: 21;
	}
	PlaySceneInteractionEffect(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.PlaySceneEffect(t);
	}
	EndSceneInteractionEffect(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.EndSceneEffect(t);
	}
	PlaySceneInteractionEndEffect(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.PlaySceneEndEffect(t);
	}
	ChangeSceneInteractionPlayDirection(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.ChangePlayDirection(t);
	}
	IsSceneInteractionStreamingComplete(e) {
		return (
			!!(e = this.AllSceneInteractionInfos.get(e)) && e.IsStreamingComplete()
		);
	}
	ToggleSceneInteractionVisible(e, t, n = !1, r = void 0) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.ToggleLevelVisible(t, n, r);
	}
	GetSceneInteractionLevelName(e) {
		if ((e = this.AllSceneInteractionInfos.get(e))) return e.LevelName;
	}
	GetSceneInteractionMainActor(e) {
		if ((e = this.AllSceneInteractionInfos.get(e))) return e.MainActor;
	}
	GetSceneInteractionActorByKey(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e))) return e.GetActorByKey(t);
	}
	GetSceneInteractionAllKeyRefActors(e) {
		if ((e = this.AllSceneInteractionInfos.get(e))) return e.GetAllActor();
	}
	GetRefSceneInteractionActorsByTag(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetRefActorsByTag(t);
	}
	GetSceneInteractionAllActorsInLevel(e) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetAllActorsInLevel();
	}
	GetActorOriginalRelTransform(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetActorOriginalRelTransform(t);
	}
	AttachToActor(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.AttachToActor(t);
	}
	SetCollisionActorsOwner(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.SetCollisionActorsOwner(t);
	}
	AttachChildActor(e) {
		var t = this.AllSceneInteractionInfos.get(e);
		if (t) {
			var n = t.GetAllActor();
			for (let t = 0; t < n.Num(); t++) {
				var r = n.Get(n.GetKey(t));
				this.ActorMap.set(r, e);
			}
		}
	}
	EmitActor(e, t, n) {
		e &&
			((e = this.ActorMap.get(e)),
			(e = this.AllSceneInteractionInfos.get(e))) &&
			(e = e.GetAttachActor()) &&
			(e = ActorUtils_1.ActorUtils.GetEntityByActor(e)) &&
			EventSystem_1.EventSystem.EmitWithTarget(
				e,
				EventDefine_1.EEventName.SceneItemInteractionEvent,
				t,
				n,
			);
	}
	GetMainCollisionActor(e) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetMainCollisionActor();
	}
	GetPartCollisionActorTag(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetPartCollisionActorTag(t);
	}
	GetPartCollisionActorsNum(e) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetPartCollisionActorsNum();
	}
	GetInteractionEffectHookActors(e) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetInteractionEffectHookActors();
	}
	GetActiveTagSequencePlaybackProgress(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetActiveTagSequencePlaybackProgress(t);
	}
	SetActiveTagSequencePlaybackProgress(e, t, n) {
		(e = this.AllSceneInteractionInfos.get(e)) &&
			e.SetActiveTagSequencePlaybackProgress(t, n);
	}
	GetActiveTagSequenceDurationTime(e, t) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetActiveTagSequenceDurationTime(t);
	}
	SetActiveTagSequenceDurationTime(e, t, n) {
		(e = this.AllSceneInteractionInfos.get(e)) &&
			e.SetActiveTagSequenceDurationTime(t, n);
	}
	PauseActiveTagSequence(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.PauseActiveTagSequence(t);
	}
	ResumeActiveTagSequence(e, t, n = !1) {
		(e = this.AllSceneInteractionInfos.get(e)) &&
			e.ResumeActiveTagSequence(t, n);
	}
	RegisterWaterEffectObject(e) {
		this.WaterObjects.push(e), e.AfterRegistered();
	}
	UnregisterWaterEffectObject(e) {
		var t = this.WaterObjects.findIndex((t) => t === e);
		-1 === t
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						26,
						"要移除的SceneObjectWaterEffect不存在队列中",
					),
				e && e.BeforeUnregistered())
			: (e.BeforeUnregistered(),
				(this.WaterObjects[t] =
					this.WaterObjects[this.WaterObjects.length - 1]),
				this.WaterObjects.pop());
	}
	PlayExtraEffectByTag(e, t, n) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.PlayExtraEffect(t, n);
	}
	StopExtraEffectByTag(e, t) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.StopExtraEffect(t);
	}
	UpdateHitInfo(e, t, n) {
		(e = this.AllSceneInteractionInfos.get(e)) && e.UpdateHitInfo(t, n);
	}
	GetReceivingDecalsActors(e) {
		if ((e = this.AllSceneInteractionInfos.get(e)))
			return e.GetReceivingDecalsActors();
	}
	Tick(e) {
		for (let t = 0, n = this.WaterObjects.length; t < n; t++)
			this.WaterObjects[t].Update(e);
		this.TempCacheIds.length = 0;
		for (const e of this.AllSceneInteractionInfos.keys())
			this.TempCacheIds.push(e);
		for (const e of this.TempCacheIds) {
			var t = this.AllSceneInteractionInfos.get(e);
			t && !t.IsInfoDestroyed() && t.Update();
		}
	}
}
(exports.SceneInteractionManager = SceneInteractionManager).Instanced = void 0;
