"use strict";
var TriggerComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, n) {
			var r,
				i = arguments.length,
				g =
					i < 3
						? t
						: null === n
							? (n = Object.getOwnPropertyDescriptor(t, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				g = Reflect.decorate(e, t, o, n);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(r = e[s]) &&
						(g = (i < 3 ? r(g) : 3 < i ? r(t, o, g) : r(t, o)) || g);
			return 3 < i && g && Object.defineProperty(t, o, g), g;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TriggerComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
let TriggerComponent = (TriggerComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.SIe = void 0),
			(this.ktn = void 0),
			(this.Lo = void 0),
			(this.K$o = 0);
	}
	get Actions() {
		return this.Lo?.Actions;
	}
	get ExitActions() {
		return this.Lo?.ExitConfig?.Actions;
	}
	OnInitData(e) {
		e = (e = e.GetParam(TriggerComponent_1)[0]) || void 0;
		var t = this.Entity.GetComponent(106);
		return (
			t && !t.LogicRange && t.SetLogicRange(300),
			(this.Lo = e),
			(this.SIe = this.Entity.GetComponent(0)),
			(this.K$o = this.SIe.GetPbDataId()),
			!0
		);
	}
	OnStart() {
		return (
			(this.ktn = this.Entity.GetComponent(74)),
			!!this.ktn ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("SceneItem", 40, "[TriggerComponent] RangeComp缺失", [
						"ConfigId",
						this.K$o,
					]),
				!1)
		);
	}
	OnEnd() {
		return !(this.Lo = void 0);
	}
	CreateTriggerContext(e) {
		return LevelGeneralContextDefine_1.TriggerContext.Create(this.Entity.Id, e);
	}
});
(TriggerComponent = TriggerComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(75)],
		TriggerComponent,
	)),
	(exports.TriggerComponent = TriggerComponent);
