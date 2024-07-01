"use strict";
var CharacterLevelShootComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, r, o) {
			var i,
				n = arguments.length,
				h =
					n < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				h = Reflect.decorate(e, t, r, o);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(i = e[s]) &&
						(h = (n < 3 ? i(h) : 3 < n ? i(t, r, h) : i(t, r)) || h);
			return 3 < n && h && Object.defineProperty(t, r, h), h;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterLevelShootComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	Global_1 = require("../../../../Global"),
	LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PROFILE_BULLECT_TRACK =
		"CharacterLevelShootComponent_PreCalculateBulletTrack",
	DEMO_LEVEL_AIM_LINE_EFFECT_PATH =
		"/Game/Aki/Effect/EffectGroup/BigWorld/DA_Fx_Group_SignalSpline.DA_Fx_Group_SignalSpline",
	REFLECT_START_OFFSET = 0.1,
	BULLET_FIRE_BONE_NAME = "WeaponProp01_2",
	MAX_HIT_COUNT_ON_ONE = 10;
let CharacterLevelShootComponent =
	(CharacterLevelShootComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.R9r = 5e3),
				(this.dce = !1),
				(this.A9r = void 0),
				(this.U9r = void 0),
				(this.P9r = void 0),
				(this.x9r = void 0),
				(this.w9r = void 0),
				(this.cz = void 0),
				(this.B9r = void 0),
				(this.b9r = void 0),
				(this.q9r = void 0),
				(this.G9r = (e, t) => {});
		}
		OnInitData() {
			return (
				(this.Hte = this.Entity.GetComponent(3)),
				(this.Lie = this.Entity.GetComponent(185)),
				(this.U9r = new Array()),
				(this.P9r = Vector_1.Vector.Create()),
				(this.x9r = Vector_1.Vector.Create()),
				(this.w9r = Vector_1.Vector.Create()),
				(this.cz = Vector_1.Vector.Create()),
				(this.q9r = Vector_1.Vector.Create()),
				(this.B9r = new Map()),
				!0
			);
		}
		OnActivate() {
			this.N9r(),
				(this.b9r = this.Lie.ListenForTagAddOrRemove(-1167409290, this.G9r));
		}
		End() {
			return (
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.A9r = void 0),
				(this.U9r = void 0),
				(this.P9r = void 0),
				(this.x9r = void 0),
				(this.w9r = void 0),
				(this.cz = void 0),
				this.b9r?.EndTask(),
				(this.b9r = void 0),
				(this.q9r = void 0),
				!(this.B9r = void 0)
			);
		}
		N9r() {
			this.A9r ||
				((this.A9r = UE.NewObject(UE.TraceLineElement.StaticClass())),
				(this.A9r.bIsSingle = !0),
				(this.A9r.bIgnoreSelf = !0),
				this.A9r.SetTraceTypeQuery(
					QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
				)),
				(this.A9r.WorldContextObject = this.Hte.Owner);
		}
		OnEnterAimShoot() {
			!this.Lie.HasTag(1441683476) ||
				this.dce ||
				((this.dce = !0),
				LevelAimLineController_1.LevelAimLineController.PlayEffect(
					DEMO_LEVEL_AIM_LINE_EFFECT_PATH,
				));
		}
		OnExitAimShoot() {
			this.dce &&
				((this.dce = !1),
				LevelAimLineController_1.LevelAimLineController.StopEffect());
		}
		OnTick(e) {
			this.dce && this.O9r();
		}
		GetEndPointPosition(e, t) {
			return (
				t.Multiply(this.R9r, this.w9r), e.Addition(this.w9r, this.w9r), this.w9r
			);
		}
		k9r() {
			return CharacterLevelShootComponent_1.Mz.length < 1
				? Vector_1.Vector.Create()
				: CharacterLevelShootComponent_1.Mz.pop();
		}
		F9r(e) {
			e.Set(0, 0, 0), CharacterLevelShootComponent_1.Mz.push(e);
		}
		V9r() {
			return CharacterLevelShootComponent_1.H9r.length < 1
				? new Array()
				: CharacterLevelShootComponent_1.H9r.pop();
		}
		Sz(e) {
			for (const t of e) this.F9r(t);
			(e.length = 0), CharacterLevelShootComponent_1.H9r.push(e);
		}
		O9r() {
			var e = this.Hte.SkeletalMesh.GetSocketTransform(
					new UE.FName("WeaponProp01_2"),
					0,
				),
				t = Global_1.Global.CharacterCameraManager;
			let r = !1,
				o = !1;
			if (
				(e =
					(this.x9r.FromUeVector(t.GetActorForwardVector()),
					this.x9r.Multiply(CharacterLevelShootComponent_1.j9r, this.cz),
					this.P9r.FromUeVector(t.GetCameraLocation()),
					this.P9r.Addition(this.cz, this.P9r),
					(this.w9r = this.GetEndPointPosition(this.P9r, this.x9r)),
					TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.A9r,
						this.P9r,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(
						this.A9r,
						this.w9r,
					),
					this.P9r.FromUeVector(e ? e.GetLocation() : t.GetCameraLocation()),
					this.U9r.push(this.P9r),
					TraceElementCommon_1.TraceElementCommon.LineTrace(
						this.A9r,
						PROFILE_BULLECT_TRACK,
					)))
			)
				for (var i = this.A9r.HitResult; 0 < i.GetHitCount(); ) {
					var n = this.k9r(),
						h =
							(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, 0, n),
							this.U9r.push(n),
							this.U9r[this.U9r.length - 1].Subtraction(
								this.U9r[this.U9r.length - 2],
								this.x9r,
							),
							this.x9r.Normalize(),
							i.Actors.Get(0)),
						s =
							ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
								h,
							);
					if (!s) {
						r = !0;
						break;
					}
					var a = s.Entity.GetComponent(146);
					if (!a) {
						r = !0;
						break;
					}
					if (this.B9r.has(s.Id)) {
						var l = this.B9r.get(s.Id);
						for (let e = 0; e < l.length; e += 2) {
							var c = l[e],
								C = l[e + 1];
							if (n.Equals(c) && this.x9r.Equals(C)) {
								o = !0;
								break;
							}
						}
						if (o) break;
						if (
							(l.push(n),
							(m = this.k9r()).DeepCopy(this.x9r),
							l.push(m),
							l.length > 10)
						) {
							o = !0;
							break;
						}
					} else {
						var m,
							_ = ((m = this.V9r()).push(n), this.k9r());
						_.DeepCopy(this.x9r), m.push(_), this.B9r.set(s.Id, m);
					}
					if (!a.CalculateReflectDir(this.x9r, this.x9r, h)) {
						r = !0;
						break;
					}
					this.x9r.Multiply(0.1, this.cz),
						n.Addition(this.cz, this.cz),
						(this.w9r = this.GetEndPointPosition(n, this.x9r)),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.A9r,
							this.cz,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.A9r,
							this.w9r,
						),
						TraceElementCommon_1.TraceElementCommon.LineTrace(
							this.A9r,
							PROFILE_BULLECT_TRACK,
						);
				}
			let p = -1;
			r || o || (p = this.U9r.push(this.w9r)),
				1 < this.U9r.length
					? (this.U9r[1].Subtraction(this.U9r[0], this.q9r),
						this.q9r.Normalize(),
						LevelAimLineController_1.LevelAimLineController.UpdatePoints(
							this.U9r,
							0,
						))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Level",
							37,
							"[LevelShoot]Length of SplinePoints less then 2",
						),
				-1 < p && p < this.U9r.length && this.U9r.splice(p, 1);
			for (let e = 1; e < this.U9r.length; e++) this.F9r(this.U9r[e]);
			for (const e of this.B9r.values()) this.Sz(e);
			(this.U9r.length = 0), this.B9r.clear();
		}
	});
(CharacterLevelShootComponent.j9r = Vector_1.Vector.ForwardVectorProxy),
	(CharacterLevelShootComponent.Mz = new Array()),
	(CharacterLevelShootComponent.H9r = new Array()),
	(CharacterLevelShootComponent = CharacterLevelShootComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(53)],
			CharacterLevelShootComponent,
		)),
	(exports.CharacterLevelShootComponent = CharacterLevelShootComponent);
