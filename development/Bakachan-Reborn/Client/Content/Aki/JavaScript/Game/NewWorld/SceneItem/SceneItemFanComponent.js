"use strict";
var SceneItemFanComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, i) {
			var o,
				s = arguments.length,
				h =
					s < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				h = Reflect.decorate(t, e, n, i);
			else
				for (var r = t.length - 1; 0 <= r; r--)
					(o = t[r]) &&
						(h = (s < 3 ? o(h) : 3 < s ? o(e, n, h) : o(e, n)) || h);
			return 3 < s && h && Object.defineProperty(e, n, h), h;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemFanComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GlobalData_1 = require("../../GlobalData"),
	CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
	LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	FAN_DEFAULT_ROTATE_SPEED = 120,
	FAN_MAX_TRACE_LENGTH_OFFSET = 300,
	FAN_DEFAULT_SPLINE_LENGTH = 300,
	SPLINE_MOVE_SEPPD = 6e3,
	FIRST_SPLINE_MOVE_SPEED = 3e4,
	WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME = 1e3,
	PROFILE_BULLECT_TRACK = "SceneItemFanComponent_StartTrace",
	FAN_SPHERE_TRACE_RADIUS = 10,
	ROTATE_ACTOR_KEY = "RotateActor",
	OFFSET_ACTOR_KEY = "OffsetActor";
class SporeStruct {
	constructor() {
		(this.Length = 0),
			(this.SporeEntityIds = new Array()),
			(this.SporeEntityLength = new Array()),
			(this.gwe = 0),
			(this.RootCreatureDataId = 0),
			(this.Xnr = void 0);
	}
	Init(t) {
		this.Xnr = t;
	}
	Clear(t = !1) {
		if (t)
			for (let t = this.SporeEntityIds.length - 1; -1 < t; t--) {
				var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
					this.SporeEntityIds[t],
				);
				e && this.Xnr && this.Xnr(e.Entity, !0, !1);
			}
		(this.Length = 0),
			(this.SporeEntityIds.length = 0),
			(this.SporeEntityLength.length = 0),
			(this.gwe = 0);
	}
	NeedTick() {
		return 0 < this.SporeEntityIds.length;
	}
	SetPreLength(t) {
		this.gwe = t + 0.01;
		for (let t = this.SporeEntityIds.length - 1; -1 < t; t--)
			this.gwe >= this.SporeEntityLength[t] &&
				(this.SporeEntityLength.splice(t, 1), this.SporeEntityIds.splice(t, 1));
	}
	SpliceToEntity(t) {
		for (
			let e = this.SporeEntityIds.length - 1;
			-1 < e && this.SporeEntityIds[e] !== t;
			e--
		)
			this.SporeEntityLength.splice(e, 1), this.SporeEntityIds.splice(e, 1);
	}
	Tick(t, e) {
		this.gwe += t * TimeUtil_1.TimeUtil.Millisecond * (e ? 3e4 : 6e3);
		for (let t = this.SporeEntityIds.length - 1; -1 < t; t--) {
			var n;
			this.gwe > this.SporeEntityLength[t] &&
				((n = this.SporeEntityIds[t]),
				this.SporeEntityLength.splice(t, 1),
				this.SporeEntityIds.splice(t, 1),
				(n = ModelManager_1.ModelManager.CreatureModel?.GetEntity(n))) &&
				this.Xnr &&
				this.Xnr(n.Entity, !0, !1);
		}
	}
}
class SplinePoint {
	constructor() {
		(this.Location = void 0),
			(this.Rotator = void 0),
			(this.Offset = void 0),
			(this.EntityId = 0),
			(this.EffectConfig = void 0),
			(this.IsBlockInMiddle = !1),
			(this.HitLocation = void 0),
			(this.HitRotator = void 0);
	}
}
let SceneItemFanComponent = (SceneItemFanComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.FCn = 0),
			(this.VCn = 0),
			(this._se = 0),
			(this.HCn = void 0),
			(this.jCn = 0),
			(this.WCn = 0),
			(this.KCn = new Map()),
			(this.QCn = void 0),
			(this.XCn = void 0),
			(this.Brr = 120),
			(this.$Cn = 0),
			(this.YCn = Vector_1.Vector.Create(0, 0, 0)),
			(this.JCn = void 0),
			(this.zCn = void 0),
			(this.ZCn = void 0),
			(this.nXt = void 0),
			(this.egn = void 0),
			(this.hwe = void 0),
			(this.Ome = void 0),
			(this.tgn = void 0),
			(this.ign = void 0),
			(this.EHs = void 0),
			(this.cz = void 0),
			(this.Cji = void 0),
			(this.U9r = void 0),
			(this.ogn = void 0),
			(this.rgn = void 0),
			(this.ngn = void 0),
			(this.sgn = 0),
			(this.Xte = void 0),
			(this.agn = void 0),
			(this.lsn = void 0),
			(this.hgn = !1),
			(this.lgn = void 0),
			(this.gIe = (t, e) => {}),
			(this._gn = void 0),
			(this.SceneInteractionLoadCompleted = !1),
			(this.Qnn = () => {
				this.SceneInteractionLoadCompleted = !0;
				var t,
					e = this.nXt?.GetInteractionMainActor();
				(e =
					((this._gn = e?.ReferenceActors?.Get("RotateActor")),
					this.ugn(),
					e?.ReferenceActors?.Get("OffsetActor")))
					? ((this.YCn = Vector_1.Vector.Create(e.K2_GetActorLocation())),
						this.YCn.SubtractionEqual(this.nXt.ActorLocationProxy),
						(t = Quat_1.Quat.Create()),
						this.nXt.ActorRotationProxy.Quaternion().Inverse(t),
						t.RotateVector(this.YCn, this.YCn))
					: this.YCn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
					this.cgn(e),
					this.mgn(),
					!this.dgn && this.hgn && this.$tn();
			}),
			(this.Cgn = (t, e) => {
				if (!this.IsAnyRotating) {
					let n;
					(n = this.dgn ? this : this.JCn) &&
						(t || (this.zBn = e), n.ggn(t, this), (this.zBn = void 0));
				}
			}),
			(this.fgn = void 0),
			(this.pgn = void 0),
			(this.zBn = void 0),
			(this.vgn = void 0),
			(this.Mgn = !1),
			(this.Sgn = (t, e, n) => {
				const i = t.GetComponent(135);
				if (e && !this.Egn && i) i.ygn();
				else {
					if (i)
						if (e) {
							if (!i.Ign()) return;
						} else if (!i.dce()) return;
					if (this.ngn)
						if (this.ngn.has(t.Id)) {
							if (e) {
								if (this.ngn.get(t.Id)) return;
							} else if (!this.ngn.get(t.Id)) return;
						} else this.ngn.set(t.Id, e);
					var o;
					n
						? (n = t.GetComponent(177)) &&
							(e
								? (n.RemoveServerTagByIdLocal(-1152559349, ""),
									n.HasTag(-3775711) || n.AddServerTagByIdLocal(-3775711, ""))
								: (n.RemoveServerTagByIdLocal(-3775711, ""),
									n.HasTag(-1152559349) ||
										n.AddServerTagByIdLocal(-1152559349, "")),
							this.ngn.set(t.Id, e))
						: ((n = this.nXt.CreatureData.GetCreatureDataId()),
							(o = t.GetComponent(0)?.GetCreatureDataId()) &&
								this.Tgn(n, o, e, (n) => {
									0 !== n?.X5n
										? Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Level",
												37,
												"SendBaoziStateRequest Failed",
												["ErrorCode", n?.X5n],
											)
										: (this.ngn.set(t.Id, e), !e && i && i.Ugn(!1, !1));
								}));
				}
			}),
			(this.Lgn = 0),
			(this.kke = (t, e) => {
				if (
					(-511894810 === t &&
						(this.JCn?.Dgn(this.Entity.Id, e), e) &&
						this.Rgn(),
					-3775711 === t && e)
				) {
					if (
						this.dgn &&
						(this.Agn ||
							((this.Agn = !0),
							this.Egn ? this.Kgn(void 0, !0) : (this.Lgn = 5e3),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Level",
									37,
									"[SceneItemFanComponent] Root Active",
									["EntityId", this.Entity.Id],
								)),
						this.zCn)
					)
						for (const t of this.zCn) t?.GetComponent(135)?.Ugn(!1, !1);
					this.Ugn(!0);
				} else -1152559349 === t && e && this.Ugn(!1, !1);
				if (this.dgn && (-1152559349 === t || 1298716444 === t) && e) {
					if (this.zCn) for (const t of this.zCn) t?.GetComponent(135)?.Rgn();
					1298716444 === t && this.ZDn();
				}
				if (e)
					for (const e of this.KCn)
						if (e[0] === t) return (this.QCn = e[1]), void this.Pgn();
				for (const t of this.KCn) if (this.Xte?.HasTag(t[0])) return;
				this.QCn !== this.HCn && ((this.QCn = this.HCn), this.Pgn());
			}),
			(this.xgn = 0),
			(this.opi = 0),
			(this.Krr = void 0),
			(this.wgn = void 0),
			(this.Bgn = void 0),
			(this.bgn = void 0),
			(this.S8s = void 0),
			(this.E8s = void 0),
			(this.qgn = void 0),
			(this.Ggn = void 0),
			(this.Egn = !1),
			(this.y8s = !1),
			(this.Ngn = 0),
			(this.Ogn = 0),
			(this.fle = 0),
			(this.kgn = 0),
			(this.Fgn = 0),
			(this.Agn = !1),
			(this.Vgn = !1),
			(this.gCn = (t) => {
				this.ExecuteInteract();
			}),
			(this.cjr = (t) => {
				var e, n;
				if (
					(0 < this.Fgn &&
						((this.Fgn -= t),
						(e = MathUtils_1.MathUtils.Lerp(
							this.fle,
							this.kgn,
							1 - MathUtils_1.MathUtils.Clamp(this.Fgn / this.$Cn, 0, 1),
						)),
						(this.hwe.Yaw = e),
						MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.egn, this.Ome),
						this.Hgn(this.Ome, "SceneItemFanComponent Rotate"),
						this.Fgn <= 0) &&
						this.jgn(),
					this.dgn)
				) {
					if (
						(this.Wgn(t),
						this.rgn?.NeedTick() && this.rgn.Tick(t, this.y8s),
						0 < this.Lgn)
					) {
						this.Lgn -= t;
						let e = !0;
						for (const t of this.zCn) {
							var i = t.GetComponent(135);
							if (i && !this.Egn && !i.dce()) {
								e = !1;
								break;
							}
						}
						e
							? ((this.Lgn = 0),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Level",
										37,
										"[SceneItemFanComponent] All Child Active",
										["EntityId", this.Entity.Id],
									),
								this.Kgn())
							: this.Lgn <= 0 &&
								(Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Level",
										37,
										"[SceneItemFanComponent] Wait Child Active Timeout",
										["EntityId", this.Entity.Id],
									),
								this.Kgn());
					}
					if (this.vgn) {
						for (let t = this.vgn.length - 1; -1 < t; t--) {
							var o,
								s = this.vgn[t];
							s =
								ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
									s,
								);
							s?.Entity &&
								((o = s?.Entity?.GetComponent(135))
									? o.SceneInteractionLoadCompleted &&
										(o?.Valid && o.SetRoot(this),
										this.zCn.push(s.Entity),
										this.vgn.splice(t, 1))
									: (this.vgn.splice(t, 1), this.zCn.push(s.Entity)));
						}
						0 === this.vgn.length && ((this.vgn = void 0), this.Qgn());
					}
					if (this.S8s && this.E8s)
						for (let e = this.E8s.length - 1; -1 < e; e--)
							this.E8s[e] <= t
								? ((n = this.S8s[e]),
									this.S8s.splice(e, 1),
									this.E8s.splice(e, 1),
									EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
										n,
										!1,
									))
								: (this.E8s[e] -= t);
				}
			}),
			(this.Xgn = void 0),
			(this.$gn = void 0),
			(this.Ygn = void 0),
			(this.Wtn = void 0),
			(this.Jgn = 300),
			(this.zgn = void 0),
			(this.Zgn = -1),
			(this.e0n = !1),
			(this.t0n = !1),
			(this.i0n = !1),
			(this.ZYo = void 0),
			(this.o0n = void 0),
			(this.r0n = void 0),
			(this.n0n = void 0),
			(this.s0n = 0),
			(this.a0n = 0),
			(this.h0n = 0),
			(this.l0n = 0),
			(this._0n = void 0),
			(this.u0n = void 0),
			(this.c0n = void 0),
			(this.m0n = void 0),
			(this.d0n = void 0),
			(this.C0n = void 0),
			(this.g0n = void 0),
			(this.f0n = void 0),
			(this.p0n = void 0);
	}
	get dgn() {
		return void 0 === this.JCn && void 0 !== this.zCn;
	}
	OnInitData(t) {
		if (
			((t = t.GetParam(SceneItemFanComponent_1)[0]),
			(this.FCn = t.CirclePerRound),
			(this.VCn = t.InitCircle),
			t.TargetEntityId && (this._se = t.TargetEntityId),
			(this.Egn = t.GearType === IComponent_1.EFanGearType.LightDeliver),
			t.InteractType?.Type === IComponent_1.EFanInteractType.FKey &&
				((this.hgn = !0), (this.zgn = t.InteractType?.TidInteractOptionText)),
			(this.lgn = t.Condition),
			t.EffectConfig && ((this.HCn = t.EffectConfig), (this.QCn = this.HCn)),
			t.EffectByState)
		)
			for (const n of t.EffectByState) {
				var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
					n.EntityState,
				);
				e && this.KCn.set(e, n.EffectConfig);
			}
		else this.XCn = this.QCn;
		return (
			(this.jCn = 360 / this.FCn),
			(this.$Cn =
				(this.jCn / this.Brr) * TimeUtil_1.TimeUtil.InverseMillisecond),
			!0
		);
	}
	OnStart() {
		if (
			(this.Entity.GetComponent(138).RegisterComponent(this),
			this.hgn ||
				EventSystem_1.EventSystem.AddWithTarget(
					this,
					EventDefine_1.EEventName.OnSceneItemHitByHitData,
					this.gCn,
				),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				this.Qnn,
			),
			0 < this.KCn.size &&
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
			(this.nXt = this.Entity.GetComponent(182)),
			!this.nXt)
		)
			return !1;
		if (
			((this.Xte = this.Entity.GetComponent(177)),
			(this.agn = this.Entity.GetComponent(145)),
			(this.lsn = this.Entity.GetComponent(74)),
			0 < this.KCn.size)
		) {
			for (const t of this.KCn)
				if (this.Xte?.HasTag(t[0])) {
					this.QCn = t[1];
					break;
				}
			this.KCn.has(-3775711) && (this.XCn = this.KCn.get(-3775711));
		}
		this.Xte?.AddTagAddOrRemoveListener(-511894810, this.kke),
			this.Xte?.AddTagAddOrRemoveListener(-3775711, this.kke),
			this.Xte?.AddTagAddOrRemoveListener(-1152559349, this.kke),
			this.Xte?.AddTagAddOrRemoveListener(1298716444, this.kke),
			(this.hwe = Rotator_1.Rotator.Create()),
			(this.Ome = Rotator_1.Rotator.Create()),
			(this.tgn = Vector_1.Vector.Create()),
			(this.ign = Vector_1.Vector.Create()),
			(this.o0n = Vector_1.Vector.Create()),
			(this.r0n = Vector_1.Vector.Create()),
			(this.n0n = Vector_1.Vector.Create()),
			(this.cz = Vector_1.Vector.Create()),
			(this.ZYo = Vector_1.Vector.Create());
		var t = this.nXt.CreatureData?.ComponentDataMap.get("cps")?.cps;
		return (
			t && (this.WCn = t.yMs),
			!Info_1.Info.EnableForceTick &&
				this.Active &&
				ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.cjr,
				),
			!0
		);
	}
	OnEnable() {
		!Info_1.Info.EnableForceTick &&
			this.Entity?.IsInit &&
			ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
				this,
				this.cjr,
			);
	}
	OnDisable(t) {
		Info_1.Info.EnableForceTick ||
			ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
				this,
			);
	}
	Pgn() {
		this.dgn && this.Mgn
			? (this.v0n(this.QCn?.EffectPath, 0, this.bgn),
				this.v0n(this.QCn?.HitEffectPath, 0, this.qgn))
			: this.JCn?.OnChildCurrentFanEffectChange(this.Entity.Id, this.QCn);
	}
	OnChildCurrentFanEffectChange(t, e) {
		if (this.dgn && this.Mgn) {
			let n = -1;
			for (let i = 0; i < this.U9r.length; i++)
				if (this.U9r[i].EntityId === t) {
					(n = i), (this.U9r[i].EffectConfig = e);
					break;
				}
			-1 < n &&
				((n += 1),
				this.v0n(e?.EffectPath, n, this.bgn),
				this.v0n(e?.HitEffectPath, n, this.qgn),
				n !== this.U9r.length - 1 ||
					this.U9r[n].IsBlockInMiddle ||
					this.Yyn(n, !0, 0));
		}
	}
	cgn(t) {
		this.lsn &&
			(t && this.lsn.SetRangeActorParent(t),
			this.lsn.AddOnActorOverlapCallback(this.Cgn));
	}
	M0n(t = -1) {
		var e;
		this.fgn || (this.fgn = new UE.Vector(0.1, 10, 10)),
			this.pgn || (this.pgn = new UE.Vector(0, 0, 0)),
			t < 0
				? ((e = this.QCn ? this.QCn.DefaultEffectLength : 300),
					(this.fgn.X = 0 < this.Ogn ? this.Ogn / 2 : e / 2))
				: (this.fgn.X = t),
			(this.pgn.X = this.fgn.X),
			this.lsn?.UpdateBoxRange(this.pgn, this.fgn);
	}
	ggn(t, e = void 0) {
		if (
			e &&
			this.Agn &&
			this.Mgn &&
			this.U9r &&
			!(this.U9r.length < 1) &&
			this.Cji &&
			this.nXt
		) {
			var n = e.Entity?.Id;
			let a,
				g = -1;
			if (e.dgn) (a = this.U9r[0]), (g = 0);
			else
				for (let t = 0; t < this.U9r.length - 1; t++) {
					var i = this.U9r[t];
					if (0 === i.EntityId) break;
					i.EntityId === n && ((a = this.U9r[t + 1]), (g = t + 1));
				}
			if (a) {
				t || (this.Cji.Radius = 7);
				var o = e.S0n(this.Cji, this.sgn, a, this.EHs);
				if (-1 < o) {
					if (
						(this.I0n &&
							this.Zgn === g &&
							((this.e0n = !1), (this.t0n = !1), this.K0n(this.Zgn)),
						0 < a.EntityId)
					) {
						this.rgn?.SpliceToEntity(a.EntityId);
						for (let t = this.U9r.length - 1; t >= g; t--) {
							var s = this.U9r[t],
								h = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
									s.EntityId,
								);
							h && h.Entity && this.Sgn(h.Entity, !1, !1),
								t > g &&
									(this.U9r.splice(t, 1), SceneItemFanComponent_1.E0n(s));
						}
						(a.IsBlockInMiddle = !0),
							(a.EntityId = 0),
							(this.Zgn = g),
							this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
							this.y0n(!0, !1);
					}
					var r = this.U9r[g];
					-1 <
						(r =
							(r.HitLocation?.DeepCopy(this.EHs),
							r.Location?.DeepCopy(this.EHs),
							e.T0n().Quaternion().RotateVector(e.YCn, this.tgn),
							this.tgn.AdditionEqual(e.nXt.ActorLocationProxy),
							this.D0n(g, this.tgn.ToUeVector(), this.EHs.ToUeVector()),
							Math.min(
								this.U9r.length - 1,
								Math.min(this.qgn.length - 1, this.Zgn),
							))) &&
						(e = EffectSystem_1.EffectSystem.GetEffectActor(this.qgn[r])) &&
						(this.Yyn(r, !1, 1),
						e.K2_SetActorLocationAndRotation(
							this.EHs.ToUeVector(),
							this.U9r[r].HitRotator.ToUeRotator(),
							!1,
							void 0,
							!0,
						));
				} else -3 === o && this.Kgn(n);
				t || (this.Cji.Radius = 10);
			}
		}
	}
	S0n(t, e, n, i) {
		if (
			(this.T0n().Quaternion().RotateVector(this.YCn, this.tgn),
			this.tgn.AdditionEqual(this.nXt.ActorLocationProxy),
			this.L0n().Multiply(e, this.ign),
			this.ign.AdditionEqual(this.tgn),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.tgn),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.ign),
			(e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				t,
				PROFILE_BULLECT_TRACK,
			)))
		) {
			var o = t.HitResult,
				s = o.GetHitCount(),
				h = o.Actors;
			let g = !1,
				c = !1;
			for (let t = 0; t < s; t++) {
				var r = h.Get(t);
				if (
					r !== this.zBn &&
					((r =
						ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
							r,
						)),
					r?.Id !== this.Entity.Id)
				) {
					var a = r?.Entity?.GetComponent(135);
					if (a) {
						if (c) {
							g = !0;
							break;
						}
						if (a.R0n()) continue;
						if (0 === n.EntityId) return -3;
					}
					if (!c) {
						if (r && r.Entity?.Id === n.EntityId) return -1;
						(c = !0),
							(i.X = o.LocationX_Array.Get(t)),
							(i.Y = o.LocationY_Array.Get(t)),
							(i.Z = o.LocationZ_Array.Get(t));
					}
				}
			}
			if (c)
				return (
					(e = Vector_1.Vector.Dist(i, this.tgn)),
					void 0 !== this.XCn?.DefaultEffectLength &&
					!g &&
					this.XCn?.DefaultEffectLength < e
						? -2
						: e
				);
		}
		return -2;
	}
	ugn() {
		if (((this.egn = Rotator_1.Rotator.Create()), 0 !== this._se)) {
			var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
				this._se,
			);
			if (t && (t = t.Entity.GetComponent(182)))
				return (
					t.ActorLocationProxy.Subtraction(
						this.nXt.ActorLocationProxy,
						this.cz,
					),
					void MathUtils_1.MathUtils.LookRotationUpFirst(
						this.cz,
						this.A0n(),
						this.egn,
					)
				);
		}
		this.egn.DeepCopy(this.T0n()),
			(this.WCn = this.WCn % this.FCn),
			(this.fle = (this.WCn + this.VCn) * this.jCn),
			(this.hwe.Yaw = this.fle),
			MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.egn, this.Ome),
			this.Hgn(this.Ome, "SceneItemFanComponent Rotate");
	}
	OnEnd() {
		if (
			(Info_1.Info.EnableForceTick ||
				ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
					this,
				),
			this.hgn
				? this.U0n()
				: EventSystem_1.EventSystem.RemoveWithTarget(
						this,
						EventDefine_1.EEventName.OnSceneItemHitByHitData,
						this.gCn,
					),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
				this.Qnn,
			),
			EventSystem_1.EventSystem.HasWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnLevelTagChanged,
				this.gIe,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				),
			this.Xte?.RemoveTagAddOrRemoveListener(-511894810, this.kke),
			this.Xte?.RemoveTagAddOrRemoveListener(-3775711, this.kke),
			this.Xte?.RemoveTagAddOrRemoveListener(-1152559349, this.kke),
			this.Xte?.RemoveTagAddOrRemoveListener(1298716444, this.kke),
			(this.egn = void 0),
			(this.hwe = void 0),
			(this.Ome = void 0),
			(this.tgn = void 0),
			(this.ign = void 0),
			(this.o0n = void 0),
			(this.r0n = void 0),
			(this.n0n = void 0),
			(this.cz = void 0),
			(this.ZYo = void 0),
			this.Krr &&
				(ActorSystem_1.ActorSystem.Put(this.Krr), (this.Krr = void 0)),
			(this.JCn = void 0),
			EffectSystem_1.EffectSystem.IsValid(this.opi) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.opi,
					"SceneItemFanComponent.OnEnd",
					!0,
				),
			(this.opi = 0),
			(this.EHs = void 0),
			(this.U9r = void 0),
			(this.ogn = void 0),
			(this._0n = void 0),
			(this.u0n = void 0),
			(this.c0n = void 0),
			(this.m0n = void 0),
			(this.d0n = void 0),
			(this.C0n = void 0),
			(this.g0n = void 0),
			(this.f0n = void 0),
			(this.p0n = void 0),
			(this.rgn = void 0),
			(this._gn = void 0),
			this.wgn)
		)
			for (const t of this.wgn) ActorSystem_1.ActorSystem.Put(t);
		if (((this.wgn = void 0), (this.Bgn = void 0), this.bgn)) {
			for (const t of this.bgn)
				EffectSystem_1.EffectSystem.StopEffectById(
					t,
					"SceneItemFanComponent.OnEnd",
					!0,
				);
			this.bgn = void 0;
		}
		if (this.qgn) {
			for (const t of this.qgn)
				EffectSystem_1.EffectSystem.StopEffectById(
					t,
					"SceneItemFanComponent.OnEnd",
					!0,
				);
			this.qgn = void 0;
		}
		return (
			(this.S8s = void 0),
			(this.E8s = void 0),
			(this.nXt = void 0),
			(this.Xte = void 0),
			(this.agn = void 0),
			this.lsn?.RemoveOnActorOverlapCallback(this.Cgn),
			!(this.lsn = void 0)
		);
	}
	SetRoot(t) {
		(this.JCn = t),
			(this.JCn?.Xte?.HasTag(-1152559349) ||
				this.JCn?.Xte?.HasTag(1298716444)) &&
				this.Rgn();
	}
	mgn() {
		var t = this.Entity.GetComponent(0);
		if (t?.Valid && (t = t.GetBaseInfo().ChildEntityIds) && !(t.length < 1)) {
			(this.zCn = new Array()), (this.vgn = new Array());
			for (const e of t) this.vgn.push(e);
		}
	}
	Qgn() {
		if (this.dgn) {
			this.hgn && this.$tn(),
				(this.Mgn = !0),
				(this.Cji = UE.NewObject(UE.TraceSphereElement.StaticClass())),
				(this.Cji.bIsSingle = !1),
				(this.Cji.bIgnoreSelf = !0),
				(this.Cji.Radius = 10),
				this.Cji.SetTraceTypeQuery(
					QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
				),
				(this.Cji.WorldContextObject = this.nXt.Owner);
			var t = this.nXt.ActorLocationProxy;
			let i = t.X,
				o = t.Y,
				s = t.Z,
				h = t.X,
				r = t.Y,
				a = t.Z;
			for (const n of this.zCn) {
				var e = n.GetComponent(182);
				e &&
					((t = e.ActorLocationProxy),
					(i = Math.min(i, t.X)),
					(o = Math.min(o, t.Y)),
					(s = Math.min(s, t.Z)),
					(h = Math.max(h, t.X)),
					(r = Math.max(r, t.Y)),
					(a = Math.max(a, t.Z)));
			}
			if (
				((this.sgn =
					Math.sqrt(
						Math.pow(h - i, 2) + Math.pow(r - o, 2) + Math.pow(a - s, 2),
					) + 300),
				(this.ZCn = new Set()),
				(this.U9r = new Array()),
				(this.ogn = new Array()),
				(this._0n = Vector_1.Vector.Create()),
				(this.u0n = Vector_1.Vector.Create()),
				(this.c0n = Vector_1.Vector.Create()),
				(this.m0n = Quat_1.Quat.Create()),
				(this.d0n = Quat_1.Quat.Create()),
				(this.C0n = Quat_1.Quat.Create()),
				(this.g0n = Vector_1.Vector.Create()),
				(this.f0n = Vector_1.Vector.Create()),
				(this.p0n = Vector_1.Vector.Create()),
				(this.EHs = Vector_1.Vector.Create()),
				(this.rgn = new SporeStruct()),
				this.rgn.Init(this.Sgn),
				(this.ngn = new Map()),
				(this.wgn = new Array()),
				(this.Bgn = new Array()),
				(this.bgn = new Array()),
				(this.S8s = new Array()),
				(this.E8s = new Array()),
				(this.qgn = new Array()),
				(this.Ggn = UE.NewArray(UE.Vector)),
				(this.Agn = this.Xte.HasTag(-3775711)),
				this.Agn && this.zCn)
			)
				for (const t of this.zCn) t?.GetComponent(135)?.I8s();
			TimerSystem_1.TimerSystem.Next(() => {
				this.Agn && this.Kgn(void 0, !0), this.M0n();
			}),
				this.Pgn();
			for (const t of this.zCn) {
				var n = t.GetComponent(135);
				n && n.Pgn();
			}
		}
	}
	P0n() {
		return this.nXt.ActorLocationProxy;
	}
	eRn() {
		return this.T0n();
	}
	w0n() {
		return this.YCn;
	}
	B0n() {
		return this.XCn;
	}
	static b0n() {
		var t;
		return SceneItemFanComponent_1.q0n.length < 1
			? (((t = new SplinePoint()).Location = Vector_1.Vector.Create()),
				(t.Rotator = Rotator_1.Rotator.Create()),
				(t.Offset = Vector_1.Vector.Create()),
				(t.HitLocation = Vector_1.Vector.Create()),
				(t.HitRotator = Rotator_1.Rotator.Create()),
				t)
			: SceneItemFanComponent_1.q0n.pop();
	}
	static E0n(t) {
		t.Location.Set(0, 0, 0),
			t.Rotator.Set(0, 0, 0),
			t.Offset.Set(0, 0, 0),
			(t.EntityId = 0),
			(t.EffectConfig = void 0),
			(t.IsBlockInMiddle = !1),
			t.HitLocation.Set(0, 0, 0),
			t.HitRotator.Set(0, 0, 0),
			SceneItemFanComponent_1.q0n.push(t);
	}
	G0n(t) {
		this.Vgn = !0;
		var e = this.nXt.CreatureData.GetCreatureDataId();
		this.N0n(e, t, (t) => {
			(this.Vgn = !1),
				0 !== t?.X5n
					? Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Level", 37, "SetFanStateResponse Failed", [
							"ErrorCode",
							t?.X5n,
						])
					: this.Agn ||
						((this.Agn = !0), this.Egn ? this.Kgn() : (this.Lgn = 5e3));
		});
	}
	dce() {
		return this.Xte?.HasTag(-3775711) ?? !1;
	}
	Ign() {
		return this.Xte?.HasTag(-1152559349) ?? !1;
	}
	R0n() {
		return this.Xte?.HasTag(-511894810) ?? !1;
	}
	ZDn() {
		if (this.bgn) {
			for (const t of this.bgn)
				EffectSystem_1.EffectSystem.StopEffectById(
					t,
					"SceneItemFanComponent.OnRootComplete",
					!0,
				);
			this.bgn.length = 0;
		}
		if (this.qgn) {
			for (const t of this.qgn)
				EffectSystem_1.EffectSystem.StopEffectById(
					t,
					"SceneItemFanComponent.OnRootComplete",
					!0,
				);
			this.qgn.length = 0;
		}
		if (this.wgn) {
			for (const t of this.wgn) ActorSystem_1.ActorSystem.Put(t);
			this.wgn.length = 0;
		}
		this.Bgn && (this.Bgn.length = 0);
		for (const e of this.zCn) {
			var t = e.GetComponent(135);
			t && t.M0n(0);
		}
	}
	Dgn(t, e) {
		if (
			(e && this.ngn?.has(t) && this.ngn?.delete(t),
			this.Agn &&
				this.Mgn &&
				this.U9r &&
				!(this.U9r.length < 1) &&
				!this.Xte?.HasTag(1298716444))
		) {
			let i = -1;
			for (let e = 0; e < this.U9r.length - 1; e++) {
				var n = this.U9r[e];
				if (0 === n.EntityId) break;
				if (n.EntityId === t) {
					i = e - 1;
					break;
				}
			}
			-1 < i ? ((e = this.U9r[i].EntityId), this.Kgn(e)) : this.Kgn();
		}
	}
	Rgn() {
		this.Xte?.RemoveTag(1174613996),
			this.Xte?.RemoveTag(942900915),
			this.Xte?.RemoveTag(-216276934);
		var t = this.agn?.EntityInSocket?.Entity?.GetComponent(177);
		t &&
			(t.RemoveTag(1174613996),
			t.RemoveTag(942900915),
			t.RemoveTag(-216276934)),
			0 !== this.xgn &&
				((t = EntitySystem_1.EntitySystem.GetComponent(this.xgn, 177)) &&
					(t.RemoveTag(1174613996),
					t.RemoveTag(942900915),
					t.RemoveTag(-216276934)),
				(this.xgn = 0));
	}
	I8s() {
		this.Xte && !this.Xte.HasTag(-1018185327) && this.Xte.AddTag(1174613996);
	}
	Ugn(t, e = void 0) {
		var n;
		this.R0n() ||
			(!this.JCn?.Xte?.HasTag(-1152559349) &&
				!this.JCn?.Xte?.HasTag(1298716444) &&
				(this.Xte &&
					(t
						? (this.Xte.RemoveTag(1174613996),
							this.Xte.HasTag(942900915) || this.Xte.AddTag(942900915),
							e
								? this.Xte.HasTag(-216276934) || this.Xte.AddTag(-216276934)
								: void 0 !== e && this.Xte.RemoveTag(-216276934))
						: (this.Xte.HasTag(1174613996) || this.Xte.AddTag(1174613996),
							this.Xte.RemoveTag(942900915),
							this.Xte.RemoveTag(-216276934))),
				(n = this.agn?.EntityInSocket?.Entity?.GetComponent(177))) &&
				((this.xgn = this.agn.EntityInSocket.Entity.Id),
				t
					? (n.RemoveTag(1174613996),
						n.HasTag(942900915) || n.AddTag(942900915),
						e
							? n.HasTag(-216276934) || n.AddTag(-216276934)
							: void 0 !== e && n.RemoveTag(-216276934))
					: (n.HasTag(1174613996) || n.AddTag(1174613996),
						n.RemoveTag(942900915),
						n.RemoveTag(-216276934))));
	}
	T5s(t) {
		for (const e of this.U9r) if (e.EntityId === t) return !0;
		return !1;
	}
	Kgn(t = void 0, e = !1) {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Level",
					37,
					"[SceneItemFanComponent] RefreshTraceState",
					["EntityId", this.Entity.Id],
				),
			this.dgn)
		)
			if (this.Agn)
				if (this.Mgn)
					if (this.Xte?.HasTag(1298716444))
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Level",
								37,
								"[SceneItemFanComponent] RefreshTraceState Failed, Has Completed",
								["EntityId", this.Entity.Id],
							);
					else if (this.I0n) this.t0n = !0;
					else {
						(this.y8s = e), this.ZCn.clear();
						for (let t = this.zCn.length - 1; -1 < t; t--) {
							var n = this.zCn[t];
							n?.Valid ? this.ZCn.add(n.Id) : this.zCn.splice(t, 1);
						}
						this.ogn.length = 0;
						for (const t of this.U9r) {
							if (0 === t.EntityId) break;
							this.ogn.push(t.EntityId);
						}
						if (t)
							for (let e = this.U9r.length - 1; 0 < e; e--)
								if (this.U9r[e - 1].EntityId === t) {
									this.U9r[e].HitLocation?.Equals(
										Vector_1.Vector.ZeroVectorProxy,
									)
										? this.r0n.DeepCopy(this.U9r[e].Location)
										: this.r0n.DeepCopy(this.U9r[e].HitLocation);
									break;
								}
						for (const t of this.U9r) SceneItemFanComponent_1.E0n(t);
						if (
							((this.U9r.length = 0),
							this.rgn.Clear(),
							this.O0n(this.ZCn, this.U9r, this.Cji, this.sgn, this.rgn),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Level",
									37,
									"[SceneItemFanComponent] TraceToFan",
									["PointCount", this.U9r?.length],
									["EntityId", this.Entity.Id],
								),
							t)
						) {
							let e = !1;
							for (let n = this.U9r.length - 1; 0 < n; n--)
								if (this.U9r[n - 1].EntityId === t) {
									e = !0;
									break;
								}
							e || this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
						} else this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
						for (let t = this.zCn.length - 1; -1 < t; t--) {
							var i = this.zCn[t];
							this.ZCn.has(i.Id) && this.Sgn(i, !1, !1);
						}
						if ((this.k0n(), this.rgn && 0 < this.U9r.length && 0 < this.Zgn)) {
							let t = this.nXt.ActorLocationProxy,
								e = 0;
							for (let n = 0; n < this.Zgn; n++)
								(e += Vector_1.Vector.Dist(t, this.U9r[n].Location)),
									(t = this.U9r[n].Location);
							this.rgn.SetPreLength(e);
						}
					}
				else
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Level",
							37,
							"[SceneItemFanComponent] RefreshTraceState Failed, !this.IsAllChildInitFinish",
							["EntityId", this.Entity.Id],
						);
			else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						37,
						"[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRootFire",
						["EntityId", this.Entity.Id],
					);
		else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Level",
					37,
					"[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRoot",
					["EntityId", this.Entity.Id],
				);
	}
	O0n(t, e, n, i, o = void 0) {
		this.Ngn = 0;
		var s = this.XCn ? this.XCn.DefaultEffectLength : 300,
			h = SceneItemFanComponent_1.b0n(),
			r = this.F0n(t, n, i, h, o, s),
			a =
				((s =
					((this.Ngn = 0 < this.Ngn ? this.Ngn : s),
					o && (o.Length += this.Ngn),
					this.L0n())),
				this.A0n());
		MathUtils_1.MathUtils.LookRotationUpFirst(s, a, h.HitRotator),
			r
				? (h.Location?.DeepCopy(r.P0n()),
					h.Rotator?.DeepCopy(r.eRn()),
					h.Offset?.DeepCopy(r.w0n()),
					(h.EffectConfig = r.B0n()),
					(h.EntityId = r.Entity.Id),
					e.push(h),
					o &&
						(a = r.Entity.GetComponent(0)?.GetCreatureDataId()) &&
						(o.SporeEntityIds.push(a), o.SporeEntityLength.push(o.Length)))
				: (s.Multiply(this.Ngn, h.Location),
					h.Location.AdditionEqual(this.nXt.ActorLocationProxy),
					h.Rotator.DeepCopy(Rotator_1.Rotator.ZeroRotatorProxy),
					h.Offset.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
					e.push(h)),
			r && r.O0n(t, e, n, i, o);
	}
	F0n(t, e, n, i, o = void 0, s = 300) {
		if (
			((this.Ogn = 0),
			this.T0n().Quaternion().RotateVector(this.YCn, this.tgn),
			this.tgn.AdditionEqual(this.nXt.ActorLocationProxy),
			this.L0n().Multiply(n, this.ign),
			this.ign.AdditionEqual(this.tgn),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, this.tgn),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, this.ign),
			(n = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				e,
				PROFILE_BULLECT_TRACK,
			)))
		) {
			let y,
				p,
				I = !1,
				_ = !1;
			var h,
				r,
				a,
				g,
				c = new Set(),
				f = e.HitResult,
				l = f.GetHitCount(),
				d = f.Actors;
			for (let e = 0; e < l; e++) {
				var C = d.Get(e);
				if (
					C !== this.zBn &&
					((C =
						ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
							C,
						)),
					C?.Id !== this.Entity.Id)
				)
					if (C && t.has(C?.Id)) {
						if (C) {
							var E = C.Entity.GetComponent(135);
							if (!E || !E.R0n()) {
								if ((I && (_ = !0), E)) {
									var m = E.Entity.GetComponent(182)?.ActorLocationProxy;
									m &&
										(this.Ogn = Vector_1.Vector.Dist(
											m,
											this.nXt.ActorLocationProxy,
										)),
										I ||
											((p = E),
											t.delete(C.Id),
											TraceElementCommon_1.TraceElementCommon.GetHitLocation(
												f,
												e,
												i.HitLocation,
											));
									break;
								}
								I || c.add(C);
							}
						}
					} else
						I ||
							(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
								f,
								e,
								i.HitLocation,
							),
							(y = i.HitLocation),
							(I = !0));
			}
			if (
				(p &&
					(n = p.Entity.GetComponent(182)?.ActorLocationProxy) &&
					(this.Ngn = Vector_1.Vector.Dist(n, this.nXt.ActorLocationProxy)),
				(i.IsBlockInMiddle = _),
				y)
			)
				if (((e = Vector_1.Vector.Dist(y, this.tgn)), p))
					e < this.Ngn && (this.Ngn = e);
				else {
					if (c.size < 1) return void (this.Ngn = _ ? e : Math.min(s, e));
					this.Ngn = e;
				}
			if (0 < this.Ngn) {
				let e = 0;
				for (const n of c)
					n &&
						t.has(n.Id) &&
						(h = n.Entity.GetComponent(182)) &&
						(h = Vector_1.Vector.Dist(
							this.nXt.ActorLocationProxy,
							h.ActorLocationProxy,
						)) < this.Ngn &&
						(y && h > e && (e = h), t.delete(n.Id), o) &&
						(r = n.Entity.GetComponent(0)?.GetCreatureDataId()) &&
						(o.SporeEntityIds.push(r), o.SporeEntityLength.push(o.Length + h));
				y && 0 < e && (this.Ngn = e);
			} else
				for (const e of c)
					e &&
						t.has(e.Id) &&
						(t.delete(e.Id), (a = e.Entity.GetComponent(182))) &&
						((a = Vector_1.Vector.Dist(
							a.ActorLocationProxy,
							this.nXt.ActorLocationProxy,
						)) > this.Ngn && (this.Ngn = a),
						o) &&
						(g = e.Entity.GetComponent(0)?.GetCreatureDataId()) &&
						(o.SporeEntityIds.push(g), o.SporeEntityLength.push(o.Length + a));
			return p;
		}
	}
	get IsRotating() {
		return 0 < this.Fgn;
	}
	get IsAnyRotating() {
		if (0 < this.Fgn) return !0;
		if (!this.dgn) return !!this.JCn && this.JCn.IsAnyRotating;
		if (this.zCn)
			for (const e of this.zCn) {
				var t = e.GetComponent(135);
				if (t && 0 < t.Fgn) return !0;
			}
		return !1;
	}
	ExecuteInteract() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SceneItem", 37, "[FanComponent] ExecuteInteract", [
				"EntityId",
				this.Entity.Id,
			]),
			0 < this.Fgn
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						37,
						"[FanComponent.ExecuteInteract] Self Is Rotating",
					)
				: this.dgn
					? (this.Agn || this.Vgn || this.G0n(!0),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"SceneItem",
								37,
								"[FanComponent.ExecuteInteract] Self Is Root",
							))
					: !this.JCn || this.JCn.V0n
						? Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"SceneItem",
								37,
								"[FanComponent.ExecuteInteract] Root Is Rotating",
							)
						: ((this.WCn = this.WCn % this.FCn),
							(this.fle = (this.WCn + this.VCn) * this.jCn),
							this.WCn++,
							(this.kgn = (this.WCn + this.VCn) * this.jCn),
							(this.Fgn = this.$Cn),
							(this.hwe.Yaw = this.kgn),
							this.JCn?.H0n(this.Entity.Id, this.fle, this.kgn, this.egn),
							this.Xte?.AddTag(-687845e3),
							this.j0n(),
							this.W0n(
								this.nXt.CreatureData.GetCreatureDataId(),
								this.WCn,
								(t) => {
									0 !== t?.X5n &&
										Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Level",
											37,
											"SendFanNumberOfTurnsRequest Failed",
											["ErrorCode", t?.X5n],
										);
								},
							));
	}
	tRn(t) {
		if (this.U9r) {
			let i = -1;
			for (let e = 0; e < this.U9r.length; e++)
				if (this.U9r[e].EntityId === t) {
					i = e;
					break;
				}
			if (!(i < 0 || i >= this.Zgn)) {
				this.I0n = !1;
				var e = this.Bgn.length;
				for (let t = i + 1; t < this.U9r.length; t++) {
					var n = EntitySystem_1.EntitySystem.GetComponent(
						this.U9r[t].EntityId,
						135,
					);
					n && n.M0n(0),
						this.Yyn(t, !0, 2),
						t < e && this.Bgn[t].ClearSplinePoints();
				}
			}
		}
	}
	H0n(t, e, n, i) {
		if (this.dgn && !this.i0n && this.Mgn) {
			this.tRn(t);
			let h = -1;
			for (let e = 0; e < this.U9r.length; e++)
				if (this.U9r[e].EntityId === t) {
					h = e;
					break;
				}
			if (!(h < 0 || ((this.Zgn = h + 1), this.Zgn > this.U9r.length - 1))) {
				let t;
				var o, s;
				(this.a0n = 0),
					(this.s0n = this.$Cn),
					(t =
						0 === this.Zgn
							? (this.g0n.DeepCopy(this.nXt.ActorLocationProxy),
								this.f0n.DeepCopy(this.YCn),
								this.QCn)
							: ((o = this.U9r[this.Zgn - 1]),
								this.g0n.DeepCopy(o.Location),
								this.f0n.DeepCopy(o.Offset),
								o.EffectConfig)),
					(this.l0n = t ? t.DefaultEffectLength : 300),
					0 === this.l0n
						? (o = this.Bgn[this.Zgn])
							? o.ClearSplinePoints()
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Level",
									37,
									"[SceneItemFanComponent] MultiSplineComponents is undefined",
								)
						: (this.ZYo.DeepCopy(this.U9r[this.Zgn].Location),
							(o = Vector_1.Vector.ForwardVectorProxy),
							(s = this.hwe.Yaw),
							(this.hwe.Yaw = n),
							MathUtils_1.MathUtils.ComposeRotator(this.hwe, i, this.Ome),
							this.Ome.Quaternion().RotateVector(o, this.cz),
							(this.i0n = !0),
							(this.I0n = !0),
							this.u0n.DeepCopy(this.cz),
							this.u0n.Normalize(),
							(this.hwe.Yaw = e),
							MathUtils_1.MathUtils.ComposeRotator(this.hwe, i, this.Ome),
							this.Ome.Quaternion().RotateVector(o, this.cz),
							this.ZYo.Subtraction(this.g0n, this._0n),
							(this.h0n = this._0n.Size()),
							this._0n.DeepCopy(this.cz),
							this._0n.Normalize(),
							this._0n.CrossProduct(this.u0n, this.c0n),
							this.c0n.Normalize(),
							MathUtils_1.MathUtils.LookRotationUpFirst(
								this._0n,
								this.c0n,
								this.m0n,
							),
							MathUtils_1.MathUtils.LookRotationUpFirst(
								this.u0n,
								this.c0n,
								this.d0n,
							),
							(this.hwe.Yaw = s),
							this.RefreshSpline(
								t?.EffectPath,
								t?.HitEffectPath,
								this.Zgn,
								!0,
							));
			}
		}
	}
	get V0n() {
		return this.i0n;
	}
	ygn() {
		this.Xte?.AddTag(217251158);
	}
	OnTick(t) {
		Info_1.Info.EnableForceTick && this.cjr(t);
	}
	j0n() {
		this.QCn ? this.M0n(this.QCn?.DefaultEffectLength) : this.M0n(300);
	}
	jgn() {
		this.dgn ||
			(this.JCn?.T5s(this.Entity.Id) && this.JCn?.Kgn(),
			this.Xte?.RemoveTag(-687845e3));
	}
	K0n(t) {
		0 < t
			? ((t = this.U9r[t - 1]),
				(t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
					t.EntityId,
				)?.Entity?.GetComponent(135)) && t.M0n())
			: this.M0n();
	}
	T0n() {
		return this._gn
			? (this.Xgn || (this.Xgn = Rotator_1.Rotator.Create()),
				this.Xgn.DeepCopy(this._gn.K2_GetActorRotation()),
				this.Xgn)
			: this.nXt.ActorRotationProxy;
	}
	L0n() {
		return this._gn
			? (this.$gn || (this.$gn = Vector_1.Vector.Create()),
				this.$gn.DeepCopy(this._gn.GetActorForwardVector()),
				this.$gn)
			: this.nXt.ActorForwardProxy;
	}
	A0n() {
		return this._gn
			? (this.Ygn || (this.Ygn = Vector_1.Vector.Create()),
				this.Ygn.DeepCopy(this._gn.GetActorUpVector()),
				this.Ygn)
			: this.nXt.ActorUpProxy;
	}
	Hgn(t, e) {
		this._gn
			? this._gn.K2_SetActorRotation(t.ToUeRotator(), !1)
			: this.nXt.SetActorRotation(t.ToUeRotator(), e);
	}
	$tn() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Level",
				37,
				"[SceneItemFanComponent]CreateInteractOption",
				["EntityId", this.Entity.Id],
			);
		var t,
			e,
			n,
			i = this.Entity.GetComponent(178);
		i
			? (i = i.GetInteractController())
				? ((t = new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
					this.lgn &&
						(((e =
							new CodeDefineLevelConditionInfo_1.LevelCodeConditionCheckGroupInfo()).ConditionGroup =
							this.lgn),
						t.Conditions.push(e)),
					((e = new LevelGameplayActionsDefine_1.ActionInteractFan()).EntityId =
						this.Entity.Id),
					(t.Type = 0),
					((n =
						new CodeDefineLevelConditionInfo_1.LevelConditionCheckFanIsNotRotatingInfo()).EntityId =
						this.Entity.Id),
					t.Conditions.push(n),
					this.dgn &&
						(((n =
							new CodeDefineLevelConditionInfo_1.LevelConditionCheckEntityTagInfo()).EntityId =
							this.Entity.Id),
						(n.IsContain = !0),
						(n.TagId = -1152559349),
						t.Conditions.push(n)),
					(this.Wtn = i.AddClientInteractOption(
						e,
						t,
						"Direct",
						this.Jgn,
						this.zgn,
						2,
					)))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						37,
						"[SceneItemFanComponent]CreateInteractOption Failed_1",
						["EntityId", this.Entity.Id],
					)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Level",
					37,
					"[SceneItemFanComponent]CreateInteractOption Failed_0",
					["EntityId", this.Entity.Id],
				);
	}
	U0n() {
		var t;
		this.Wtn &&
			(t = this.Entity.GetComponent(178)) &&
			(t = t.GetInteractController()) &&
			(t.RemoveClientInteractOption(this.Wtn), (this.Wtn = void 0));
	}
	set I0n(t) {
		this.e0n !== t &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Level",
					37,
					"[SceneItemFanComponent] Set IsSplineMoving",
					["Value", t],
				),
			(this.e0n = t),
			this.e0n ||
				((this.i0n = !1),
				this.rgn?.NeedTick() && this.rgn?.Clear(!0),
				this.t0n && ((this.t0n = !1), this.Kgn())));
	}
	get I0n() {
		return this.e0n;
	}
	k0n() {
		if (this.dgn) {
			this.Zgn = -1;
			for (let t = 0; t < this.U9r.length; t++)
				if (this.ogn.length - 1 < t || this.U9r[t].EntityId !== this.ogn[t]) {
					this.Zgn = t;
					break;
				}
			this.y0n(!0);
		}
	}
	D0n(t, e, n) {
		this.dgn &&
			-1 < t &&
			t < this.Bgn.length &&
			(t = this.Bgn[t]) &&
			(this.Ggn.Empty(),
			this.Ggn.Add(e),
			this.Ggn.Add(n),
			t.SetSplinePoints(this.Ggn, 1));
	}
	y0n(t = !1, e = !0) {
		let n,
			i,
			o = -1;
		if (-1 < this.Zgn && this.Zgn < this.U9r.length) {
			let r, a, g;
			e &&
				((this.I0n = !0), !this.i0n) &&
				this.Zgn < this.bgn.length &&
				((e = this.bgn[this.Zgn]),
				EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, !0),
				-1 < (e = this.S8s.indexOf(e))) &&
				(this.S8s.splice(e, 1), this.E8s.splice(e, 1)),
				0 < this.Zgn &&
					((e = this.bgn[this.Zgn - 1]),
					this.S8s.includes(e) || (this.S8s.push(e), this.E8s.push(1e3))),
				0 === this.Zgn
					? this.Ugn(!0, !0)
					: ((e = this.U9r[this.Zgn - 1].EntityId),
						(e = EntitySystem_1.EntitySystem.GetComponent(e, 135)) &&
							this.Zgn < this.U9r.length &&
							(this.Zgn === this.U9r.length - 1
								? e.Ugn(!0, this.U9r[this.Zgn].IsBlockInMiddle)
								: e.Ugn(!0, !0))),
				(g =
					0 === this.Zgn
						? (this.o0n.DeepCopy(this.nXt.ActorLocationProxy),
							(r = this.T0n().Quaternion()),
							(a = this.YCn),
							this.XCn)
						: ((e = this.U9r[this.Zgn - 1]),
							this.o0n.DeepCopy(e.Location),
							(r = e.Rotator?.Quaternion()),
							(a = e.Offset),
							e.EffectConfig)),
				r?.RotateVector(a, this.cz),
				this.o0n.AdditionEqual(this.cz),
				this.r0n.Equals(Vector_1.Vector.ZeroVectorProxy) &&
					this.r0n.DeepCopy(this.o0n);
			e = g ? g.DefaultEffectLength : 300;
			var s =
					(this.Egn
						? this.Zgn < this.U9r.length &&
							((s = Vector_1.Vector.Dist(
								this.r0n,
								this.U9r[this.Zgn].HitLocation,
							)),
							(this.Zgn === this.U9r.length - 1 &&
								e < s &&
								!this.U9r[this.Zgn].IsBlockInMiddle) ||
							this.U9r[this.Zgn].HitLocation.Equals(
								Vector_1.Vector.ZeroVectorProxy,
							)
								? (r?.RotateVector(
										Vector_1.Vector.ForwardVectorProxy,
										this.ZYo,
									),
									this.ZYo?.MultiplyEqual(e),
									this.ZYo?.AdditionEqual(this.o0n))
								: this.ZYo.DeepCopy(this.U9r[this.Zgn].HitLocation))
						: this.ZYo.DeepCopy(this.U9r[this.Zgn].Location),
					this.n0n.DeepCopy(this.ZYo),
					this.Egn || this.n0n.AdditionEqual(this.cz),
					Vector_1.Vector.Dist(this.r0n, this.n0n)),
				h = this.y8s ? 3e4 : 6e3;
			(this.s0n = (s / h) * TimeUtil_1.TimeUtil.InverseMillisecond),
				(this.a0n = t ? (e / 6e3) * TimeUtil_1.TimeUtil.InverseMillisecond : 0),
				this.RefreshSpline(g?.EffectPath, g?.HitEffectPath, this.Zgn, t),
				this.Q0n(this.Zgn),
				0 === this.Zgn
					? ((o = 0),
						this.U9r[0].IsBlockInMiddle &&
							((n = this.U9r[0].HitLocation), (i = this.U9r[0].HitRotator)))
					: this.qgn.length > this.Zgn &&
						(s = EffectSystem_1.EffectSystem.GetEffectActor(
							this.qgn[this.Zgn - 1],
						)) &&
						(this.Yyn(this.Zgn - 1, !1, 3),
						s.K2_SetActorLocationAndRotation(
							this.U9r[this.Zgn - 1].HitLocation.ToUeVector(),
							this.U9r[this.Zgn - 1].HitRotator.ToUeRotator(),
							!1,
							void 0,
							!0,
						));
		} else
			(this.I0n = !1),
				this.Zgn - 1 < this.bgn.length &&
					((h = this.bgn[this.Zgn - 1]),
					this.S8s.includes(h) || (this.S8s.push(h), this.E8s.push(1e3))),
				this.Zgn === this.U9r.length &&
					1 < this.qgn.length &&
					((e = this.U9r[this.Zgn - 1]),
					(o = this.Zgn - 1),
					e.IsBlockInMiddle) &&
					((n = e.HitLocation), (i = e.HitRotator));
		-1 < o &&
			this.qgn.length > o &&
			(n && i
				? this.U9r[o].Location &&
					(this.Yyn(o, !1, 4),
					EffectSystem_1.EffectSystem.GetEffectActor(
						this.qgn[o],
					)?.K2_SetActorLocationAndRotation(
						n.ToUeVector(),
						i.ToUeRotator(),
						!1,
						void 0,
						!0,
					))
				: this.Yyn(o, !0, 5));
	}
	Wgn(t) {
		var e, n;
		this.I0n &&
			(this.i0n
				? ((this.a0n += t),
					(e =
						0 < this.s0n
							? MathUtils_1.MathUtils.Clamp(this.a0n / this.s0n, 0, 1)
							: 1),
					(n = MathUtils_1.MathUtils.Lerp(this.h0n, this.l0n, e)),
					Quat_1.Quat.Slerp(this.m0n, this.d0n, e, this.C0n),
					this.C0n.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.p0n),
					this.C0n.RotateVector(this.f0n, this.cz),
					this.cz.AdditionEqual(this.g0n),
					this.p0n.MultiplyEqual(n),
					this.p0n.AdditionEqual(this.cz),
					(e = this.Bgn[this.Zgn]) &&
						(this.Ggn.Empty(),
						this.Ggn.Add(this.cz.ToUeVector()),
						this.Ggn.Add(this.p0n.ToUeVector()),
						e.SetSplinePoints(this.Ggn, 1)),
					this.a0n > this.s0n &&
						(this.K0n(this.Zgn), (this.I0n = !1), (this.i0n = !1)))
				: ((this.a0n += t),
					Vector_1.Vector.Lerp(
						this.r0n,
						this.n0n,
						0 < this.s0n
							? MathUtils_1.MathUtils.Clamp(this.a0n / this.s0n, 0, 1)
							: 1,
						this.ZYo,
					),
					(n = this.Bgn[this.Zgn]) &&
						(this.Ggn.Empty(),
						this.Ggn.Add(this.o0n.ToUeVector()),
						this.Ggn.Add(this.ZYo.ToUeVector()),
						n.SetSplinePoints(this.Ggn, 1)),
					this.a0n > this.s0n &&
						(this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
						this.Zgn++,
						this.y0n(),
						this.K0n(this.Zgn - 1))));
	}
	X0n(t, e) {
		var n,
			i = ActorSystem_1.ActorSystem.Get(
				UE.BP_BasePathLine_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			),
			o =
				(i.K2_SetActorLocationAndRotation(
					this.nXt?.ActorLocation,
					this.T0n().ToUeRotator(),
					!1,
					void 0,
					!0,
				),
				i.GetComponentByClass(UE.SplineComponent.StaticClass()));
		t
			? ((t = EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					MathUtils_1.MathUtils.DefaultTransform,
					t,
					"[SceneItemFanComponent.DefaultFanEffect]",
					new EffectContext_1.EffectContext(this.Entity.Id),
				)),
				EffectSystem_1.EffectSystem.IsValid(t) &&
					((n =
						EffectSystem_1.EffectSystem.GetEffectActor(t))?.K2_SetActorLocation(
						i.K2_GetActorLocation(),
						!1,
						void 0,
						!0,
					),
					n?.K2_AttachToActor(i, void 0, 1, 1, 1, !1),
					this.wgn?.push(i),
					this.Bgn?.push(o),
					this.bgn?.push(t),
					e
						? (n = EffectSystem_1.EffectSystem.SpawnEffect(
								GlobalData_1.GlobalData.World,
								MathUtils_1.MathUtils.DefaultTransform,
								e,
								"[SceneItemFanComponent.DefaultFanEffect]",
								new EffectContext_1.EffectContext(this.Entity.Id),
							)) &&
							((t =
								EffectSystem_1.EffectSystem.GetEffectActor(
									n,
								))?.K2_SetActorLocation(
								i.K2_GetActorLocation(),
								!1,
								void 0,
								!0,
							),
							t?.K2_AttachToActor(i, void 0, 1, 1, 1, !1),
							t?.SetActorHiddenInGame(!0),
							this.qgn?.push(n))
						: this.qgn?.push(-1)))
			: (this.wgn?.push(i),
				this.Bgn?.push(o),
				this.bgn?.push(-1),
				this.qgn?.push(-1));
	}
	Q0n(t) {
		0 < t &&
			t < this.wgn.length &&
			this.wgn[t].K2_SetActorLocation(
				this.U9r[t - 1].Location.ToUeVector(),
				!1,
				void 0,
				!1,
			);
	}
	RefreshSpline(t, e, n, i = !1) {
		var o = n + 1;
		if (i) {
			if (o < this.wgn.length)
				for (let t = o; t < this.wgn.length; t++)
					this.Ggn.Empty(),
						this.Bgn[t].SetSplinePoints(this.Ggn, 1),
						EffectSystem_1.EffectSystem.GetEffectActor(
							this.bgn[t],
						)?.SetActorHiddenInGame(!0);
			else {
				o <= this.wgn.length &&
					(-1 === this.bgn[n] && this.v0n(t, n, this.bgn),
					-1 === this.qgn[n]) &&
					this.v0n(e, n, this.qgn);
				for (let n = this.wgn.length; n < o; n++) this.X0n(t, e);
			}
			for (let t = n; t < this.qgn.length; t++) this.Yyn(t, !0, 6);
		} else
			this.wgn.length < o
				? this.X0n(t, e)
				: ((i = this.bgn[n]),
					t !== EffectSystem_1.EffectSystem.GetPath(i)
						? this.v0n(t, n, this.bgn)
						: EffectSystem_1.EffectSystem.ReplayEffect(
								this.bgn[n],
								"[SceneItemFanComponent.ReplayEffect1]",
							),
					(i = this.qgn[n]),
					e !== EffectSystem_1.EffectSystem.GetPath(i)
						? this.v0n(e, n, this.qgn)
						: EffectSystem_1.EffectSystem.ReplayEffect(
								this.qgn[n],
								"[SceneItemFanComponent.ReplayEffect1]",
							),
					this.Yyn(n, !0, 7));
	}
	Yyn(t, e, n) {
		t >= this.qgn.length
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Level",
					37,
					"[SceneItemFanComponent] HideOrShowHitEffect invalid",
				)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Level",
						37,
						"[SceneItemFanComponent] HideOrShowHitEffect",
						["index", t],
						["hide", e],
						["logIndex", n],
					),
				EffectSystem_1.EffectSystem.GetEffectActor(
					this.qgn[t],
				)?.SetActorHiddenInGame(e));
	}
	v0n(t, e, n) {
		if (this.wgn && !(this.wgn.length <= e)) {
			var i,
				o = this.wgn[e],
				s = n[e];
			let h = !1;
			0 !== s &&
				((i = EffectSystem_1.EffectSystem.GetEffectActor(s)) &&
					((h = !0), this.cz.DeepCopy(i.K2_GetActorLocation())),
				EffectSystem_1.EffectSystem.StopEffectById(
					s,
					"[SceneItemFanComponent.ReplaceEffect]",
					!0,
				)),
				t
					? ((i = EffectSystem_1.EffectSystem.SpawnEffect(
							GlobalData_1.GlobalData.World,
							MathUtils_1.MathUtils.DefaultTransform,
							t,
							"[SceneItemFanComponent.DefaultFanEffect]",
							new EffectContext_1.EffectContext(this.Entity.Id),
						)),
						EffectSystem_1.EffectSystem.IsValid(i) &&
							((s =
								EffectSystem_1.EffectSystem.GetEffectActor(
									i,
								))?.K2_SetActorLocation(
								h ? this.cz.ToUeVector() : o.K2_GetActorLocation(),
								!1,
								void 0,
								!0,
							),
							s?.K2_AttachToActor(o, void 0, 1, 1, 1, !1),
							(n[e] = i)))
					: (n[e] = 0);
		}
	}
	W0n(t, e, n) {
		var i = Protocol_1.Aki.Protocol.IJn.create();
		(i.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
			(i.v7n = e),
			Net_1.Net.Call(29125, i, n);
	}
	Tgn(t, e, n, i) {
		var o = Protocol_1.Aki.Protocol.LJn.create();
		(o.M7n = MathUtils_1.MathUtils.NumberToLong(t)),
			(o.S7n = MathUtils_1.MathUtils.NumberToLong(e)),
			(o.rVn = n ? 1 : 0),
			Net_1.Net.Call(2520, o, i);
	}
	N0n(t, e, n) {
		var i = Protocol_1.Aki.Protocol.DJn.create();
		(i.M7n = MathUtils_1.MathUtils.NumberToLong(t)),
			(i.rVn = e ? 1 : 0),
			Net_1.Net.Call(23892, i, n);
	}
});
(SceneItemFanComponent.q0n = new Array()),
	(SceneItemFanComponent = SceneItemFanComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(135)],
			SceneItemFanComponent,
		)),
	(exports.SceneItemFanComponent = SceneItemFanComponent);
