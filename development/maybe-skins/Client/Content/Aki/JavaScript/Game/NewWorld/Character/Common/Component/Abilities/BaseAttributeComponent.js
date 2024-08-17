"use strict";
var BaseAttributeComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, r, a) {
			var s,
				o = arguments.length,
				i =
					o < 3
						? t
						: null === a
							? (a = Object.getOwnPropertyDescriptor(t, r))
							: a;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(e, t, r, a);
			else
				for (var n = e.length - 1; 0 <= n; n--)
					(s = e[n]) &&
						(i = (o < 3 ? s(i) : 3 < o ? s(t, r, i) : s(t, r)) || i);
			return 3 < o && i && Object.defineProperty(t, r, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseAttributeComponent = exports.AttributeSnapshot = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	StatDefine_1 = require("../../../../../Common/StatDefine"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	AbilityUtils_1 = require("./AbilityUtils"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
class AttributeSnapshot {
	constructor() {
		(this.BaseValues = {}), (this.CurrentValues = {});
	}
	GetBaseValue(e) {
		return this.BaseValues[CharacterAttributeTypes_1.EAttributeId[e]];
	}
	GetCurrentValue(e) {
		return this.CurrentValues[CharacterAttributeTypes_1.EAttributeId[e]];
	}
}
exports.AttributeSnapshot = AttributeSnapshot;
let BaseAttributeComponent = (BaseAttributeComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.BaseValues = new Array()),
			(this.CurrentValues = new Array()),
			(this.ModifierLists = new Array()),
			(this.BoundsLockerMap = new Map()),
			(this.BaseValueListenerMap = new Map()),
			(this.CurrentValueListenerMap = new Map()),
			(this.AnyBaseValueListenerSet = new Set()),
			(this.AnyCurrentValueListenerSet = new Set());
	}
	OnCreate() {
		this.BaseValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		for (let e = 0; e < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++e)
			this.BaseValues[e] = 0;
		this.CurrentValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		for (let e = 0; e < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++e)
			this.CurrentValues[e] = 0;
		this.ModifierLists = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
		for (let e = 0; e < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++e)
			this.ModifierLists[e] = new Map();
		return !0;
	}
	OnTick(e) {
		this.AutoRecoverAttr(e);
	}
	SetBaseValue(e, t) {
		let r = t;
		var a, s;
		(t =
			(void 0 !== (t = this.Gbr(e)) && (r = this.Nbr(e, r, t)),
			CharacterAttributeTypes_1.attrsNotClampZero.includes(e) ||
				(r = Math.max(r, 0)),
			(r = Math.floor(r)),
			this.BaseValues[e])) !== r &&
			((this.BaseValues[e] = r),
			(a = this.CurrentValues[e]),
			this.UpdateCurrentValue(e),
			(s = this.CurrentValues[e]),
			this.DispatchBaseValueEvent(e, r, t),
			this.DispatchCurrentValueEvent(e, s, a));
	}
	AddBaseValue(e, t) {
		this.SetBaseValue(e, this.BaseValues[e] + t);
	}
	GetBaseValue(e) {
		return this.BaseValues[e];
	}
	GetCurrentValue(e) {
		return this.CurrentValues[e];
	}
	Gbr(e) {
		var t = CharacterAttributeTypes_1.attrsBaseValueClamp.get(e);
		return (
			t ||
			((t = CharacterAttributeTypes_1.attrsBaseValueClampMax.get(e))
				? this.GetCurrentValue(t)
				: void 0)
		);
	}
	SyncValueFromServer(e, t, r) {
		var a = this.BaseValues[e],
			s = (a !== t && (this.BaseValues[e] = t), this.CurrentValues[e]);
		(this.CurrentValues[e] = r),
			this.DispatchBaseValueEvent(e, t, a),
			this.DispatchCurrentValueEvent(e, r, s);
	}
	UpdateCurrentValue(e) {
		let t = this.Obr(e);
		var r;
		(r =
			((r = CharacterAttributeTypes_1.attrsCurrentValueClamp.get(e)) &&
				(t = Math.min(t, r)),
			CharacterAttributeTypes_1.attrsNotClampZero.includes(e) ||
				(t = Math.max(t, 0)),
			this.CurrentValues[e])) !== t && (this.CurrentValues[e] = t);
	}
	TakeSnapshot() {
		var e = new AttributeSnapshot();
		for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
			var t = CharacterAttributeTypes_1.EAttributeId[r];
			t &&
				((e.BaseValues[t] = this.BaseValues[r] ?? 0),
				(e.CurrentValues[t] = this.CurrentValues[r] ?? 0));
		}
		return e;
	}
	AddModifier(e, t) {
		var r, a;
		return e <=
			CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None ||
			e >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
			? -1
			: ((r = BaseAttributeComponent_1.ModifierHandleGenerator++),
				(this.ModifierLists[e] = this.ModifierLists[e] ?? new Map()),
				this.ModifierLists[e].set(r, t),
				(t = this.CurrentValues[e]),
				this.UpdateCurrentValue(e),
				(a = this.CurrentValues[e]),
				this.DispatchCurrentValueEvent(e, a, t),
				r);
	}
	RemoveModifier(e, t) {
		var r;
		this.ModifierLists[e]?.delete(t) &&
			((t = this.CurrentValues[e]),
			this.UpdateCurrentValue(e),
			(r = this.CurrentValues[e]),
			this.DispatchCurrentValueEvent(e, r, t));
	}
	*GetAllModifiers(e) {
		if (this.ModifierLists[e])
			for (const t of this.ModifierLists[e].values()) yield t;
	}
	Obr(e) {
		var t = this.BaseValues[e];
		if (!this.ModifierLists[e]) return t;
		let r = 0,
			a = 0,
			s = 1;
		var o = this.CheckIfNeedAdvanceMultiply(e);
		for (const t of this.GetAllModifiers(e)) {
			let e = 0;
			switch (t.Type) {
				case 0:
					e = t.Value1;
					break;
				case 1:
					a += t.Value1;
					break;
				case 2:
				case 4: {
					let r = t.SnapshotSource;
					void 0 === r &&
						(r = AbilityUtils_1.AbilityUtils.GetAttrValue(
							0 === t.SourceEntity
								? this
								: ModelManager_1.ModelManager.CreatureModel.GetEntity(
										t.SourceEntity,
									)?.Entity?.GetComponent(156),
							t.SourceAttributeId,
							t.SourceCalculationType,
						));
					var i = t.Min;
					if (i && (r -= i) <= 0) break;
					if (
						((i = t.Ratio) && (r /= i),
						(e =
							r * t.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
							t.Value2),
						(i = t.Max) && e > i && (e = i),
						4 === t.Type)
					)
						return e;
					break;
				}
				case 3:
					return t.Value1;
				case 9:
					s *= t.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
			}
			0 !== e &&
				(o
					? (s *= e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1)
					: (r += e));
		}
		return Math.floor(
			(t * (a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1) + r) * s,
		);
	}
	SyncRecoverPropFromServer(e, t, r, a, s) {
		var o = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(e),
			i = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(e);
		o && i
			? (this.SyncValueFromServer(o, a, a),
				this.SyncValueFromServer(i, r, r),
				(o = t + a * s * CommonDefine_1.SECOND_PER_MILLIONSECOND),
				this.SyncValueFromServer(e, o, o))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 36, "自动属性未注册", ["属性", e]);
	}
	AutoRecoverAttr(e) {
		for (var [
			t,
			r,
		] of CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.entries())
			0 !== (r = this.GetCurrentValue(r)) &&
				this.AddBaseValue(t, r * e * CommonDefine_1.SECOND_PER_MILLIONSECOND);
	}
	AddBoundsLocker(e, t, r) {
		let a = this.BoundsLockerMap.get(e);
		return (
			a || this.BoundsLockerMap.set(e, (a = new Map())),
			a.has(r)
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						23,
						"重复添加属性BoundsLock",
						["attrId", e],
						["handle", r],
					)
				: (a.set(r, t), this.SetBaseValue(e, this.BaseValues[e])),
			r
		);
	}
	RemoveBoundsLocker(e, t) {
		var r = this.BoundsLockerMap.get(e);
		return (
			!!r && !!r.delete(t) && (this.SetBaseValue(e, this.BaseValues[e]), !0)
		);
	}
	*GetAllBoundsLocker(e) {
		if ((e = this.BoundsLockerMap.get(e))) for (const t of e.values()) yield t;
	}
	Nbr(e, t, r) {
		let a,
			s = t,
			o = r;
		for (const t of this.GetAllBoundsLocker(e)) {
			var i;
			t.LockLowerBounds &&
				((i = t.LowerPercent * r + t.LowerOffset), (a = Math.max(a ?? i, i))),
				t.LockUpperBounds &&
					((i = t.UpperPercent * r + t.UpperOffset), (o = Math.min(o ?? i, i)));
		}
		return (
			void 0 !== o && (s = Math.min(o, s)), void 0 !== a ? Math.max(a, s) : s
		);
	}
	AddIntervalLock(e, t, r, a, s) {
		var o;
		r !== CharacterAttributeTypes_1.EAttributeId.Proto_Life &&
			((a = {
				LockUpperBounds: !(o = {
					LockUpperBounds: !0,
					LockLowerBounds: !1,
					UpperPercent: a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
					UpperOffset: s,
					LowerPercent: 0,
					LowerOffset: 0,
				}),
				LockLowerBounds: !0,
				UpperPercent: 1,
				UpperOffset: 0,
				LowerPercent: a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
				LowerOffset: s,
			}),
			this.AddBoundsLocker(r, 0 === e ? o : a, t));
	}
	RemoveIntervalLock(e, t, r) {
		this.RemoveBoundsLocker(r, t);
	}
	AddStateAttributeLock(e, t, r, a) {
		(r = {
			LockUpperBounds: !0,
			LockLowerBounds: !0,
			UpperPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
			UpperOffset: a,
			LowerPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
			LowerOffset: a,
		}),
			this.AddBoundsLocker(t, r, e);
	}
	RemoveStateAttributeLock(e, t) {
		this.RemoveBoundsLocker(t, e);
	}
	AddListener(e, t, r) {
		var a = this.CurrentValueListenerMap.get(e);
		a
			? a.add(t)
			: ((a = new Set()).add(t), this.CurrentValueListenerMap.set(e, a));
	}
	AddListeners(e, t, r) {
		e.forEach((e) => {
			this.AddListener(e, t, r);
		});
	}
	RemoveListener(e, t) {
		return !!(e = this.CurrentValueListenerMap.get(e)) && (e.delete(t), !0);
	}
	RemoveListeners(e, t) {
		e.forEach((e) => {
			this.RemoveListener(e, t);
		});
	}
	AddGeneralListener(e) {
		this.AnyCurrentValueListenerSet.add(e);
	}
	RemoveGeneralListener(e) {
		this.AnyCurrentValueListenerSet.delete(e);
	}
	DispatchBaseValueEvent(e, t, r) {
		if (r !== t) {
			var a = this.BaseValueListenerMap.get(e);
			if (a) {
				BaseAttributeComponent_1.kbr.get(e) ||
					BaseAttributeComponent_1.kbr.set(e, void 0);
				for (const s of a)
					try {
						s(e, t, r);
					} catch (t) {
						CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
							"Attribute",
							this.Entity,
							"属性回调异常",
							t,
							["属性", e],
						);
					}
			}
			for (const a of this.AnyBaseValueListenerSet)
				try {
					a(e, t, r);
				} catch (t) {
					CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
						"Attribute",
						this.Entity,
						"全局属性回调异常",
						t,
						["属性", e],
					);
				}
		}
	}
	DispatchCurrentValueEvent(e, t, r) {
		if (r !== t) {
			var a = this.CurrentValueListenerMap.get(e);
			if (a) {
				BaseAttributeComponent_1.Vbr.get(e) ||
					BaseAttributeComponent_1.Vbr.set(e, void 0);
				for (const s of a)
					try {
						s(e, t, r);
					} catch (t) {
						CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
							"Attribute",
							this.Entity,
							"属性回调异常",
							t,
							["属性", e],
						);
					}
			}
			for (const a of this.AnyCurrentValueListenerSet)
				try {
					a(e, t, r);
				} catch (t) {
					CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
						"Attribute",
						this.Entity,
						"全局属性回调异常",
						t,
						["属性", e],
					);
				}
		}
	}
	CheckIfNeedAdvanceMultiply(e) {
		switch (e) {
			case CharacterAttributeTypes_1.EAttributeId.Proto_CdReduse:
			case CharacterAttributeTypes_1.EAttributeId.Proto_ToughChange:
			case CharacterAttributeTypes_1.EAttributeId.Proto_SkillToughRatio:
			case CharacterAttributeTypes_1.EAttributeId.R4n:
			case CharacterAttributeTypes_1.EAttributeId.Proto_AutoAttackSpeed:
			case CharacterAttributeTypes_1.EAttributeId.Proto_CastAttackSpeed:
				return !0;
			default:
				return !1;
		}
	}
	GetLockDebugString() {
		let e = "";
		return (
			this.BoundsLockerMap.forEach((t, r) => {
				t.forEach((t, a) => {
					t.LockLowerBounds &&
						(e += `属性:${r} 下限:${100 * t.LowerPercent}%+${t.LowerOffset} handle:${a}\n`),
						t.LockUpperBounds &&
							(e += `属性:${r} 上限:${100 * t.UpperPercent}%+${t.UpperOffset} handle:${a}\n`);
				});
			}),
			e
		);
	}
});
(BaseAttributeComponent.ModifierHandleGenerator = 100),
	(BaseAttributeComponent.kbr = new Map()),
	(BaseAttributeComponent.Fbr = void 0),
	(BaseAttributeComponent.Vbr = new Map()),
	(BaseAttributeComponent.Hbr = void 0),
	(BaseAttributeComponent = BaseAttributeComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(155)],
			BaseAttributeComponent,
		)),
	(exports.BaseAttributeComponent = BaseAttributeComponent);
