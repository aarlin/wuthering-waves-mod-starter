"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, i) {
		var n,
			s = arguments.length,
			r =
				s < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, o))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(t, e, o, i);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(n = t[a]) && (r = (s < 3 ? n(r) : 3 < s ? n(e, o, r) : n(e, o)) || r);
		return 3 < s && r && Object.defineProperty(e, o, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemMoveComponent = exports.MoveTarget = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
	TimeUtil_1 = require("../../../../Common/TimeUtil");
class MoveTarget {
	constructor(t, e, o = 0, i = -1, n = -1) {
		(this.TargetPosData = t),
			(this.MoveTime = e),
			(this.StayTime = o),
			(this.MaxSpees = i),
			(this.Acceleration = n);
	}
}
exports.MoveTarget = MoveTarget;
let SceneItemMoveComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.s3o = void 0),
			(this.o1n = void 0),
			(this.r1n = void 0),
			(this.n1n = !1),
			(this.wrr = Vector_1.Vector.Create()),
			(this.s1n = []),
			(this._ti = 1),
			(this._ae = Vector_1.Vector.Create()),
			(this.Due = Vector_1.Vector.Create()),
			(this.a1n = Vector_1.Vector.Create()),
			(this.h1n = -0),
			(this.l1n = !1),
			(this._1n = !1),
			(this.vGn = !1),
			(this.MGn = []),
			(this.u1n = []),
			(this.c1n = () => {
				this.vGn = !0;
				for (const t of this.u1n) t(this.Entity);
				this.vGn = !1;
				for (const t of this.MGn) this.u1n.push(t);
				this.MGn.length = 0;
			});
	}
	static get Dependencies() {
		return [182, 0];
	}
	get IsMovingPrepareCompleted() {
		return this._1n;
	}
	get IsMoving() {
		return Info_1.Info.EnableForceTick
			? 0 < this.s1n.length || 0 === this._ti
			: this.IsMovingPrepareCompleted
				? this.s3o.IsMoving()
				: 0 < this.s1n.length;
	}
	OnStart() {
		var t = this.Entity.GetComponent(0);
		return (
			(this.ActorComp = this.Entity.GetComponent(182)),
			(this.o1n = this.Entity.GetComponent(142)),
			(this.r1n = this.Entity.GetComponent(115)),
			this.o1n?.TryDisable("[SceneItemMoveComponent] OnStart"),
			t &&
				t.GetPbEntityInitData() &&
				!Info_1.Info.EnableForceTick &&
				((this.s3o = this.ActorComp.Owner.GetComponentByClass(
					UE.KuroSceneItemMoveComponent.StaticClass(),
				)),
				this.s3o?.IsValid() ||
					(this.s3o = this.ActorComp.Owner.AddComponentByClass(
						UE.KuroSceneItemMoveComponent.StaticClass(),
						!1,
						new UE.Transform(),
						!1,
					)),
				this.s3o.SetTickingMoveEnable(!1)),
			!0
		);
	}
	OnActivate() {
		if (!Info_1.Info.EnableForceTick && 0 < this.s1n.length) {
			for (const t of this.s1n)
				this.s3o.AddMoveTarget(
					new UE.Vector(
						t.TargetPosData.X ?? 0,
						t.TargetPosData.Y ?? 0,
						t.TargetPosData.Z ?? 0,
					),
					t.MoveTime,
					t.StayTime,
				);
			(this.s1n = []),
				this.s3o.SetTickingMoveEnable(!0),
				(this.r1n.IsMoving = !0);
		}
		this._1n = !0;
	}
	m1n() {
		return Vector_1.Vector.DistSquared(this._ae, this.a1n) >= this.h1n;
	}
	OnTick(t) {
		this.r1n.IsMoving
			? (this.IsMoving && 2 !== this.s3o.GetSimpleRunState()) ||
				(this.r1n.IsMoving = !1)
			: this.IsMoving &&
				1 === this.s3o.GetSimpleRunState() &&
				(this.r1n.IsMoving = !0),
			this.n1n &&
				!this.IsMoving &&
				((this.n1n = !1),
				this.o1n?.TryDisable("[SceneItemMoveComponent] Stop Moving"));
	}
	OnForceTick(t) {
		var e, o;
		super.OnTick(t),
			0 === this._ti
				? (this.wrr.Addition(this.ActorComp.ActorLocationProxy, this.a1n),
					this.m1n()
						? (this.ActorComp.SetActorLocation(this.Due.ToUeVector()),
							(this._ti = 1))
						: this.ActorComp.SetActorLocation(this.a1n.ToUeVector()))
				: this.s1n &&
					0 !== this.s1n.length &&
					((e = this.s1n[0]),
					this.s1n.splice(0, 1),
					(this.Due = Vector_1.Vector.Create(
						e.TargetPosData.X,
						e.TargetPosData.Y,
						e.TargetPosData.Z,
					)),
					e.MoveTime <= MathUtils_1.MathUtils.KindaSmallNumber
						? this.ActorComp.SetActorLocation(this.Due.ToUeVector())
						: (this._ae.DeepCopy(this.ActorComp.ActorLocationProxy),
							(this.h1n = Vector_1.Vector.DistSquared(this._ae, this.Due)),
							(o = Vector_1.Vector.Create()),
							this.Due.Subtraction(this._ae, o),
							o.Division(
								(e.MoveTime * TimeUtil_1.TimeUtil.InverseMillisecond) / t,
								o,
							),
							(this.wrr = o),
							(this._ti = 0)));
	}
	AddMoveTarget(t) {
		if (this.l1n)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneItem",
					32,
					"当前SceneItem正在巡逻中,不可再添加目标点",
					["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
				);
		else {
			let o;
			var e;
			(o =
				t instanceof MoveTarget
					? t
					: ((e =
							t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion
								? -1
								: t.MoveMotion?.Time ?? 0),
						new MoveTarget(t.Point, e))),
				!Info_1.Info.EnableForceTick && this.IsMovingPrepareCompleted
					? (this.s3o.AddMoveTarget(
							new UE.Vector(
								o.TargetPosData.X ?? 0,
								o.TargetPosData.Y ?? 0,
								o.TargetPosData.Z ?? 0,
							),
							o.MoveTime,
							o.StayTime,
							o.MaxSpees,
							o.Acceleration,
						),
						this.r1n.IsMoving || this.AddStopMoveCallback(this.c1n),
						this.s3o.SetTickingMoveEnable(!0),
						2 !== this.s3o.GetSimpleRunState() && (this.r1n.IsMoving = !0))
					: this.s1n.push(o),
				(this.n1n = !0),
				this.o1n?.TryEnable(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Movement",
						32,
						"添加路径点",
						["moveTargetX", o.TargetPosData.X],
						["moveTargetY", o.TargetPosData.Y],
						["moveTargetZ", o.TargetPosData.Z],
						["Time", o.MoveTime],
					);
		}
	}
	StartPatrol(t, e, o, i, n, s) {
		(this.l1n = !0),
			this.s3o.StartMoveWithSpline(t, o, i, n, e),
			(this.n1n = !0),
			this.o1n?.TryEnable(),
			s && this.AddStopMoveCallback(s);
	}
	StopPatrol() {
		this.l1n = !1;
	}
	StopMove() {
		Info_1.Info.EnableForceTick
			? ((this.s1n = []), (this._ti = 1))
			: this.IsMovingPrepareCompleted
				? (this.s3o.OnStopCallback.Clear(),
					(this.u1n.length = 0),
					this.s3o.StopAllMove())
				: (this.s1n = []);
	}
	GetNextTarget() {
		var t, e;
		return this.s3o?.IsValid()
			? ((t = (0, puerts_1.$ref)(new UE.Vector())),
				(e = (0, puerts_1.$ref)(new UE.Vector())),
				{
					HasTarget: this.s3o.GetNextMoveTarget(t, e),
					Target: (0, puerts_1.$unref)(t),
					Velocity: (0, puerts_1.$unref)(e),
				})
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						32,
						"SceneItemMoveComponent不存在",
						["PbDataId", this.Entity.GetComponent(0).GetPbDataId()],
						["IsEntityInit", this.Entity.IsInit],
					),
				{ HasTarget: !1, Target: new UE.Vector(), Velocity: new UE.Vector() });
	}
	AddStopMoveCallback(t) {
		this.s3o.OnStopCallback.Add(t);
	}
	RemoveStopMoveCallback(t) {
		this.s3o.OnStopCallback.Remove(t);
	}
	AddStopMoveCallbackWithEntity(t) {
		(this.vGn ? this.MGn : this.u1n).push(t);
	}
	RemoveStopMoveCallbackWithEntity(t) {
		this.u1n.includes(t) && this.u1n.splice(this.u1n.indexOf(t), 1);
	}
	ClearStopMoveCallbackWithEntity() {
		this.u1n.length = 0;
	}
};
(SceneItemMoveComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(113)],
	SceneItemMoveComponent,
)),
	(exports.SceneItemMoveComponent = SceneItemMoveComponent);
