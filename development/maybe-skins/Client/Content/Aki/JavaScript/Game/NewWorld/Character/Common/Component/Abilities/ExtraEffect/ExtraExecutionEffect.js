"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExecuteAddBulletByStackCount =
		exports.ExecuteAddBuffByStackCount =
		exports.ExecuteBulletOrBuff =
		exports.PhantomAssistExecution =
		exports.AddBuffToAdjacentRoleExecution =
		exports.InitExecution =
		exports.ExtendBuffDurationExecution =
		exports.CdReduceExecution =
		exports.DamageExecution =
		exports.AddEnergyExecution =
		exports.AddFormationAttributeExecution =
		exports.ReviveExecution =
		exports.PeriodExecution =
		exports.BuffExecution =
			void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
	TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	BulletController_1 = require("../../../../../Bullet/BulletController"),
	AbilityUtils_1 = require("../AbilityUtils"),
	ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	CharacterDamageCalculations_1 = require("../CharacterDamageCalculations"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class BuffExecution extends ExtraEffectBase_1.BuffEffectBase {
	constructor() {
		super(...arguments), (this.Buff = void 0), (this.TargetType = 0);
	}
	static Create(t, e, i) {
		return ((e = new this(e)).BuffId = t), i && e.InitParameters(i), e;
	}
	CheckExecutable() {
		return !!this.OwnerBuffComponent?.HasBuffAuthority();
	}
	Check(t) {
		return (
			!!this.CheckExecutable() &&
			((this.OpponentEntityId = this.OwnerBuffComponent.GetEntity()?.Id ?? 0),
			!!this.CheckLoop()) &&
			!!this.CheckRequirements(t)
		);
	}
	TryExecute(t, ...e) {
		this.Level = t.Level;
		var i,
			r = (this.Buff = t).GetOwnerBuffComponent();
		return !(
			!r ||
			((i = t.GetInstigatorBuffComponent()),
			(this.OwnerBuffComponent = r),
			i && (this.InstigatorEntityId = t.GetInstigator().Id),
			!this.Check({})) ||
			((this.IsInLoop = !0),
			this.OnExecute(...e),
			(this.IsInLoop = !1),
			(this.OwnerBuffComponent = void 0),
			(this.Buff = void 0))
		);
	}
	GetEffectTarget() {
		switch (this.TargetType) {
			case 0:
				return this.OwnerBuffComponent;
			case 1:
				return this.InstigatorBuffComponent;
			default:
				return;
		}
	}
}
class PeriodExecution extends (exports.BuffExecution = BuffExecution) {}
class ReviveExecution extends (exports.PeriodExecution = PeriodExecution) {
	constructor() {
		super(...arguments), (this.HealRate = -0), (this.HealValue = 0);
	}
	InitParameters(t) {
		(this.HealRate =
			Number(t.ExtraEffectParameters[0] ?? 0) *
			CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
			(this.HealValue = Number(t.ExtraEffectParameters[1] ?? 0));
	}
	OnExecute() {
		this.OwnerBuffComponent?.GetEntity()
			?.CheckGetComponent(172)
			?.ExecuteReviveLocal();
	}
}
exports.ReviveExecution = ReviveExecution;
class AddFormationAttributeExecution extends PeriodExecution {
	constructor() {
		super(...arguments),
			(this.AttributeId = 0),
			(this.AddRate = -0),
			(this.AddValue = 0);
	}
	InitParameters(t) {
		(this.AttributeId = Number(t.ExtraEffectParameters[0])),
			(this.AddRate =
				AbilityUtils_1.AbilityUtils.GetLevelValue(
					t.ExtraEffectGrowParameters1,
					this.Level,
					0,
				) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
			(this.AddValue = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters2,
				this.Level,
				0,
			));
	}
	OnExecute() {
		var t = FormationAttributeController_1.FormationAttributeController.GetMax(
			this.AttributeId,
		);
		FormationAttributeController_1.FormationAttributeController.AddValue(
			this.AttributeId,
			t * this.AddRate + this.AddValue,
		);
	}
}
exports.AddFormationAttributeExecution = AddFormationAttributeExecution;
class AddEnergyExecution extends PeriodExecution {
	constructor() {
		super(...arguments), (this.AddValue = 0);
	}
	InitParameters(t) {
		this.AddValue = AbilityUtils_1.AbilityUtils.GetLevelValue(
			t.ExtraEffectGrowParameters1,
			this.Level,
			0,
		);
	}
	OnExecute() {
		var t = this.OwnerBuffComponent?.GetAttributeComponent();
		if (t) {
			const n =
				t.GetCurrentValue(
					CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
				) / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
			var e = CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
				i = this.AddValue;
			const a = i * n;
			if ((t.AddBaseValue(e, a), t.Entity?.CheckGetComponent(158)?.IsInGame)) {
				var r =
					CharacterDamageCalculations_1.ENERGY_SHARE_RATE /
					CharacterAttributeTypes_1.PER_TEN_THOUSAND;
				for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
					!0,
				)) {
					var o = t?.Entity?.CheckGetComponent(158),
						s = t?.Entity?.CheckGetComponent(156);
					if (o && !o.IsInGame && s) {
						const t =
							i *
							(s.GetCurrentValue(
								CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
							) /
								CharacterAttributeTypes_1.PER_TEN_THOUSAND);
						s.AddBaseValue(e, t * r);
					}
				}
			}
		}
	}
}
exports.AddEnergyExecution = AddEnergyExecution;
class DamageExecution extends PeriodExecution {
	constructor() {
		super(...arguments), (this.DamageIdList = void 0);
	}
	InitParameters(t) {
		this.DamageIdList = new Array(t.ExtraEffectParameters.length);
		for (let e = 0; e < t.ExtraEffectParameters.length; e++)
			this.DamageIdList[e] = t.ExtraEffectParameters[e]
				.split("#")
				.map((t) => BigInt(t));
	}
	OnExecute() {
		var t = this.Buff.StackCount;
		t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.DamageIdList, t, []);
		if (this.OwnerBuffComponent) {
			var e = this.OwnerBuffComponent.GetEntity()?.CheckGetComponent(18),
				i = this.OwnerBuffComponent.GetActorComponent()?.ActorLocation,
				r = this.InstigatorEntity?.Valid
					? this.InstigatorEntity.Entity
					: this.OwnerEntity;
			if (e && i && r)
				for (const o of t)
					e.ExecuteBuffDamage(
						{
							DamageDataId: o,
							SkillLevel: this.Level,
							Attacker: r,
							HitPosition: i,
							BuffId: this.BuffId,
						},
						{},
						this.Buff.MessageId,
					);
		}
	}
}
exports.DamageExecution = DamageExecution;
class CdReduceExecution extends PeriodExecution {
	constructor() {
		super(...arguments),
			(this.$Qo = void 0),
			(this.YQo = 0),
			(this.JQo = void 0),
			(this.zQo = void 0);
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters;
		(this.$Qo = e[0]?.split("#") ?? []),
			(this.YQo = Number(e[1] ?? 0)),
			(this.JQo = t.ExtraEffectGrowParameters1),
			(this.zQo = t.ExtraEffectGrowParameters2);
	}
	OnExecute() {
		var t = this.OwnerBuffComponent?.GetEntity()?.GetComponent(186);
		if (t) {
			var e =
					AbilityUtils_1.AbilityUtils.GetLevelValue(this.JQo, this.Level, 0) *
					CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
				i = AbilityUtils_1.AbilityUtils.GetLevelValue(this.zQo, this.Level, 0);
			switch (this.YQo) {
				case 0:
					t.ModifyCdTime(this.$Qo, -i, -e);
					break;
				case 1:
					t.ModifyCdTimeBySkillGenres(this.$Qo, -i, -e);
			}
		}
	}
}
exports.CdReduceExecution = CdReduceExecution;
class ExtendBuffDurationExecution extends PeriodExecution {
	constructor() {
		super(...arguments),
			(this.QKo = void 0),
			(this.ZQo = void 0),
			(this.eXo = void 0),
			(this.tXo = void 0);
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters;
		(this.TargetType = Number(e[0])),
			(this.QKo = e[1].split("#").map((t) => BigInt(t))),
			(this.tXo = e[2]?.split("#").map((t) => Number(t))),
			(this.ZQo = t.ExtraEffectGrowParameters1),
			(this.eXo = t.ExtraEffectGrowParameters2);
	}
	OnExecute() {
		var t = this.GetEffectTarget();
		if (t?.HasBuffAuthority()) {
			var e =
					AbilityUtils_1.AbilityUtils.GetLevelValue(this.ZQo, this.Level, 0) *
					CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
				i =
					AbilityUtils_1.AbilityUtils.GetLevelValue(this.eXo, this.Level, 0) *
					TimeUtil_1.TimeUtil.Millisecond;
			for (const s of this.QKo) {
				var r = t.GetBuffById(s);
				if (r) {
					var o = r.GetRemainDuration();
					if (0 < o) {
						let t = Math.max(
							o * (1 + e) + i,
							ActiveBuffConfigs_1.MIN_BUFF_REMAIN_DURATION,
						);
						this.tXo?.[0] &&
							(t = Math.max(t, this.tXo[0] * TimeUtil_1.TimeUtil.Millisecond)),
							this.tXo?.[1] &&
								(t = Math.min(
									t,
									this.tXo[1] * TimeUtil_1.TimeUtil.Millisecond,
								)),
							r.SetDuration(t);
					}
				}
			}
		}
	}
}
exports.ExtendBuffDurationExecution = ExtendBuffDurationExecution;
class InitExecution extends BuffExecution {}
class AddBuffToAdjacentRoleExecution extends (exports.InitExecution =
	InitExecution) {
	constructor() {
		super(...arguments),
			(this.ApplyBuffId = void 0),
			(this.Distance = 0),
			(this.ApplyRoleFormationType = void 0);
	}
	CheckExecutable() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	InitParameters(t) {
		(this.Distance = Number(t.ExtraEffectParameters[0])),
			(this.ApplyRoleFormationType =
				1 < t.ExtraEffectParameters.length
					? t.ExtraEffectParameters[1].split("#").map((t) => Number(t))
					: [0, 1, 2]),
			(this.ApplyBuffId =
				2 < t.ExtraEffectParameters.length
					? t.ExtraEffectParameters[2].split("#").map((t) => BigInt(t))
					: [this.BuffId]);
	}
	OnExecute(t) {
		if (t) {
			var e = this.OwnerBuffComponent?.GetEntity(),
				i = e?.GetComponent(0).GetPlayerId() ?? 0;
			t =
				ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
					i,
				)?.GetLocation();
			if (e && t)
				for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
					t,
					this.Distance,
				))
					if (o.GetPlayerId() !== i) {
						var r = o.EntityHandle;
						if (r && r.Entity.GetComponent(0).IsRole() && r.Id !== e.Id)
							for (const t of this.ApplyBuffId)
								r.Entity.GetComponent(157).AddIterativeBuff(
									t,
									this.Buff,
									void 0,
									!1,
									`Buff${this.BuffId}的额外效果导致的共享添加`,
								);
					}
		}
	}
}
exports.AddBuffToAdjacentRoleExecution = AddBuffToAdjacentRoleExecution;
class PhantomAssistExecution extends InitExecution {
	constructor() {
		super(...arguments),
			(this.iXo = Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeDefault),
			(this.oXo = 0),
			(this.Gco = 0),
			(this.rXo = 2);
	}
	CheckExecutable() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	InitParameters(t) {
		(t = t.ExtraEffectParameters),
			(this.iXo = Number(t[0])),
			(this.oXo = Number(t[1])),
			(this.Gco = Number(t[2])),
			(this.rXo = Number(t[3]));
	}
	OnExecute(t) {
		var e;
		(e = (e = this.OwnerBuffComponent.GetEntity())
			? PhantomUtil_1.PhantomUtil.GetSummonedEntity(e, this.iXo, this.oXo)
			: void 0) &&
			e.Entity.GetComponent(33).BeginSkill(this.Gco, {
				Target: this.nXo()?.Entity,
				Context: "PhantomAssistExecution.OnExecute",
			});
	}
	nXo() {
		let t;
		switch (this.rXo) {
			case 0:
				var e = this.OwnerBuffComponent?.GetSkillComponent();
				t = e?.SkillTarget;
				break;
			case 1:
				t = this.OwnerBuffComponent?.GetEntity()
					?.GetComponent(29)
					?.GetCurrentTarget();
				break;
			case 2:
				t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
					this.OwnerBuffComponent?.GetEntity(),
				);
		}
		return t;
	}
}
exports.PhantomAssistExecution = PhantomAssistExecution;
const DEFAULT_PASSIVE_BULLET_TIMES = 1,
	DEFAULT_PASSIVE_BUFF_ADD_TIMES = 0,
	DEFAULT_PASSIVE_BUFF_REMOVE_TIMES = -1;
