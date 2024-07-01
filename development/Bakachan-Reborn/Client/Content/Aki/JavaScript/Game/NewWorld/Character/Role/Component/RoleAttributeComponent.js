"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, r) {
		var n,
			l = arguments.length,
			a =
				l < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, r);
		else
			for (var i = e.length - 1; 0 <= i; i--)
				(n = e[i]) && (a = (l < 3 ? n(a) : 3 < l ? n(t, o, a) : n(t, o)) || a);
		return 3 < l && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	CharacterAttributeComponent_1 = require("../../Common/Component/Abilities/CharacterAttributeComponent");
let RoleAttributeComponent = class extends CharacterAttributeComponent_1.CharacterAttributeComponent {
	*GetAllBoundsLocker(e) {
		for (const t of super.GetAllBoundsLocker(e)) yield t;
		var t = FormationDataController_1.FormationDataController.GetPlayerEntity(
			ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
		)?.GetComponent(179);
		if (t) for (const o of t.GetAllBoundsLocker(e)) yield o;
	}
	*GetAllModifiers(e) {
		for (const t of super.GetAllModifiers(e)) yield t;
		var t = FormationDataController_1.FormationDataController.GetPlayerEntity(
			ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
		)?.GetComponent(179);
		if (t) for (const o of t.GetAllModifiers(e)) yield o;
	}
};
(RoleAttributeComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(169)],
	RoleAttributeComponent,
)),
	(exports.RoleAttributeComponent = RoleAttributeComponent);
