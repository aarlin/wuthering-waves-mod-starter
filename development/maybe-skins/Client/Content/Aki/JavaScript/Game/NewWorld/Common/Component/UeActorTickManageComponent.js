"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			c =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(i = e[s]) && (c = (r < 3 ? i(c) : 3 < r ? i(t, n, c) : i(t, n)) || c);
		return 3 < r && c && Object.defineProperty(t, n, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UeActorTickManageComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeActorTickManageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments), (this.Hte = void 0);
	}
	static get Dependencies() {
		return [1];
	}
	OnInit() {
		return !0;
	}
	OnActivate() {
		(this.Hte = this.Entity.GetComponent(1)),
			this.Hte.DisableTick("[UeActorTickManageComponent.OnActivate]");
	}
	OnTick(e) {
		this.Hte.Owner.KuroTickActorOutside(
			e * MathUtils_1.MathUtils.MillisecondToSecond,
		);
	}
};
(UeActorTickManageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(96)],
	UeActorTickManageComponent,
)),
	(exports.UeActorTickManageComponent = UeActorTickManageComponent);
