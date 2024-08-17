"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageAmplifyOnBeHit =
		exports.DamageAmplifyOnHit =
		exports.ShieldSnapshotModify =
		exports.CommonSnapshotModify =
		exports.SnapModifier =
			void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapModifier {
	static WQo(t, e, i) {
		var r = new Map(),
			a = new Map(),
			s = e.Attacker.OwnerBuffComponent.BuffEffectManager,
			o = e.Target.OwnerBuffComponent.BuffEffectManager;
		for (const [n, h, u] of [
			[r, 0, s],
			[a, 1, s],
			[r, 2, o],
			[a, 3, o],
		]) {
			var f = u.FilterById(
				[1, 46],
				(t) => t.TargetType === h && t.NeedCheckCritical === i,
			);
			this.KQo(t, e, n, f, h);
		}
		this.QQo(r, e.AttackerSnapshot), this.QQo(a, e.TargetSnapshot);
	}
	static PreCriticalModify(t, e) {
		this.WQo(t, e, !1);
	}
	static PostCriticalModify(t, e) {
		this.WQo(t, e, !0);
	}
	static KQo(t, e, i, r, a) {
		let s;
		switch (a) {
			case 0:
			case 2:
				s = e.Target.OwnerBuffComponent;
				break;
			case 3:
			case 1:
				s = e.Attacker.OwnerBuffComponent;
		}
		for (const a of r) a.TryExecute(t, s, i, e);
	}
	static QQo(t, e) {
		for (var [i, r] of t.entries()) {
			var i = CharacterAttributeTypes_1.EAttributeId[i],
				a = e.BaseValues[i],
				r = e.CurrentValues[i] + r;
			(e.BaseValues[i] = a), (e.CurrentValues[i] = r);
		}
	}
}
exports.SnapModifier = SnapModifier;
class SnapModifyBuffEffect extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.TargetType = void 0),
			(this.NeedCheckCritical = !1);
	}
	CheckAuthority() {
		return !1;
	}
	GetAttrValue(t, e, i, r) {
		return (t = this.XQo(t, r))
			? 0 === i
				? t.GetBaseValue(e)
				: t.GetCurrentValue(e)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Battle",
						62,
						"[SnapModifier] Get attributeSet failed.",
					),
				0);
	}
	XQo(t, e) {
		switch (e) {
			case 1:
				return this.OwnerEntity?.CheckGetComponent(156);
			case 0:
				return this.InstigatorEntity?.Entity?.CheckGetComponent(156);
			case 2:
				return t.AttackerSnapshot;
			case 3:
				return t.TargetSnapshot;
			default:
				return;
		}
	}
}
class CommonSnapshotModify extends SnapModifyBuffEffect {
	constructor() {
		super(...arguments),
			(this.AttrId =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.CalculationPolicy = 0),
			(this.RefAttrId =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.RefValueType = 0),
			(this.StackType = 0),
			(this.RefTargetType = 2),
			(this.RefParam1 = 0),
			(this.RefParam2 = 0);
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters,
			i = t.ExtraEffectGrowParameters1,
			r = ((t = t.ExtraEffectGrowParameters2), this.Level);
		(this.TargetType = Number(e[0])),
			(this.AttrId = Number(e[1])),
			(this.CalculationPolicy = Number(e[2])),
			(this.RefAttrId = Number(e[3])),
			1 === this.CalculationPolicy && (this.RefAttrId = this.AttrId),
			(this.RefTargetType = Number(e[4])),
			(this.RefValueType = Number(e[5])),
			(this.StackType = Number(e[6] ?? 0)),
			(this.RefParam1 = AbilityUtils_1.AbilityUtils.GetLevelValue(i, r, 0)),
			(this.RefParam2 = AbilityUtils_1.AbilityUtils.GetLevelValue(t, r, 0)),
			(this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(
				(t) => 6 === t.Type,
			));
	}
	OnExecute(t, e) {
		if (void 0 === t)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Battle",
					20,
					"[SnapModifier] Modify without resultMap.",
				);
		else {
			var i = this.AttrId,
				r = t.get(i) ?? 0,
				a = this.Buff?.StackCount ?? 1,
				s = 1 === this.StackType ? this.RefParam1 * a : this.RefParam1,
				o = this.RefParam2;
			let n = 0;
			switch (this.CalculationPolicy) {
				case 0:
					n = s;
					break;
				case 1:
					var f = s * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
					n =
						this.GetAttrValue(
							e,
							this.RefAttrId,
							this.RefValueType,
							this.RefTargetType,
						) * f;
					break;
				case 2:
					(f = s * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
						(n =
							this.GetAttrValue(
								e,
								this.RefAttrId,
								this.RefValueType,
								this.RefTargetType,
							) *
								f +
							o);
			}
			t.set(i, r + n);
		}
	}
}
exports.CommonSnapshotModify = CommonSnapshotModify;
class ShieldSnapshotModify extends SnapModifyBuffEffect {
	constructor() {
		super(...arguments),
			(this.BuffHolderType = void 0),
			(this.ShieldId = 0),
			(this.AttributeId = 0),
			(this.CompareFactor = 0),
			(this.ConvertThreshold = 0),
			(this.ConvertLimit = 0),
			(this.ConvertMagnitude = 0),
			(this.ConvertRatio = 0);
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters,
			i = t.ExtraEffectGrowParameters1;
		t = t.ExtraEffectGrowParameters2;
		(this.TargetType = Number(e[0])),
			(this.BuffHolderType = Number(e[1])),
			(this.ShieldId = Number(e[2])),
			(this.AttributeId = Number(e[3])),
			(this.CompareFactor = Number(e[4])),
			(this.ConvertThreshold = Number(e[5])),
			(this.ConvertLimit = Number(e[6])),
			(this.ConvertMagnitude = AbilityUtils_1.AbilityUtils.GetLevelValue(
				i,
				this.Level,
				0,
			)),
			(this.ConvertRatio = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t,
				this.Level,
				0,
			)),
			(this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(
				(t) => 6 === t.Type,
			));
	}
	OnExecute(t, e) {
		var i = t.get(this.AttributeId) ?? 0;
		if (
			(a = this.BuffHolderType
				? this.InstigatorEntity?.Entity
				: this.OwnerEntity)
		) {
			var r, a;
			let s =
					(a = a.CheckGetComponent(64)?.GetShieldValue(this.ShieldId) ?? 0) >=
					this.ConvertThreshold,
				o = a;
			0 < this.ConvertLimit && (o = Math.min(o, this.ConvertLimit)),
				0 < this.CompareFactor &&
					((r = 0 === this.BuffHolderType ? 1 : 0),
					(s =
						a >=
						(e = this.GetAttrValue(e, this.CompareFactor, 1, r)) *
							this.ConvertThreshold *
							CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
					0 < this.ConvertLimit) &&
					(o = Math.min(
						a,
						e *
							this.ConvertLimit *
							CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
					)),
				s &&
					((r =
						o *
							this.ConvertRatio *
							CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
						this.ConvertMagnitude),
					t.set(this.AttributeId, i + r));
		}
	}
}
exports.ShieldSnapshotModify = ShieldSnapshotModify;
class DamageAmplifyOnHit extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.Value = -0);
	}
	InitParameters(t) {
		this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(
			t.ExtraEffectGrowParameters1,
			this.Level,
			0,
		);
	}
	OnExecute() {
		return this.Value * (this.Buff?.StackCount ?? 1);
	}
	static ApplyEffects(t, e) {
		var i = e.Attacker.OwnerBuffComponent,
			r = e.Target.OwnerBuffComponent;
		let a = 0;
		for (const e of i.BuffEffectManager.FilterById(37))
			e.Check(t, r) && (a += e.Execute());
		return a;
	}
}
(exports.DamageAmplifyOnHit = DamageAmplifyOnHit).TempModifiedResult = 0;
class DamageAmplifyOnBeHit extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.Value = -0);
	}
	InitParameters(t) {
		this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(
			t.ExtraEffectGrowParameters1,
			this.Level,
			0,
		);
	}
	OnExecute() {
		return this.Value * (this.Buff?.StackCount ?? 1);
	}
	static ApplyEffects(t, e) {
		var i = e.Attacker.OwnerBuffComponent;
		let r = 0;
		for (const a of e.Target.OwnerBuffComponent.BuffEffectManager.FilterById(
			38,
		))
			a.Check(t, i) && (r += a.Execute());
		return r;
	}
}
(exports.DamageAmplifyOnBeHit = DamageAmplifyOnBeHit).TempModifiedResult = 0;
