"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			a = arguments.length,
			p =
				a < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			p = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (p = (a < 3 ? r(p) : 3 < a ? r(t, n, p) : r(t, n)) || p);
		return 3 < a && p && Object.defineProperty(t, n, p), p;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnGamePlayComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnGamePlayComponent = class extends EntityComponent_1.EntityComponent {
	ScanResponse() {}
	WeightResponse() {}
	GrabResponse() {}
};
(PawnGamePlayComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(101)],
	PawnGamePlayComponent,
)),
	(exports.PawnGamePlayComponent = PawnGamePlayComponent);
