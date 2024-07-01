"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffEffect = exports.BuffEffectBase = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
	EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
	RandomSystem_1 = require("../../../../../../../Core/Random/RandomSystem"),
	GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
class BuffEffectBase {
	constructor(e) {
		(this.RequireAndLimits = e),
			(this.BuffId = BigInt(-1)),
			(this.IsInLoop = !1),
			(this.Level = 0),
			(this.ServerId = -1),
			(this.InstigatorEntityId = 0),
			(this.OpponentEntityId = 0),
			(this.OwnerBuffComponent = void 0);
	}
	get InstigatorEntity() {
		return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
			this.InstigatorEntityId,
		);
	}
	get InstigatorCreatureId() {
		return (
			this.InstigatorEntity?.Entity?.GetComponent(0)?.GetCreatureDataId() ??
			ActiveBuffConfigs_1.NULL_INSTIGATOR_ID
		);
	}
	get InstigatorBuffComponent() {
		return this.InstigatorEntity?.Entity?.CheckGetComponent(157);
	}
	get OpponentEntity() {
		return EntitySystem_1.EntitySystem.Get(this.OpponentEntityId);
	}
	get OpponentBuffComponent() {
		return this.OpponentEntity?.CheckGetComponent(157);
	}
	get OwnerEntity() {
		return this.OwnerBuffComponent?.GetEntity();
	}
	get ExactOwnerEntity() {
		return this.OwnerBuffComponent?.GetExactEntity();
	}
	get OwnerEffectManager() {
		return this.OwnerBuffComponent.BuffEffectManager;
	}
	InitParameters(e) {}
	CheckExecutable() {
		return !0;
	}
	CheckAuthority() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	IsPlayerBuff() {
		return (0, RegisterComponent_1.isComponentInstance)(
			this.OwnerBuffComponent,
			180,
		);
	}
	CheckLoop() {
		return !this.IsInLoop;
	}
	CheckRequirements(e) {
		if (0 === this.RequireAndLimits.Requirements.length) return !0;
		switch (this.RequireAndLimits.CheckType) {
			case 0:
				for (const t of this.RequireAndLimits.Requirements)
					if (!this.iQo(t, e)) return !1;
				return !0;
			case 1:
				for (const t of this.RequireAndLimits.Requirements)
					if (this.iQo(t, e)) return !0;
				return !1;
			default:
				return !0;
		}
	}
	iQo(e, t) {
		switch (e.Type) {
			case 1:
				return (
					Number.isInteger(t.SkillId) &&
					e.SkillIds.includes(BigInt(t.SkillId ?? -1))
				);
			case 2:
				return (
					Number.isInteger(t.SkillGenre) &&
					e.SkillGenres.includes(t.SkillGenre ?? -1)
				);
			case 3:
				return e.RequireInterval.CheckActiveness(
					this.oQo(e.RequireTargetType).GetAttributeComponent(),
				);
			case 4:
				return (
					Number.isInteger(t.SmashType) &&
					e.SmashTypes.includes(t.SmashType ?? -1)
				);
			case 5:
				return void 0 !== t.BulletId && e.BulletIds.includes(t.BulletId);
			case 6:
				return e.IsCritical === t.IsCritical;
			case 7:
				return (
					Number.isInteger(t.ElementType) &&
					e.ElementTypes.includes(t.ElementType)
				);
			case 8:
				return (
					Number.isInteger(t.WeaponType) && e.WeaponTypes.includes(t.WeaponType)
				);
			case 9:
				return (
					this.oQo(e.RequireTargetType)
						.GetTagComponent()
						?.HasAnyTag(e.RequireTagContainer) === e.IsExist
				);
			case 10:
				return GameplayTagUtils_1.GameplayTagUtils.Contains(
					e.RequirePartTags,
					t.PartTag,
				);
			case 11:
				return GameplayTagUtils_1.GameplayTagUtils.HasAny(
					e.RequireBulletTags,
					t.BulletTags,
				);
			case 12:
				return e.DamageGenres.includes(t.DamageGenre ?? -1);
			case 13:
				var n = this.oQo(e.RequireTargetType)
					?.GetEntity()
					?.GetComponent(0)
					?.GetMonsterMatchType();
				return Number.isInteger(n) && e.MonsterGenres.includes(n);
			case 14:
				return (
					((n = this.oQo(e.RequireTargetType)) &&
						n.GetBuffTotalStackById(e.BuffId) >= e.MinStack &&
						n.GetBuffTotalStackById(e.BuffId) <= e.MaxStack) ??
					!1
				);
			case 15:
				return (
					PhantomUtil_1.PhantomUtil.GetSummonedEntity(
						this.oQo(e.RequireTargetType).GetEntity(),
						e.SummonType,
						e.SummonIndex,
					)
						?.Entity?.CheckGetComponent(185)
						?.HasAnyTag(e.RequireTagContainer) === e.IsExist
				);
			case 16:
				return e.CalculationTypes.includes(t.CalculateType ?? -1);
			default:
				return !0;
		}
		return !0;
	}
	oQo(e) {
		switch (e) {
			case 0:
				return this.OwnerBuffComponent;
			case 1:
				return this.OpponentBuffComponent;
			case 2:
				return this.InstigatorBuffComponent;
			default:
				return;
		}
	}
	GetDebugString() {
		return "" + this.constructor.name;
	}
}
class BuffEffect extends (exports.BuffEffectBase = BuffEffectBase) {
	constructor(e, t, n, i, r) {
		super(n),
			(this.ActiveHandleId = e),
			(this.Index = t),
			(this.Timeout = 0),
			(n = (this.OwnerBuffComponent = i).GetBuffByHandle(e)) &&
				((this.Level = n.Level),
				(this.ServerId = n.ServerId),
				(this.BuffId = n.Id),
				r) &&
				(this.InstigatorEntityId = r.Entity.Id);
	}
	get RemainCd() {
		return (
			this.OwnerBuffComponent?.GetBuffEffectCd(this.BuffId, this.Index) ?? 0
		);
	}
	get Buff() {
		return this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
	}
	static Create(e, t, n, i, r, s) {
		return (e = new this(e, t, n, i, r)), s && e.InitParameters(s), e;
	}
	OnCreated() {}
	OnRemoved(e) {}
	OnStackDecreased(e, t, n) {}
	OnStackIncreased(e, t, n) {}
	OnPeriodCallback() {}
	TryExecute(e, t, ...n) {
		return !!this.Check(e, t) && (this.Execute(...n), !0);
	}
	Check(e, t) {
		return this.CheckExecutable()
			? ((this.OpponentEntityId = t.GetEntity()?.Id ?? 0),
				!!this.CheckLoop() &&
					!!this.CheckRequirements(e) &&
					!!this.CheckLimits())
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						20,
						"持续型buff的效果不在本端执行",
						["buffId", this.BuffId],
						["effectType", this.constructor?.name],
						["handleId", this.ActiveHandleId],
					),
				!1);
	}
	Execute(...e) {
		return (
			(this.IsInLoop = !0),
			(e = this.OnExecute(...e)),
			this.PostExecuted(),
			(this.IsInLoop = !1),
			e
		);
	}
	PostExecuted() {
		var e;
		this.ActiveHandleId < 0 ||
			!this.OwnerBuffComponent ||
			((e =
				this.RequireAndLimits.Limits.ExtraEffectCd *
				CommonDefine_1.MILLIONSECOND_PER_SECOND),
			this.CheckAuthority() &&
				this.OwnerBuffComponent.SetBuffEffectCd(this.BuffId, this.Index, e),
			(e = this.RequireAndLimits.Limits.ExtraEffectRemoveStackNum),
			this.CheckAuthority() &&
				0 < e &&
				this.OwnerBuffComponent.RemoveBuffByHandle(
					this.ActiveHandleId,
					e,
					"buff额外效果触发后移除",
				));
	}
	CheckLimits() {
		return (
			this.ActiveHandleId < 0 ||
			!(
				0 < this.RemainCd ||
				RandomSystem_1.default.GetRandomPercent() >
					this.RequireAndLimits.Limits.ExtraEffectProbability
			)
		);
	}
}
exports.BuffEffect = BuffEffect;