class ExecuteBulletOrBuff extends PeriodExecution {
	constructor() {
		super(...arguments),
			(this.GoalType = 0),
			(this.Ids = void 0),
			(this.Times = void 0),
			(this.BulletPosType = 0),
			(this.ProcessBulletId = (t, e, i) => {
				var r = this.GetBulletTarget().GetActorComponent().ActorTransform,
					o = this.InstigatorEntity?.Entity?.GetComponent(3)?.Actor;
				if (o) {
					var s = this.Buff.MessageId;
					for (let i = 0; i < e; i++)
						BulletController_1.BulletController.CreateBulletCustomTarget(
							o,
							String(t),
							r,
							{ SyncType: 1 },
							s,
						);
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Battle",
							20,
							"尝试执行添加子弹的额外效果时找不到对应的buff施加者",
							["buffId", this.BuffId],
							["持有者", this.OwnerBuffComponent?.GetDebugName()],
						);
			}),
			(this.sXo = (t, e, i) => {
				i.AddIterativeBuff(
					t,
					this.Buff,
					e,
					!0,
					`因为其它瞬间型buff额外效果迭代添加（前置buff Id=${this.BuffId}）`,
				);
			}),
			(this.aXo = (t, e, i) => {
				i.RemoveBuff(
					t,
					e,
					`因为其它buff额外效果移除（前置buff Id=${this.BuffId}）`,
				);
			});
	}
	InitParameters(t) {
		(t = t.ExtraEffectParameters),
			(this.TargetType = 0),
			(this.GoalType = Number(t[0])),
			(this.Ids = t[1].split("#").map((t) => BigInt(t))),
			(this.Times = t[2]?.split("#").map((t) => Number(t)) ?? []),
			(this.BulletPosType = Number(t[3] ?? 0));
	}
	OnExecute() {
		switch (this.GoalType) {
			case 0:
				this.ExecutePerId(this.sXo);
				break;
			case 1:
				this.ExecutePerId(this.ProcessBulletId);
				break;
			case 2:
				this.ExecutePerId(this.aXo);
		}
	}
	GetBulletTarget() {
		switch (this.BulletPosType) {
			case 0:
				return this.OwnerBuffComponent;
			case 1:
				return this.OpponentBuffComponent;
			case 2:
				return this.InstigatorBuffComponent;
			case 3:
				return this.GetBuffHolderSkillTarget();
			default:
				return;
		}
	}
	GetBuffHolderSkillTarget() {
		var t =
			this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(33)?.SkillTarget;
		return t ? t.Entity.CheckGetComponent(187) : this.OwnerBuffComponent;
	}
	CheckExecutable() {
		return 1 === this.GoalType
			? BulletController_1.BulletController.HasAuthority(
					this.InstigatorEntity?.Entity,
				)
			: !!this.OwnerBuffComponent?.HasBuffAuthority();
	}
	ExecutePerId(t) {
		for (let e = 0; e < this.Ids.length; e++) {
			let i = this.GetEffectTarget();
			(i = (0, RegisterComponent_1.isComponentInstance)(i, 180)
				? i.GetCurrentBuffComponent()
				: i) && t(this.Ids[e], this.hXo(e), i);
		}
	}
	hXo(t) {
		var e = this.Times;
		switch (this.GoalType) {
			case 0:
				return AbilityUtils_1.AbilityUtils.GetArrayValue(e, t, 0);
			case 1:
				return AbilityUtils_1.AbilityUtils.GetArrayValue(e, t, 1);
			case 2:
				return AbilityUtils_1.AbilityUtils.GetArrayValue(e, t, -1);
		}
		return 0;
	}
}
exports.ExecuteBulletOrBuff = ExecuteBulletOrBuff;
class ExecuteAddBuffByStackCount extends PeriodExecution {
	constructor() {
		super(...arguments), (this.Ids = void 0);
	}
	InitParameters(t) {
		this.TargetType = 0;
		var e = t.ExtraEffectParameters;
		this.Ids = new Array(e.length);
		for (let t = 0; t < e.length; t++)
			this.Ids[t] = e[t].split("#").map((t) => BigInt(t));
	}
	OnExecute() {
		var t = this.Buff.StackCount,
			e =
				((t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, [])),
				this.OwnerBuffComponent);
		if (e)
			for (const i of t)
				e.AddIterativeBuff(
					i,
					this.Buff,
					1,
					!0,
					`因为其它瞬间型buff额外效果迭代添加（前置buff Id=${this.BuffId}）`,
				);
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Battle",
					20,
					"尝试执行添加buff的额外效果时找不到对应的buff接收者",
					["buffId", this.BuffId],
					["持有者", this.Buff?.GetOwnerDebugName()],
					["施加者", this.Buff.InstigatorId],
				);
	}
}
exports.ExecuteAddBuffByStackCount = ExecuteAddBuffByStackCount;
class ExecuteAddBulletByStackCount extends PeriodExecution {
	constructor() {
		super(...arguments), (this.Ids = void 0), (this.BulletPosType = 0);
	}
	InitParameters(t) {
		this.TargetType = 0;
		var e = t.ExtraEffectParameters;
		(this.BulletPosType = Number(e[0])), (this.Ids = new Array(e.length - 1));
		for (let t = 1; t < e.length; t++)
			this.Ids[t - 1] = e[t].split("#").map((t) => t.trim());
	}
	CheckExecutable() {
		return BulletController_1.BulletController.HasAuthority(
			this.InstigatorEntity?.Entity,
		);
	}
	OnExecute() {
		var t = this.Buff.StackCount,
			e =
				((t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, [])),
				this.GetBulletTarget()?.GetActorComponent()?.ActorTransform),
			i = this.InstigatorBuffComponent?.GetActorComponent()?.Actor;
		if (i && e) {
			var r = this.Buff.MessageId;
			for (const o of t)
				BulletController_1.BulletController.CreateBulletCustomTarget(
					i,
					o,
					e,
					{ SyncType: 1 },
					r,
				);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Battle",
					20,
					"尝试执行添加子弹的额外效果时找不到对应的buff施加者或接收者",
					["buffId", this.BuffId],
					["持有者", this.Buff?.GetOwnerDebugName()],
					["施加者", this.Buff.InstigatorId],
				);
	}
	GetBulletTarget() {
		switch (this.BulletPosType) {
			case 0:
				return this.OwnerBuffComponent;
			case 1:
				return this.OpponentBuffComponent;
			case 2:
				return this.InstigatorBuffComponent;
			case 3:
				return this.GetBuffHolderSkillTarget();
			default:
				return;
		}
	}
	GetBuffHolderSkillTarget() {
		var t =
			this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(33)?.SkillTarget;
		return t ? t.Entity.CheckGetComponent(187) : this.OwnerBuffComponent;
	}
}
exports.ExecuteAddBulletByStackCount = ExecuteAddBulletByStackCount;
