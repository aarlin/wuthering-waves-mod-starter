"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, o) {
		var n,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, r))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, r, o);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(n = e[l]) && (i = (a < 3 ? n(i) : 3 < a ? n(t, r, i) : n(t, r)) || i);
		return 3 < a && i && Object.defineProperty(t, r, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BaseAttributeComponent_1 = require("../../Character/Common/Component/Abilities/BaseAttributeComponent");
let PlayerAttributeComponent = class extends BaseAttributeComponent_1.BaseAttributeComponent {
	constructor() {
		super(...arguments), (this.PlayerId = 0);
	}
	OnCreate(e) {
		return (this.PlayerId = e?.PlayerId ?? 0), !0;
	}
	UpdateCurrentValue(e) {
		super.UpdateCurrentValue(e);
		for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
			this.PlayerId,
		))
			ModelManager_1.ModelManager.CreatureModel.GetEntity(t.GetCreatureDataId())
				?.Entity?.GetComponent(155)
				?.UpdateCurrentValue(e);
	}
};
(PlayerAttributeComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(179)],
	PlayerAttributeComponent,
)),
	(exports.PlayerAttributeComponent = PlayerAttributeComponent);
