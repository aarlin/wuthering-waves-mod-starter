"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			a = arguments.length,
			c =
				a < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (c = (a < 3 ? r(c) : 3 < a ? r(t, n, c) : r(t, n)) || c);
		return 3 < a && c && Object.defineProperty(t, n, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnInteractBaseComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnInteractBaseComponent = class extends EntityComponent_1.EntityComponent {
	InteractPawn(e = 0) {}
	CloseInteract(e = 0) {}
	ForceUpdate() {}
	IsPawnInteractive() {
		return !1;
	}
	get OwenActor() {}
};
(PawnInteractBaseComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(103)],
	PawnInteractBaseComponent,
)),
	(exports.PawnInteractBaseComponent = PawnInteractBaseComponent);
