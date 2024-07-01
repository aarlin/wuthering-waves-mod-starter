"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, a) {
		var o,
			r = arguments.length,
			i =
				r < 3
					? t
					: null === a
						? (a = Object.getOwnPropertyDescriptor(t, n))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, n, a);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (i = (r < 3 ? o(i) : 3 < r ? o(t, n, i) : o(t, n)) || i);
		return 3 < r && i && Object.defineProperty(t, n, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemActorComponent = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	TsEffectActor_1 = require("../../Effect/TsEffectActor"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RenderConfig_1 = require("../../Render/Config/RenderConfig"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
	BaseActorComponent_1 = require("../Common/Component/BaseActorComponent"),
	PROFILE_KEY = "SceneItemActorFixBornLocation",
	FIX_SPAWN_TRACE_UP = 20,
	FIX_SPAWN_TRACE_DOWN = -1e3;
let SceneItemActorComponent = class extends BaseActorComponent_1.BaseActorComponent {
	constructor() {
		super(...arguments),
			(this.Smn = void 0),
			(this.StaticMeshComponent = void 0),
			(this.Emn = 1),
			(this.J6e = -1),
			(this.ymn = void 0),
			(this.Imn = !1),
			(this.Tmn = !1),
			(this.Lmn = void 0),
			(this.uoi = void 0),
			(this.Dmn = void 0),
			(this.Rmn = 4),
			(this.Amn = void 0),
			(this.THs = !0),
			(this.Umn = 0),
			(this.Pmn = void 0),
			(this.n8e = () => {
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						18,
						"Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
						["造物点ID", this.CreatureDataInternal.GetOwnerId()],
						["model表Id", this.CreatureDataInternal.GetModelConfig().ID],
					),
					this.xmn(),
					this.Entity.ChangeTickInterval(0);
			}),
			(this.wmn = (e) => {
				this.RefreshShowActor();
			}),
			(this.Bmn = void 0);
	}
	get CurLevelPrefabShowActor() {
		return this.Amn;
	}
	get Extent() {
		return (0, puerts_1.$unref)(this.Dmn);
	}
	get Origin() {
		return (0, puerts_1.$unref)(this.uoi);
	}
	get SkeletalMesh() {
		return this.Smn;
	}
	get StaticMesh() {
		return this.StaticMeshComponent;
	}
	GetStaticMeshComponent() {
		return this.StaticMeshComponent;
	}
	GetPrimitiveComponent() {
		return this.Smn ?? this.StaticMeshComponent;
	}
	GetInteractionMainActor() {
		if (-1 !== this.J6e)
			return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
				this.J6e,
			);
	}
	HasMesh() {
		return !!this.Smn?.SkeletalMesh || !!this.StaticMeshComponent?.StaticMesh;
	}
	bmn() {
		var e;
		this.Amn === this.ActorInternal
			? (this.Umn = 0)
			: (this.Pmn || (this.Pmn = (0, puerts_1.$ref)(void 0)),
				this.Amn &&
					(this.Amn.GetActorBounds(!1, void 0, this.Pmn),
					(e = (0, puerts_1.$unref)(this.Pmn)),
					(this.Umn = e.Size() / 2)));
	}
	get PrefabRadius() {
		return this.Umn;
	}
	GetRadius() {
		if (!this.HasMesh()) return 0;
		let e;
		return (
			this.Smn
				? (e = this.Smn.CachedWorldSpaceBounds)
				: this.StaticMeshComponent && (e = this.StaticMeshComponent.Bounds),
			e && e.BoxExtent ? e.BoxExtent.Y : 0
		);
	}
	GetSceneInteractionLevelHandleId() {
		return this.J6e;
	}
	get PhysicsMode() {
		return this.Emn;
	}
	set PhysicsMode(e) {
		if (this.Emn !== e) {
			this.Emn = e;
			var t = this.GetPrimitiveComponent();
			switch (e) {
				case 0:
					t.SetSimulatePhysics(!1),
						t.SetPhysicsLinearVelocity(new UE.Vector()),
						t.SetPhysicsAngularVelocity(new UE.Vector());
					break;
				case 1:
				case 3:
					t.SetSimulatePhysics(!0), t.SetEnableGravity(!0);
					break;
				case 2:
					t.SetSimulatePhysics(!0), t.SetEnableGravity(!1);
			}
		}
	}
	OnInitData() {
		return (
			super.OnInitData(),
			(this.uoi = (0, puerts_1.$ref)(void 0)),
			(this.Dmn = (0, puerts_1.$ref)(void 0)),
			!!this.InitCreatureData()
		);
	}
	OnInit() {
		super.OnInit();
		let e = 0;
		var t = this.CreatureDataInternal.GetPbModelConfig(),
			n = this.CreatureDataInternal.GetPbEntityInitData(),
			a =
				((e = (a = (0, IComponent_1.getComponent)(
					n.ComponentsData,
					"VisionItemComponent",
				))
					? -1
					: t.ModelId),
				(0, IComponent_1.getComponent)(n.ComponentsData, "ModelComponent"));
		return t
			? (a
					? (n = this.CreatureDataInternal.GetModelConfig()).ID
						? (this.ActorInternal =
								ActorUtils_1.ActorUtils.LoadActorByModelConfig(
									n,
									this.CreatureDataInternal.GetTransform(),
								))
						: (this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByPath(
								this.CreatureDataInternal.ModelBlueprintPath,
								this.CreatureDataInternal.GetTransform(),
								this.CreatureDataInternal.GetPbDataId(),
							))
					: (0 < e && this.CreatureDataInternal.SetModelConfig(e),
						(this.ActorInternal =
							ActorUtils_1.ActorUtils.LoadActorByModelConfig(
								this.CreatureDataInternal.GetModelConfig(),
								this.CreatureDataInternal.GetTransform(),
							))),
				this.ActorInternal && this.ActorInternal.OnDestroyed.Add(this.n8e),
				this.ActorInternal && this.ActorInternal.IsValid()
					? (this.SetActorVisible(
							!1,
							"[SceneItemActorComponent.OnInit] 默认隐藏",
						),
						this.SetCollisionEnable(
							!1,
							"[SceneItemActorComponent.OnInit] 默认关闭碰撞",
						),
						this.SetTickEnable(
							!1,
							"[SceneItemActorComponent.OnInit] 默认关闭Tick",
						),
						UE.KuroStaticLibrary.IsObjectClassByName(
							this.ActorInternal,
							CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
						)
							? (this.ActorInternal.ApplyEntityId(this.Entity.Id),
								this.ActorInternal.SetPrimitiveEntityType(
									RenderConfig_1.RenderConfig.GetEntityRenderPriority(
										!1,
										Protocol_1.Aki.Protocol.HBs.Proto_SceneItem,
									),
								),
								this.ActorInternal.SetPrimitiveBlueprintTypeName(
									new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
								),
								this.qmn(),
								this.Jnn(),
								GlobalData_1.GlobalData.IsPlayInEditor &&
									(t = this.CreatureDataInternal.GetPbDataId()) &&
									this.ActorInternal.Tags.Add(new UE.FName("PbDataId:" + t)),
								GameBudgetInterfaceController_1.GameBudgetInterfaceController
									.IsOpen &&
									(void 0 !== this.Entity.GameBudgetManagedToken
										? cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
												this.Entity.GameBudgetConfig.GroupName,
												this.Entity.GameBudgetManagedToken,
												this.ActorInternal,
											)
										: this.Entity.RegisterToGameBudgetController(
												this.ActorInternal,
											),
									(this.Amn = this.ActorInternal),
									this.bmn()),
								!0)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"SceneItem",
										7,
										"[CharacterActorComponent.OnInit] 该物体蓝图类型不是BaseItem",
										["EntityId", this.Entity.Id],
										[
											"CreatureDataId",
											this.CreatureDataInternal.GetCreatureDataId(),
										],
										[
											"ConfigType",
											this.CreatureDataInternal.GetEntityConfigType(),
										],
										["PbDataId", this.CreatureDataInternal.GetPbDataId()],
										["ModelId", this.CreatureDataInternal.GetModelId()],
										["PlayerId", this.CreatureDataInternal.GetPlayerId()],
									),
								!1))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Character",
								3,
								"[SceneItemActorComponent.OnInit] 加载actor失败。",
								[
									"CreatureDataId",
									this.CreatureDataInternal.GetCreatureDataId(),
								],
								["PbDataId", this.CreatureData.GetPbDataId()],
							),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						3,
						"[SceneItemActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["PbDataId", this.CreatureData.GetPbDataId()],
					),
				!1);
	}
	OnStart() {
		var e;
		return (
			(void 0 !== this.Entity.GetComponent(140) ||
				void 0 !== this.Entity.GetComponent(196)) &&
				(this.OverrideStaticMeshFromSceneInteraction(),
				(this.PhysicsMode = 0),
				(e = this.GetPrimitiveComponent()).SetCollisionEnabled(3),
				(e = e?.BodyInstance)) &&
				((e.bLockXRotation = !1),
				(e.bLockYRotation = !1),
				(e.bLockZRotation = !1),
				(e.LinearDamping = 1),
				(e.AngularDamping = 1.5)),
			!0
		);
	}
	OnEnd() {
		return (
			void 0 !== this.Lmn &&
				(TimerSystem_1.TimerSystem.Remove(this.Lmn), (this.Lmn = void 0)),
			!0
		);
	}
	OnEnable() {
		this.OnSetActorActive(!0),
			this.ToggleSceneInteractionVisible(this.CreatureData.GetVisible(), () => {
				this.Txe();
			});
	}
	OnDisable(e) {
		this.OnSetActorActive(!1, e), this.ToggleSceneInteractionVisible(!1);
	}
	OnActivate() {
		super.OnActivate(),
			this.SetActorVisible(!0, "[SceneItemActorComponent.OnActivate] Visible"),
			this.SetCollisionEnable(
				!0,
				"[SceneItemActorComponent.OnActivate] Visible",
			),
			this.SetTickEnable(!0, "[SceneItemActorComponent.OnActivate] Visible"),
			ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
				this.CreatureDataInternal,
				this.ActorInternal,
			);
	}
	OnClear() {
		return (
			this.ActorInternal && this.ActorInternal.OnDestroyed.Remove(this.n8e),
			this.Amn instanceof TsEffectActor_1.default &&
				EffectSystem_1.EffectSystem.RemoveFinishCallback(
					this.Amn.GetHandle(),
					this.wmn,
				),
			super.OnClear(),
			this.xmn(),
			!0
		);
	}
	xmn() {
		var e =
			SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
				this.J6e,
			);
		e?.IsValid() &&
			void 0 !== e.GetAttachParentActor() &&
			ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
				e,
				!1,
				"SceneInteractionLevel.AttachToActor",
				1,
				1,
				1,
			),
			-1 !== this.J6e &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Entity", 18, "销毁场景交互物", [
						"HandleId",
						this.J6e,
					]),
				SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(
					this.J6e,
				),
				(this.J6e = -1)),
			(this.Imn = !1),
			(this.ymn = void 0);
	}
	InitSkeletalMeshComponent() {
		this.Smn ||
			(this.Smn = this.ActorInternal.AddComponentByClass(
				UE.SkeletalMeshComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			));
	}
	qmn() {
		var e = this.ActorInternal,
			t = this.CreatureDataInternal.GetModelConfig();
		t &&
			(UE.KismetSystemLibrary.IsValidSoftObjectReference(t.网格体)
				? (this.InitSkeletalMeshComponent(),
					ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
						this.Smn,
						t.网格体,
						t.动画蓝图,
					))
				: (this.StaticMeshComponent ||
						(this.StaticMeshComponent = e.GetComponentByClass(
							UE.StaticMeshComponent.StaticClass(),
						)),
					this.StaticMeshComponent ||
						(this.StaticMeshComponent = e.AddComponentByClass(
							UE.StaticMeshComponent.StaticClass(),
							!1,
							MathUtils_1.MathUtils.DefaultTransform,
							!1,
						))));
	}
	LoadAndChangeStaticMesh(e) {
		var t = this.CreatureDataInternal.GetModelConfig();
		if (t) {
			const n = t.静态网格体列表.Get(e);
			n &&
				ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(n) &&
				ResourceSystem_1.ResourceSystem.LoadAsync(
					n.AssetPathName?.toString(),
					UE.Object,
					(e) => {
						e instanceof UE.StaticMesh
							? this.StaticMeshComponent?.IsValid() &&
								(this.StaticMeshComponent.SetStaticMesh(e),
								e.BodySetup?.IsValid() &&
									this.StaticMeshComponent.SetCollisionProfileName(
										e.BodySetup.DefaultInstance.CollisionProfileName,
									),
								this.StaticMeshComponent.SetCollisionEnabled(3))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									18,
									"该资源不是静态网格体，请检查model表配置",
									["path", n.AssetPathName],
								);
					},
				);
		}
	}
	SetIsSceneInteractionLoadCompleted(e = !0) {
		this.Imn = e;
	}
	GetIsSceneInteractionLoadCompleted() {
		return this.Imn;
	}
	Jnn() {
		(this.J6e = -1), (this.Imn = !1), (this.Tmn = !1);
	}
	LoadSceneInteractionLevel(e, t = !1) {
		this.xmn();
		var n,
			a = this.CreatureDataInternal.GetModelConfig();
		a &&
		(n = a.场景交互物) &&
		ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(n)
			? (this.ResetAllCachedTime(),
				(this.ymn = e),
				(this.J6e =
					SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(
						n.AssetPathName?.toString(),
						this.ymn,
						this.ActorLocation,
						this.ActorRotation,
						() => {
							this.Txe();
						},
						this.CreatureData.GetVisible(),
						t,
					)),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Entity",
						18,
						"生成场景交互物",
						["initState", e],
						["HandleId", this.J6e],
						["ModelId", a.ID],
					))
			: this.SetIsSceneInteractionLoadCompleted();
	}
	Txe() {
		if (-1 !== this.J6e) {
			(this.Imn = !0),
				SceneInteractionManager_1.SceneInteractionManager.Get().AttachToActor(
					this.J6e,
					this.ActorInternal,
				),
				SceneInteractionManager_1.SceneInteractionManager.Get().SetCollisionActorsOwner(
					this.J6e,
					this.ActorInternal,
				),
				SceneInteractionManager_1.SceneInteractionManager.Get().AttachChildActor(
					this.J6e,
				);
			var e =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
					this.J6e,
				);
			if (e)
				for (let n = 0, a = e.Num(); n < a; n++) {
					var t = e.Get(n);
					t instanceof UE.StaticMeshActor &&
						(t.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
						t.StaticMeshComponent?.SetReceivesDecals(!1));
				}
			var n =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetReceivingDecalsActors(
					this.J6e,
				);
			if (n)
				for (let e = 0, t = n.Num(); e < t; e++)
					n.Get(e)
						.GetComponentByClass(UE.PrimitiveComponent.StaticClass())
						?.SetReceivesDecals(!0);
			this.Tmn ? this.Gmn() : this.vHs(),
				this.Nmn(),
				this.RefreshShowActor(),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				),
				this.THs || (this.ToggleSceneInteractionVisible(!1), (this.THs = !0));
		}
	}
	RefreshShowActor() {
		var e;
		this.Entity?.Valid &&
			void 0 !== this.Entity?.GameBudgetManagedToken &&
			((e = UE.KuroStaticLibrary.GetLevelPrefabShowActor(this.ActorInternal))
				? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
						this.Entity.GameBudgetConfig.GroupName,
						this.Entity.GameBudgetManagedToken,
						e,
					),
					this.Amn !== e &&
						((this.Amn = e),
						this.bmn(),
						e instanceof TsEffectActor_1.default) &&
						EffectSystem_1.EffectSystem.AddFinishCallback(
							e.GetHandle(),
							this.wmn,
						))
				: ((this.Amn = this.ActorInternal),
					this.bmn(),
					cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
						this.Entity.GameBudgetConfig.GroupName,
						this.Entity.GameBudgetManagedToken,
						this.Amn,
					)));
	}
	ToggleSceneInteractionVisible(e, t = void 0) {
		this.Imn
			? SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(
					this.J6e,
					e,
					this.CreatureData.GetRemoveState(),
					t,
				)
			: (this.THs = e);
	}
	SwitchToState(e, t, n) {
		-1 !== this.J6e &&
			this.ymn !== e &&
			(this.Omn(e, this.ymn),
			(this.ymn = e),
			SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
				this.J6e,
				this.ymn,
				t,
				!1,
				n,
			),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Entity",
					18,
					"场景交互物改变状态",
					["targetState", e],
					["HandleId", this.J6e],
					["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
					["needTransition", t],
					["jumpToEnd", n],
				),
			this.RefreshShowActor());
	}
	Nmn() {
		var e;
		20 === this.ymn &&
			(e = this.GetInteractionMainActor()) &&
			!e.States.Get(this.ymn) &&
			this.Omn(this.ymn);
	}
	Omn(e, t = 22) {
		20 === e && this.SetSceneItemActorHide(!0),
			20 === t && this.SetSceneItemActorHide(!1);
	}
	PlaySceneInteractionEffect(e) {
		-1 !== this.J6e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Entity",
					18,
					"场景交互物播放特效",
					["effectKey", e],
					["HandleId", this.J6e],
					["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
				),
			SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(
				this.J6e,
				e,
			));
	}
	EndSceneInteractionEffect(e) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().EndSceneInteractionEffect(
				this.J6e,
				e,
			);
	}
	PlayExtraEffect(e, t = !0) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().PlayExtraEffectByTag(
				this.J6e,
				e,
				t,
			);
	}
	StopExtraEffect(e) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().StopExtraEffectByTag(
				this.J6e,
				e,
			);
	}
	UpdateHitInfo(e, t) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().UpdateHitInfo(
				this.J6e,
				e,
				t,
			);
	}
	PlaySceneInteractionEndEffect(e) {
		-1 !== this.J6e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Entity",
					7,
					"场景交互物播放结束特效",
					["effectKey", e],
					["HandleId", this.J6e],
					["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
				),
			SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEndEffect(
				this.J6e,
				e,
			));
	}
	GetActorInSceneInteraction(e) {
		if (-1 !== this.J6e)
			return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
				this.J6e,
				e,
			);
	}
	GetActorInSceneInteractionOriginalRelTransform(e) {
		if (-1 !== this.J6e)
			return SceneInteractionManager_1.SceneInteractionManager.Get().GetActorOriginalRelTransform(
				this.J6e,
				e,
			);
	}
	OverrideStaticMeshFromSceneInteraction() {
		(this.Tmn = !0), this.Imn && this.Gmn();
	}
	Gmn() {
		var e, t, n, a;
		-1 !== this.J6e &&
			(n =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
					this.J6e,
				)) &&
			((e = n.GetComponentByClass(UE.StaticMeshComponent.StaticClass())),
			(t = this.Owner.GetComponentByClass(
				UE.StaticMeshComponent.StaticClass(),
			)),
			e) &&
			t &&
			((n = e.StaticMesh),
			(a = UE.NewArray(UE.Transform)).Add(e.GetRelativeTransform()),
			UE.KuroStaticMeshLibrary.MergeSimpleCollisions(e, a),
			t.SetStaticMesh(e.StaticMesh),
			3 === t.GetCollisionEnabled() && t.SetCollisionEnabled(0),
			t.SetCollisionEnabled(3),
			t.SetHiddenInGame(!0),
			e.SetStaticMesh(n));
	}
	vHs() {
		var e =
			SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
				this.J6e,
			);
		if (e) {
			let t = e.GetComponentByClass(UE.ShapeComponent.StaticClass());
			(t = t || e.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) &&
				(3 === t.GetCollisionEnabled() && t.SetCollisionEnabled(0),
				t.SetCollisionEnabled(3));
		}
	}
	ChangeSceneInteractionPlayDirection(e) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(
				this.J6e,
				e,
			);
	}
	GetActiveTagSequencePlaybackProgress(e) {
		if (-1 !== this.J6e)
			return SceneInteractionManager_1.SceneInteractionManager.Get().GetActiveTagSequencePlaybackProgress(
				this.J6e,
				e,
			);
	}
	SetActiveTagSequencePlaybackProgress(e, t) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequencePlaybackProgress(
				this.J6e,
				e,
				t,
			);
	}
	SetActiveTagSequenceDurationTime(e, t) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequenceDurationTime(
				this.J6e,
				e,
				t,
			);
	}
	PauseActiveTagSequence(e) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().PauseActiveTagSequence(
				this.J6e,
				e,
			);
	}
	ResumeActiveTagSequence(e, t = !1) {
		-1 !== this.J6e &&
			SceneInteractionManager_1.SceneInteractionManager.Get().ResumeActiveTagSequence(
				this.J6e,
				e,
				t,
			);
	}
	FixBornLocation(e, t) {
		var [n, a] = this.CheckGround();
		n &&
			a.bBlockingHit &&
			(e &&
				((n = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
				TraceElementCommon_1.TraceElementCommon.GetImpactPoint(a, 0, n),
				this.SetActorLocation(n.ToUeVector(), this.constructor.name, !1)),
			t) &&
			((e = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
			TraceElementCommon_1.TraceElementCommon.GetImpactNormal(a, 0, e),
			(n = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
				this.ActorInternal.GetActorUpVector(),
			),
			(t = MathUtils_1.MathUtils.CommonTempQuat),
			Quat_1.Quat.FindBetweenVectors(n, e, t),
			(a = MathUtils_1.MathUtils.CommonTempRotator),
			MathUtils_1.MathUtils.ComposeRotator(
				this.ActorRotationProxy,
				t.Rotator(),
				a,
			),
			this.SetActorRotation(a.ToUeRotator(), this.constructor.name, !1)),
			ModelManager_1.ModelManager.TraceElementModel.ClearLineTrace();
	}
	CheckGround() {
		var e = this.ActorLocationProxy,
			t =
				(((e =
					((n =
						((t =
							ModelManager_1.ModelManager.TraceElementModel
								.CommonStartLocation).Set(e.X, e.Y, e.Z + 20),
						ModelManager_1.ModelManager.TraceElementModel
							.CommonEndLocation)).Set(e.X, e.Y, e.Z + -1e3),
					ModelManager_1.ModelManager.TraceElementModel.GetLineTrace())).WorldContextObject =
					this.ActorInternal),
				e.ActorsToIgnore.Empty(),
				e.ActorsToIgnore.Add(Global_1.Global.BaseCharacter),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, n),
				TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY)),
			n = e.HitResult;
		return e.ClearCacheData(), [t, n];
	}
	CheckGoundWithBox() {
		var e,
			t,
			n,
			a,
			o =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
					this.J6e,
				);
		return void 0 === o
			? [!1, void 0]
			: ((e = o.K2_GetActorRotation()),
				o.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
				o.GetActorBounds(!1, this.uoi, this.Dmn),
				o.K2_SetActorRotation(e, !1),
				(o = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
					(0, puerts_1.$unref)(this.uoi),
				),
				(a =
					ModelManager_1.ModelManager.TraceElementModel
						.CommonStartLocation).Set(o.X, o.Y, o.Z + 20),
				(t =
					ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation).Set(
					o.X,
					o.Y,
					o.Z + -1e3,
				),
				((o =
					ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()).WorldContextObject =
					this.ActorInternal),
				(n = (0, puerts_1.$unref)(this.Dmn)),
				(o.HalfSizeX = n.X - 2),
				(o.HalfSizeY = n.Y - 2),
				(o.HalfSizeZ = n.Z - 2),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, a),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, t),
				TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(o, e),
				(n = TraceElementCommon_1.TraceElementCommon.BoxTrace(o, PROFILE_KEY)),
				(a = o.HitResult),
				o.ClearCacheData(),
				[n, a]);
	}
	SetSceneItemActorHide(e) {
		this.ActorInternal?.IsValid() && this.kmn(this.ActorInternal, e);
	}
	kmn(e, t) {
		if (e?.IsValid()) {
			var n = (0, puerts_1.$ref)(void 0),
				a = (e.GetAttachedActors(n, !0), (0, puerts_1.$unref)(n));
			if (a && 0 < a.Num())
				for (let e = 0; e < a.Num(); e++) {
					var o = a.Get(e);
					o && this.kmn(o, t);
				}
			e !== this.ActorInternal
				? (e.SetActorHiddenInGame(t), e.SetActorEnableCollision(!t))
				: (n = this.GetPrimitiveComponent())?.IsValid() &&
					(t && 4 === this.Rmn && (this.Rmn = n.GetCollisionEnabled()),
					n.SetCollisionEnabled(t ? 0 : this.Rmn));
		}
	}
	OnChangeTimeDilation(e) {
		e *= this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
		var t =
			((this.ActorInternal.CustomTimeDilation = e),
			this.GetInteractionMainActor());
		t?.IsValid() && t.SetTimeDilation(e);
	}
	GetSocketLocation(e) {
		return this.Imn &&
			!FNameUtil_1.FNameUtil.IsNothing(e) &&
			((e =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
					this.J6e,
					e.toString(),
				)),
			e?.IsValid())
			? e.K2_GetActorLocation()
			: this.ActorLocation;
	}
	GetSocketTransform(e) {
		return this.Imn &&
			!FNameUtil_1.FNameUtil.IsNothing(e) &&
			((e =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
					this.J6e,
					e.toString(),
				)),
			e?.IsValid())
			? e.GetTransform()
			: this.ActorTransform;
	}
	UpdateInteractionMaterialColorParam(e, t, n, a, o = 1) {
		var r = this.GetInteractionMainActor();
		r &&
			r.InteractionMaterialController &&
			(this.Bmn || (this.Bmn = new UE.LinearColor()),
			(this.Bmn.R = t),
			(this.Bmn.G = n),
			(this.Bmn.B = a),
			(this.Bmn.A = o),
			r.InteractionMaterialController.ChangeVectorParameter(this.Bmn, e));
	}
};
(SceneItemActorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(182)],
	SceneItemActorComponent,
)),
	(exports.SceneItemActorComponent = SceneItemActorComponent);
