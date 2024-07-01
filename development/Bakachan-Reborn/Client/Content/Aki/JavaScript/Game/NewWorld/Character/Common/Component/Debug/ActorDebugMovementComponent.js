"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, r) {
		var n,
			c = arguments.length,
			i =
				c < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, o, r);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(n = e[s]) && (i = (c < 3 ? n(i) : 3 < c ? n(t, o, i) : n(t, o)) || i);
		return 3 < c && i && Object.defineProperty(t, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActorDebugMovementComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	WARNING_THRESHOLD_SQUARED = 25e6;
let ActorDebugMovementComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.UeDebugComp = void 0),
			(this.IsDebug = !1),
			(this.LastRecordLocation = Vector_1.Vector.Create()),
			(this.TmpVector = Vector_1.Vector.Create());
	}
	OnStart() {
		return (
			(this.ActorComp = this.Entity.GetComponent(1)),
			(this.IsDebug = !1),
			this.ActorComp &&
				this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
			!0
		);
	}
	SetDebug(e) {
		this.IsDebug !== e &&
			((this.IsDebug = e), this.IsDebug) &&
			(this.ActorComp?.Owner &&
				(this.UeDebugComp = this.ActorComp.Owner.AddComponentByClass(
					UE.KuroDebugMovementComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
			this.UeDebugComp.Resigter());
	}
	MarkDebugRecord(e, t = 15, o = Vector_1.Vector.ZeroVector) {
		this.ActorComp &&
			(this.TmpVector.FromUeVector(o),
			Vector_1.Vector.DistSquared(this.LastRecordLocation, this.TmpVector) >
				25e6 &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Movement",
					6,
					"ActorDebug.MarkDebugRecord move too far",
					["Actor", this.ActorComp.Owner.GetName()],
					["From", this.LastRecordLocation],
					["Proxy", this.ActorComp.ActorLocationProxy],
					["To", this.TmpVector],
				),
			this.LastRecordLocation.DeepCopy(this.TmpVector)),
			this.IsDebug && this.UeDebugComp.RecordModifyInfo(e, o, t);
	}
	static StaticMarkDebugRecord(e, t, o = 15, r = Vector_1.Vector.ZeroVector) {
		e.GetComponent(27).MarkDebugRecord(t, o, r);
	}
};
(ActorDebugMovementComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(27)],
	ActorDebugMovementComponent,
)),
	(exports.ActorDebugMovementComponent = ActorDebugMovementComponent);
