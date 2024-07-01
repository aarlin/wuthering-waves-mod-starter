"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, i) {
		var n,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, o))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, i);
		else
			for (var h = e.length - 1; 0 <= h; h--)
				(n = e[h]) && (s = (r < 3 ? n(s) : 3 < r ? n(t, o, s) : n(t, o)) || s);
		return 3 < r && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelRotateComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRotateComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.ABr = 0),
			(this.Rxe = !1),
			(this.hwe = void 0),
			(this.UBr = void 0),
			(this.PBr = !1);
	}
	OnInit() {
		(this.nXt = this.Owner.CheckGetComponent(1)),
			(this.hwe = Rotator_1.Rotator.Create());
	}
	SetRotateParam(e, t = 1, o = !0) {
		(this.ABr = 0 !== e ? MathCommon_1.MathCommon.RoundAngle / e : 0),
			(this.UBr = t),
			(this.PBr = o);
	}
	StartRotate() {
		(this.Rxe = !0), (this.NeedTick = !0);
	}
	StopRotate() {
		(this.Rxe = !1), (this.NeedTick = !1);
	}
	OnTick(e) {
		var t;
		!this.Rxe ||
			this.ABr <= 0 ||
			((t = this.PBr ? 1 : -1),
			(e = this.ABr * e * CommonDefine_1.MILLIONSECOND_PER_SECOND * t),
			0 === this.UBr
				? (this.hwe.Pitch = e)
				: 1 === this.UBr
					? (this.hwe.Yaw = e)
					: 2 === this.UBr && (this.hwe.Roll = e),
			this.nXt.Actor.K2_AddActorLocalRotation(
				this.hwe.ToUeRotator(),
				!1,
				void 0,
				!1,
			));
	}
};
(UiModelRotateComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(9)],
	UiModelRotateComponent,
)),
	(exports.UiModelRotateComponent = UiModelRotateComponent);
