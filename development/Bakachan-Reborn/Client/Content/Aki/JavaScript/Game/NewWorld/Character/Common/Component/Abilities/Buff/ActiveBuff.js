"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, i, o) {
		var r,
			s = arguments.length,
			a =
				s < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, i))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, i, o);
		else
			for (var n = t.length - 1; 0 <= n; n--)
				(r = t[n]) && (a = (s < 3 ? r(a) : 3 < s ? r(e, i, a) : r(e, i)) || a);
		return 3 < s && a && Object.defineProperty(e, i, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActiveBuffInternal = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../../Core/Common/Stats"),
	Time_1 = require("../../../../../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ActiveBuffConfigs_1 = require("./ActiveBuffConfigs"),
	MAX_POOL_COUNT = 100;
class ActiveBuffInternal {
	constructor(t) {
		(this.TAe = t),
			(this.rKo = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE),
			(this.PreMessageId = void 0),
			(this.MessageId = -1n),
			(this.nKo = ""),
			(this.sKo = void 0),
			(this.InstigatorIdInternal = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
			(this.aKo = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID),
			(this.DurationTimer = void 0),
			(this.LVo = 1),
			(this.hKo = void 0),
			(this.CB = 0),
			(this.lKo = 0),
			(this._Ko = 1),
			(this.uKo = !1),
			(this.cKo = 0),
			(this.mKo = 0),
			(this.PeriodInternal = 0),
			(this.dKo = void 0),
			(this.CKo = void 0),
			(this.gKo = !1),
			(this.StackCountInternal = 0),
			(this.jqi = 0),
			(this.fKo = []),
			(this.StateModifiers = []);
	}
	static AllocBuff(...t) {
		let e = this.BuffPool.pop();
		return (e = e || new ActiveBuffInternal(t[0])).AU(...t), e;
	}
	static ReleaseBuff(t) {
		t?.IsValid() && t.Destroy(),
			t && this.BuffPool.length < 100 && this.BuffPool.push(t);
	}
	AU(t, e, i, o, r, s, a, n, h, l) {
		if (
			((this.TAe = t),
			(this.rKo = e),
			(this.InstigatorIdInternal = i ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
			(this.sKo = o),
			(this.nKo = o?.GetDebugName() ?? "unknown"),
			(this.aKo = r),
			(this.MessageId =
				a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
			(this.PreMessageId = s),
			(this.jqi = n),
			(this.StackCountInternal = h),
			(this.gKo = !1),
			(this.uKo = !1),
			this.SetDuration(l),
			this.SetPeriod(t.Period),
			this.IsInstantBuff())
		)
			for (const t of this.Config.Modifiers) {
				var f = t.AttributeId;
				CharacterAttributeTypes_1.stateAttributeIds.has(f)
					? this.SetStateModifier(t)
					: this.SetNonStateModifier(t);
			}
		else this.ResetModifiers();
		return this;
	}
	Destroy() {
		if (this.IsActive()) {
			const t = this.GetOwnerBuffComponent()
				?.GetExactEntity()
				?.CheckGetComponent(185);
			t?.Valid &&
				this.Config.GrantedTags?.forEach((e) => {
					t.TagContainer.UpdateExactTag(2, e, -this.StackCount);
				});
		}
		(this.uKo = !0),
			this.pKo(),
			this.vKo(),
			this.ClearModifiers(),
			(this.StackCountInternal = 0);
	}
	IsValid() {
		return (
			!this.uKo && (this.GetOwnerBuffComponent()?.GetExactEntity()?.Valid ?? !1)
		);
	}
	get Config() {
		return this.TAe;
	}
	get Handle() {
		return this.rKo;
	}
	GetOwner() {
		return this.sKo?.Entity;
	}
	GetOwnerDebugName() {
		return this.nKo;
	}
	GetOwnerBuffComponent() {
		return this.sKo;
	}
	get InstigatorId() {
		return this.InstigatorIdInternal;
	}
	GetInstigator() {
		return this.InstigatorId
			? ModelManager_1.ModelManager.CreatureModel.GetEntity(this.InstigatorId)
					?.Entity
			: void 0;
	}
	GetInstigatorBuffComponent() {
		if (this.InstigatorId)
			return ModelManager_1.ModelManager.CreatureModel.GetEntity(
				this.InstigatorId,
			)?.Entity?.GetComponent(157);
	}
	GetInstigatorActorComponent() {
		if (this.InstigatorId)
			return ModelManager_1.ModelManager.CreatureModel.GetEntity(
				this.InstigatorId,
			)?.Entity?.GetComponent(3);
	}
	GetInstigatorAttributeSet() {
		if (this.InstigatorId)
			return ModelManager_1.ModelManager.CreatureModel.GetEntity(
				this.InstigatorId,
			)?.Entity?.GetComponent(156);
	}
	GetOwnerAttributeSet() {
		return this.sKo?.GetEntity()?.GetComponent(156);
	}
	get Id() {
		return this.Config.Id;
	}
	get ServerId() {
		return this.aKo;
	}
	IsInstantBuff() {
		return 0 === this.Config.DurationPolicy;
	}
	get Duration() {
		return this.LVo;
	}
	pKo() {
		void 0 !== this.DurationTimer &&
			(TimerSystem_1.TimerSystem.Has(this.DurationTimer) &&
				TimerSystem_1.TimerSystem.Remove(this.DurationTimer),
			(this.DurationTimer = void 0));
	}
	MKo(t) {
		var e;
		this.pKo(),
			this.LVo <= 0 ||
				((this.lKo = t),
				(this.CB = this.GetCurrentTime()),
				0 <= this._Ko &&
					((t =
						(this.lKo / this._Ko) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
					(e = this.hKo),
					(this.DurationTimer =
						t >= TimerSystem_1.MIN_TIME
							? TimerSystem_1.TimerSystem.Delay(
									this.DurationCallback.bind(this),
									t,
									e,
									void 0,
									!1,
								)
							: TimerSystem_1.TimerSystem.Next(
									this.DurationCallback.bind(this),
									e,
								))));
	}
	GetCurrentTime() {
		return Time_1.Time.WorldTime;
	}
	SetDuration(t = void 0) {
		var e,
			i,
			o,
			r = this.Config;
		let s = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
		(s =
			1 === r.DurationPolicy
				? -1
				: void 0 !== t
					? t
					: 0 === r.DurationMagnitude.length ||
							0 === r.DurationCalculationPolicy.length
						? (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Character",
									20,
									"Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 强制将时间设为" +
										ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
									["BuffId", this.Id],
								),
							ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
						: ((t = AbilityUtils_1.AbilityUtils.GetLevelValue(
								this.Config.DurationMagnitude,
								this.Level,
								0,
							)),
							1 === (e = r.DurationCalculationPolicy)[0]
								? e.length < 4
									? (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Character",
												20,
												"Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 将被重设为" +
													ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
												["BuffId", this.Id],
												["handle", this.Handle],
												["持有者", this.sKo?.GetDebugName()],
												["释放者", this.InstigatorId],
											),
										ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
									: ((r = AbilityUtils_1.AbilityUtils.GetLevelValue(
											r.DurationMagnitude2,
											this.Level,
											0,
										)),
										([, e, o, i] = e),
										(o =
											1 === o
												? this.GetInstigatorAttributeSet()
												: this.GetOwnerAttributeSet())
											? ((o = AbilityUtils_1.AbilityUtils.GetAttrValue(
													o,
													e,
													i,
												)),
												Math.max(
													o *
														t *
														CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
														r,
													ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
												))
											: (Log_1.Log.CheckError() &&
													Log_1.Log.Error(
														"Character",
														20,
														"Buff 找不到周期计算属性来源, 周期将被重设为" +
															ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
														["BuffId", this.Id],
														["handle", this.Handle],
														["持有者", this.sKo?.GetDebugName()],
														["释放者", this.InstigatorId],
													),
												ActiveBuffConfigs_1.MIN_BUFF_PERIOD))
								: t)),
			(this.LVo = s),
			this.MKo(s);
	}
	SetRemainDuration(t) {
		2 === this.Config.DurationPolicy &&
			this.MKo(0 < t ? t : ActiveBuffConfigs_1.MIN_BUFF_PERIOD);
	}
	GetRemainDuration() {
		if (!this.IsValid()) return 0;
		switch (this.Config?.DurationPolicy) {
			case 1:
				return ActiveBuffConfigs_1.INFINITY_DURATION;
			case 0:
				return 0;
			default:
				var t =
					((this.GetCurrentTime() - this.CB) * this._Ko) /
					CommonDefine_1.MILLIONSECOND_PER_SECOND;
				return this.LVo < 0
					? ActiveBuffConfigs_1.INFINITY_DURATION
					: Math.max(this.lKo - t, 0);
		}
	}
	SetPeriod(t = void 0) {
		return (
			(this.PeriodInternal = void 0 !== t ? t : this.Config.Period),
			0 < this.PeriodInternal &&
				(this.Config.HasBuffPeriodExecution
					? this.PeriodInternal <
							ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD &&
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Character",
								20,
								`目前限制带周期型额外效果的Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`,
								["BuffId", this.Id],
							),
						(this.PeriodInternal =
							ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD))
					: this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_PERIOD &&
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Character",
								20,
								`目前限制Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`,
								["BuffId", this.Id],
							),
						(this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_PERIOD))),
			this.ResetPeriodTimer(this.PeriodInternal),
			!0
		);
	}
	get Period() {
		return this.PeriodInternal;
	}
	OnTimeScaleChanged(t, e) {
		var i;
		e
			? (t = 0)
			: this.Config.DurationAffectedByBulletTime
				? this.Config.EffectInfos.some(
						(t) =>
							4 === t.ExtraEffectId ||
							5 === t.ExtraEffectId ||
							17 === t.ExtraEffectId,
					) &&
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Battle",
							20,
							"带额外效果4、5、17的buff不应受子弹顿帧影响",
							["buffId", this.Id],
						),
					(t = this.GetOwner()?.TimeDilation ?? 1))
				: (t = this.GetOwner()?.TimeDilation ?? 1),
			t !== this._Ko &&
				((e = this.GetCurrentTime()),
				(i = this._Ko),
				(this._Ko = t),
				0 < this.LVo &&
					((t = ((e - this.CB) * i) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
					(t = this.lKo - t),
					this.MKo(t)),
				0 < this.PeriodInternal) &&
				((t = ((e - this.cKo) * i) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
				(e = this.mKo - t),
				this.ResetPeriodTimer(e));
	}
	DurationCallback() {
		var t;
		this.IsValid() &&
			(t = this.GetOwnerBuffComponent()) &&
			t.RemoveBuffWhenTimeout(this);
	}
	vKo() {
		void 0 !== this.dKo &&
			(TimerSystem_1.TimerSystem.Has(this.dKo) &&
				TimerSystem_1.TimerSystem.Remove(this.dKo),
			(this.dKo = void 0));
	}
	ResetPeriodTimer(t) {
		var e;
		this.vKo(),
			this.PeriodInternal <= 0 ||
				((this.mKo = t),
				(this.cKo = this.GetCurrentTime()),
				0 < this._Ko &&
					((t =
						(this.mKo / this._Ko) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
					(e = this.CKo),
					(this.dKo =
						t >= TimerSystem_1.MIN_TIME
							? TimerSystem_1.TimerSystem.Delay(
									this.SKo.bind(this),
									t,
									e,
									void 0,
									!1,
								)
							: TimerSystem_1.TimerSystem.Next(this.SKo.bind(this), e))));
	}
	SKo() {
		if (this.IsValid()) {
			var t = this.PeriodInternal,
				e = this.GetRemainPeriod(),
				i = Math.floor(1 - e / t);
			e = ((e % t) + t) % t;
			if (this.IsActive()) {
				this.ResetPeriodTimer(e);
				var o = this.GetOwnerBuffComponent();
				for (let t = 0; t < i; t++) o?.ApplyPeriodExecution(this);
			} else this.ResetPeriodTimer(e);
		}
	}
	GetRemainPeriod() {
		var t = (this.GetCurrentTime() - this.cKo) * this._Ko;
		if (!(this.PeriodInternal < 0))
			return this.mKo - t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
	}
	IsActive() {
		return this.gKo;
	}
	SetActivate(t) {
		if (this.gKo === t) return !1;
		this.gKo = t;
		const e = this.GetOwnerBuffComponent()
			?.GetExactEntity()
			?.CheckGetComponent(185);
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						20,
						"buff更改激活状态时无法获取到持有者",
						["handle", this.Handle],
						["buffId", this.Id],
						["持有者", this.sKo?.GetDebugName()],
					),
				!1
			);
		if (t) {
			if (
				(this.ResetModifiers(),
				this.Config.GrantedTags?.forEach((t) => {
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
						e.TagContainer.UpdateExactTag(2, t, this.StackCount);
				}),
				0 < this.PeriodInternal)
			)
				switch (this.Config.PeriodicInhibitionPolicy) {
					case 1:
						this.ResetPeriodTimer(
							TimerSystem_1.MIN_TIME / CommonDefine_1.MILLIONSECOND_PER_SECOND,
						);
						break;
					case 2:
						this.ResetPeriodTimer(this.PeriodInternal);
				}
		} else
			this.ClearModifiers(),
				this.Config.GrantedTags?.forEach((t) => {
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
						e.TagContainer.UpdateExactTag(2, t, -this.StackCount);
				});
		return !0;
	}
	get StackCount() {
		return this.StackCountInternal;
	}
	SetStackCount(t) {
		var e = this.Config;
		const i = this.StackCountInternal,
			o =
				((this.StackCountInternal = t),
				this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(185));
		o
			? (0 === e.StackPeriodResetPolicy && this.SetPeriod(),
				this.ResetModifiers(),
				e.GrantedTags?.forEach((e) => {
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e) &&
						o.TagContainer.UpdateExactTag(2, e, t - i);
				}))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					20,
					"buff更改层数时无法获取到持有者",
					["handle", this.Handle],
					["buffId", this.Id],
					["持有者", this.sKo?.GetDebugName()],
				);
	}
	get Level() {
		return this.jqi;
	}
	ClearModifiers() {
		this.StateModifiers.length = 0;
		var t = this.GetOwner()?.GetComponent(155);
		if (0 < this.fKo.length && t) {
			for (const e of this.fKo) t.RemoveModifier(e[0], e[1]);
			this.fKo.length = 0;
		}
	}
	ResetModifiers() {
		if ((this.ClearModifiers(), this.gKo))
			for (const e of this.Config.Modifiers) {
				var t = e.AttributeId;
				CharacterAttributeTypes_1.stateAttributeIds.has(t)
					? this.SetStateModifier(e)
					: this.SetNonStateModifier(e);
			}
	}
	SetStateModifier(t) {
		switch (t.CalculationPolicy[0]) {
			case 4:
			case 2:
				var [, e, i, o, r] = t.CalculationPolicy,
					i =
						1 === i
							? this.GetInstigatorAttributeSet()
							: this.GetOwnerAttributeSet(),
					r =
						(r &&
							!i &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Battle",
								20,
								"buff找不到属性来源，快照将被取值为0",
								["buffId", this.Id],
								["handle", this.Handle],
								["持有者", this.sKo?.GetDebugName()],
								["施加者", this.InstigatorId],
							),
						r
							? i
								? AbilityUtils_1.AbilityUtils.GetAttrValue(i, e, o)
								: 0
							: void 0);
				this.StateModifiers.push([t, r]);
				break;
			default:
				this.StateModifiers.push([t, void 0]);
		}
	}
	SetNonStateModifier(t) {
		var e = this.StackCountInternal ?? 1,
			i = this.GetOwner().GetComponent(155);
		let o = 0;
		var r = t.AttributeId,
			s = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value1, this.jqi, 0),
			a = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value2, this.jqi, 0);
		switch (t.CalculationPolicy[0]) {
			case 0:
			case 1:
			case 3:
				o = i.AddModifier(r, { Type: t.CalculationPolicy[0], Value1: s * e });
				break;
			case 2:
			case 4:
				var [, n, h, l, f, u, d, c] = t.CalculationPolicy,
					I =
						1 === h
							? this.GetInstigatorAttributeSet()
							: this.GetOwnerAttributeSet(),
					h = 1 === h ? this.InstigatorId : 0;
				if (!I || void 0 === h)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"持续型buff设置属性modifier时缺少来源",
							["buffId", this.Id],
							["handle", this.Handle],
							["持有者", this.sKo?.GetDebugName()],
							["施加者", this.InstigatorId],
							["attrId", r],
						)
					);
				o = i.AddModifier(r, {
					Type: t.CalculationPolicy[0],
					Value1: s * e,
					Value2: a * e,
					SourceEntity: h,
					SourceAttributeId: n,
					SourceCalculationType: l,
					SnapshotSource: f
						? AbilityUtils_1.AbilityUtils.GetAttrValue(I, n, l)
						: void 0,
					Min: u,
					Ratio: d,
					Max: c,
				});
				break;
			case 5:
			case 6:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						20,
						"不能直接对非状态属性使用时间膨胀类属性修改",
						["buffId", this.Id],
					);
		}
		this.fKo.push([r, o]);
	}
	static ModifyStateAttribute(t, e, i, o, r, s) {
		var a = i.AttributeId;
		if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) {
			var n = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value1, o, 0),
				h = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value2, o, 0);
			switch (i.CalculationPolicy[0]) {
				case 0:
					return void e.AddBaseValue(a, n);
				case 1:
					var l = e.GetBaseValue(a),
						f = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1;
					return void e.SetBaseValue(a, l * f);
				case 2:
				case 4: {
					var [, l, f, u, , d, c, I] = i.CalculationPolicy;
					if (!(f = 1 === f ? t : e))
						return void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("Battle", 20, "瞬间/周期buff属性修改时缺少来源", [
								"attrId",
								a,
							])
						);
					let o = s ?? AbilityUtils_1.AbilityUtils.GetAttrValue(f, l, u);
					if (d && (o -= d) <= 0) return;
					c && (o /= c);
					let r = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * o + h;
					return (
						I && r > I && (r = I),
						void (2 === i.CalculationPolicy[0]
							? e.AddBaseValue(a, r)
							: e.SetBaseValue(a, r))
					);
				}
				case 3:
					return void e.SetBaseValue(a, n);
				case 5:
					return void e.AddBaseValue(a, n * r);
				case 6:
					var [, f] = i.CalculationPolicy;
					l = s ?? AbilityUtils_1.AbilityUtils.GetAttrValue(e, f, 0);
					e.AddBaseValue(
						a,
						(n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * l + h) * r,
					);
			}
		}
	}
}
(ActiveBuffInternal.BuffPool = []),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_SetDuration")],
		ActiveBuffInternal.prototype,
		"SetDuration",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_SetPeriod")],
		ActiveBuffInternal.prototype,
		"SetPeriod",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_SetStateModifier")],
		ActiveBuffInternal.prototype,
		"SetStateModifier",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_SetNonStateModifier")],
		ActiveBuffInternal.prototype,
		"SetNonStateModifier",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_AllocBuff")],
		ActiveBuffInternal,
		"AllocBuff",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_ReleaseBuff")],
		ActiveBuffInternal,
		"ReleaseBuff",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("Buff_ModifyStateAttr")],
		ActiveBuffInternal,
		"ModifyStateAttribute",
		null,
	),
	(exports.ActiveBuffInternal = ActiveBuffInternal);
