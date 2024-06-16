"use strict";
var CharacterDamageComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, a, r) {
			var i,
				o = arguments.length,
				s =
					o < 3
						? t
						: null === r
							? (r = Object.getOwnPropertyDescriptor(t, a))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, a, r);
			else
				for (var n = e.length - 1; 0 <= n; n--)
					(i = e[n]) &&
						(s = (o < 3 ? i(s) : 3 < o ? i(t, a, s) : i(t, a)) || s);
			return 3 < o && s && Object.defineProperty(t, a, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterDamageComponent =
		exports.BaseAttributeSet =
		exports.DamageCompPayload =
		exports.SnapshotPayload =
			void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
	DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
	DamagePayloadById_1 = require("../../../../../../Core/Define/ConfigQuery/DamagePayloadById"),
	NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	FormationEvent_1 = require("../../../../../Module/Formation/FormationEvent"),
	GameplayAbilityVisionControl_1 = require("../Vision/GA/GameplayAbilityVisionControl"),
	AbilityUtils_1 = require("./AbilityUtils"),
	ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
	CharacterAbilityComponent_1 = require("./CharacterAbilityComponent"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	CharacterBuffIds_1 = require("./CharacterBuffIds"),
	CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
	ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
	ExtraEffectDamageAccumulation_1 = require("./ExtraEffect/ExtraEffectDamageAccumulation"),
	ExtraEffectDamageAugment_1 = require("./ExtraEffect/ExtraEffectDamageAugment"),
	ExtraEffectDamageImmune_1 = require("./ExtraEffect/ExtraEffectDamageImmune"),
	ExtraEffectDamageModifier_1 = require("./ExtraEffect/ExtraEffectDamageModifier"),
	ExtraEffectDamageShare_1 = require("./ExtraEffect/ExtraEffectDamageShare"),
	ExtraEffectSnapModifier_1 = require("./ExtraEffect/ExtraEffectSnapModifier"),
	damageDataPayloadIdDefault = BigInt(0);
class SnapshotPayload {
	constructor() {
		(this.Target = void 0),
			(this.Attacker = void 0),
			(this.TargetSnapshot = void 0),
			(this.AttackerSnapshot = void 0);
	}
}
exports.SnapshotPayload = SnapshotPayload;
class DamageCompPayload {
	constructor() {
		(this.Target = void 0), (this.Attacker = void 0);
	}
}
exports.DamageCompPayload = DamageCompPayload;
class BaseAttributeSet {}
exports.BaseAttributeSet = BaseAttributeSet;
let CharacterDamageComponent =
	(CharacterDamageComponent_1 = class CharacterDamageComponent extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.yte = void 0),
				(this.Ste = void 0),
				(this.aat = void 0),
				(this.iUo = void 0),
				(this.rUo = void 0),
				(this.oUo = void 0),
				(this._yo = void 0),
				(this.YDo = void 0),
				(this.ActorComponent = void 0),
				(this.nat = void 0),
				(this.nUo = void 0),
				(this.sUo = void 0),
				(this.aUo = 0),
				(this.hUo = 0),
				(this.lUo = new Map());
		}
		get OwnerAttributeComponent() {
			return this.yte;
		}
		get OwnerBuffComponent() {
			return this.aat;
		}
		OnStart() {
			return (
				(this.yte = this.Entity.CheckGetComponent(155)),
				(this.Ste = this.Entity.CheckGetComponent(184)),
				(this.aat = this.Entity.CheckGetComponent(156)),
				(this.iUo = this.Entity.CheckGetComponent(50)),
				(this.rUo = this.Entity.CheckGetComponent(46)),
				(this.oUo = this.Entity.GetComponent(83)),
				(this._yo = this.Entity.CheckGetComponent(33)),
				(this.YDo = this.Entity.CheckGetComponent(157)),
				(this.ActorComponent = this.Entity.CheckGetComponent(3)),
				(this.nat = this.Entity.CheckGetComponent(0)),
				(this.aUo = this._Uo()),
				!0
			);
		}
		OnClear() {
			return this.uUo(), !0;
		}
		OnTick(e) {
			-this.ActorComponent.ActorVelocityProxy.Z >= this.aUo
				? 0 === this.hUo && (this.hUo = Time_1.Time.WorldTimeSeconds)
				: (this.hUo = 0);
		}
		ExecuteBulletDamage(e, t, a) {
			var r,
				e = EntitySystem_1.EntitySystem.Get(e),
				i = e.GetBulletInfo(),
				o = DamageById_1.configDamageById.GetConfig(t.DamageDataId);
			return o
				? (((r = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId =
						BigInt(i.BulletRowName)),
					(r.SkillId = Number(i.BulletInitParams.SkillId)),
					(r.BulletTags = i.Tags ?? []),
					(r.PartId = t.PartId),
					0 <= r.PartId &&
						(r.PartTag = this.Entity.GetComponent(57).GetPartByIndex(
							r.PartId,
						).PartTag?.TagId),
					(i = {
						...t,
						DamageData: o,
						Attacker: t.Attacker.CheckGetComponent(18),
						SourceType: Protocol_1.Aki.Protocol.DamageSourceType.FromBullet,
						IsReaction: o.PayloadId !== damageDataPayloadIdDefault,
						Accumulation:
							ExtraEffectDamageAccumulation_1.DamageAccumulation.GetAccumulation(
								e.Id,
							),
						PartId: t.PartId,
						RandomSeed:
							ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
					}),
					this.dUo(i),
					this.ProcessDamage(r, i, a))
				: { DamageResult: 0, ToughResult: 0 };
		}
		ExecuteBuffDamage(e, t, a) {
			var r,
				i,
				o = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
			o &&
				((r = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
				(i = {
					...e,
					DamageData: o,
					Attacker: e.Attacker.CheckGetComponent(18),
					SourceType: Protocol_1.Aki.Protocol.DamageSourceType.FromEffect,
					IsAddEnergy: !1,
					IsCounterAttack: !1,
					ForceCritical: !1,
					IsBlocked: !1,
					IsReaction: !1,
					PartId: -1,
					ExtraRate: 1,
					Accumulation: 0,
					RandomSeed:
						ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
				}),
				this.dUo(i),
				this?.ProcessDamage(r, i, a),
				ExtraEffectDamageShare_1.DamageShare.ApplyBuffShare(
					this.Entity,
					o,
					e,
					t,
					a,
				));
		}
		ExecuteBuffShareDamage(e, t, a, r) {
			var i,
				o = DamageById_1.configDamageById.GetConfig(e.DamageDataId);
			o &&
				((i = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
				(t = {
					...e,
					DamageData: o,
					Attacker: e.Attacker.CheckGetComponent(18),
					SourceType: Protocol_1.Aki.Protocol.DamageSourceType.FromEffect,
					IsAddEnergy: !1,
					IsCounterAttack: !1,
					ForceCritical: !1,
					IsBlocked: !1,
					IsReaction: !1,
					PartId: -1,
					ExtraRate: a,
					Accumulation: 0,
					RandomSeed:
						ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
				}),
				this.dUo(t),
				this.ProcessDamage(i, t, r));
		}
		ProcessDamage(t, a, e) {
			if (this.Ste.ContainsTagById(1918148596) && 0 === a.DamageData.ImmuneType)
				return { DamageResult: 0, ToughResult: 0 };
			var r = a.Attacker;
			0 < t.SkillId &&
				((o = r._yo.GetSkillInfo(t.SkillId)?.SkillGenre), (t.SkillGenre = o)),
				(t.DamageGenre = a.DamageData.Type),
				(t.CalculateType = a.DamageData.CalculateType);
			const i = this.fUo(r);
			var o = this.GetLocalDamage(t, a, i);
			let s = void 0;
			0 <= a.PartId &&
				(s = this.Entity.GetComponent(57)?.GetPartByIndex(a.PartId));
			(r =
				(5 === t.SkillGenre
					? this.GetExtraToughRate("ToughRateOnCounter")
					: this.GetExtraToughRate("ToughRate")) /
				CharacterAttributeTypes_1.PER_TEN_THOUSAND),
				this.GetServerDamage(
					a,
					t,
					(e) => {
						this.Entity?.Valid &&
							a.Attacker?.Entity?.Valid &&
							(this.pUo(e, a, t),
							this.vUo(e, a, t, i),
							s?.OnDamage(e.Damage, a.ForceCritical, a.Attacker.Entity, !1));
					},
					e,
				),
				(e = this.MUo(a, i, r));
			return { DamageResult: o.Damage, ToughResult: e };
		}
		static OnDamageExecuteNotify(e, t) {
			ModelManager_1.ModelManager.CreatureModel.GetEntity(
				MathUtils_1.MathUtils.LongToNumber(t.TargetEntityId),
			)
				?.Entity?.GetComponent(18)
				?.ProcessRemoteDamage(t);
		}
		ProcessRemoteDamage(e) {
			var t,
				a = e.DamageContext ?? {},
				r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
					MathUtils_1.MathUtils.LongToNumber(e.AttackerEntityId),
				),
				i = DamageById_1.configDamageById.GetConfig(
					MathUtils_1.MathUtils.LongToBigInt(e.DamageId),
				),
				o = r?.Entity?.GetComponent(18);
			i && r && o
				? ((r = {
						...e,
						DamageData: i,
						Damage: -e.Damage,
						IsCounterAttack: !1,
						IsReaction: !1,
						IsCritical: e.IsCrit,
						IsTargetKilled: e.KilledTarget,
						IsBlocked: !1,
						SourceType:
							a.SourceType ??
							Protocol_1.Aki.Protocol.DamageSourceType.FromEffect,
						IsImmune:
							e.ImmuneType ===
							Protocol_1.Aki.Protocol.EDamageImmune
								.EDamageImmune_BuffEffectElement,
					}),
					((t = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId =
						MathUtils_1.MathUtils.LongToBigInt(a.BulletId ?? -1)),
					(t.SkillId = a.SkillId),
					(t.BulletTags = [...(a.BulletTags ?? [])]),
					(t.PartId = e.PartId),
					(t.DamageGenre = i.Type),
					(t.CalculateType = i.CalculateType),
					(t.IsTargetKilled = r.IsTargetKilled),
					0 < t.SkillId &&
						(t.SkillGenre = o._yo.GetSkillInfo(t.SkillId)?.SkillGenre ?? -1),
					0 <= t.PartId &&
						((a = this.Entity.GetComponent(57)),
						(t.PartTag = a?.GetPartByIndex(t.PartId).PartTag?.TagId)),
					(t.IsCritical = r.IsCritical),
					(t.IsImmune = r.IsImmune),
					(i = this.ActorComponent.ActorLocation),
					this.pUo(r, { Attacker: o, HitPosition: i }, t),
					this.EUo(r, o, t))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						20,
						"Error when process remote damage: Unexpected damageId or invalid target/attacker.",
						["DamageId", e.DamageId],
						["attackerCreatureId", e.AttackerEntityId],
						["targetCreatureId", e.TargetEntityId],
					);
		}
		fUo(e) {
			var t = e.rUo.GetAttributeHolder().CheckGetComponent(155).TakeSnapshot(),
				a = this.rUo.GetAttributeHolder().CheckGetComponent(155).TakeSnapshot();
			return {
				Attacker: this.SUo(e),
				AttackerSnapshot: t,
				Target: this,
				TargetSnapshot: a,
			};
		}
		SUo(e) {
			return GameplayAbilityVisionControl_1.GameplayAbilityVisionControl
				.VisionControlHandle &&
				e.nat.SummonType ===
					Protocol_1.Aki.Protocol.ESummonType.ESummonTypeConcomitantPhantomRole
				? ModelManager_1.ModelManager.CreatureModel.GetEntity(
						e.nat.GetSummonerId(),
					).Entity?.GetComponent(18)
				: e;
		}
		yUo(e, t, a, r, i) {
			var o,
				s = e.DamageData,
				n = e.SkillLevel,
				m = AbilityUtils_1.AbilityUtils.GetLevelValue(s.RateLv, n, 0),
				h = e.ExtraRate;
			if (e.IsReaction)
				return (o = DamagePayloadById_1.configDamagePayloadById.GetConfig(
					s.PayloadId,
				))
					? CharacterDamageCalculations_1.Calculation.ReactionDamageRateCalculation(
							t.AttackerSnapshot,
							t.TargetSnapshot,
							m,
							s.Element,
							o,
							t.AttackerSnapshot.CurrentValues.ReactionEfficiency,
							a,
						)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Character", 20, "找不到结算参数表对应id", [
								"id",
								s.PayloadId,
							]),
						0);
			let l = 1;
			m = this.Entity.GetComponent(0);
			return (
				ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					m.GetEntityType() === Protocol_1.Aki.Protocol.EEntityType.Monster &&
					(l =
						ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
							? CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldDamageRatio2",
								)
							: CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldDamageRatio3",
								)),
				CharacterDamageCalculations_1.Calculation.CalculateFormula(
					e,
					t,
					s,
					n,
					a,
					h,
					r,
					i,
					l,
				)
			);
		}
		mjr(e, t) {
			var a = e.DamageData,
				r = e.SkillLevel,
				i = e.ExtraRate;
			let o = 1;
			var s = this.Entity.GetComponent(0);
			return (
				ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					s.GetEntityType() === Protocol_1.Aki.Protocol.EEntityType.Monster &&
					(o =
						ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
							? CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldDamageRatio2",
								)
							: CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldDamageRatio3",
								)),
				CharacterDamageCalculations_1.Calculation.CalculateFormula(
					e,
					t,
					a,
					r,
					!1,
					i,
					0,
					0,
					o,
				)
			);
		}
		IUo(e, t, a) {
			var r = t.DamageData,
				i =
					a.Attacker.oUo?.GetWeaponType() ??
					ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS,
				r =
					(e.PartialAssign({
						SmashType: r.SmashType,
						ElementType: r.Element,
						WeaponType: i,
					}),
					this.LUo(e, t, a),
					ExtraEffectSnapModifier_1.SnapModifier.ApplyEffects(e, t, a));
			return r;
		}
		LUo(e, t, a) {
			t.IsCounterAttack &&
				(a.Attacker.aat.TriggerEvents(11, a.Target.aat, e),
				this.aat.TriggerEvents(12, a.Attacker.aat, e));
		}
		GetLocalDamage(e, t, a) {
			let r = void 0;
			return (r =
				1 === t.DamageData.CalculateType
					? this.GetLocalHeal(e, t, a)
					: this.GetLocalHurt(e, t, a));
		}
		GetLocalHurt(e, t, a) {
			var r = this.IUo(e, t, a),
				i = ExtraEffectDamageAugment_1.DamageAugment.ApplyEffects(e, a),
				o =
					ExtraEffectSnapModifier_1.DamageAmplifyOnHit.ApplyEffects(e, a) +
					ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit.ApplyEffects(e, a);
			let s = this.yUo(t, a, r, i, o);
			i = ExtraEffectDamageModifier_1.DamageModifier.ApplyEffects(e, a);
			s = i.IsSuccessful ? i.Result : s;
			let n = !1;
			ExtraEffectDamageImmune_1.DamageImmune.ApplyEffects(e, t, a) &&
				((n = !0), (s = 0));
			o = {
				...t,
				Damage: s,
				ShieldCoverDamage: 0,
				IsCritical: r,
				IsTargetKilled: !1,
				IsImmune: n,
			};
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						20,
						"本地伤害计算",
						["伤害值", o.Damage],
						["结算id", t.DamageData.Id],
						["是否弹刀", t.IsCounterAttack],
						["弹刀对应技能MessageId", t.CounterSkillMessageId],
					),
				o
			);
		}
		GetLocalHeal(e, t, a) {
			this.IUo(e, t, a);
			(e = this.mjr(t, a)),
				(a = {
					...t,
					Damage: e,
					ShieldCoverDamage: 0,
					IsCritical: !1,
					IsTargetKilled: !1,
					IsImmune: !1,
				});
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 20, "本地治疗计算", ["damage", a.Damage]),
				a
			);
		}
		GetServerDamage(a, r, i, e) {
			var t = a.Attacker;
			const o = a.DamageData,
				s = Protocol_1.Aki.Protocol.DamageExecuteRequest.create({
					DamageId: MathUtils_1.MathUtils.BigIntToLong(o.Id),
					SkillLevel: a.SkillLevel,
					AttackerEntityId: MathUtils_1.MathUtils.NumberToLong(
						t.Entity.GetComponent(0).GetCreatureDataId(),
					),
					TargetEntityId: MathUtils_1.MathUtils.NumberToLong(
						this.Entity.GetComponent(0).GetCreatureDataId(),
					),
					IsAddEnergy: a.IsAddEnergy,
					IsCounterAttack: a.IsCounterAttack,
					ForceCritical: a.ForceCritical,
					IsBlocked: a.IsBlocked,
					PartId: a.PartId,
					CounterSkillMessageId: a.CounterSkillMessageId
						? MathUtils_1.MathUtils.BigIntToLong(a.CounterSkillMessageId)
						: 0,
					DamageContext: {
						SourceType: a.SourceType,
						BulletId: MathUtils_1.MathUtils.BigIntToLong(
							r.BulletId ?? BigInt(-1),
						),
						BulletTags: r.BulletTags.filter((e) => void 0 !== e),
						SkillId: r.SkillId,
					},
					RandomSeed:
						ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(),
				});
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"伤害Request",
					["攻击方", MathUtils_1.MathUtils.LongToBigInt(s.AttackerEntityId)],
					["受击方", MathUtils_1.MathUtils.LongToBigInt(s.TargetEntityId)],
					["结算id", MathUtils_1.MathUtils.LongToBigInt(s.DamageId)],
					["isBlocked", s.IsBlocked],
					["skillLevel", s.SkillLevel],
					["是否弹刀", s.IsCounterAttack],
					["部位Id", s.PartId],
					["弹刀对应技能MessageId", a.CounterSkillMessageId],
					["RandomSeed", s.RandomSeed],
				),
				CombatMessage_1.CombatNet.Call(
					NetDefine_1.ERequestMessageId.DamageExecuteRequest,
					this.Entity,
					s,
					(e) => {
						var t;
						e &&
							e.ImmuneType !==
								Protocol_1.Aki.Protocol.EDamageImmune
									.EDamageImmune_Invincible &&
							((t = {
								...a,
								Damage: -e.Damage,
								ShieldCoverDamage: e.ShieldCoverDamage,
								IsCritical: e.IsCrit,
								IsTargetKilled: e.KilledTarget,
								IsImmune:
									e.ImmuneType ===
									Protocol_1.Aki.Protocol.EDamageImmune
										.EDamageImmune_BuffEffectElement,
							}),
							(r.IsCritical = t.IsCritical),
							(r.IsImmune = t.IsImmune),
							(r.IsTargetKilled = t.IsTargetKilled),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Battle",
									20,
									"伤害Response",
									[
										"攻击方",
										MathUtils_1.MathUtils.LongToBigInt(s.AttackerEntityId),
									],
									[
										"受击方",
										MathUtils_1.MathUtils.LongToBigInt(s.TargetEntityId),
									],
									["结算id", o.Id],
									["伤害值", t.Damage],
									["killed", t.IsTargetKilled],
									["errorCode", e.ErrorCode],
								),
							0 === e.ErrorCode) &&
							i(t);
					},
					e,
					void 0,
				);
		}
		vUo(e, t, a, r) {
			this.DUo(t, r), this.EUo(e, t.Attacker, a);
		}
		pUo(e, t, a) {
			var r = t.Attacker.Entity,
				i = this.Entity,
				o = e.Damage,
				s = e.DamageData,
				o = [r, i, o, s, a, e, t.HitPosition],
				a =
					(1 === s.CalculateType &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
							i,
						),
					EventSystem_1.EventSystem.EmitWithTarget(
						i,
						EventDefine_1.EEventName.CharBeDamage,
						...o,
					),
					ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
						i.Id,
					)),
				e =
					(a &&
						(a.IsLocal() &&
							EventSystem_1.EventSystem.EmitWithTarget(
								FormationEvent_1.Formation.Local,
								EventDefine_1.EEventName.CharBeDamage,
								...o,
							),
						EventSystem_1.EventSystem.EmitWithTarget(
							FormationEvent_1.Formation.All,
							EventDefine_1.EEventName.CharBeDamage,
							...o,
						)),
					EventSystem_1.EventSystem.EmitWithTarget(
						r,
						EventDefine_1.EEventName.CharDamage,
						...o,
					),
					ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
						r.Id,
					));
			e &&
				(e.IsLocal() &&
					EventSystem_1.EventSystem.EmitWithTarget(
						FormationEvent_1.Formation.Local,
						EventDefine_1.EEventName.CharDamage,
						...o,
					),
				EventSystem_1.EventSystem.EmitWithTarget(
					FormationEvent_1.Formation.All,
					EventDefine_1.EEventName.CharDamage,
					...o,
				));
		}
		EUo(e, t, a) {
			var r = t.aat;
			e.SourceType !== Protocol_1.Aki.Protocol.DamageSourceType.FromEffect &&
				(t?.aat.TriggerEvents(0, this.aat, a), this.aat.TriggerEvents(1, r, a)),
				e.IsTargetKilled && t?.aat.TriggerEvents(6, r, a),
				ExtraEffectDamageAccumulation_1.DamageAccumulation.ApplyEffects(
					e,
					a,
					t,
					this,
				);
		}
		DUo(e, t) {
			var a = e.Attacker?.yte;
			if (a && e.IsAddEnergy) {
				var r,
					i,
					o = e.SkillLevel,
					e = e.DamageData;
				for ([r, i] of [
					e.SpecialEnergy1,
					e.SpecialEnergy2,
					e.SpecialEnergy3,
					e.SpecialEnergy4,
				].entries()) {
					var s = CharacterAttributeTypes_1.specialEnergyIds[r],
						n = AbilityUtils_1.AbilityUtils.GetLevelValue(i, o, 0);
					a.AddBaseValue(s, n);
				}
			}
		}
		MUo(t, e, a = 1) {
			var r = t.Attacker,
				i = e.AttackerSnapshot,
				e = e.TargetSnapshot,
				t = AbilityUtils_1.AbilityUtils.GetLevelValue(
					t.DamageData.ToughLv,
					t.SkillLevel,
					0,
				),
				i = CharacterDamageCalculations_1.Calculation.ToughCalculation(
					i,
					e,
					t * a,
				);
			if (0 !== i) {
				let e = 1;
				t = this.Entity.GetComponent(0);
				ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					t.IsMonster() &&
					(e =
						ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
							? CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldToughRatio2",
								)
							: CommonParamById_1.configCommonParamById.GetFloatConfig(
									"MutiWorldToughRatio3",
								)),
					this.yte.AddBaseValue(
						CharacterAttributeTypes_1.EAttributeId.Tough,
						-i * e,
					);
			}
			return (
				0 <
				this.yte.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tough)
					? 0 < e.CurrentValues.ToughRecoverDelayTime &&
						0 !== i &&
						this.aat.AddBuff(CharacterBuffIds_1.buffId.ToughRecoverDelay, {
							InstigatorId:
								r.nat?.GetCreatureDataId() ??
								ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
							ApplyType:
								CharacterAbilityComponent_1.EBuffApplyType.UseExtraTime,
							Reason: "韧性扣减后触发",
						})
					: !this.Ste.ContainsTagById(-1112841587) &&
						0 < e.CurrentValues.WeakTime &&
						(this.qUo(!0),
						(a = this.yte.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.WeakTime,
						)),
						(this.sUo = TimerSystem_1.TimerSystem.Delay(() => {
							this.Ste &&
								(this.Ste.ContainsTagById(31862857)
									? this.GUo()
									: this.qUo(!1)),
								(this.sUo = void 0);
						}, a)),
						this.yte.SetBaseValue(
							CharacterAttributeTypes_1.EAttributeId.ToughRecover,
							0,
						)),
				i
			);
		}
		qUo(e) {
			e
				? this.Ste.AddTagById(-1112841587)
				: (this.Ste.RemoveTagById(-1112841587), this.nUo?.EndTask());
			var t = Protocol_1.Aki.Protocol.FragileChangeRequest.create();
			(t.EntityId = this.Entity.GetComponent(0).GetCreatureDataId()),
				(t.Flag = e),
				CombatMessage_1.CombatNet.Call(
					NetDefine_1.ERequestMessageId.FragileChangeRequest,
					this.Entity,
					t,
					(e) => {
						e &&
							e.ErrorCode !== Protocol_1.Aki.Protocol.ErrorCode.Success &&
							(this.sUo &&
								(TimerSystem_1.TimerSystem.Remove(this.sUo),
								(this.sUo = void 0)),
							this.Ste.RemoveTagById(-1112841587));
					},
				);
		}
		GUo() {
			this.nUo = this.Ste.ListenForTagAddOrRemove(40422668, () => {
				this.qUo(!1);
			});
		}
		TryExitWeakTime() {
			this.Ste.ContainsTagById(-1112841587) &&
				(this.sUo &&
					(TimerSystem_1.TimerSystem.Remove(this.sUo), (this.sUo = void 0)),
				this.qUo(!1));
		}
		uUo() {
			this.nUo && (this.nUo.EndTask(), (this.nUo = void 0));
		}
		dUo(e) {
			var t = e.Attacker.oUo?.GetSkillLevelByDamageId(e.DamageData.Id),
				a = e.Attacker.Entity.GetComponent(34)?.GetVisionLevelByDamageId(
					e.DamageData.Id,
				);
			t && 0 < t ? (e.SkillLevel = t) : a && 0 < a && (e.SkillLevel = a);
		}
		AddToughModifier(e, t) {
			this.lUo.has(e) || this.lUo.set(e, new Map());
			e = this.lUo.get(e);
			e.set(t, 1 + (e.get(t) ?? 0));
		}
		RemoveToughModifier(e, t) {
			var a,
				e = this.lUo.get(e);
			e && (1 <= (a = e.get(t)) ? e.set(t, a - 1) : e.delete(t));
		}
		GetExtraToughRate(e) {
			var t,
				a,
				e = this.lUo.get(e);
			if (!e) return CharacterAttributeTypes_1.PER_TEN_THOUSAND;
			let r = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
			for ([t, a] of e.entries())
				0 < a &&
					(r *= Math.pow(t / CharacterAttributeTypes_1.PER_TEN_THOUSAND, a));
			return r;
		}
		FallInjure() {
			var e, t, a, r;
			this.Ste.ContainsTagById(1918148596) ||
				!this.YDo.IsInGame ||
				ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure ||
				this.Ste.ContainsTagById(560942831) ||
				((e =
					this.ActorComponent.Actor.CharacterMovement.GetLastUpdateVelocity()
						.Z),
				(a = this.ActorComponent.ActorVelocityProxy.Z),
				(r = this.NUo()),
				-e < this.aUo && (this.hUo = 0),
				(t = this.hUo ? Time_1.Time.WorldTimeSeconds - this.hUo : 0),
				(a = Math.ceil(this.OUo(-e, -a, r, t))) <= 0) ||
				((r = this.nat.GetCreatureDataId()),
				this.Entity.GetComponent(56).CollectSampleAndSend(),
				ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(
					r,
					e,
					t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
				),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnFallInjure,
					a,
					!1,
				),
				this.aat?.RemoveBuffByEffectType(36, "跌落伤害移除冰冻buff"),
				(this.iUo.NeedCalculateFallInjure = !1));
		}
		OUo(e, t, a, r) {
			let i = 0;
			var o = this.yte.GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.LifeMax,
			);
			return (i = this.nat.IsRealMonster()
				? CharacterDamageCalculations_1.Calculation.LandingDamageCalculationMonster(
						a,
						o,
					)
				: CharacterDamageCalculations_1.Calculation.LandingDamageCalculationRole(
						e,
						t,
						r,
						o,
					)) <= 0
				? 0
				: i;
		}
		NUo() {
			var e, t;
			return this.iUo.NeedCalculateFallInjure &&
				((e = this.iUo.BeHitLocation.Z),
				(t = this.ActorComponent.ActorLocationProxy.Z) < e)
				? e - t
				: 0;
		}
		_Uo() {
			return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"landing_damage_args_role",
			)[1];
		}
	});
(CharacterDamageComponent.cUo = void 0),
	(CharacterDamageComponent.mUo = void 0),
	(CharacterDamageComponent.CUo = void 0),
	(CharacterDamageComponent.gUo = void 0),
	(CharacterDamageComponent.TUo = void 0),
	(CharacterDamageComponent.RUo = void 0),
	(CharacterDamageComponent.UUo = void 0),
	(CharacterDamageComponent.AUo = void 0),
	(CharacterDamageComponent.xUo = void 0),
	(CharacterDamageComponent.PUo = void 0),
	(CharacterDamageComponent.wUo = void 0),
	(CharacterDamageComponent.BUo = void 0),
	(CharacterDamageComponent.bUo = void 0),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("DamageExecuteNotify", !1)],
		CharacterDamageComponent,
		"OnDamageExecuteNotify",
		null,
	),
	(CharacterDamageComponent = CharacterDamageComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(18)],
			CharacterDamageComponent,
		)),
	(exports.CharacterDamageComponent = CharacterDamageComponent);
//# sourceMappingURL=CharacterDamageComponent.js.map
