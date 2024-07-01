"use strict";
var CharacterAiComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var i,
				n = arguments.length,
				a =
					n < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, r, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(a = (n < 3 ? i(a) : 3 < n ? i(e, r, a) : i(e, r)) || a);
			return 3 < n && a && Object.defineProperty(e, r, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterAiComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	AiController_1 = require("../../../../AI/Controller/AiController"),
	TsAiController_1 = require("../../../../AI/Controller/TsAiController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
	DEFAULT_LEVELAI_AIC_PATH =
		"/Game/Aki/AI/AINPC/Common/AIC_CommonNPC.AIC_CommonNPC_C";
let CharacterAiComponent = (CharacterAiComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.kFr = void 0),
			(this.FFr = void 0),
			(this.Uxr = void 0),
			(this.DisableAiHandle = void 0),
			(this.VFr = new Map()),
			(this.Hte = void 0),
			(this.HFr = void 0),
			(this.jFr = ""),
			(this.WFr = !1),
			(this.KFr = void 0),
			(this.QFr = new Array()),
			(this.XFr = new Set()),
			(this.xat = !1),
			(this.$Fr = !1),
			(this.Mne = 0),
			(this.yYe = () => {
				this.FFr?.OnSkillEnd();
			}),
			(this.YFr = void 0);
	}
	static get Dependencies() {
		return [3, 0];
	}
	get TsAiController() {
		return this.kFr;
	}
	get AiController() {
		return this.FFr;
	}
	OnInitData() {
		return (
			(this.FFr = new AiController_1.AiController()),
			(this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle(
				"SetAiDisableInGame",
			)),
			this.Entity.GetComponent(0).IsRole() && this.DisableAi("玩家主控权"),
			!0
		);
	}
	CheckAndInitTsAiController() {
		var t,
			e = this.Entity.GetComponent(3);
		this.kFr
			? this.kFr.Possess(e.Actor)
			: ((t = this.JFr(e.ActorTransform)).Possess(e.Actor),
				this.zFr(t, "CheckAndInitTsAiController"));
	}
	OnInit() {
		(this.Mne = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
			(this.Hte = this.Entity.GetComponent(3)),
			(this.HFr = this.Entity.GetComponent(65));
		var t = this.Hte.Actor.GetController();
		return (
			t &&
				(t.SetActorTickEnabled(!1), Log_1.Log.CheckWarn()) &&
				Log_1.Log.Warn(
					"AI",
					30,
					"AIC配置在AI基础表，请清理BP自带的AIC配置信息",
					["ConfigId", this.Mne],
					["Actor", this.Hte.Actor?.GetName()],
					["AIController", t?.GetName()],
				),
			!0
		);
	}
	OnStart() {
		var t;
		return (
			this.FFr.SetAiDesignComp(this),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.yYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeMode,
				this.AiController.OnChangeMode,
			),
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				((t =
					this.Entity.GetComponent(0).GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_Npc),
				this.Hte.SetAutonomous(!1, t)),
			this.ZFr(),
			!0
		);
	}
	OnActivate() {
		(this.xat = !0),
			this.e3r(),
			this.TsAiController && this.t3r(),
			this.VFr.size || this.FFr?.SetEnable(!0);
	}
	JFr(t) {
		var e =
			((t = ActorSystem_1.ActorSystem.Get(
				UE.TsAiController_C.StaticClass(),
				t,
				void 0,
			)).SetActorTickEnabled(!1),
			t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
		for (let t = 0; t < e.Num(); t++) e.Get(t).SetComponentTickEnabled(!1);
		return t;
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.yYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeMode,
				this.AiController.OnChangeMode,
			),
			this.DisableAi("CharacterAiComponent OnEnd"),
			this.RemoveTsAiController(),
			this.FFr?.Clear(),
			(this.FFr = void 0),
			this.DisableAiHandle.Clear(),
			(this.QFr.length = 0),
			!(this.xat = !1)
		);
	}
	OnClear() {
		return this.VFr.clear(), !0;
	}
	ZFr() {
		let t = 0;
		var e = this.Hte.CreatureData.GetPbEntityInitData();
		(t =
			e?.ComponentsData &&
			(e = (0, IComponent_1.getComponent)(e.ComponentsData, "AiComponent"))
				?.AiId &&
			!e.Disabled
				? e.AiId
				: t)
			? this.LoadAiConfigs(t)
			: this.i3r()
				? this.o3r()
				: this.DisableAi("Ai Config");
	}
	OnTick(t) {
		if (
			!this.Hte.CreatureData.GetRemoveState() &&
			this.kFr &&
			this.xat &&
			!this.WFr
		) {
			this.FFr && this.FFr.Tick(t);
			var e = t * MathUtils_1.MathUtils.MillisecondToSecond;
			GlobalData_1.GlobalData.IsPlayInEditor &&
				this.kFr.IsDebugDraw &&
				this.kFr.DrawDebugLines(e),
				this.$Fr && this.KFr && this.KFr.KuroTickComponentOutside(e);
			for (const t of this.QFr) t.KuroTickComponentOutside(e);
		}
	}
	LoadAiConfigs(t) {
		var e;
		t
			? this.FFr.AiBase?.Id !== t &&
				((e =
					this.Hte.CreatureData.GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_Npc),
				this.FFr.LoadAiConfigs(t, e),
				this.FFr.AiBase
					? (this.VFr.has("Ai Config") && this.EnableAi("Ai Config"),
						this.r3r())
					: this.DisableAi("Ai Config"))
			: this.DisableAi("Ai Config");
	}
	r3r() {
		const t = this.FFr.AiBase;
		if (t && t.AiController) {
			let e = t.AiController;
			e.endsWith("_C") || (e += "_C");
			const r = this.Hte.Actor.GetController();
			ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e) => {
				if (e?.IsValid()) {
					if (r?.GetClass().GetName() === e.GetName()) this.zFr(r);
					else if (this.Hte?.Valid)
						if (
							UE.KuroStaticLibrary.GetDefaultObject(e)?.IsA(
								UE.TsAiController_C.StaticClass(),
							)
						) {
							var o =
								((e = ActorSystem_1.ActorSystem.Get(
									e,
									this.Hte.ActorTransform,
									void 0,
								)).SetActorTickEnabled(!1),
								e.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
							for (let t = 0; t < o.Num(); t++)
								o.Get(t).SetComponentTickEnabled(!1);
							ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
								e,
								this.Hte.Owner,
								2,
								"CharacterAiComponent.LoadUeControllerByConfig",
								void 0,
								2,
								2,
								2,
								!1,
							),
								this.zFr(e, "AiController加载成功");
						} else
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("AI", 30, "配置的AI控制器不是TsAiController", [
									"Path",
									t.AiController,
								]);
				} else this.zFr(r, "AiController加载失败，使用默认AIController配置");
			});
		}
	}
	SetAiHateConfig(t) {
		(this.jFr = t), this.kFr && this.kFr.SetAiHateConfig(t);
	}
	SetAiTickLock(t) {
		this.WFr = t;
	}
	zFr(t, e = "") {
		this.kFr === t
			? CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.Entity,
					"CharacterAiComponent.SetUeController，AiController相同忽略执行",
					["reason", e],
				)
			: t instanceof TsAiController_1.default
				? (CombatDebugController_1.CombatDebugController.CombatInfo(
						"Ai",
						this.Entity,
						"CharacterAiComponent.SetUeController",
						["reason", e],
					),
					this.AiController?.AiConditionEvents.Clear(),
					this.AiController?.AiPerceptionEvents.Clear(!0),
					this.RemoveTsAiController(),
					(this.kFr = t),
					this.kFr.InitAiController(this),
					this.jFr && t.SetAiHateConfig(this.jFr),
					t.Possess(this.Hte.Actor),
					this.xat && this.t3r())
				: CombatDebugController_1.CombatDebugController.CombatInfo(
						"Ai",
						this.Entity,
						"CharacterAiComponent.SetUeController，controller is not TsAiController",
						["reason", e],
					);
	}
	i3r() {
		var t;
		return (
			!!BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree &&
			!!(t = this.Hte.CreatureData.GetPbEntityInitData())?.ComponentsData &&
			!!(0, IComponent_1.getComponent)(t.ComponentsData, "LevelAiComponent")
		);
	}
	t3r() {
		var t, e;
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Ai",
			this.Entity,
			"CharacterAiComponent.StartUeController",
		),
			this.i3r()
				? ((e = this.Hte.CreatureData.GetPbDataId()),
					(t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
					(e = BehaviorTreeDefines_1.BehaviorTreeDefines.GetBehaviorTreePath(
						e,
						t,
						!0,
					)),
					this.s3r(e))
				: this.FFr.AiBase && this.s3r(this.FFr.AiBase.BehaviorTree),
			this.kFr.OnStart(),
			ModelManager_1.ModelManager.GameModeModel.IsMulti
				? this.YFr && this.h3r(this.YFr)
				: this.kFr.获取控制权时(),
			(this.QFr.length = 0);
	}
	RestartBehaviorTree() {
		var t;
		this.IsAiDriver &&
			(t = this.TsAiController.BrainComponent) &&
			t.RestartLogic();
	}
	EnableAi(t) {
		var e = this.VFr.get(t);
		return this.VFr.delete(t)
			? !!this.DisableAiHandle.Enable(e, this.constructor.name) &&
					(this.DisableAiHandle.Empty &&
						(this.IsAiDriver &&
							(e = this.TsAiController.BrainComponent) &&
							(e.RestartLogic(),
							EventSystem_1.EventSystem.EmitWithTarget(
								this.Entity,
								EventDefine_1.EEventName.OnAiEnable,
							)),
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"Ai",
							this.Entity,
							"CharacterAiComponent.SetEnable",
							["enabled", !0],
						),
						this.Enable(this.Uxr, "CharacterAiComponent.EnableAi"),
						(this.Uxr = void 0),
						this.FFr?.SetEnable(!0)),
					!0)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						30,
						"[CharacterAiComponent] 开启Ai使用了未定义的Key",
						["entity", this.Entity.constructor.name],
						["PbDataId", this.Mne],
						["Key", t],
					),
				!1);
	}
	DisableAi(t) {
		var e;
		this.VFr.has(t)
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"AI",
					30,
					"[CharacterAiComponent] 重复使用关闭Ai的Key",
					["entity", this.Entity.constructor.name],
					["PbDataId", this.Mne],
					["Key", t],
				)
			: ((e = this.DisableAiHandle.Disable(t, this.constructor.name)),
				this.VFr.set(t, e),
				this.IsEnabled() &&
					(this.IsAiDriver &&
						(t = this.TsAiController.BrainComponent) &&
						(t.StopLogic("PauseAI"),
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnAiDisable,
						)),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Ai",
						this.Entity,
						"CharacterAiComponent.SetEnable",
						["enabled", !1],
					),
					(this.Uxr = this.Disable("[CharacterAiComponent.DisableAi]")),
					this.FFr?.SetEnable(!1)));
	}
	IsEnabled() {
		return void 0 === this.Uxr;
	}
	DumpDisableAiInfo() {
		return this.DisableAiHandle.DumpDisableInfo();
	}
	get IsAiDriver() {
		return !(!this.TsAiController || (!this.i3r() && !this.FFr?.AiBase));
	}
	get HasBrain() {
		return this.IsAiDriver && void 0 !== this.KFr;
	}
	RemoveTsAiController() {
		ObjectUtils_1.ObjectUtils.IsValid(this.kFr) &&
			(ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(
				this.kFr,
			) &&
				ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
					this.kFr,
					!1,
					"CharacterAiComponent.RemoveTsAiController",
					1,
					1,
					1,
				),
			this.kFr.Pawn?.IsValid() &&
				this.kFr.Pawn.DetachFromControllerPendingDestroy(),
			this.kFr.Clear()),
			(this.kFr = void 0),
			(this.KFr = void 0);
	}
	SetLoadCompletePlayer(t) {
		this.XFr.add(t);
	}
	CheckLoadComplete(t) {
		return (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			(!!(t = t.GetComponent(0)?.GetPlayerId()) && this.XFr.has(t))
		);
	}
	s3r(t) {
		t &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AI",
					30,
					"准备加载行为树AI",
					["Id", this.FFr?.CharActorComp?.CreatureData.GetPbDataId()],
					["Path", t],
				),
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BehaviorTree, (e) => {
				var r;
				this.kFr &&
					(e?.IsValid()
						? this.kFr.SetupBehaviorTree(e) &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"AI",
									30,
									"开始运行行为树AI",
									["Id", this.FFr.CharActorComp.CreatureData.GetPbDataId()],
									["TreeName", e.GetName()],
								),
							EventSystem_1.EventSystem.EmitWithTarget(
								this.Entity,
								EventDefine_1.EEventName.OnRunBehaviorTree,
							),
							(this.KFr = this.kFr.BrainComponent),
							this.KFr?.SetComponentTickEnabled(!1),
							GlobalData_1.GlobalData.IsPlayInEditor &&
								(r = this.FFr.CharActorComp.Actor.TsCharacterDebugComponent) &&
								(r.BehaviorTree = e),
							this.xat) &&
							this.e3r()
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"AI",
								51,
								"加载行为树AI资源失败",
								["PbDataId", this.FFr.CharActorComp.CreatureData.GetPbDataId()],
								["Path", t],
							));
			}));
	}
	e3r() {
		this.$Fr || (this.kFr && (this.$Fr = !0));
	}
	OnSyncAiInformation(t) {
		var e;
		this.Entity.IsInit
			? this.h3r(t)
			: ((e =
					t.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.Entity,
					"切换控制权等待Entity初始化完成",
					["v", e],
				),
				(this.YFr = t));
	}
	h3r(t) {
		var e = t.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			r =
				(CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.Entity,
					"切换控制权",
					["v", e],
				),
				this.Hte.CreatureData.SetBlackboardsByProtocol(t.c4n.u4n),
				this.FFr.AiHateList);
		for (const e of t.c4n.efs) {
			var o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
			(o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) &&
				r.ChangeHatred(o.Id, 0, e._4n);
		}
		for (const e of t.c4n.tfs)
			this.FFr.SetCoolDownTime(
				e.skn,
				MathUtils_1.MathUtils.LongToNumber(e.akn),
				!1,
				"切换控制权",
			);
		var i = this.Entity.GetComponent(3);
		if (i.IsAutonomousProxy !== e) {
			let r = e;
			var n = this.Entity.GetComponent(46);
			n &&
				n.IsLocal &&
				(2 === n.CurrentState || 4 === n.CurrentState) &&
				(r = !0),
				i.SetAutonomous(e, r),
				e && this.TsAiController?.获取控制权时(),
				this.FFr.OnSwitchControl(e, t.aFn),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharSwitchControl,
					e,
				),
				e && this.HFr.OnControl();
		} else this.FFr.SetControllerPlayerId(t.aFn);
	}
	SwitchControl(t) {
		this.Entity.GetComponent(3).SetAutonomous(t),
			t && this.TsAiController?.获取控制权时(),
			this.FFr.OnSwitchControl(
				t,
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharSwitchControl,
				t,
			);
	}
	static AiHateNotify(t, e) {
		var r = t.GetComponent(38).FFr.AiHateList;
		for (const t of e.efs) {
			var o = MathUtils_1.MathUtils.LongToNumber(t.rkn);
			(o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) &&
				r.ChangeHatred(o.Id, 0, t._4n);
		}
	}
	o3r() {
		const t = this.Hte.Actor.GetController();
		ResourceSystem_1.ResourceSystem.LoadAsync(
			DEFAULT_LEVELAI_AIC_PATH,
			UE.Class,
			(e) => {
				if (e?.IsValid())
					if (t?.GetClass().GetName() === e.GetName()) this.zFr(t);
					else if (this.Hte?.Valid)
						if (
							UE.KuroStaticLibrary.GetDefaultObject(e)?.IsA(
								UE.TsAiController_C.StaticClass(),
							)
						) {
							var r =
								((e = ActorSystem_1.ActorSystem.Get(
									e,
									this.Hte.ActorTransform,
									void 0,
								)).SetActorTickEnabled(!1),
								e.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
							for (let t = 0; t < r.Num(); t++)
								r.Get(t).SetComponentTickEnabled(!1);
							ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
								e,
								this.Hte.Owner,
								2,
								"CharacterAiComponent.LoadAndRunLevelAiBehaviorTree",
								void 0,
								2,
								2,
								2,
								!1,
							),
								this.zFr(e, "测试加载LevelAi行为树"),
								this.VFr.has("Ai Config") && this.EnableAi("Ai Config");
						} else
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("AI", 30, "配置的AI控制器不是TsAiController", [
									"Path",
									DEFAULT_LEVELAI_AIC_PATH,
								]);
			},
		);
	}
});
(CharacterAiComponent.n3r = void 0),
	(CharacterAiComponent.a3r = void 0),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("y2n")],
		CharacterAiComponent,
		"AiHateNotify",
		null,
	),
	(CharacterAiComponent = CharacterAiComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(38)],
			CharacterAiComponent,
		)),
	(exports.CharacterAiComponent = CharacterAiComponent);
