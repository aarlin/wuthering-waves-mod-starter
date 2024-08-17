"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SimpleLevelSequenceActor_1 = require("./SimpleLevelSequenceActor");
class TsInteractiveSceneActor extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.EntityConfigId = 0),
			(this.Configs = void 0),
			(this.InteractiveType = 0),
			(this.WuYinQuName = ""),
			(this.LevelSequence = void 0),
			(this.EntityId = 0),
			(this.CurrentTag = void 0),
			(this.LevelSequenceActor = void 0),
			(this.OnGameplayTagChanged = void 0),
			(this.OnEntityCreate = void 0),
			(this.OnEntityRemove = void 0),
			(this.HandleWorldDone = void 0);
	}
	ReceiveBeginPlay() {
		(this.OnGameplayTagChanged = () => {
			this.CheckGameplayTagChange();
		}),
			(this.OnEntityCreate = (e, t, n) => {
				this.HandleEntityCreate(t);
			}),
			(this.OnEntityRemove = (e, t) => {
				this.HandleEntityRemove(t);
			}),
			(this.HandleWorldDone = () => {
				this.OnWorldDone();
			}),
			GlobalData_1.GlobalData.BpEventManager?.IsValid()
				? (ModelManager_1.ModelManager.GameModeModel?.WorldDone
						? this.OnWorldDone()
						: (GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
								this.HandleWorldDone,
							),
							GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(
								this.HandleWorldDone,
							)),
					this.SetActorTickEnabled(!1))
				: this.SetActorTickEnabled(!0);
	}
	ReceiveEndPlay() {
		this.LevelSequenceActor &&
			(this.LevelSequenceActor.Clear(), (this.LevelSequenceActor = void 0));
		var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
			this.EntityConfigId,
		);
		e?.Valid && this.SafeRemoveEntityGameplayTagEvent(e),
			this.OnEntityCreate &&
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.AddEntity,
					this.OnEntityCreate,
				) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddEntity,
					this.OnEntityCreate,
				),
			this.OnEntityRemove &&
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnEntityRemove,
				) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnEntityRemove,
				),
			GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
				this.HandleWorldDone,
			);
	}
	ReceiveTick(e) {
		GlobalData_1.GlobalData.BpEventManager &&
			(this.SetActorTickEnabled(!1),
			GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Remove(
				this.HandleWorldDone,
			),
			GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Add(
				this.HandleWorldDone,
			));
	}
	OnWorldDone() {
		var e;
		this.Configs?.Num() &&
			((e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.EntityConfigId,
			)),
			this.OnEntityCreate &&
				!EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.AddEntity,
					this.OnEntityCreate,
				) &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.AddEntity,
					this.OnEntityCreate,
				),
			this.OnEntityRemove &&
				!EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnEntityRemove,
				) &&
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveEntity,
					this.OnEntityRemove,
				),
			e?.Valid) &&
			((this.EntityId = e.Id),
			this.ApplyInteractionConfig(!0),
			this.SafeAddEntityGameplayTagEvent(e));
	}
	ApplyInteractionConfig(e) {
		var t = EntitySystem_1.EntitySystem.Get(this.EntityId);
		if (t?.Valid) {
			var n = t.GetComponent(177);
			if (n?.Valid) {
				for (let r = 0; r <= this.Configs.Num(); r++)
					if (this.Configs?.IsValidIndex(r)) {
						var a = this.Configs.GetKey(r);
						if (n.ContainsTag(a)) {
							if (this.CurrentTag === a)
								return void (
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Interaction",
										34,
										"监听实体无初始状态",
										["Actor EntityId", this.EntityId],
										["状态实体 EntityId", t.Id],
									)
								);
							this.CurrentTag = a;
							const n = this.Configs.Get(a);
							switch (this.InteractiveType) {
								case 0:
									(i = n.MaterialData.ToAssetPathName()) && "None" !== i
										? ResourceSystem_1.ResourceSystem.LoadAsync(
												n.MaterialData.ToAssetPathName(),
												UE.ItemMaterialControllerActorData_C,
												(e) => {
													if (e?.IsValid())
														for (let t = 0; t < n.ReferActors.Num(); t++)
															ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
																e,
																n.ReferActors.Get(t),
															);
												},
											)
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Interaction",
												7,
												"未配置对应MaterialData",
											);
									break;
								case 1:
									var i = this.WuYinQuName,
										o = n.WuYinQuState;
									ModelManager_1.ModelManager.RenderModuleModel.SetBattleState(
										i,
										o,
									),
										Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug(
												"Interaction",
												34,
												"设置无音区状态",
												["wuYinQuName", i],
												["wuYinQuState", o],
											);
									break;
								case 2:
									for (let e = 0; e < n.HideActors.Num(); e++)
										n.HideActors.Get(e)?.SetActorHiddenInGame(!0),
											n.HideActors.Get(e)?.SetActorEnableCollision(!1);
									for (let e = 0; e < n.ShowActors.Num(); e++)
										n.ShowActors.Get(e)?.SetActorHiddenInGame(!1),
											n.ShowActors.Get(e)?.SetActorEnableCollision(!0);
									break;
								case 3:
									break;
								case 4:
									if (!this.LevelSequence)
										return void (
											Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Interaction",
												34,
												"未配置对应LevelSequence",
												["name", this.GetName()],
											)
										);
									if (
										(o = n.LevelSequenceConfig).切入时间 < 0 ||
										o.切出时间 < 0
									)
										return void (
											Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Interaction",
												34,
												"镜头过渡时间应大于等于0",
												["name", this.GetName()],
											)
										);
									this.LevelSequenceActor ||
										(this.LevelSequenceActor =
											new SimpleLevelSequenceActor_1.default(
												this.LevelSequence,
											)),
										this.LevelSequenceActor.PlayToMarkOld(
											o.Mark,
											o.切入时间,
											o.切出时间,
											e,
										);
									break;
								case 5:
									n.MPCParams &&
										ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
											new UE.ItemMaterialControllerMPCData_C(),
										);
							}
						} else
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Interaction", 34, "Entity不存在tag ", [
									"key.TagName",
									a.TagName,
								]);
					}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Interaction",
						34,
						"tagComponent is invalid   EntityId: ",
						["this.EntityId", this.EntityId],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Interaction", 34, "Entity is invalid.    EntityId: ", [
					"this.EntityId",
					this.EntityId,
				]);
	}
	CheckGameplayTagChange() {
		this.ApplyInteractionConfig(!1);
	}
	HandleEntityCreate(e) {
		var t;
		e?.Valid &&
			(t = e.Entity.GetComponent(0))?.Valid &&
			t.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem &&
			t.GetPbDataId() === this.EntityConfigId &&
			((this.EntityId = e.Id),
			this.ApplyInteractionConfig(!0),
			this.SafeAddEntityGameplayTagEvent(e));
	}
	HandleEntityRemove(e) {
		var t;
		e?.Valid &&
			(t = e.Entity.GetComponent(0))?.Valid &&
			t.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_SceneItem &&
			t.GetPbDataId() === this.EntityConfigId &&
			((this.EntityId = 0), this.SafeRemoveEntityGameplayTagEvent(e));
	}
	SafeAddEntityGameplayTagEvent(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e.Entity,
			EventDefine_1.EEventName.OnGameplayTagChanged,
			this.OnGameplayTagChanged,
		) ||
			EventSystem_1.EventSystem.AddWithTarget(
				e.Entity,
				EventDefine_1.EEventName.OnGameplayTagChanged,
				this.OnGameplayTagChanged,
			);
	}
	SafeRemoveEntityGameplayTagEvent(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			e.Entity,
			EventDefine_1.EEventName.OnGameplayTagChanged,
			this.OnGameplayTagChanged,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e.Entity,
				EventDefine_1.EEventName.OnGameplayTagChanged,
				this.OnGameplayTagChanged,
			);
	}
}
exports.default = TsInteractiveSceneActor;
