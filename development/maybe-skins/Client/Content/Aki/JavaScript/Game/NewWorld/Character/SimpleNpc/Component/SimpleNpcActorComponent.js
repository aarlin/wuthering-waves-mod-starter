"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, r, a) {
		var o,
			n = arguments.length,
			i =
				n < 3
					? e
					: null === a
						? (a = Object.getOwnPropertyDescriptor(e, r))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(t, e, r, a);
		else
			for (var l = t.length - 1; 0 <= l; l--)
				(o = t[l]) && (i = (n < 3 ? o(i) : 3 < n ? o(e, r, i) : o(e, r)) || i);
		return 3 < n && i && Object.defineProperty(e, r, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcActorComponent = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	Net_1 = require("../../../../../Core/Net/Net"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	BaseCharacterComponent_1 = require("../../Common/Component/BaseCharacterComponent"),
	INIT_LOCATION_KEY = "InitLocation";
let SimpleNpcActorComponent = class extends BaseCharacterComponent_1.BaseCharacterComponent {
	constructor() {
		super(...arguments),
			(this.n8e = () => {
				this.CreatureDataInternal.GetRemoveState() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
							["CreatureData", this.CreatureDataInternal.GetCreatureDataId()],
							["ConfigType", this.CreatureDataInternal.GetEntityConfigType()],
							["PbDataId", this.CreatureDataInternal.GetPbDataId()],
						));
			});
	}
	HasMesh() {
		return !!this.SkeletalMesh?.SkeletalMesh;
	}
	OnInitData() {
		return super.OnInitData(), !!this.InitCreatureData();
	}
	OnInit() {
		super.OnInit(),
			(this.EntityType = this.CreatureData.GetEntityType()),
			(this.SubEntityType = this.CreatureData.GetSubEntityType());
		var t,
			e,
			r = void 0,
			a = this.CreatureData.GetPbModelConfig();
		return a
			? ((a = a.ModelId),
				(r = this.InitActorNew(a)) && UE.KismetSystemLibrary.IsValid(r)
					? r.IsA(UE.TsBaseCharacter_C.StaticClass())
						? ((t = r).SetPrimitiveBlueprintTypeName(
								new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
							),
							this.SetCamp(t),
							(t.SimpleNpcActorComponent = this),
							(t.EntityId = this.Entity.Id),
							t.CharacterMovement.SetDefaultMovementMode(),
							(this.ActorInternal = t),
							this.ActorInternal.OnDestroyed.Add(this.n8e),
							(t.RenderType = 3),
							this.SetActorVisible(
								!1,
								"[CharacterActorComponent.OnInit] 默认隐藏",
							),
							this.SetCollisionEnable(
								!1,
								"[CharacterActorComponent.OnInit] 默认关闭碰撞",
							),
							this.SetTickEnable(
								!1,
								"[CharacterActorComponent.OnInit] 默认关闭Tick",
							),
							(t.FightManager = GlobalData_1.GlobalData.BpFightManager),
							t.CharRenderingComponent.Init(t.RenderType),
							t.CharRenderingComponent.UpdateNpcDitherComponent(),
							(t.AutoPossessAI = 3),
							(e = this.CreatureDataInternal.GetInitLocation())
								? this.PFr(e)
								: this.PFr(this.ActorLocation),
							this.InitSizeInternal(),
							GameBudgetInterfaceController_1.GameBudgetInterfaceController
								.IsOpen &&
								(void 0 !== this.Entity.GameBudgetManagedToken
									? cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
											this.Entity.GameBudgetConfig.GroupName,
											this.Entity.GameBudgetManagedToken,
											t,
										)
									: this.Entity.RegisterToGameBudgetController(t)),
							!0)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Character",
									6,
									"[CharacterActorComponent.OnInit] Actor不是TsBaseCharacter",
									["Name", r.GetName()],
									["Class", r.GetClass().GetName()],
									[
										"CreatureDataId",
										this.CreatureDataInternal.GetCreatureDataId(),
									],
									["ModelId", a],
									["PbDataId", this.CreatureData.GetPbDataId()],
								),
							!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Character",
								3,
								"[CharacterActorComponent.OnInit] 加载actor失败。",
								[
									"CreatureDataId",
									this.CreatureDataInternal.GetCreatureDataId(),
								],
								["ModelId", a],
								["PbDataId", this.CreatureData.GetPbDataId()],
							),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						3,
						"[CharacterActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["ModelId", 0],
						["PbDataId", this.CreatureData.GetPbDataId()],
					),
				!1);
	}
	OnStart() {
		var t,
			e = this.Actor;
		return (
			(this.DebugMovementComp = this.Entity.GetComponent(27)),
			e
				? (GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor),
					e.SetPrimitiveEntityType(
						RenderConfig_1.RenderConfig.GetEntityRenderPriority(
							!1,
							Protocol_1.Aki.Protocol.wks.Proto_Npc,
						),
					),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						(t = e.TsCharacterDebugComponent) &&
						((t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId()),
						(t.DebugEntityId = this.Entity.Id)),
					CameraController_1.CameraController.LoadCharacterCameraConfig(
						e.DtCameraConfig,
					),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							3,
							"[CharacterActorComponent.OnInit] 加载actor失败。",
							["EntityId", this.Entity.Id],
							["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
							["PlayerId", this.CreatureDataInternal.GetPlayerId()],
							["PbDataId", this.CreatureData.GetPbDataId()],
						),
					!1)
		);
	}
	OnActivate() {
		super.OnActivate(),
			this.SetActorVisible(!0, "[CharacterActorComponent.OnActivate] Visible"),
			this.SetCollisionEnable(
				!0,
				"[CharacterActorComponent.OnActivate] Visible",
			),
			this.SetTickEnable(!0, "[CharacterActorComponent.OnActivate] Visible"),
			ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
				this.CreatureDataInternal,
				this.ActorInternal,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Entity.Id,
				this.Actor.CharacterMovement.DefaultLandMovementMode,
				this.Actor.CharacterMovement.MovementMode,
				0,
				0,
			);
		var t = Protocol_1.Aki.Protocol.f_s.create(),
			e = this.Entity.GetComponent(0).GetCreatureDataId();
		t.sfs.push(MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(8784, t, (t) => {}),
			this.SetNpcBornMaterial(),
			this.SetNpcBornEffect(),
			this.Actor.CharRenderingComponent.UpdateNpcDitherComponent(),
			this.SetNpcShowState(!1, "出生默认隐藏"),
			this.Actor.DitherEffectController?.ForceResetDither(),
			this.qFr();
	}
	OnTick(t) {
		super.OnTick(t),
			this.TrySetNpcDither(),
			this.Actor.DitherEffectController?.Update(t);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharOnEndPlay,
				this.Entity,
			),
			GlobalData_1.GlobalData.BpFightManager.删除Debug的对象(this.Actor),
			this.ActorInternal?.IsValid() &&
				(this.ActorInternal.OnDestroyed.Remove(this.n8e),
				this.ActorInternal instanceof TsBaseCharacter_1.default) &&
				(this.ActorInternal.DitherEffectController?.Clear(),
				(this.ActorInternal.DitherEffectController = void 0),
				(this.ActorInternal.CharacterActorComponent = void 0),
				(this.ActorInternal.SimpleNpcActorComponent = void 0)),
			(this.IsInSequenceBinding = !1),
			CameraController_1.CameraController.UnloadCharacterCameraConfig(
				this.Actor.DtCameraConfig,
			),
			!0
		);
	}
	OnEnable() {
		this.OnSetActorActive(!0), this.ResetAllCachedTime();
	}
	OnDisable(t) {
		this.OnSetActorActive(!1, t);
	}
	OnChangeTimeDilation(t) {
		var e = this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
		this.ActorInternal.CustomTimeDilation = t * e;
	}
	OnSetActorActive(t, e) {
		if ((super.OnSetActorActive(t, e), this.Actor?.IsValid())) {
			e =
				((e = this.Actor.GetComponentByClass(
					UE.NavigationInvokerComponent.StaticClass(),
				)) && e.SetActive(t),
				(0, puerts_1.$ref)(void 0));
			var r = (this.Actor.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
			for (let e = 0; e < r.Num(); ++e) r.Get(e).SetActorHiddenInGame(!t);
			(e = this.Actor.DitherEffectController) &&
				(t ? e.SetIsDisable(!1, 1) : e.SetIsDisable(!0));
		}
	}
	qFr() {
		var t = this.CreatureDataInternal.GetModelConfig();
		t &&
			t?.IsHiddenWithCamera &&
			this.Actor.CharRenderingComponent.SetCapsuleDither(1);
	}
	PFr(t) {
		BlackboardController_1.BlackboardController.SetVectorValueByEntity(
			this.Entity.Id,
			"InitLocation",
			t.X,
			t.Y,
			t.Z,
		);
	}
};
(SimpleNpcActorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(175)],
	SimpleNpcActorComponent,
)),
	(exports.SimpleNpcActorComponent = SimpleNpcActorComponent);
