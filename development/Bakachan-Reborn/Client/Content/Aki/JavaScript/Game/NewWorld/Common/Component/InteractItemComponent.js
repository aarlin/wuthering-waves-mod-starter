"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, n, o);
		else
			for (var c = t.length - 1; 0 <= c; c--)
				(r = t[c]) && (s = (i < 3 ? r(s) : 3 < i ? r(e, n, s) : r(e, n)) || s);
		return 3 < i && s && Object.defineProperty(e, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractItemComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	POSITION_TAG = new UE.FName("Position");
let InteractItemComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.cC = void 0),
			(this.Cnn = void 0),
			(this.IsInit = !1);
	}
	OnStart() {
		var t,
			e = WorldFunctionLibrary_1.default.GetDynamicEntity(this.Entity.Id);
		return (
			e &&
				((t = e.GetComponentsByTag(
					UE.ChildActorComponent.StaticClass(),
					POSITION_TAG,
				)) &&
					0 < t.Num() &&
					(this.cC = t.Get(0)),
				(this.Cnn = e.GetComponentByClass(UE.ArrowComponent.StaticClass())),
				(this.IsInit = !0)),
			!0
		);
	}
	GetInteractPosition() {
		if (this.cC) return this.cC.K2_GetComponentLocation();
	}
	GetInteractRotator() {
		if (this.Cnn) return this.Cnn.K2_GetComponentRotation();
	}
};
(InteractItemComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(91)],
	InteractItemComponent,
)),
	(exports.InteractItemComponent = InteractItemComponent);
