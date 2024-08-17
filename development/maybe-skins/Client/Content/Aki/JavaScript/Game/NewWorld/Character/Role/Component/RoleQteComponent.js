"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, o, n);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(r = e[l]) && (i = (a < 3 ? r(i) : 3 < a ? r(t, o, i) : r(t, o)) || i);
		return 3 < a && i && Object.defineProperty(t, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleQteComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
	PROFILE_KEY = "RoleQteComponent_SetQtePosition",
	DEFAULT_ADD_HEIGHT = -1e3,
	SUB_SIZE = 5,
	MAX_MULTI_QTE_DISTANCE = 5e3,
	QTE_LOCKON_CONFIG_ID = 4;
let RoleQteComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.n2r = void 0),
			(this.Xte = void 0),
			(this.elt = void 0),
			(this.bon = void 0),
			(this.rDr = void 0),
			(this.qon = void 0),
			(this.Gon = void 0),
			(this.Non = void 0),
			(this.Oon = void 0),
			(this.cz = Vector_1.Vector.Create()),
			(this.kon = new Set()),
			(this.IsInQte = !1),
			(this.Fon = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					t
						? EventDefine_1.EEventName.CharQteActive
						: EventDefine_1.EEventName.CharQteConsume,
					this.Entity.Id,
				);
			}),
			(this.Von = (e) => {
				this.Entity.Id !== e && this.kon.delete(e);
			}),
			(this.sJe = () => {
				this.kon.clear();
			}),
			(this.Hon = (e, t) => {
				t
					? (this.IsInQte = !0)
					: ((this.IsInQte = !1),
						this.elt.RemoveBuffByTag(-52094810, "QTE结束移除"),
						ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
							this.Entity.Id,
							{ ParamType: 1 },
						)?.IsControl() || this.bon.SetRoleDisableWithEffect()),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CharInQteChanged,
						this.Entity.Id,
						this.IsInQte,
					);
			});
	}
	OnStart() {
		return (
			(this.nXt = this.Entity.GetComponent(3)),
			(this.n2r = this.Entity.CheckGetComponent(17)),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			(this.elt = this.Entity.CheckGetComponent(157)),
			(this.bon = this.Entity.CheckGetComponent(81)),
			(this.rDr = this.Entity.CheckGetComponent(33)),
			(this.qon = this.Xte.ListenForTagAddOrRemove(166024319, this.Fon)),
			(this.Gon = this.Xte.ListenForTagAddOrRemove(1674960297, this.Hon)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterOnlineWorld,
				this.sJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharQteConsume,
				this.Von,
			),
			!0
		);
	}
	OnEnd() {
		return (
			this.qon && (this.qon.EndTask(), (this.qon = void 0)),
			this.Gon && (this.Gon.EndTask(), (this.Gon = void 0)),
			(this.Non = void 0),
			(this.Oon = void 0),
			(this.IsInQte = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterOnlineWorld,
				this.sJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharQteConsume,
				this.Von,
			),
			!0
		);
	}
	IsQteReady(e) {
		if (this.IsInQte) return !1;
		if (!FormationDataController_1.FormationDataController.GlobalIsInFight)
			return !1;
		if (this.Xte.HasTag(1008164187)) return !1;
		if (this.Xte.HasTag(-1732116741)) return !1;
		var t = e.Entity.GetComponent(185);
		if (!t.HasTag(166024319) || t.HasTag(1008164187)) return !1;
		if (!t.HasTag(2014048239) && this.kon.has(e.Id)) return !1;
		if (
			((t = e.Entity.GetComponent(3)),
			1 <
				ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length)
		) {
			if (t.IsAutonomousProxy) return !1;
			if (
				((t = this.nXt.ActorLocationProxy),
				!ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
					t,
					5e3,
				).some((t) => t.EntityHandle === e))
			)
				return !1;
		}
		return !0;
	}
	UseExitSkill(e) {
		var t = new UE.GameplayEventData();
		(t.Instigator = this.nXt.Actor),
			(t.Target = e.Entity.GetComponent(3).Actor),
			this.n2r.SendGameplayEventToActor(
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(1574573160),
				t,
			);
	}
	TryExecuteQte(e, t = !1) {
		1 < ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length
			? this.jon(e)
			: this.Won(e, t);
	}
	Won(e, t = !1) {
		var o = e.Entity.GetComponent(79),
			n = e.Entity.GetComponent(185);
		o.ActivateFusion(this.Entity),
			n.HasTag(2014048239) || o.ClearElementEnergy(this.Entity),
			this.men(e),
			this.bon.SetTeamTag(0),
			ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
				this.Entity,
				!0,
				"RoleQteComponent.ExecuteQte",
			),
			this.n2r.SendGameplayEventToActor(
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(275057742),
			),
			this.elt.AddBuff(CharacterBuffIds_1.buffId.QteInvincible, {
				InstigatorId: this.elt.CreatureDataId,
				Reason: "ExecuteQte",
			}),
			t
				? this.elt.AddBuff(CharacterBuffIds_1.buffId.QteAssistCd, {
						InstigatorId: this.elt.CreatureDataId,
						Reason: "ExecuteQte",
					})
				: this.elt.AddBuff(CharacterBuffIds_1.buffId.QteCd, {
						InstigatorId: this.elt.CreatureDataId,
						Reason: "ExecuteQte",
					});
	}
	jon(e) {
		this.n2r.SendGameplayEventToActor(
			GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(275057742),
		),
			this.elt.AddBuff(CharacterBuffIds_1.buffId.QteInvincible, {
				InstigatorId: this.elt.CreatureDataId,
				Reason: "ExecuteMultiQte",
			}),
			this.elt.AddBuff(CharacterBuffIds_1.buffId.QteCd, {
				InstigatorId: this.elt.CreatureDataId,
				Reason: "ExecuteMultiQte",
			});
		var t = e.Entity.GetComponent(79);
		e.Entity.GetComponent(185).HasTag(2014048239) ||
			(t.ClearElementEnergy(this.Entity), this.kon.add(e.Id)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharExecuteMultiQte,
				this.Entity.Id,
				e.Id,
			);
	}
	Kon() {
		this.Non ||
			((this.Non = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Non.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Non.Radius = this.nXt.ScaledRadius),
			(this.Non.bIsSingle = !0),
			(this.Non.bIgnoreSelf = !0),
			this.Non.SetTraceTypeQuery(
				QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
			));
	}
	Qon() {
		this.Oon ||
			((this.Oon = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.Oon.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Oon.bIsSingle = !0),
			(this.Oon.bIgnoreSelf = !0),
			this.Oon.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			this.Oon.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
			));
	}
	Xon(e, t, o) {
		e.HitResult?.Clear(),
			e.ActorsToIgnore.Empty(),
			e.ActorsToIgnore.Add(t.Owner),
			e.ActorsToIgnore.Add(o.Actor);
		var n = o.Entity.GetComponent(47)?.GetFollowActor();
		if (n) for (let t = 0; t < n.Num(); t++) e.ActorsToIgnore.Add(n.Get(t));
	}
	SetQtePosition(e) {
		var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
		if (t) {
			let r = t;
			(n = Vector_1.Vector.Create()).DeepCopy(r.ActorLocationProxy),
				e.ReferenceTarget &&
					(o = this.rDr.SkillTarget)?.Valid &&
					((r = o.Entity.GetComponent(1)),
					(o = this.rDr.GetTargetTransform()),
					n.DeepCopy(o.GetLocation())),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						49,
						"Qte设置位置开始",
						["targetName", r.Owner?.GetName()],
						["currentLocation", this.nXt.ActorLocationProxy],
						["targetLocation", n],
					),
				this.Kon(),
				this.Xon(this.Non, r, t),
				this.Qon(),
				this.Xon(this.Oon, r, t);
			let a = 0,
				i = 0;
			(0, RegisterComponent_1.isComponentInstance)(r, 3)
				? ((a = r.ScaledRadius), (i = r.HalfHeight))
				: (0, RegisterComponent_1.isComponentInstance)(r, 182) &&
					((a = o = r.GetRadius()), (i = o));
			var o = { Location: n, Radius: a, HalfHeight: i };
			let l, s;
			s =
				1 === e.QteType
					? ((l = this.$on(t, e, o)), "Qte.设置空中位置")
					: ((l = this.Yon(t, e, o)), "Qte.设置地面位置");
			var n;
			(e = (n = this.nXt).ActorLocationProxy),
				(o = this.Oon),
				(t =
					(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						o,
						t.ActorLocationProxy,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, l),
					TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY))),
				(o = o.HitResult),
				(o =
					(t &&
						o.bBlockingHit &&
						(TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, l),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								49,
								"Qte设置位置，与目标位置间有障碍",
								["碰撞位置", l],
							),
						(t = this.cz),
						l.Subtraction(e, t),
						t.Normalize(),
						t.Multiply(n.ScaledRadius, t),
						l.Subtraction(t, l)),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Character", 49, "Qte设置位置", ["location", l]),
					this.nXt.SetActorLocation(l.ToUeVector(), s, !1),
					n.ScaledHalfHeight)),
				(t = Vector_1.Vector.Create(e.X, e.Y, e.Z + o)),
				(e = Vector_1.Vector.Create(e.X, e.Y, e.Z - o)),
				(t =
					((this.Non.Radius = n.ScaledRadius),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, t),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, e),
					TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.Non,
						PROFILE_KEY,
					))),
				(e = this.Non.HitResult);
			if (t && e.bBlockingHit) {
				const t =
					ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
				TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, t),
					(t.Z += o),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Character", 49, "Qte设置位置，地面检测修正位置", [
							"location",
							t,
						]),
					n.SetActorLocation(t.ToUeVector(), "Qte.修正位置", !1);
			}
			e.Clear();
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					23,
					"GetQtePosition error, currentRole not found",
				);
	}
	$on(e, t, o) {
		let n = t.Length;
		var r = Vector_1.Vector.Create(),
			a =
				(e.ActorLocationProxy.Subtraction(o.Location, r),
				r.IsNearlyZero() ? r.DeepCopy(e.ActorForwardProxy) : (n += o.Radius),
				(r.Z = 0),
				r.RotateAngleAxis(t.Rotate, Vector_1.Vector.UpVectorProxy, r),
				r.Normalize(),
				r.Multiply(n, r),
				Vector_1.Vector.Create()),
			i =
				((r =
					(a.DeepCopy(o.Location),
					a.Addition(r, a),
					(a.Z += t.Height),
					e.ActorLocationProxy)),
				(r =
					(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.Non,
						r,
					),
					(a.Z += o.HalfHeight / 2),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, a),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							49,
							"Qte设置空中位置，检测开始",
							["开始位置", r],
							["结束位置", a],
						),
					TraceElementCommon_1.TraceElementCommon.ShapeTrace(
						e.Actor.CapsuleComponent,
						this.Non,
						PROFILE_KEY,
						PROFILE_KEY,
					))),
				this.Non.HitResult);
		return (
			(a.Z -= o.HalfHeight / 2),
			r &&
				i.bBlockingHit &&
				((r = Vector_1.Vector.Create()),
				TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.Non.HitResult,
					0,
					r,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						49,
						"Qte设置空中位置，检测结果",
						["障碍物", i.Actors.Get(0)?.GetName()],
						["碰撞位置", r],
					),
				(i = this.cz),
				e.ActorLocationProxy.Subtraction(r, i),
				(i.Z = 0),
				i.Normalize(),
				(o = o.Radius + e.GetRadius()),
				i.Multiply(o, i),
				a.DeepCopy(r),
				a.Addition(i, a),
				(a.Z += t.Height)),
			a
		);
	}
	Yon(e, t, o) {
		var n = Vector_1.Vector.Create(),
			r = (n.DeepCopy(o.Location), o.HalfHeight - 5),
			a = ((n.Z += r), Vector_1.Vector.Create()),
			i =
				((r =
					(e.ActorLocationProxy.Subtraction(o.Location, a),
					a.IsNearlyZero() && a.DeepCopy(e.ActorForwardProxy),
					(a.Z = 0),
					a.RotateAngleAxis(t.Rotate, Vector_1.Vector.UpVectorProxy, a),
					a.Normalize(),
					r + t.Height - -1e3)),
				e.Actor.CharacterMovement.K2_GetWalkableFloorAngle());
		o = t.Length + o.Radius;
		let l = this.Jon(n, a, o, r, i);
		return (
			l ||
				(a.Normalize(),
				a.Multiply(-1, a),
				(l =
					(l = this.Jon(n, a, o, r, i)) ||
					Vector_1.Vector.Create(e.ActorLocationProxy))),
			(l.Z += t.Height),
			l
		);
	}
	Jon(e, t, o, n, r) {
		var a = this.nXt.Actor.CapsuleComponent,
			i = (t.Multiply(o, t), Vector_1.Vector.Create());
		(e = (i.DeepCopy(e), Vector_1.Vector.Create())).DeepCopy(i),
			e.Addition(t, e),
			this.Non.HitResult?.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					49,
					"Qte设置地面位置，延输入方向检测开始",
					["开始位置", i],
					["结束位置", e],
				),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, i),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, e),
			(t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
				a,
				this.Non,
				PROFILE_KEY,
				PROFILE_KEY,
			));
		let l = this.Non.HitResult;
		var s = Vector_1.Vector.Create(),
			c = Vector_1.Vector.Create();
		if ((i.DeepCopy(e), t && l.bBlockingHit)) {
			if (
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(l, 0, s),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						49,
						"Qte设置地面位置，延输入方向检测结果",
						["障碍数量", l.Actors.Num()],
						["障碍物", l.Actors.Get(0)?.GetName()],
						["碰撞位置", s],
					),
				TraceElementCommon_1.TraceElementCommon.GetImpactNormal(l, 0, c),
				r <
					MathUtils_1.MathUtils.GetAngleByVectorDot(
						c,
						Vector_1.Vector.UpVectorProxy,
					))
			)
				return;
			i.DeepCopy(s);
		}
		if (
			((o = o / Math.tan(r * MathUtils_1.MathUtils.DegToRad) + n),
			e.DeepCopy(i),
			(e.Z -= o),
			this.Non.HitResult?.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					49,
					"Qte设置地面位置，垂直方向检测开始",
					["开始位置", i],
					["结束位置", e],
				),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Non, i),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Non, e),
			(t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
				a,
				this.Non,
				PROFILE_KEY,
				PROFILE_KEY,
			)),
			(l = this.Non.HitResult),
			s.Reset(),
			c.Reset(),
			t && l.bBlockingHit)
		)
			return (
				TraceElementCommon_1.TraceElementCommon.GetHitLocation(l, 0, s),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						49,
						"Qte设置地面位置，垂直方向检测结果",
						["障碍数量", l.Actors.Num()],
						["障碍物", l.Actors.Get(0)?.GetName()],
						["碰撞位置", s],
					),
				TraceElementCommon_1.TraceElementCommon.GetImpactNormal(l, 0, c),
				r <
				MathUtils_1.MathUtils.GetAngleByVectorDot(
					c,
					Vector_1.Vector.UpVectorProxy,
				)
					? void 0
					: s
			);
	}
	men(e) {
		var t = e.Entity.GetComponent(33);
		t.SkillTarget?.Valid &&
		t.SkillTarget?.Entity?.Active &&
		!t.SkillTarget.Entity.GetComponent(185)?.HasTag(1008164187)
			? ((this.rDr.SkillTarget = t.SkillTarget),
				(this.rDr.SkillTargetSocket = t.SkillTargetSocket))
			: ((t = e.Entity.GetComponent(29)).SelectSoftLockTarget(4),
				(this.rDr.SkillTarget = t.GetCurrentTarget()),
				(this.rDr.SkillTargetSocket = t.GetCurrentTargetSocketName()));
	}
};
(RoleQteComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(86)],
	RoleQteComponent,
)),
	(exports.RoleQteComponent = RoleQteComponent);
