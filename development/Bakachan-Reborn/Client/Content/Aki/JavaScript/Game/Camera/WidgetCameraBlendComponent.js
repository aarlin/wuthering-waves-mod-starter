"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, r, i) {
		var o,
			s = arguments.length,
			n =
				s < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, r))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(t, e, r, i);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(o = t[a]) && (n = (s < 3 ? o(n) : 3 < s ? o(e, r, n) : o(e, r)) || n);
		return 3 < s && n && Object.defineProperty(e, r, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WidgetCameraBlendComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraBlendComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.bwr = -0),
			(this.qwr = -0),
			(this.Gwr = 0),
			(this.Nwr = -0),
			(this.Due = Vector_1.Vector.Create()),
			(this.xXo = void 0),
			(this.Owr = !1),
			(this.kwr = !1),
			(this.Fwr = void 0),
			(this.Vwr = void 0),
			(this.Hwr = !1),
			(this.jwr = !1),
			(this.ele = void 0);
	}
	get yxr() {
		return this.ele;
	}
	SetBlendParams(t, e, r, i, o, s, n, a, h, c, w) {
		(this.qwr = t),
			(this.bwr = t),
			(this.Gwr = e),
			(this.Nwr = r),
			(this.Owr = i),
			this.Owr &&
				((this.Hwr = o),
				(t = this.yxr.CineCamera),
				this.Hwr
					? (this.Vwr = t.SceneComponent.RelativeLocation)
					: (this.Vwr = t.K2_GetActorLocation()),
				s
					? this.Due.FromUeVector(n)
					: this.Due.FromUeVector(this.Vwr.op_Addition(n)),
				(this.kwr = a),
				this.kwr) &&
				((this.jwr = h),
				this.jwr
					? (this.Fwr = t.SceneComponent.RelativeRotation)
					: (this.Fwr = t.K2_GetActorRotation()),
				(this.xXo = c ? w : w.op_Addition(this.Fwr)));
	}
	OnStart() {
		return (this.ele = this.Entity.GetComponent(12)), this.ele.Valid;
	}
	OnEnd() {
		return !(this.ele = void 0);
	}
	OnTick(t) {
		(t = this.bwr - t),
			(this.bwr = Math.max(t, 0)),
			(t = this.Wwr()),
			this.Kwr(t),
			this.T_e(t);
	}
	Kwr(t) {
		var e, r;
		this.Owr &&
			((t = UE.KismetMathLibrary.VLerp(this.Vwr, this.Due.ToUeVector(), t)),
			(e = this.yxr.CineCamera),
			this.Hwr
				? ((r = new UE.HitResult()),
					(r = (0, puerts_1.$ref)(r)),
					e.K2_SetActorRelativeLocation(t, !1, r, !1),
					Vector_1.Vector.Create(e.SceneComponent.RelativeLocation).Equals(
						this.Due,
						0.1,
					) && (this.Owr = !1))
				: ((r = new UE.HitResult()),
					(r = (0, puerts_1.$ref)(r)),
					e.K2_SetActorRelativeLocation(t, !1, r, !1),
					Vector_1.Vector.Create(e.K2_GetActorLocation()).Equals(
						this.Due,
						0.1,
					) && (this.Owr = !1)));
	}
	T_e(t) {
		var e, r;
		this.kwr &&
			((t = UE.KismetMathLibrary.RLerp(this.Fwr, this.xXo, t, !0)),
			(e = this.yxr.CineCamera),
			this.jwr
				? ((r = new UE.HitResult()),
					(r = (0, puerts_1.$ref)(r)),
					e.K2_SetActorRelativeRotation(t, !1, r, !1),
					UE.KismetMathLibrary.EqualEqual_RotatorRotator(
						e.SceneComponent.RelativeRotation,
						this.xXo,
						0.1,
					) && (this.Owr = !1))
				: ((r = new UE.HitResult()),
					(r = (0, puerts_1.$ref)(r)),
					e.K2_SetActorRelativeRotation(t, !1, r, !1),
					UE.KismetMathLibrary.EqualEqual_RotatorRotator(
						e.K2_GetActorRotation(),
						this.xXo,
						0.1,
					) && (this.Owr = !1)));
	}
	Wwr() {
		var t = MathUtils_1.MathUtils.SafeDivide(this.qwr - this.bwr, this.qwr);
		let e = 0;
		switch (this.Gwr) {
			case 1:
				e = UE.KismetMathLibrary.FInterpEaseInOut(0, 1, t, 3);
				break;
			case 2:
			case 4:
			case 3:
				e = UE.KismetMathLibrary.Ease(0, 1, t, this.Nwr);
				break;
			case 0:
				e = MathUtils_1.MathUtils.Lerp(0, 1, t);
		}
		return e;
	}
};
(WidgetCameraBlendComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(11)],
	WidgetCameraBlendComponent,
)),
	(exports.WidgetCameraBlendComponent = WidgetCameraBlendComponent);
