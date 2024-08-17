"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			i = arguments.length,
			c =
				i < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(e, t, n, o);
		else
			for (var p = e.length - 1; 0 <= p; p--)
				(r = e[p]) && (c = (i < 3 ? r(c) : 3 < i ? r(t, n, c) : r(t, n)) || c);
		return 3 < i && c && Object.defineProperty(t, n, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemDebugComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SceneItemDebugComponent = class extends EntityComponent_1.EntityComponent {
	GetTagDebugStrings() {
		return this.Entity.GetComponent(177).GetTagDebugStrings();
	}
};
(SceneItemDebugComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(111)],
	SceneItemDebugComponent,
)),
	(exports.SceneItemDebugComponent = SceneItemDebugComponent);
