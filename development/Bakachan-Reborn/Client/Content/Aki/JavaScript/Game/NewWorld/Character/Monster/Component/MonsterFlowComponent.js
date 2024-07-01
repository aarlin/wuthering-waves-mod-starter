"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, n) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === n
						? (n = Object.getOwnPropertyDescriptor(e, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, o, n);
		else
			for (var c = t.length - 1; 0 <= c; c--)
				(r = t[c]) && (s = (i < 3 ? r(s) : 3 < i ? r(e, o, s) : r(e, o)) || s);
		return 3 < i && s && Object.defineProperty(e, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterFlowComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
let MonsterFlowComponent = class extends CharacterFlowComponent_1.CharacterFlowComponent {
	constructor() {
		super(...arguments), (this.Htn = void 0), (this.W5r = void 0);
	}
	OnStart() {
		return (
			(this.W5r = this.Entity.GetComponent(158)),
			(this.Htn = this.Entity.GetComponent(106)),
			super.OnStart(),
			!0
		);
	}
	InitFlowLogicRange(t, e) {
		return (
			!!super.InitFlowLogicRange(t, e) &&
			(this.Htn?.SetLogicRange(
				e ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
			),
			!0)
		);
	}
	CheckCondition() {
		return (
			!!super.CheckCondition() &&
			!!this.Htn &&
			((this.Htn.IsInLogicRange && !this.W5r.IsInFightState()) ||
				(this.ForceStopFlow(), !1))
		);
	}
};
(MonsterFlowComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(164)],
	MonsterFlowComponent,
)),
	(exports.MonsterFlowComponent = MonsterFlowComponent);
