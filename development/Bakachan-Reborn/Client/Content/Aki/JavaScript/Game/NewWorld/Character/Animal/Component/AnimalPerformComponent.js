"use strict";
var AnimalPerformComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, r, i) {
			var o,
				n = arguments.length,
				a =
					n < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, r, i);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(o = e[s]) &&
						(a = (n < 3 ? o(a) : 3 < n ? o(t, r, a) : o(t, r)) || a);
			return 3 < n && a && Object.defineProperty(t, r, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
	BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
	DEFAULT_SIGHT_RANGE = 300,
	SIGHT_OPEN_DEGREE = 80,
	GAMEPLAY_TAG_DISAPPEAR = 1800978500,
	GAMEPLAY_TAG_BLUR = -1683566877,
	DESTROY_DISAPPEAR_TIME = 2e3,
	GAMEPLAY_TAG_INVISIBILITY = -208062360,
	GAMEPLAY_TAG_ON_HIT = -1555907721,
	ALERT_RANGE = 500,
	GAMEPLAY_TAG_ALERT = 836814667;
let AnimalPerformComponent = (AnimalPerformComponent_1 = class extends (
	BasePerformComponent_1.BasePerformComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.dbr = void 0),
			(this.Cbr = void 0),
			(this.gbr = !1),
			(this.fbr = Vector_1.Vector.Create()),
			(this.pbr = -1),
			(this.vbr = !1),
			(this.TBr = void 0),
			(this.Mbr = !1),
			(this.PendingDestroy = !0),
			(this.Sbr = (e, t) => {
				t &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAnimalDying,
						this.Entity,
					);
			}),
			(this.Ebr = (e, t) => {
				t &&
					(this.PendingDestroy
						? (this.Cbr.AddTag(-208062360),
							this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
								CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
							),
							TimerSystem_1.TimerSystem.Delay(() => {
								this.Entity &&
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.DelayRemoveEntityFinished,
										this.Entity,
									);
							}, 2e3))
						: EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.DelayRemoveEntityFinished,
								this.Entity,
							));
			}),
			(this.ybr = (e, t) => {
				var r = this.TBr.get(e);
				r &&
					(t
						? (this.Ibr(r),
							1800978500 === e &&
								(this.Cbr.AddTag(-208062360),
								this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
									CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN,
								)))
						: (this.Tbr(),
							1800978500 === e &&
								(this.Cbr.RemoveTag(-208062360),
								this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(
									CharacterNameDefines_1.CharacterNameDefines.PAWN,
								))));
			}),
			(this.k$e = () => {
				this.Entity.GetComponent(0).GetEntityType() !==
					Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
					(ModelManager_1.ModelManager.GameModeModel.IsMulti
						? (this.Hte.SetAutonomous(!0), this.Lbr())
						: this.Dbr());
			}),
			(this.Rbr = (e) => {
				if (e.BulletDataMain.Base.DamageId !== BigInt(0)) {
					let r = !1;
					var t = (e = e.Attacker).GetComponent(0);
					(r =
						!!(
							t?.IsRole() ||
							t?.IsVision() ||
							((t = e.GetComponent(47)) &&
								EntitySystem_1.EntitySystem.Get(t.RoleId)
									?.GetComponent(0)
									?.IsRole())
						) || r) && this.Cbr.AddTag(-1555907721);
				}
			}),
			(this.Abr = (e) => {
				!e?.Valid ||
					e.Id === this.Entity.Id ||
					((e = e.GetComponent(3).ActorLocationProxy),
					this.Hte.ActorLocationProxy.Subtraction(e, this.fbr),
					this.fbr.Size() > 500) ||
					this.Cbr.AddTag(836814667);
			}),
			(this.Ubr = (e, t, r) => {
				!this.Pbr(t) ||
					this.Cbr.HasTag(-1683566877) ||
					this.Cbr.AddTag(-1683566877);
			}),
			(this.xbr = (e, t, r, i) => {
				this.Pbr(t) &&
					this.Cbr.HasTag(-1683566877) &&
					this.Cbr.RemoveTag(-1683566877);
			});
	}
	HandlePendingDestroy() {
		this.PendingDestroy
			? this.Entity.GetComponent(185).AddTag(-1000614969)
			: EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.DelayRemoveEntityFinished,
					this.Entity,
				);
	}
	OnInitData(e) {
		return (
			(e = e.GetParam(AnimalPerformComponent_1)[0]),
			(this.gbr = (e || void 0)?.IsStare ?? !1),
			(this.TBr = new Map()),
			!0
		);
	}
	OnStart() {
		if (((this.Hte = this.Entity.GetComponent(3)), !this.Hte))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Animal",
						30,
						"[AnimalPerformComponent] 初始化失败 Actor Component Undefined",
					),
				!1
			);
		if (((this.AnimComp = this.Entity.GetComponent(160)), !this.AnimComp))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Animal",
						30,
						"[AnimalPerformComponent] 初始化失败 Animation Component Undefined",
						["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["PlayerId", this.Hte.CreatureData.GetPlayerId()],
					),
				!1
			);
		this.AnimComp.EnableSightDirect = this.gbr;
		var e = this.AnimComp.MainAnimInstance;
		if (e) {
			var t = e.材质配置,
				r = t.Num();
			for (let e = 0; e < r; ++e) {
				var i,
					o = t.GetKey(e);
				o.TagName.includes("动物.")
					? ((i = t.Get(o)), this.TBr.set(o.TagId, i.ToAssetPathName()))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Animal",
							30,
							"[AnimalPerformComponent] 材质GameplayTag不符合规范",
							["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
							["PbDataId", this.Hte.CreatureData.GetPbDataId()],
							["PlayerId", this.Hte.CreatureData.GetPlayerId()],
						);
			}
		}
		if (((this.dbr = this.Entity.GetComponent(104)), !this.dbr))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Animal",
						30,
						"[AnimalPerformComponent] 初始化失败 Perception Component Undefined",
						["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["PlayerId", this.Hte.CreatureData.GetPlayerId()],
					),
				!1
			);
		if (
			(this.dbr.SetSightRange(300),
			(this.Cbr = this.Entity.GetComponent(185)),
			!this.Cbr)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Animal",
						30,
						"[AnimalPerformComponent] 初始化失败 GameplayTag Component Undefined",
						["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()],
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["PlayerId", this.Hte.CreatureData.GetPlayerId()],
					),
				!1
			);
		for (const e of this.TBr)
			this.Cbr.AddTagAddOrRemoveListener(e[0], this.ybr);
		return (
			this.Cbr.AddTagAddOrRemoveListener(-1000614969, this.Ebr),
			this.Cbr.AddTagAddOrRemoveListener(1008164187, this.Sbr),
			this.Ore(),
			!0
		);
	}
	OnActivate() {
		this.Entity.GetComponent(0).GetEntityType() !==
			Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			(this.Hte.SetAutonomous(!0), this.Lbr());
	}
	OnTick(e) {
		this.gbr &&
			(this.dbr.IsInSightRange && this.wbr()
				? this.Bbr(Global_1.Global.BaseCharacter.CharacterActorComponent)
				: this.Bbr(void 0));
	}
	wbr() {
		var e = Global_1.Global.BaseCharacter.CharacterActorComponent;
		return (
			(e =
				(this.fbr.FromUeVector(e.ActorLocationProxy),
				this.fbr.SubtractionEqual(this.Hte.ActorLocationProxy),
				(this.fbr.Z = 0),
				this.fbr.Normalize(),
				MathUtils_1.MathUtils.GetAngleByVectorDot(
					this.fbr,
					this.Hte.ActorForwardProxy,
				))) <= 80
		);
	}
	Bbr(e) {
		this.gbr && this.AnimComp.SetSightTargetItem(e);
	}
	OnEnd() {
		this.Dbr(), this.kre();
		for (const e of this.TBr)
			this.Cbr.RemoveTagAddOrRemoveListener(e[0], this.ybr);
		return this.Cbr.RemoveTagAddOrRemoveListener(1008164187, this.Sbr), !0;
	}
	Ibr(e) {
		-1 < this.pbr && this.Tbr(),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.PD_CharacterControllerData_C,
				(e) => {
					e?.IsValid() &&
						this &&
						this.Hte &&
						this.Hte.Actor?.IsValid() &&
						(this.pbr =
							this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
								e,
							));
				},
			);
	}
	Tbr() {
		-1 < this.pbr &&
			this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
				this.pbr,
			),
			(this.pbr = -1);
	}
	Lbr() {
		var e;
		this.Mbr ||
			(this.Hte?.Valid &&
				this.Hte.Actor?.IsValid() &&
				UE.KuroStaticLibrary.IsObjectClassByName(
					this.Hte.Actor,
					CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
				) &&
				((e = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Add(
					this.Ubr,
				),
				e.OnComponentEndOverlap.Add(this.xbr),
				(this.Mbr = !0)));
	}
	Dbr() {
		var e;
		this.Mbr &&
			this.Hte?.Valid &&
			this.Hte.Actor?.IsValid() &&
			UE.KuroStaticLibrary.IsObjectClassByName(
				this.Hte.Actor,
				CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET,
			) &&
			((e = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Remove(
				this.Ubr,
			),
			e.OnComponentEndOverlap.Remove(this.xbr),
			(this.Mbr = !1));
	}
	SetUiOpenPerformance(e, t) {
		var r = this.Entity.GetComponent(14);
		6 === r.CurrentState()
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Animal",
					30,
					"开启系统UI失败，系统UI已开启",
					["ConfigID", this.Hte.CreatureData.GetPbDataId()],
					["已开启系统UI", e],
				)
			: ((r.GetState(7).SystemUiViewName = e), r.SwitchState(7));
	}
	InitFeedingAnimalConfig(e, t) {
		this.Entity.GetComponent(14).GetState(7).InitFeedingAnimalConfig(e, t);
	}
	Pbr(e) {
		e = ActorUtils_1.ActorUtils.GetEntityByActor(e, !1);
		return !(
			!e?.Valid ||
			!e.Entity.GetComponent(0).IsRole() ||
			!(e = e.Entity.GetComponent(3))?.Valid ||
			e.IsAutonomousProxy
		);
	}
	Ore() {
		this.vbr ||
			(EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.BulletHitSpecialCharacter,
				this.Rbr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeModeFinish,
				this.k$e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAnimalDying,
				this.Abr,
			),
			(this.vbr = !0));
	}
	kre() {
		this.vbr &&
			(EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.BulletHitSpecialCharacter,
				this.Rbr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeModeFinish,
				this.k$e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAnimalDying,
				this.Abr,
			),
			(this.vbr = !1));
	}
});
(AnimalPerformComponent = AnimalPerformComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(154)],
		AnimalPerformComponent,
	)),
	(exports.AnimalPerformComponent = AnimalPerformComponent);
