"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, o) {
		var n,
			i = arguments.length,
			c =
				i < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, r))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(e, t, r, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(n = e[s]) && (c = (i < 3 ? n(c) : 3 < i ? n(t, r, c) : n(t, r)) || c);
		return 3 < i && c && Object.defineProperty(t, r, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterThrowComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterThrowComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments), (this.wKr = void 0);
	}
	get ProjectilePathTracer() {
		return this.wKr;
	}
	OnStart() {
		return (
			(this.wKr = ActorSystem_1.ActorSystem.Get(
				UE.BP_KuroProjectilePathTracer_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			!0
		);
	}
	SetPredictProjectileInfo(e, t, r, o) {
		this.wKr.SetPredictProjectileInfo(e, t, r, o);
	}
	SetVisible(e) {
		this.wKr.SetVisible(e);
	}
};
(CharacterThrowComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(67)],
	CharacterThrowComponent,
)),
	(exports.CharacterThrowComponent = CharacterThrowComponent);
