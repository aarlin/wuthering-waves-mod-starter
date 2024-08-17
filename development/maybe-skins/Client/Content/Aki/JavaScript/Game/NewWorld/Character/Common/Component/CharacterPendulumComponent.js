"use strict";
var CharacterPendulumComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var n,
				i = arguments.length,
				a =
					i < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, r, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(n = t[s]) &&
						(a = (i < 3 ? n(a) : 3 < i ? n(e, r, a) : n(e, r)) || a);
			return 3 < i && a && Object.defineProperty(e, r, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterPendulumComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	LIMIT_FRAME_TIME = 33,
	LIMIT_FRAME_TIME2 = 50,
	UPDATE_UP_Z = 5,
	UPDATE_UP_Z2 = 11,
	LIMIT_FORCE = 6e5;
let CharacterPendulumComponent = (CharacterPendulumComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Pjr = void 0),
			(this.xjr = !1),
			(this.wjr = 0),
			(this.Bjr = Vector_1.Vector.Create()),
			(this.kCe = ""),
			(this.bjr = 0),
			(this.qjr = 0),
			(this.Gjr = 0),
			(this.Njr = 0),
			(this.Ojr = 0),
			(this.wrr = Vector_1.Vector.Create()),
			(this.kjr = (t) => {}),
			(this.Fjr = (t, e, r, o, n) => {});
	}
	set Hooked(t) {
		this.xjr = t;
	}
	get Hooked() {
		return this.xjr;
	}
	set UpLength(t) {
		this.wjr = t;
	}
	get UpLength() {
		return this.wjr;
	}
	set GrabPoint(t) {
		this.Bjr.FromUeVector(t);
	}
	get GrabPoint() {
		return this.Bjr.ToUeVector();
	}
	set SocketName(t) {
		this.kCe = t;
	}
	get SocketName() {
		return this.kCe;
	}
	set RopeForce(t) {
		this.bjr = t;
	}
	get RopeForce() {
		return this.bjr;
	}
	set DistanceRopeToActor(t) {
		this.qjr = t;
	}
	get DistanceRopeToActor() {
		return this.qjr;
	}
	set AirControl(t) {
		this.Gjr = t;
	}
	get AirControl() {
		return this.Gjr;
	}
	OnStart() {
		var t = this.Entity.CheckGetComponent(3);
		(this.Pjr = t.Actor),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMovePendulum,
				this.kjr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Fjr,
			),
			(t = this.Entity.GetComponent(161).CharacterMovement);
		return (this.Ojr = t.AirControl), !0;
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMovePendulum,
				this.kjr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Fjr,
			),
			this.Vjr(),
			!0
		);
	}
	OnTick(t) {
		1 === this.Njr ? (this.Njr = 0) : this.Hjr(t);
	}
	DrawCube(t, e) {
		var r, o, n, i;
		t &&
			((r = 156),
			(r = new UE.LinearColor(r, r, r, r)),
			(o = t.GetLocation()),
			(n = new UE.Vector(10, 10, 10)),
			(n = new UE.Vector(0.5 * n.X, 0.5 * n.Y, 0.5 * n.Z)),
			(i = t.Rotator()),
			UE.KismetSystemLibrary.DrawDebugBox(
				GlobalData_1.GlobalData.World,
				o,
				n,
				r,
				i,
				e,
				30,
			),
			(o = 0.5),
			(n = UE.KismetMathLibrary.TransformLocation(t, new UE.Vector(o, o, o))),
			(i = UE.KismetMathLibrary.TransformLocation(
				t,
				new UE.Vector(-o, -o, -o),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				n,
				i,
				r,
				e,
				15,
			),
			(n = UE.KismetMathLibrary.TransformLocation(t, new UE.Vector(o, -o, o))),
			(i = UE.KismetMathLibrary.TransformLocation(t, new UE.Vector(-o, o, o))),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				n,
				i,
				r,
				e,
				15,
			));
	}
	Hjr(t) {
		var e, r, o;
		this.xjr &&
			(this.wrr.FromUeVector(this.Pjr.GetVelocity()),
			(e = 1),
			t > 33 &&
				((o = t > 50 ? t / 50 : t / 33), 1 < (e = this.wrr.Size() / o)) &&
				this.wrr.Z < 0 &&
				((o = this.Entity.GetComponent(161)),
				(r = t > 50 ? 11 : 5),
				CharacterPendulumComponent_1.TmpVector.Set(
					0,
					0,
					(Math.abs(this.wrr.Z) / e) * r,
				),
				o.MoveCharacter(
					CharacterPendulumComponent_1.TmpVector,
					t * MathUtils_1.MathUtils.MillisecondToSecond,
					"钩锁.ThrowRopeAndSwing",
				)),
			(e = Vector_1.Vector.Create(this.Pjr.K2_GetActorLocation())).Subtraction(
				this.Bjr,
				e,
			),
			(r = Vector_1.Vector.DotProduct(this.wrr, e)),
			e.Normalize(),
			(o = Vector_1.Vector.Create()),
			e.Multiply(r, o),
			o.Multiply(this.RopeForce, o),
			(t = this.Entity.GetComponent(161).CharacterMovement),
			o.Size() > 6e5 && (o.Normalize(), o.Multiply(6e5, o)),
			t.AddForce(o.ToUeVector()),
			(t.AirControl = this.Gjr));
	}
	Vjr() {
		(this.xjr = !1),
			(this.Entity.GetComponent(161).CharacterMovement.AirControl = this.Ojr);
	}
	SetPendulumData(t, e, r, o, n, i, a, s, h, m, c) {
		(this.xjr = !0), (this.Njr = 1);
	}
	Reset() {
		(this.Njr = 0), this.Vjr();
	}
});
(CharacterPendulumComponent.TmpVector = Vector_1.Vector.Create()),
	(CharacterPendulumComponent = CharacterPendulumComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(60)],
			CharacterPendulumComponent,
		)),
	(exports.CharacterPendulumComponent = CharacterPendulumComponent);
