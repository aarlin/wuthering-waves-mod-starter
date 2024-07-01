"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, r) {
		var o,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, n))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, n, r);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(o = t[a]) && (s = (i < 3 ? o(s) : 3 < i ? o(e, n, s) : o(e, n)) || s);
		return 3 < i && s && Object.defineProperty(e, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleEnergyComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	energyAttrIds = [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax],
	ModManager_1 = require("../../../../Manager/ModManager");
let RoleEnergyComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.$te = void 0),
			(this.mon = (t, e, n) => {
				var r = this.$te.GetCurrentValue(EAttributeId.Proto_Energy),
					o = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
				this.nXt.Actor?.CharRenderingComponent.SetStarScarEnergy(r / o);
			});
	}
	OnStart() {
		(this.nXt = this.Entity.CheckGetComponent(3)),
			(this.$te = this.Entity.CheckGetComponent(156));
		const t = this.$te.GetCurrentValue.bind(this.$te);
		return (
			(this.$te.GetCurrentValue = (e) =>
				e === EAttributeId.Proto_Energy && ModManager_1.ModManager.Settings.NoCD
					? t(EAttributeId.Proto_EnergyMax)
					: t(e)),
			this.$te.AddListeners(energyAttrIds, this.mon, "RoleEnergyComponent"),
			this.mon(),
			!0
		);
	}
	OnEnd() {
		if (ModManager_1.ModManager.Settings.NoCD) {
			const t = this.$te.GetCurrentValue.bind(this.$te);
			this.$te.GetCurrentValue && (this.$te.GetCurrentValue = t);
		}
		return this.$te.RemoveListeners(energyAttrIds, this.mon), !0;
	}
};
(RoleEnergyComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(80)],
	RoleEnergyComponent,
)),
	(exports.RoleEnergyComponent = RoleEnergyComponent);
