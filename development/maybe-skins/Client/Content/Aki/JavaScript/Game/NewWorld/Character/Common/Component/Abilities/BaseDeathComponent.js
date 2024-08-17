"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			a = arguments.length,
			s =
				a < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, n);
		else
			for (var i = e.length - 1; 0 <= i; i--)
				(r = e[i]) && (s = (a < 3 ? r(s) : 3 < a ? r(t, o, s) : r(t, o)) || s);
		return 3 < a && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseDeathComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
let BaseDeathComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments), (this.IsDeadInternal = !1);
	}
	IsDead() {
		return this.IsDeadInternal;
	}
	ExecuteDeath() {
		return this.IsDeadInternal
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Character", 20, "实体重复死亡", [
						"entityId",
						this.Entity.Id,
					]),
				!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						20,
						"[DeathComponent]执行角色死亡逻辑",
						["Entity", this.Entity.toString()],
						["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()],
					),
				(this.IsDeadInternal = !0));
	}
};
(BaseDeathComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(15)],
	BaseDeathComponent,
)),
	(exports.BaseDeathComponent = BaseDeathComponent);
