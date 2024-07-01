"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, n);
		else
			for (var h = e.length - 1; 0 <= h; h--)
				(r = e[h]) && (s = (i < 3 ? r(s) : 3 < i ? r(t, o, s) : r(t, o)) || s);
		return 3 < i && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseFrozenComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	ETERNAL_DURATION = 1e7;
let BaseFrozenComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorComponent = void 0),
			(this.vqr = void 0),
			(this.Qbr = void 0),
			(this.Xbr = void 0),
			(this.$br = void 0),
			(this.Ybr = (e, t) => {
				t && this.ActorComponent.Actor.StopAnimMontage();
			}),
			(this.Jbr = new Map()),
			(this.FrozenLockSet = new Set());
	}
	OnStart() {
		return (
			(this.ActorComponent = this.Entity.CheckGetComponent(3)),
			(this.vqr = this.Entity.CheckGetComponent(51)),
			(this.Qbr = this.Entity.CheckGetComponent(107)),
			this.Zbr(),
			!0
		);
	}
	OnEnd() {
		return (
			this.Xbr && (this.Xbr.EndTask(), (this.Xbr = void 0)),
			this.$br && (this.$br.EndTask(), (this.$br = void 0)),
			!0
		);
	}
	Zbr() {
		var e = this.Entity.CheckGetComponent(185);
		this.Xbr = e.ListenForTagAddOrRemove(2118071836, this.Ybr);
	}
	AddTimeScaleByBuff(e, t, o, n, r) {
		this.Jbr.has(e) ||
			this.vqr.IsImmuneTimeScaleEffect() ||
			((t = this.Qbr.SetTimeScale(t, o, r, n ?? 1e7, 6)), this.Jbr.set(e, t));
	}
	RemoveTimeScaleByBuff(e) {
		var t = this.Jbr.get(e);
		t && this.Qbr.RemoveTimeScale(t), this.Jbr.delete(e);
	}
	IsFrozen() {
		return !1;
	}
	SetFrozen(e) {}
	RefreshFrozen() {
		this.SetFrozen(0 < this.FrozenLockSet.size);
	}
	LockFrozen(e) {
		this.FrozenLockSet.add(e), this.RefreshFrozen();
	}
	UnlockFrozen(e) {
		this.FrozenLockSet.delete(e), this.RefreshFrozen();
	}
};
(BaseFrozenComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(16)],
	BaseFrozenComponent,
)),
	(exports.BaseFrozenComponent = BaseFrozenComponent);
