"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageAccumulation = void 0);
const BulletController_1 = require("../../../../../Bullet/BulletController"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase"),
	ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class DamageAccumulation extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.aQo = 0),
			(this.hQo = 0),
			(this.lQo = 0),
			(this._Qo = void 0),
			(this.uQo = 0),
			(this.cQo = -0),
			(this.ine = void 0);
	}
	InitParameters(t) {
		t = t.ExtraEffectParameters;
		var e =
			((this.hQo = Number(t[0])),
			(this.lQo = Number(t[1])),
			(this._Qo = t[2].split("#").map((t) => BigInt(t))),
			(t[3] ?? "").split("#").map((t) => Number(t)));
		for (const t of e) this.uQo |= 1 << t;
		var s = (t[4] ?? "").split("#").map((t) => Number(t));
		switch (s.length) {
			case 1:
				this.cQo = s[0];
				break;
			case 2:
				(this.ine = s[0]), (this.cQo = s[1]);
		}
	}
	OnCreated() {
		this.mQo(0);
	}
	OnRemoved(t) {
		t ? this.mQo(2) : this.mQo(1);
	}
	OnStackDecreased(t, e, s) {
		t < e && this.mQo(3);
	}
	OnExecute(t, e) {
		t === this.hQo && ((this.aQo += e.Damage), this.mQo(0));
	}
	static ApplyEffects(t, e, s, o) {
		var i,
			r,
			a = [s.OwnerBuffComponent, o.OwnerBuffComponent];
		for ([i, r] of a.entries()) {
			var f = a[1 - i];
			for (const s of r.BuffEffectManager.FilterById(19))
				s.Check(e, f) && s.Execute(i, t);
		}
	}
	static GetAccumulation(t) {
		var e = this.dQo.get(t) ?? 0;
		return this.dQo.delete(t), e;
	}
	CQo(t) {
		return !!(this.uQo & (1 << t));
	}
	mQo(t) {
		if (this.CQo(t))
			switch (t) {
				case 0: {
					let t = 0;
					var e;
					(t = this.ine
						? ((e = this.cQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
							this.OwnerEntity.GetComponent(156)?.GetBaseValue(this.ine) * e)
						: this.cQo) < this.aQo && this.gQo();
					break;
				}
				default:
					this.gQo();
			}
	}
	gQo() {
		switch (this.lQo) {
			case 1:
				this.fQo();
				break;
			case 0:
				this.pQo();
		}
		this.aQo = 0;
	}
	pQo() {
		var t = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
		if (t?.IsValid())
			for (const e of this._Qo)
				this.OwnerBuffComponent.AddIterativeBuff(
					e,
					t,
					void 0,
					!0,
					`因为其它buff额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
				);
	}
	fQo() {
		var t = this.OwnerEntity.GetComponent(3)?.ActorTransform,
			e = this.InstigatorEntity.Entity.GetComponent(3)?.Actor;
		if (t && e) {
			var s = this.Buff.MessageId;
			for (const i of this._Qo)
				for (
					let r = 0;
					r < ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES;
					r++
				) {
					var o = BulletController_1.BulletController.CreateBulletCustomTarget(
						e,
						String(i),
						t,
						{},
						s,
					);
					o && DamageAccumulation.dQo.set(o.Id, this.aQo);
				}
		}
	}
}
(exports.DamageAccumulation = DamageAccumulation).dQo = new Map();
