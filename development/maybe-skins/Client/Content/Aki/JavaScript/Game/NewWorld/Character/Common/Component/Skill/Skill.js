"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Skill = void 0);
const UE = require("ue"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
	EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
	MONTAGE_BLEND_TIME = 0.2;
class Skill {
	constructor() {
		(this.AJo = void 0),
			(this.PJo = void 0),
			(this.xJo = void 0),
			(this.wJo = void 0),
			(this.BJo = void 0),
			(this.bJo = void 0),
			(this.ActiveAbility = void 0),
			(this.qJo = void 0),
			(this.GJo = void 0),
			(this.MontageContextId = void 0),
			(this.PreContextId = void 0),
			(this.CombatMessageId = void 0),
			(this.FightStateHandle = 0),
			(this.NJo = 0),
			(this.OJo = !1),
			(this.kJo = !1),
			(this.FJo = void 0),
			(this.GroupSkillCdInfo = void 0),
			(this.HJo = []),
			(this.jJo = !1),
			(this.WJo = void 0),
			(this.KJo = void 0),
			(this.QJo = void 0),
			(this.XJo = []),
			(this.$Jo = new Map()),
			(this.YJo = 0),
			(this.JJo = 0),
			(this.cBe = void 0),
			(this.zJo = void 0),
			(this.Lie = void 0),
			(this.oRe = void 0);
	}
	get SkillId() {
		return this.NJo;
	}
	get Active() {
		return this.OJo;
	}
	get IsSimulated() {
		return this.kJo;
	}
	get SkillInfo() {
		return this.FJo;
	}
	get SkillName() {
		return this.FJo.SkillName.toString();
	}
	get SkillTagIds() {
		return this.HJo;
	}
	HasAnimTag() {
		return this.jJo;
	}
	get AbilityClass() {
		return this.WJo;
	}
	get HasMontages() {
		return !!this.QJo && 0 < this.QJo.length;
	}
	GetMontageByIndex(t) {
		if (this.QJo && !(t < 0 || t >= this.QJo.length)) return this.QJo[t];
	}
	Initialize(t, e, i) {
		(this.cBe = i),
			(this.zJo = i.Entity.GetComponent(157)),
			(this.Lie = i.Entity.GetComponent(185)),
			(this.oRe = i.Entity.GetComponent(160)),
			(this.NJo = t),
			(this.FJo = e),
			(this.OJo = !1),
			(this.YJo = e.InterruptLevel);
		for (let t = e.SkillTag.Num() - 1; 0 <= t; t--) {
			var o = e.SkillTag.Get(t);
			-897737980 ===
				(o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o?.TagName)) &&
				(this.jJo = !0),
				this.HJo.push(o);
		}
		1 === e.SkillMode && this.ZJo(), this.ezo();
	}
	Clear() {
		return (
			this.Active && this.EndSkill(),
			this.KJo &&
				(this.cBe.Entity.GetComponent(17).ClearAbility(this.KJo),
				(this.KJo = void 0)),
			(this.cBe = void 0),
			(this.zJo = void 0),
			(this.Lie = void 0),
			(this.oRe = void 0),
			(this.FJo = void 0),
			(this.ActiveAbility = void 0),
			(this.qJo = void 0),
			(this.OJo = !1),
			(this.GroupSkillCdInfo = void 0),
			(this.QJo = void 0),
			!(this.WJo = void 0)
		);
	}
	ZJo() {
		var t,
			e = this.SkillInfo.SkillGA.AssetPathName.toString();
		e && 0 < e.length && "None" !== e
			? ((this.WJo = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					e,
					UE.Class,
				)),
				this.WJo
					? (this.WJo.IsChildOf(UE.Ga_Passive_C.StaticClass()) &&
							(this.cBe.SetGaPassiveClassToSkillMap(this.WJo, this.SkillId),
							(this.CombatMessageId =
								ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
							SkillMessageController_1.SkillMessageController.UseSkillRequest(
								this.cBe.Entity,
								this,
								0,
							)),
						(t = this.cBe.Entity.GetComponent(17)),
						(this.KJo = t.GetAbility(this.WJo)))
					: CombatDebugController_1.CombatDebugController.CombatError(
							"Skill",
							this.cBe.Entity,
							"加载技能GA失败，GA未加载",
							["技能Id", this.SkillId],
							["技能名", this.SkillName],
							["GA", this.SkillInfo.SkillGA],
							["GA Path", e],
						))
			: CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.cBe.Entity,
					"加载技能GA失败，GA路径为空",
					["技能Id", this.SkillId],
					["技能名", this.SkillName],
					["GA", this.SkillInfo.SkillGA],
					["GA Path", e],
				);
	}
	ezo() {
		if (0 < this.SkillInfo.Animations.Num()) {
			this.QJo = new Array(this.SkillInfo.Animations.Num());
			for (let i = 0; i < this.SkillInfo.Animations.Num(); ++i) {
				const o = this.SkillInfo.Animations.Get(i);
				if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(o)) {
					var t = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(o);
					const s = i;
					var e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						t.ToAssetPathName(),
						UE.AnimMontage,
					);
					e?.IsValid()
						? (this.QJo[s] = e)
						: ResourceSystem_1.ResourceSystem.LoadAsync(
								t.ToAssetPathName(),
								UE.AnimMontage,
								(t) => {
									t?.IsValid()
										? (this.QJo[s] = t)
										: CombatDebugController_1.CombatDebugController.CombatWarn(
												"Skill",
												this.cBe.Entity,
												"蒙太奇加载失败，请检查Animations蒙太奇软路径对象",
												["技能Id", this.SkillId],
												["技能名", this.SkillName],
												["索引", s],
												["AssetNamePath", o.AssetPathName],
											);
								},
							);
				} else
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Skill",
						this.cBe.Entity,
						"蒙太奇软路径对象无效，请设置Animations蒙太奇软路径对象",
						["技能Id", this.SkillId],
						["技能名", this.SkillName],
						["索引", i],
					);
			}
		} else if (0 < this.SkillInfo.MontagePaths.Num()) {
			let t = !1;
			for (let e = 0; e < this.SkillInfo.MontagePaths.Num(); ++e) {
				var i = this.SkillInfo.MontagePaths.Get(e);
				(i && 0 !== i.length) ||
					((t = !0),
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Skill",
						this.cBe.Entity,
						"蒙太奇路径为空，请设置MontagePaths蒙太奇路径",
						["技能Id", this.SkillId],
						["技能名", this.SkillName],
						["索引", e],
					));
			}
			if (!t) {
				this.QJo = new Array(this.SkillInfo.MontagePaths.Num());
				var o = this.cBe.Entity.GetComponent(3).Actor,
					s =
						((o = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
							o.GetClass(),
						)),
						UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(o));
				for (let t = 0; t < this.SkillInfo.MontagePaths.Num(); ++t) {
					var l = this.SkillInfo.MontagePaths.Get(t);
					const e = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
						s,
						l,
					);
					if (
						e &&
						0 !== e.ToAssetPathName().length &&
						"None" !== e.ToAssetPathName()
					) {
						const i = t;
						(l = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
							e.ToAssetPathName(),
							UE.AnimMontage,
						)),
							l?.IsValid()
								? (this.QJo[i] = l)
								: ResourceSystem_1.ResourceSystem.LoadAsync(
										e.ToAssetPathName(),
										UE.AnimMontage,
										(t) => {
											t?.IsValid()
												? (this.QJo[i] = t)
												: CombatDebugController_1.CombatDebugController.CombatWarn(
														"Skill",
														this.cBe.Entity,
														"蒙太奇加载失败，请检查MontagePaths蒙太奇路径",
														["技能Id", this.SkillId],
														["技能名", this.SkillName],
														["索引", i],
														["AssetNamePath", e.ToAssetPathName()],
													);
										},
									);
					}
				}
			}
		}
	}
	AttachEffect(t, e, i, o) {
		let s = this.$Jo.get(e);
		(i = { BoneName: i, EffectHandle: t, WhenSkillEndEnableTime: o }),
			s ? s.push(i) : ((s = []).push(i), this.$Jo.set(e, s));
	}
	tzo(t, e, i) {
		if (
			EffectSystem_1.EffectSystem.IsValid(e) &&
			(EffectSystem_1.EffectSystem.SetTimeScale(e, 1),
			!(0 < i && EffectSystem_1.EffectSystem.GetTotalPassTime(e) > i))
		) {
			var o = EffectSystem_1.EffectSystem.GetSureEffectActor(e);
			switch (t) {
				case 2:
					o && o.K2_DetachFromActor(1, 1, 1),
						EffectSystem_1.EffectSystem.StopEffectById(
							e,
							"[Skill.EffectsProcess] Detach",
							!1,
						);
					break;
				case 4:
					o &&
						(o.K2_DetachFromActor(1, 1, 1),
						EffectSystem_1.EffectSystem.StopEffectById(
							e,
							"[Skill.EffectsProcess] DetachDestroy",
							!0,
						));
					break;
				case 3:
					o &&
						(o.K2_DetachFromActor(1, 1, 1),
						EffectSystem_1.EffectSystem.StopEffectById(
							e,
							"[Skill.EffectsProcess] DetachEnd",
							!1,
						));
					break;
				case 6:
					EffectSystem_1.EffectSystem.StopEffectById(
						e,
						"[Skill.EffectsProcess] UnDetachDestroy",
						!0,
					);
					break;
				case 5:
					EffectSystem_1.EffectSystem.StopEffectById(
						e,
						"[Skill.EffectsProcess] UnDetachEnd",
						!1,
					);
			}
		}
	}
	izo() {
		if (this.$Jo) {
			for (var [t, e] of this.$Jo)
				for (let s = e.length - 1; 0 <= s; s--) {
					var i = e.pop(),
						o = i.EffectHandle;
					this.tzo(t, o, i.WhenSkillEndEnableTime);
				}
			this.$Jo.clear();
		}
	}
	BeginSkill() {
		return !(
			this.Active ||
			((this.OJo = !0),
			(this.kJo = !1),
			(this.CombatMessageId =
				ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
			(this.MontageContextId = void 0))
		);
	}
	BeginSkillBuffAndTag(t) {
		this.JJo = t;
		var e = this.zJo.AddTagWithReturnHandle(this.SkillTagIds);
		if (
			(this.XJo.push(e),
			1 === this.SkillInfo.GroupId &&
				(this.SkillInfo.IsFullBodySkill
					? this.Lie.AddTag(1996624497)
					: this.Lie.AddTag(704115290)),
			!this.IsSimulated)
		) {
			0 < Math.abs(this.SkillInfo.StrengthCost) &&
				((e = this.zJo.AddBuffLocal(
					CharacterBuffIds_1.buffId.SkillStrengthForbidden,
					{
						InstigatorId: this.zJo.CreatureDataId,
						Reason: `技能${this.SkillId}存在体力消耗`,
						PreMessageId: this.CombatMessageId,
					},
				)),
				this.XJo.push(e));
			e = this.zJo.AddAttributeRateModifierLocal(
				EAttributeId.Proto_SkillToughRatio,
				this.SkillInfo.ToughRatio - 1,
				`技能${this.SkillId}技能状态韧性系数`,
			);
			this.XJo.push(e),
				0 < this.SkillInfo.ImmuneFallDamageTime &&
					((e = this.zJo.AddBuffLocal(CharacterBuffIds_1.buffId.FallImmune, {
						InstigatorId: this.zJo.CreatureDataId,
						Duration: this.SkillInfo.ImmuneFallDamageTime,
						Reason: `技能${this.SkillId}跌落伤害保护`,
						PreMessageId: this.CombatMessageId,
					})),
					this.XJo.push(e));
			for (let e = 0; e < this.SkillInfo.SkillBuff.Num(); ++e) {
				var i = this.zJo.AddBuffLocal(this.SkillInfo.SkillBuff.Get(e), {
					InstigatorId: this.zJo.CreatureDataId,
					Level: t,
					Reason: `技能${this.SkillId}通过技能期间生效的GE添加`,
					PreMessageId: this.CombatMessageId,
				});
				this.XJo.push(i);
			}
			for (let e = 0; e < this.SkillInfo.SkillStartBuff.Num(); ++e)
				this.zJo.AddBuff(this.SkillInfo.SkillStartBuff.Get(e), {
					InstigatorId: this.zJo.CreatureDataId,
					Level: t,
					Reason: `技能${this.SkillId}开始时添加`,
					PreMessageId: this.CombatMessageId,
				});
		}
	}
	EndSkill() {
		if (!this.Active) return !1;
		if (
			((this.SkillInfo.InterruptLevel = this.YJo),
			(this.OJo = !1),
			(this.ActiveAbility = void 0),
			this.cBe.FightStateComp?.ExitState(this.FightStateHandle),
			ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
				this.MontageContextId,
			),
			this.ozo(),
			this.izo(),
			this.XJo.forEach((t) => {
				this.zJo.RemoveBuffByHandle(t, -1, "技能结束移除");
			}),
			(this.XJo.length = 0),
			1 === this.SkillInfo.GroupId &&
				(this.SkillInfo.IsFullBodySkill
					? this.Lie.RemoveTag(1996624497)
					: this.Lie.RemoveTag(704115290)),
			!this.IsSimulated)
		)
			for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t)
				this.zJo.AddBuff(this.SkillInfo.SkillEndBuff.Get(t), {
					InstigatorId: this.zJo.CreatureDataId,
					Level: this.JJo,
					Reason: `技能${this.SkillId}结束时添加`,
					PreMessageId: this.CombatMessageId,
				});
		return !0;
	}
	SimulatedBeginSkill(t) {
		return (
			!this.Active &&
			((this.OJo = !0),
			(this.kJo = !0),
			(this.CombatMessageId =
				ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
			this.BeginSkillBuffAndTag(0),
			!0)
		);
	}
	SetTimeDilation(t, e) {
		for (const i of this.$Jo.values())
			if (i)
				for (const o of i)
					EffectSystem_1.EffectSystem.IsValid(o.EffectHandle) &&
						EffectSystem_1.EffectSystem.SetTimeScale(o.EffectHandle, t * e);
	}
	SetSkillPriority(t) {
		this.SkillInfo && (this.SkillInfo.InterruptLevel = t);
	}
	PlayMontage(t, e, i, o, s) {
		if (!this.QJo || t >= this.QJo.length)
			return (
				CombatDebugController_1.CombatDebugController.CombatError(
					"Skill",
					this.cBe.Entity,
					"播放的蒙太奇索引不存在",
					["技能id:", this.SkillId],
					["技能名:", this.SkillName],
					["index:", t],
				),
				!1
			);
		const l = this.QJo[t];
		return (
			!!l?.IsValid() &&
			((i = i
				? FNameUtil_1.FNameUtil.GetDynamicFName(i)
				: FNameUtil_1.FNameUtil.EMPTY),
			(this.qJo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
				this.oRe.MainAnimInstance,
				l,
				e,
				o,
				i,
			)),
			this.qJo.EndCallback.Add((t) => {
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"Skill",
					this.cBe.Entity,
					"OnMontageTaskEnd",
					["技能Id", this.SkillId],
					["蒙太奇", l ? l.GetName() : ""],
					["是否被打断", t],
				),
					s?.(t);
			}),
			(this.GJo = s),
			ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
				this.MontageContextId,
			),
			(this.MontageContextId =
				ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
					this.SkillId,
					t,
				)),
			!0)
		);
	}
	ozo() {
		var t;
		this.qJo &&
			((t = this.qJo.MontageToPlay),
			this.qJo.EndTask(),
			(this.qJo = void 0),
			this.oRe.MainAnimInstance.Montage_Stop(0.2, t));
	}
	RequestStopMontage() {
		CombatDebugController_1.CombatDebugController.CombatDebug(
			"Skill",
			this.cBe.Entity,
			"RequestStopMontage",
			["技能Id", this.SkillId],
		),
			this.GJo?.(!0),
			(this.GJo = void 0);
	}
	SetEffectHidden(t) {
		for (const e of this.$Jo.values())
			for (const i of e)
				EffectSystem_1.EffectSystem.IsValid(i.EffectHandle) &&
					EffectSystem_1.EffectSystem.GetEffectActor(
						i.EffectHandle,
					).SetActorHiddenInGame(t);
	}
}
exports.Skill = Skill;
