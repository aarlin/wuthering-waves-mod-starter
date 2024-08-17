"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, f, a) {
		var r,
			o = arguments.length,
			n =
				o < 3
					? t
					: null === a
						? (a = Object.getOwnPropertyDescriptor(t, f))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(e, t, f, a);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (n = (o < 3 ? r(n) : 3 < o ? r(t, f, n) : r(t, f)) || n);
		return 3 < o && n && Object.defineProperty(t, f, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerExtraEffectManager =
		exports.ExtraEffectManager =
		exports.BaseExtraEffectManager =
			void 0);
const Stats_1 = require("../../../../../../../Core/Common/Stats"),
	CombatDebugController_1 = require("../../../../../../Utils/CombatDebugController"),
	ExtraEffectLibrary_1 = require("./ExtraEffectLibrary");
class BaseExtraEffectManager {
	constructor(e) {
		(this.BuffComponent = e),
			(this.EffectHolder = new Map()),
			(this.ActivatedHandles = new Set());
	}
	static IsInitExecution(e) {
		return 24 === e;
	}
	static IsPeriodExecution(e) {
		switch (e) {
			case 28:
			case 29:
			case 34:
			case 26:
			case 4:
			case 5:
			case 30:
			case 13:
			case 101:
			case 102:
				return !0;
			default:
				return !1;
		}
	}
	OnBuffAdded(e) {
		var t;
		this.TQo(e) &&
			((t = e?.Config)
				? t.HasBuffEffect && e.IsActive() && this.CreateBuffEffects(e)
				: CombatDebugController_1.CombatDebugController.CombatError(
						"Buff",
						this.BuffComponent?.Entity,
						"正在添加的buff额外效果未加载对应的buffRef",
						["buffId", e?.Id],
						["handle", e?.Handle],
						["持有者", e?.GetOwnerDebugName()],
					));
	}
	OnBuffRemoved(e, t) {
		var f = e.Handle;
		this.TQo(e) && e.IsActive() && this.RemoveBuffEffects(f, t);
	}
	OnStackIncreased(e, t, f, a) {
		if (this.TQo(e))
			for (const r of this.GetEffectsByHandle(e.Handle))
				r.OnStackIncreased(t, f, a);
	}
	OnStackDecreased(e, t, f, a) {
		if (this.TQo(e))
			for (const r of this.GetEffectsByHandle(e.Handle))
				r.OnStackDecreased(t, f, a);
	}
	OnBuffInhibitedChanged(e, t) {
		var f = e.Handle;
		this.TQo(e) &&
			(t ? this.RemoveBuffEffects(f, !0) : this.CreateBuffEffects(e));
	}
	TQo(e) {
		var t = e?.Config;
		return t
			? !!t.HasBuffEffect
			: (CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.BuffComponent?.Entity,
					"处理buff额外效果逻辑时找不到对应的buffRef",
					["buffId", e?.Id],
					["handleId", e?.Handle],
					["持有者", e?.GetOwnerDebugName()],
				),
				!1);
	}
	CreateBuffEffects(e) {
		var t = e.Handle;
		const f = e.Id;
		if (this.ActivatedHandles.has(t))
			CombatDebugController_1.CombatDebugController.CombatError(
				"Buff",
				this.BuffComponent?.Entity,
				"重复创建Buff额外效果",
				["buffId", f],
				["handle", t],
			);
		else {
			var a = e.GetInstigatorBuffComponent(),
				r =
					(this.ActivatedHandles.add(t),
					e.Config.EffectInfos?.map((t) => [
						t,
						ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
							f,
							t,
							e.Level,
						),
					])),
				o = this.BuffComponent;
			if (r && o?.Valid)
				for (let e = 0; e < r.length; e++) {
					var n = r[e][0],
						s = r[e][1],
						c = n.ExtraEffectId;
					ExtraEffectManager.IsInitExecution(c) ||
						ExtraEffectManager.IsPeriodExecution(c) ||
						((c = require("./ExtraEffectDefine")?.getBuffEffectClass(c)) &&
							((c = c.Create(t, e, s, this.BuffComponent, a, n)),
							this.qp(c),
							c.OnCreated()));
				}
		}
	}
	RemoveBuffEffects(e, t) {
		this.ActivatedHandles.has(e) ||
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Buff",
				this.BuffComponent?.Entity,
				"尝试移除不存在的buff额外效果实例",
				["handleId", e],
				["entity", this.BuffComponent?.Entity?.Id],
			),
			this.ActivatedHandles.delete(e);
		for (const f of this.GetEffectsByHandle(e)) f.OnRemoved(t);
		this.EffectHolder.delete(e);
	}
	ApplyPeriodBuffExecution(e) {
		for (const t of e.Config.EffectInfos)
			ExtraEffectManager.IsPeriodExecution(t.ExtraEffectId) &&
				t.ExecutionEffect?.TryExecute(e);
	}
	ApplyInitBuffExecution(e, t) {
		for (const f of e.Config.EffectInfos)
			ExtraEffectManager.IsInitExecution(f.ExtraEffectId) &&
				f.ExecutionEffect?.TryExecute(e, t);
	}
	qp(e) {
		var t,
			f = e.ActiveHandleId;
		f < 0
			? CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					this.BuffComponent?.Entity,
					"invalid handleId when trying to add effect in holder.",
					["handle", f],
				)
			: (this.EffectHolder.has(f) || this.EffectHolder.set(f, []),
				(t = this.EffectHolder.get(f)).some((t) => t === e)
					? CombatDebugController_1.CombatDebugController.CombatWarn(
							"Buff",
							this.BuffComponent?.Entity,
							"duplicated handle when trying to add ExtraEffect.",
							["handle", f],
						)
					: t.push(e));
	}
	Clear() {
		this.EffectHolder.clear(), this.ActivatedHandles.clear();
	}
	*FilterById(e, t) {
		var f = [];
		if (e instanceof Array)
			for (const t of e) {
				var a = require("./ExtraEffectDefine")?.getBuffEffectClass(t);
				a && f.push(a);
			}
		else
			(e = require("./ExtraEffectDefine")?.getBuffEffectClass(e)),
				e && f.push(e);
		if (0 <= f.length)
			for (const e of this.EffectHolder.values())
				if (e)
					for (const a of e)
						for (const e of f)
							if (a instanceof e && (!t || t(a))) {
								yield a;
								break;
							}
	}
	*GetAllEffects() {
		for (const e of this.EffectHolder.values())
			if (e) for (const t of e) yield t;
	}
	GetEffectsByHandle(e) {
		return this.EffectHolder.get(e)?.values() ?? [];
	}
}
__decorate(
	[(0, Stats_1.statDecorator)("BuffEffect.CreateBuffEffects")],
	BaseExtraEffectManager.prototype,
	"CreateBuffEffects",
	null,
),
	__decorate(
		[(0, Stats_1.statDecorator)("BuffEffect.RemoveBuffEffects")],
		BaseExtraEffectManager.prototype,
		"RemoveBuffEffects",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("BuffEffect.ApplyPeriodBuffExecution")],
		BaseExtraEffectManager.prototype,
		"ApplyPeriodBuffExecution",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("BuffEffect.ApplyInitBuffExecution")],
		BaseExtraEffectManager.prototype,
		"ApplyInitBuffExecution",
		null,
	);
class ExtraEffectManager extends (exports.BaseExtraEffectManager =
	BaseExtraEffectManager) {}
exports.ExtraEffectManager = ExtraEffectManager;
class PlayerExtraEffectManager extends BaseExtraEffectManager {}
exports.PlayerExtraEffectManager = PlayerExtraEffectManager;
