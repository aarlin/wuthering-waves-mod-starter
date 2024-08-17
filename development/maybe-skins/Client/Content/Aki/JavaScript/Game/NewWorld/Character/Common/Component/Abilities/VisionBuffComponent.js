"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			i = arguments.length,
			f =
				i < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			f = Reflect.decorate(e, t, o, n);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (f = (i < 3 ? r(f) : 3 < i ? r(t, o, f) : r(t, o)) || f);
		return 3 < i && f && Object.defineProperty(t, o, f), f;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionBuffComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	CharacterBuffComponent_1 = require("./CharacterBuffComponent");
let VisionBuffComponent = class extends CharacterBuffComponent_1.CharacterBuffComponent {
	constructor() {
		super(...arguments), (this.P2r = void 0);
	}
	x2r() {
		var e, t;
		return void 0 !== this.P2r
			? this.P2r
			: (t = this.Entity.GetComponent(47)?.GetAttributeHolder()) !==
					this.Entity &&
					((t = t?.CheckGetComponent(34)) &&
						((e = t.GetVisionId()),
						(t = t.GetVisionData(e)),
						(this.P2r = !0 === t?.buff是否转移)),
					this.P2r ?? !1);
	}
	AddBuff(e, t) {
		this.CreatureDataId !== t.InstigatorId && this.x2r()
			? this.Entity.GetComponent(47)
					.GetAttributeHolder()
					.GetComponent(157)
					.AddBuff(e, t)
			: super.AddBuff(e, t);
	}
	RemoveBuff(e, t, o) {
		this.x2r() &&
			this.Entity.GetComponent(47)
				.GetAttributeHolder()
				.GetComponent(157)
				.RemoveBuff(e, t, o),
			super.RemoveBuff(e, t, o);
	}
};
(VisionBuffComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(159)],
	VisionBuffComponent,
)),
	(exports.VisionBuffComponent = VisionBuffComponent);
