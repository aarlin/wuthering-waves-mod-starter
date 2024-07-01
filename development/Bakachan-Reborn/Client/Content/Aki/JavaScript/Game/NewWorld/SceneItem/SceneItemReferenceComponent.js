"use strict";
var SceneItemReferenceComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var i,
				r = arguments.length,
				a =
					r < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, n, o);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(i = e[s]) &&
						(a = (r < 3 ? i(a) : 3 < r ? i(t, n, a) : i(t, n)) || a);
			return 3 < r && a && Object.defineProperty(t, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemReferenceComponent =
		exports.TransitStruct =
		exports.AIR_WALL =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Queue_1 = require("../../../Core/Container/Queue"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
	SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor"),
	StaticSceneUtils_1 = require("../../LevelGamePlay/StaticScene/StaticSceneUtils"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ReferenceTriggerVolumeLogic_1 = require("../TriggerItems/ReferenceTriggerVolumeLogic"),
	DEBUG_DETAIL_KEY_PREFIX = "SceneItemReferenceComponent",
	WALL_COMMON_COLLISION_NAME = new UE.FName("InvisibleWallCommon"),
	WALL_HUGE_BOSS_COLLISION_NAME = new UE.FName("InvisibleWallHugeBoss"),
	WALL_ONLY_BULLET_COLLISION_NAME = new UE.FName("InvisibleWallBulletOnly"),
	WALL_ONLY_MONSTER_COLLISION_NAME = new UE.FName("InvisibleWallMonsterOnly"),
	PLANEWIDTH =
		((exports.AIR_WALL = new UE.FName("AirWall")), new UE.FName("PlaneWidth")),
	CIRCLERADIUS = new UE.FName("CircleRadius"),
	PLANEHEIGHT = new UE.FName("PlaneHeight"),
	DEFAULT_HIT_CD = 1,
	DEFAULT_THICKNESS = 100,
	PATH_LENGTH = 3;
class TransitStruct {
	constructor(e = 0, t = void 0, n = void 0, o = void 0, i = !1, r = void 0) {
		(this.TransitType = 0),
			(this.Duration = void 0),
			(this.TransitFadeIn = void 0),
			(this.TransitFadeOut = void 0),
			(this.IsValid = void 0),
			(this.Mask = void 0),
			(this.TransitType = e),
			(this.Duration = t),
			(this.TransitFadeIn = n),
			(this.TransitFadeOut = o),
			(this.IsValid = i),
			(this.Mask = r);
	}
}
exports.TransitStruct = TransitStruct;
let SceneItemReferenceComponent =
	(SceneItemReferenceComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.SIe = void 0),
				(this.Hte = void 0),
				(this.Xte = void 0),
				(this.Lo = void 0),
				(this.CMn = void 0),
				(this.gMn = void 0),
				(this.Usi = !1),
				(this.Lln = void 0),
				(this.fMn = void 0),
				(this.gU = !0),
				(this.pMn = void 0),
				(this.vMn = void 0),
				(this.MMn = new Map()),
				(this.SMn = new Map()),
				(this.EMn = new Map()),
				(this.gme = void 0),
				(this.yMn = void 0),
				(this.IMn = void 0),
				(this.TMn = void 0),
				(this.LMn = void 0),
				(this.DMn = new Queue_1.Queue()),
				(this.UAn = !1),
				(this.RAn = void 0),
				(this.xAn = void 0),
				(this.PAn = void 0),
				(this.RMn = (e) => {
					(this.gU = !1), this.IMn?.clear(), this.wAn();
				}),
				(this.wAn = () => {
					var e;
					this.xAn
						? this.PAn === this.RAn
							? ((this.xAn = void 0), (this.PAn = void 0), (this.RAn = void 0))
							: ((e = LevelGeneralContextDefine_1.EntityContext.Create(
									this.Entity.Id,
								)),
								ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
									this.xAn,
									e,
									this.wAn,
								),
								(this.RAn = this.PAn),
								(this.xAn = void 0),
								(this.PAn = void 0))
						: (this.UAn = !1);
				}),
				(this.qen = () => {
					var e;
					this.Usi
						? this.AMn()
						: ((e = this.SIe.GetPbDataId()),
							ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
								DEBUG_DETAIL_KEY_PREFIX + "_" + e,
							) &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"SceneItem",
									40,
									"[RefComp] [疑难杂症] 实体状态改变，引用的actor未全部加载，继续等待",
									["PbDataId", this.SIe?.GetPbDataId()],
									["IsReady", this.Usi],
								));
				}),
				(this.Oen = () => {
					var e;
					this.Usi
						? this.AMn(!0)
						: ((e = this.SIe.GetPbDataId()),
							ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
								DEBUG_DETAIL_KEY_PREFIX + "_" + e,
							) &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"SceneItem",
									40,
									"[RefComp] 实体状态预改变，引用的actor未全部加载，继续等待",
									["PbDataId", this.SIe?.GetPbDataId()],
									["IsReady", this.Usi],
								));
				}),
				(this.UMn = (e) => {
					var t = this.CMn.indexOf(e.toString());
					0 <= t &&
						(this.CMn.splice(t, 1),
						this.CMn.length <= 0 && ((this.Usi = !0), this.AMn()),
						this.LMn) &&
						(t = this.Lln.GetActor(e)) instanceof UE.Volume &&
						this.LMn.AddVolume(e.toString(), t);
				}),
				(this.PMn = (e) => {
					this.gMn.has(e.toString()) &&
						(this.CMn.push(e.toString()),
						(this.Usi = !1),
						(this.gU = !0),
						this.fMn && (this.fMn.Clear(), (this.fMn = void 0)),
						this.LMn) &&
						this.LMn.RemoveVolume(e.toString());
				});
		}
		static get Dependencies() {
			return [182, 177];
		}
		OnInitData(e) {
			return (
				(e = e.GetParam(SceneItemReferenceComponent_1)[0]), (this.Lo = e), !0
			);
		}
		OnInit() {
			return (
				this.Lo.VolumesRef?.length &&
					(this.LMn =
						new ReferenceTriggerVolumeLogic_1.ReferenceTriggerVolumeLogic(
							this.Lo.VolumesRef,
						)),
				!0
			);
		}
		OnStart() {
			return (
				(this.Lln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.KuroActorSubsystem.StaticClass(),
				)),
				(this.Hte = this.Entity.GetComponent(182)),
				(this.Xte = this.Entity.GetComponent(177)),
				(this.SIe = this.Entity.GetComponent(0)),
				this.xMn(),
				this.wMn(),
				this.Lln.OnAddToSubsystem.Add(this.UMn),
				this.Lln.OnRemoveFromSubsystem.Add(this.PMn),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.qen,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
					this.Oen,
				),
				!0
			);
		}
		ResetToInitState(e, t) {
			for (const o of this.Lo.ActorRefGroups) {
				var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
				if (n && o.EntityState === e)
					return void (0 < o.Actions?.length
						? (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"SceneItem",
									7,
									"[SceneItemReference]执行初始状态的action",
									["entityId", this.Entity.Id],
									["state", o.EntityState],
								),
							(this.gU = !0),
							(n = LevelGeneralContextDefine_1.EntityContext.Create(
								this.Entity.Id,
							)),
							ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
								o.Actions,
								n,
								t,
							))
						: t(1));
			}
		}
		xMn() {
			if (
				((this.CMn = []),
				(this.gMn = new Set()),
				this.Lo.ActorRefGroups.length || this.Lo.VolumesRef?.length)
			) {
				var e = this.Hte.CreatureData.GetPbDataId(),
					t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e);
				if (t) {
					for (const e of t)
						this.CMn.push(e.PathName.split(".")[1] + "." + e.ActorName),
							this.gMn.add(e.PathName.split(".")[1] + "." + e.ActorName);
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"SceneItem",
							34,
							"实体引用actor路径",
							["pbDataId", e],
							["actorList", this.CMn],
						);
				}
			}
		}
		wMn() {
			var e = [];
			for (const n of this.CMn) {
				var t = this.Lln.GetActor(new UE.FName(n));
				t
					? this.LMn && t instanceof UE.Volume && this.LMn.AddVolume(n, t)
					: e.push(n);
			}
			(this.CMn = e), this.CMn.length <= 0 && ((this.Usi = !0), this.AMn());
		}
		TryReInitRefActor() {
			this.Usi
				? Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						40,
						"尝试重新InitRefActor: 已初始化过，不执行",
						["pbDataId", this.Hte.CreatureData.GetPbDataId()],
					)
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"SceneItem",
							40,
							"尝试重新InitRefActor: 开始",
							["pbDataId", this.Hte.CreatureData.GetPbDataId()],
							["IsReady", this.Usi],
							["actorList", this.CMn],
						),
					this.wMn(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"SceneItem",
							40,
							"尝试重新InitRefActor: 结束",
							["pbDataId", this.Hte.CreatureData.GetPbDataId()],
							["IsReady", this.Usi],
							["actorList", this.CMn],
						));
		}
		AMn(e = !1) {
			for (const o of this.Lo.ActorRefGroups) {
				var t,
					n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o.EntityState);
				n &&
					this.Xte.HasTag(n) &&
					0 < o.Actions?.length &&
					(!e && 0 < this.DMn.Size && this.DMn.Front === n
						? this.DMn.Pop()
						: ((t = this.SIe.GetPbDataId()),
							ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
								DEBUG_DETAIL_KEY_PREFIX + "_" + t,
							) &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"SceneItem",
									40,
									"[RefComp] [疑难杂症] 执行对应状态的action",
									["PbDataId", t],
									["CreatureDataId", this.SIe?.GetCreatureDataId()],
									["EntityId", this.Entity.Id],
									["State", o.EntityState],
									["IsPrechange", e],
									["Actions", o.Actions],
								),
							(t = LevelGeneralContextDefine_1.EntityContext.Create(
								this.Entity.Id,
							)),
							this.UAn
								? ((this.xAn = o.Actions), (this.PAn = n))
								: (ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
										o.Actions,
										t,
										this.RMn,
									),
									(this.RAn = n),
									(this.UAn = !0)),
							e && this.DMn.Push(n)));
			}
		}
		OnClear() {
			if (
				(EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStateChange,
					this.qen,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStateChange,
						this.qen,
					),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
					this.Oen,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
						this.Oen,
					),
				this.fMn?.Clear(),
				this.pMn)
			)
				for (const e of this.pMn.values())
					EffectSystem_1.EffectSystem.IsValid(e) &&
						EffectSystem_1.EffectSystem.StopEffectById(
							e,
							"[SceneItemReferenceComponent.OnClear]",
							!1,
						);
			return (
				this.BMn(),
				this.LMn && (this.LMn.Destroy(), (this.LMn = void 0)),
				this.Lln?.IsValid() &&
					(this.Lln.OnAddToSubsystem.Remove(this.UMn),
					this.Lln.OnRemoveFromSubsystem.Remove(this.PMn)),
				!0
			);
		}
		HandleActorMaterial(e) {
			switch (e.Config.Type) {
				case "ChangeMaterialData":
					this.bMn(
						e.Config.MaterialData,
						e.ActorRefs.map((e) => e.PathName),
					);
					break;
				case "ChangeMPC":
					this.qMn(e.Config.MpcData);
			}
		}
		bMn(e, t) {
			e && "None" !== e
				? t.length
					? (this.IMn || (this.IMn = new Map()),
						this.TMn || (this.TMn = new Map()),
						ResourceSystem_1.ResourceSystem.LoadAsync(
							e,
							UE.ItemMaterialControllerActorData_C,
							(e) => {
								if (e?.IsValid())
									for (const i of t) {
										var n = i.split(".");
										if (n.length < 3)
											Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"LevelEvent",
													7,
													"[ReferenceComponent:ChangeMaterial]actor路径错误",
													["RefPath", i],
												);
										else if (
											((n = new UE.FName(n[1] + "." + n[2])),
											(n = this.Lln.GetActor(n)),
											n?.IsValid())
										) {
											if (!this.IMn.get(i)) {
												this.IMn.set(i, !0);
												var o = this.TMn.get(i);
												if (o && o.length) {
													for (const e of o)
														ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
															e,
														);
													(o.length = 0), this.TMn.set(i, o);
												}
											}
											o =
												ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
													e,
													n,
												);
											let t = this.TMn.get(i);
											(t = t || new Array()).push(o), this.TMn.set(i, t);
										}
									}
								else
									Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"LevelEvent",
											7,
											"此LevelEvent只能配置在SceneActorRefComponent中",
										);
							},
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							7,
							"[ReferenceComponent]目标actor未配置",
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						7,
						"[ReferenceComponent]未配置对应MaterialData",
					);
		}
		qMn(e) {
			e && "None" !== e
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						e,
						UE.ItemMaterialControllerMPCData_C,
						(e) => {
							e?.IsValid() ||
								(Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										7,
										"此LevelEvent只能配置在SceneActorRefComponent中",
									)),
								ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
									e,
								);
						},
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						7,
						"[ReferenceComponent]未配置对应MPCData",
					);
		}
		HandleSequence(e) {
			(e.LevelSequencePath && "None" !== e.LevelSequencePath) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Interaction", 7, "LevelSequence"));
			const t = this.gU;
			let n, o, i;
			(o = e.Intro
				? 0 === e.Intro?.Type
					? ((n = e.Intro),
						new TransitStruct(
							0,
							n.Duration && 0 < n.Duration ? n.Duration : 0,
							0,
							0,
							!0,
						))
					: ((n = e.Intro),
						new TransitStruct(
							1,
							n.Duration && 0 < n.Duration ? n.Duration : 0,
							n.FadeIn && 0 < n.FadeIn.Duration ? n.FadeIn.Duration : 1,
							n.FadeOut && 0 < n.FadeOut.Duration ? n.FadeOut.Duration : 1,
							!0,
							n.Mask,
						))
				: new TransitStruct(0, 0, 0, 0, !1)),
				(i = e.Outro
					? 0 === e.Outro?.Type
						? ((n = e.Outro),
							new TransitStruct(
								0,
								n.Duration && 0 < n.Duration ? n.Duration : 0,
								0,
								0,
								!0,
							))
						: ((n = e.Outro),
							new TransitStruct(
								1,
								n.Duration && 0 < n.Duration ? n.Duration : 0,
								n.FadeIn && 0 < n.FadeIn.Duration ? n.FadeIn.Duration : 1,
								n.FadeOut && 0 < n.FadeOut.Duration ? n.FadeOut.Duration : 1,
								!0,
								n.Mask,
							))
					: new TransitStruct(0, 0, 0, 0, !1)),
				ResourceSystem_1.ResourceSystem.LoadAsync(
					e.LevelSequencePath,
					UE.LevelSequence,
					(n) => {
						n?.IsValid()
							? (this.fMn
									? this.fMn.SetSequenceData(n)
									: (this.fMn = new SimpleLevelSequenceActor_1.default(n)),
								this.fMn.UpdateSettings(e.KeepUI),
								"direct" !== e.PlayMode && "shortestPath" === e.PlayMode
									? this.fMn.PlayToMarkByCheckWay(e.Mark, o, i, t)
									: this.fMn.PlayToMark(e.Mark, o, i, t))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelEvent",
									7,
									"此LevelEvent只能配置在SceneActorRefComponent中",
								);
					},
				);
		}
		ForceEnterSeqCamera() {
			return this.fMn
				? this.fMn.ForceSwitchSceneCamera(!0)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneGameplay",
							46,
							"时间控制装置启动请求:失败，SimpleSequenceActor为空",
						),
					!1);
		}
		ForceExitSeqCamera() {
			return !!this.fMn && this.fMn.ForceSwitchSceneCamera(!1);
		}
		HandleAirWall(e) {
			let t,
				n = !1;
			switch ((this.pMn || (this.pMn = new Map()), e.Option.Type)) {
				case IAction_1.EToggleAirWall.Open:
					(n = !0), (t = e.Option);
				case IAction_1.EToggleAirWall.Close:
			}
			for (const s of e.ActorRefs) {
				if ((o = s.PathName.split(".")).length < 3)
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							7,
							"[ReferenceComponent:ChangeMaterial]actor路径错误",
							["RefPath", s],
						);
				else {
					var o = o[1] + "." + o[2],
						i = new UE.FName(o),
						r = this.Lln.GetActor(i);
					if (r?.IsValid() && r instanceof UE.Brush) {
						var a = r.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
						switch (t?.CollisionPreset) {
							case IAction_1.EAirWallCollisionPreset.HugeBoss:
								a.SetCollisionProfileName(WALL_HUGE_BOSS_COLLISION_NAME);
								break;
							case IAction_1.EAirWallCollisionPreset.OnlyBullet:
								a.SetCollisionProfileName(WALL_ONLY_BULLET_COLLISION_NAME);
								break;
							case IAction_1.EAirWallCollisionPreset.OnlyMonster:
								a.SetCollisionProfileName(WALL_ONLY_MONSTER_COLLISION_NAME);
								break;
							default:
								a.SetCollisionProfileName(WALL_COMMON_COLLISION_NAME);
						}
						r.Tags.Add(exports.AIR_WALL),
							r.SetActorEnableCollision(n),
							t
								? (this.vMn || (this.vMn = new Array()),
									this.vMn.includes(i) || this.vMn.push(i),
									this.GMn(o, r, t))
								: n ||
									(r.OnActorHit.Clear(),
									(i = this.pMn?.get(o)),
									EffectSystem_1.EffectSystem.IsValid(i ?? 0) &&
										EffectSystem_1.EffectSystem.StopEffectById(
											i,
											"[SceneItemReferenceComponent.HandleAirWall]",
											!1,
										),
									this.MMn.delete(r.GetName()),
									this.SMn.delete(r.GetName()),
									this.EMn.delete(r.GetName()));
					}
				}
			}
		}
		BMn() {
			if (this.vMn?.length) {
				for (const t of this.vMn) {
					var e = this.Lln.GetActor(t);
					e?.IsValid() && (e.OnActorHit.Clear(), e.SetActorEnableCollision(!1));
				}
				(this.vMn.length = 0),
					this.MMn.clear(),
					this.SMn.clear(),
					this.EMn.clear();
			}
		}
		GMn(e, t, n) {
			var o = n.AirWallEffectData ?? "";
			if (o) {
				const i = t.GetTransform();
				i.SetScale3D(Vector_1.Vector.OneVector),
					EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.World,
						i,
						o,
						"[SceneItemReferenceComponent.SpawnAirWallEffect]",
						new EffectContext_1.EffectContext(this.Entity.Id),
						3,
						void 0,
						(o, r) => {
							var a, s, l, c;
							5 !== o
								? Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										7,
										"[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败",
										["Result", o],
										["PbDataId", this.SIe?.GetPbDataId()],
									)
								: this.vMn?.length &&
									t?.IsValid() &&
									((o = t.BrushComponent.Bounds),
									(a = EffectSystem_1.EffectSystem.GetNiagaraComponent(r)),
									t.SetActorEnableCollision(!1),
									t.RootComponent.SetMobility(2),
									t.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, !0),
									(s = new Rotator_1.Rotator(
										i.Rotator().Pitch,
										i.Rotator().Yaw,
										i.Rotator().Roll,
									)),
									(c = n.AirWallEffectThickness ?? 100),
									(c = o?.BoxExtent.X - c / 2),
									(l = n.AirWallEffectHeight ?? 0),
									a?.SetFloatParameter(PLANEWIDTH, 2 * o?.BoxExtent.X),
									a?.SetFloatParameter(CIRCLERADIUS, c),
									l && a?.SetFloatParameter(PLANEHEIGHT, l),
									o?.BoxExtent.Z &&
										((c = Vector_1.Vector.Create(0, 0, -o?.BoxExtent.Z)),
										EffectSystem_1.EffectSystem.GetEffectActor(
											r,
										)?.K2_AddActorWorldOffset(c.ToUeVector(), !1, void 0, !0)),
									t.K2_SetActorRotation(s.ToUeRotator(), !0),
									t.RootComponent.SetMobility(0),
									t.SetActorEnableCollision(!0),
									this.pMn.set(e, r));
						},
						void 0,
						!1,
						!0,
					);
			}
			(o = n.HitEffectData ?? "") &&
				(this.SMn.set(t.GetName(), o),
				this.MMn.set(t.GetName(), n.HitCd || 1),
				t.OnActorHit.Add((e, t, n, o) => {
					this.ExecuteHitWall(e, t, n, o);
				}));
		}
		ExecuteHitWall(e, t, n, o) {
			var i, r;
			t?.IsValid() &&
				t instanceof TsBaseCharacter_1.default &&
				void 0 !== (i = this.MMn.get(e.GetName())) &&
				(i <= 0
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							7,
							"[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行",
						)
					: o.bBlockingHit &&
						(t = t.CharacterActorComponent) &&
						t.CreatureData.GetEntityType() ===
							Protocol_1.Aki.Protocol.HBs.Proto_Player &&
						t.IsWorldOwner() &&
						((t = TimeUtil_1.TimeUtil.GetServerTime()),
						(void 0 !== (r = this.EMn.get(e.GetName())) && t < r) ||
							(this.EMn.set(e.GetName(), t + i),
							this.gme || (this.gme = Vector_1.Vector.Create(0, 0, 0)),
							this.yMn || (this.yMn = Quat_1.Quat.Create(0, 0, 0, 1)),
							Vector_1.Vector.CrossProduct(
								Vector_1.Vector.ForwardVectorProxy,
								Vector_1.Vector.Create(o.Normal),
								this.gme,
							),
							this.gme.Normalize(),
							(r = Math.acos(
								Vector_1.Vector.DotProduct(
									Vector_1.Vector.ForwardVectorProxy,
									Vector_1.Vector.Create(o.Normal),
								),
							)),
							Quat_1.Quat.ConstructorByAxisAngle(this.gme, r, this.yMn),
							this.NMn(e, this.yMn.ToUeQuat(), o.ImpactPoint))));
		}
		NMn(e, t, n) {
			(t = new UE.Transform(t, n, Vector_1.Vector.OneVector)),
				(n = this.SMn.get(e.GetName())),
				EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
					GlobalData_1.GlobalData.World,
					t,
					n,
					"[SceneItemReferenceComponent.ExecuteHitWall]",
				);
		}
		AddOnPlayerOverlapCallback(e) {
			this.LMn?.AddOnPlayerOverlapCallback(e);
		}
		RemoveOnPlayerOverlapCallback(e) {
			this.LMn?.RemoveOnPlayerOverlapCallback(e);
		}
		OnChangeTimeDilation(e) {
			var t = this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
			this.fMn?.SetTimeDilation(e * t);
		}
		IsValidPlatFormPath(e) {
			return this.gMn.has(e);
		}
	});
(SceneItemReferenceComponent = SceneItemReferenceComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(147)],
		SceneItemReferenceComponent,
	)),
	(exports.SceneItemReferenceComponent = SceneItemReferenceComponent);
