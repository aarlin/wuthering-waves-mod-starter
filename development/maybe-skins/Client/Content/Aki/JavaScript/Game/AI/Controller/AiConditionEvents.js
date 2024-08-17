"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiConditionEvents = exports.AiAttributeRate = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
	TsFloatRange_1 = require("../../../Core/Utils/TsFloatRange"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class AiAttributeRate {
	constructor(t) {
		(this.Denominator = t.Denominator),
			(this.Numerator = t.Numerator),
			(this.Range = new TsFloatRange_1.TsFloatRange(
				0 === t.Range.LowerBound.Type,
				t.Range.LowerBound.Value,
				t.Range.UpperBound.Value,
			));
	}
}
exports.AiAttributeRate = AiAttributeRate;
class AiConditions {
	constructor(t) {
		(this.Tags = new Map()),
			(this.Attributes = new Map()),
			(this.AttributeRates = new Array()),
			(this.AttributeRateDenominatorMap = new Map()),
			(this.AttributeRateNumeratorMap = new Map()),
			(this.Logic = t.Logic);
		let e = t.Tags.Num();
		for (let n = 0; n < e; ++n) {
			var i = t.Tags.GetKey(n),
				s = t.Tags.Get(i);
			this.Tags.set(
				i.TagId,
				new TsFloatRange_1.TsFloatRange(
					0 === s.LowerBound.Type,
					s.LowerBound.Value,
					s.UpperBound.Value,
				),
			);
		}
		e = t.Attributes.Num();
		for (let i = 0; i < e; ++i) {
			var n = t.Attributes.GetKey(i),
				r = t.Attributes.Get(n);
			this.Attributes.set(
				n,
				new TsFloatRange_1.TsFloatRange(
					0 === r.LowerBound.Type,
					r.LowerBound.Value,
					r.UpperBound.Value,
				),
			);
		}
		e = t.AttributeRates.Num();
		for (let i = 0; i < e; ++i) {
			var a = new AiAttributeRate(t.AttributeRates.Get(i));
			this.AttributeRates.push(a);
			let e = this.AttributeRateDenominatorMap.get(a.Denominator);
			e || ((e = []), this.AttributeRateDenominatorMap.set(a.Denominator, e)),
				e.push(i),
				(e = this.AttributeRateNumeratorMap.get(a.Numerator)) ||
					((e = []), this.AttributeRateNumeratorMap.set(a.Numerator, e)),
				e.push(i);
		}
	}
}
class ConditionEventPair {
	constructor() {
		(this.Qte = void 0),
			(this.EventBinder = void 0),
			(this.Xte = void 0),
			(this.$te = void 0),
			(this.Yte = new Set()),
			(this.Jte = new Set()),
			(this.zte = new Set()),
			(this.Zte = 0),
			(this.eie = 0),
			(this.tie = new Array()),
			(this.iie = void 0),
			(this.oie = (t, e, i) => {
				this.Qte.Attributes.get(t).InRange(e)
					? this.Jte.has(t) || (this.Jte.add(t), this.rie())
					: this.Jte.has(t) && (this.Jte.delete(t), this.nie());
			}),
			(this.sie = void 0),
			(this.aie = (t, e, i) => {
				if (this.$te) {
					var s = this.Qte.AttributeRateNumeratorMap.get(t);
					if (s)
						for (const t of s) {
							var n = this.Qte.AttributeRates[t],
								r = this.$te.GetCurrentValue(n.Denominator);
							0 !== r &&
								(n.Range.InRange(e / r)
									? this.zte.has(t) || (this.zte.add(t), this.rie())
									: this.zte.has(t) && (this.zte.delete(t), this.nie()));
						}
					if ((s = this.Qte.AttributeRateDenominatorMap.get(t)) && 0 !== e)
						for (const t of s) {
							var a = this.Qte.AttributeRates[t],
								o = this.$te.GetCurrentValue(a.Numerator);
							a.Range.InRange(o / e)
								? this.zte.has(t) || (this.zte.add(t), this.rie())
								: this.zte.has(t) && (this.zte.delete(t), this.nie());
						}
				}
			});
	}
	hie(t) {
		return (e) => {
			this.Qte.Tags.get(t).InRange(e)
				? this.Yte.has(t) || (this.Yte.add(t), this.rie())
				: this.Yte.has(t) && (this.Yte.delete(t), this.nie());
		};
	}
	InitConditions(t, e, i) {
		this.Clear(),
			(this.Qte = new AiConditions(t)),
			(this.EventBinder = e),
			(this.Xte = i.Entity.GetComponent(185)),
			(this.$te = i.Entity.GetComponent(156)),
			(this.eie =
				this.Qte.Tags.size +
				this.Qte.Attributes.size +
				this.Qte.AttributeRates.length);
		var s = i.Entity.GetComponent(185);
		if (s)
			for (var [n] of this.Qte.Tags)
				(n = s.ListenForTagAnyCountChanged(n, this.hie(n))), this.tie.push(n);
		if (this.$te) {
			var r,
				a = new Set();
			for ([r] of this.Qte.Attributes) a.add(r);
			this.Qte.Attributes.size &&
				this.$te &&
				((this.iie = [...a]),
				this.$te.AddListeners(this.iie, this.oie, "AiConditionEvent")),
				a.clear();
			for (const t of this.Qte.AttributeRates)
				a.add(t.Numerator), a.add(t.Denominator);
			this.Qte.AttributeRates.length &&
				this.$te &&
				((this.sie = [...a]),
				this.$te.AddListeners(this.sie, this.aie, "AiConditionEvent2"));
		}
		this.ResetConditions(!0);
	}
	Clear() {
		this.iie &&
			(this.$te?.RemoveListeners(this.iie, this.oie), (this.iie = void 0)),
			this.sie &&
				(this.$te?.RemoveListeners(this.sie, this.aie), (this.sie = void 0)),
			(this.Qte = void 0),
			this.EventBinder &&
				(this.EventBinder.Callback.Clear(), (this.EventBinder = void 0)),
			(this.Xte = void 0),
			(this.$te = void 0),
			this.Yte.clear(),
			this.Jte.clear(),
			this.zte.clear(),
			(this.Zte = 0),
			(this.eie = 0),
			this.tie.forEach((t) => {
				t.EndTask();
			}),
			this.tie.splice(0, this.tie.length);
	}
	rie() {
		++this.Zte,
			0 === this.Qte.Logic
				? this.Zte === this.eie && this.EventBinder.Callback.Broadcast(!0)
				: 1 === this.Zte && this.EventBinder.Callback.Broadcast(!0);
	}
	nie() {
		--this.Zte,
			0 === this.Qte.Logic
				? this.Zte === this.eie - 1 && this.EventBinder.Callback.Broadcast(!1)
				: 0 === this.Zte && this.EventBinder.Callback.Broadcast(!1);
	}
	ResetConditions(t = !1) {
		if (((this.Zte = 0), this.Xte))
			for (var [e, i] of this.Qte.Tags)
				i.InRange(this.Xte.GetTagCountById(e)) && (this.Yte.add(e), ++this.Zte);
		if (this.$te) {
			for (var [s, n] of this.Qte.Attributes) {
				var r = this.$te.GetCurrentValue(s);
				n.InRange(r) && (this.Jte.add(s), ++this.Zte);
			}
			let t = 0;
			for (const e of this.Qte.AttributeRates) {
				var a = this.$te.GetCurrentValue(e.Numerator),
					o = this.$te.GetCurrentValue(e.Denominator);
				0 !== o && e.Range.InRange(a / o) && (this.zte.add(t), ++this.Zte), ++t;
			}
		}
		if (0 === this.Qte.Logic) {
			if (this.Zte === this.eie)
				return void this.EventBinder.Callback.Broadcast(!0);
		} else if (0 < this.Zte)
			return void this.EventBinder.Callback.Broadcast(!0);
		t || this.EventBinder.Callback.Broadcast(!1);
	}
}
class AiConditionEvents {
	constructor(t) {
		(this.Bte = t),
			(this.lie = new Array()),
			(this._ie = new Map()),
			(this.uie = (t) => {
				var e = t.GetComponent(1);
				if (e?.Valid) {
					var i,
						s,
						n = Vector_1.Vector.DistSquared(
							this.Bte.CharActorComp.ActorLocationProxy,
							e.ActorLocationProxy,
						);
					for ([i, s] of this._ie) n < s && i.Callback.Broadcast(e.Owner, !0);
				}
			});
	}
	AddConditionEvent(t, e) {
		var i = new ConditionEventPair();
		i.InitConditions(t, e, this.Bte.CharActorComp), this.lie.push(i);
	}
	RemoveConditionEvent(t) {
		let e = 0;
		for (const i of this.lie) {
			if (i.EventBinder === t) {
				i.Clear();
				break;
			}
			++e;
		}
		return e < this.lie.length && (this.lie.splice(e), !0);
	}
	AddSceneItemDestroyEvent(t, e) {
		0 === this._ie.size &&
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSceneItemDestroy,
				this.uie,
			),
			this._ie.set(e, t * t);
	}
	RemoveSceneItemDestroyEvent(t) {
		this._ie.delete(t) &&
			0 === this._ie.size &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSceneItemDestroy,
				this.uie,
			);
	}
	Clear() {
		this.lie.forEach((t, e, i) => {
			t.Clear();
		}),
			this.lie.splice(0, this.lie.length),
			0 < this._ie.size &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnSceneItemDestroy,
					this.uie,
				),
			this._ie.clear();
	}
	ResetAllConditionEvent() {
		for (const t of this.lie) t.ResetConditions();
	}
}
exports.AiConditionEvents = AiConditionEvents;
