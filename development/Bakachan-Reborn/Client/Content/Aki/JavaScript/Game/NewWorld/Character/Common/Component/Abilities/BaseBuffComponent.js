"use strict";
var BaseBuffComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, f) {
			var n,
				r = arguments.length,
				a =
					r < 3
						? t
						: null === f
							? (f = Object.getOwnPropertyDescriptor(t, o))
							: f;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, o, f);
			else
				for (var i = e.length - 1; 0 <= i; i--)
					(n = e[i]) &&
						(a = (r < 3 ? n(a) : 3 < r ? n(t, o, a) : n(t, o)) || a);
			return 3 < r && a && Object.defineProperty(t, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	StatDefine_1 = require("../../../../../Common/StatDefine"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	ActiveBuff_1 = require("./Buff/ActiveBuff"),
	ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	CharacterBuffIds_1 = require("./CharacterBuffIds");
let BaseBuffComponent = (BaseBuffComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.BuffContainer = new Map()),
			(this.BuffGarbageSet = new Set()),
			(this.BuffEffectManager = void 0),
			(this.TagListenerDict = new Map()),
			(this.TagImmuneListenerDict = new Map()),
			(this.EffectTimeoutMap = new Map()),
			(this.jbr = 0),
			(this.InitLockInternal = 0),
			(this.TriggerMap = new Map());
	}
	GetDebugName() {
		return "";
	}
	OnClear() {
		var e = this.BuffEffectManager;
		if (e) {
			for (const t of e.FilterById(31)) t?.OnRemoved(!0);
			for (const t of e.FilterById(33)) t?.OnRemoved(!0);
			for (const t of e.FilterById(32)) t?.OnRemoved(!0);
			for (const t of e.FilterById(51)) t?.OnRemoved();
			for (const t of e.FilterById(50)) t?.OnRemoved();
			for (const t of e.FilterById(21)) t?.OnRemoved(!0);
			e.Clear();
		}
		return (
			this.BuffContainer.clear(),
			this.BuffGarbageSet.clear(),
			this.EffectTimeoutMap.clear(),
			!0
		);
	}
	OnTick(e) {
		return (this.BuffLock = 0), !(this.InitLock = 0);
	}
	NeedBroadcastBuff(e = 0) {
		return !(0 < this.InitLock) && this.HasBuffAuthority();
	}
	HasBuffAuthority() {
		return !1;
	}
	GetEntity() {}
	GetExactEntity() {
		return this.Entity;
	}
	GetAttributeComponent() {}
	GetTagComponent() {}
	GetSkillComponent() {}
	GetPassiveSkillComponent() {
		return this.GetEntity()?.GetComponent(23);
	}
	GetActorComponent() {}
	GetCueComponent() {}
	GetTimeScale() {
		return 0;
	}
	MarkListenerBuff(e) {
		if (this.NeedCheck(e.Config)) {
			var t = e.Config;
			if (t) {
				var o = e.Handle;
				for (const e of [
					t.ActivateTagRequirements,
					t.ActivateTagIgnores,
					t.RemoveTagExistAll,
					t.RemoveTagExistAny,
					t.RemoveTagIgnores,
				])
					if (e && !(e.length <= 0))
						for (const t of e.values()) {
							let e = this.TagListenerDict.get(t);
							e || this.TagListenerDict.set(t, (e = new Set())), e.add(o);
						}
				if (t.ImmuneTags && 0 < t.ImmuneTags.length)
					for (const e of t.ImmuneTags.values()) {
						let t = this.TagImmuneListenerDict.get(e);
						t || this.TagImmuneListenerDict.set(e, (t = new Set())), t.add(o);
					}
			}
		}
	}
	RemoveListenerBuff(e) {
		if (this.NeedCheck(e.Config)) {
			var t = e.Config;
			if (t) {
				var o = e.Handle;
				for (const e of [
					t.ActivateTagRequirements,
					t.ActivateTagIgnores,
					t.RemoveTagExistAll,
					t.RemoveTagExistAny,
					t.RemoveTagIgnores,
				])
					if (e && !(e.length <= 0))
						for (const t of e.values()) {
							var f = this.TagListenerDict.get(t);
							f && (f.delete(o), f.size <= 0) && this.TagListenerDict.delete(t);
						}
				if (t.ImmuneTags && 0 < t.ImmuneTags.length)
					for (const e of t.ImmuneTags.values()) {
						var n = this.TagImmuneListenerDict.get(e);
						n &&
							(n.delete(o), n.size <= 0) &&
							this.TagImmuneListenerDict.delete(e);
					}
			}
		}
	}
	IsPaused() {
		return !1;
	}
	RefreshTimeScale() {
		var e = this.GetTimeScale(),
			t = this.IsPaused();
		for (const o of this.BuffContainer.values()) o.OnTimeScaleChanged(e, t);
	}
	OnChangeTimeDilation() {
		return this.RefreshTimeScale(), !0;
	}
	NeedCheck(e) {
		return (
			!!e &&
			(e.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID || this.HasBuffAuthority())
		);
	}
	CheckAdd(e, t, o) {
		if (0 < this.InitLock) return !0;
		if (!e) return !1;
		if (!o && this.NeedCheck(e)) {
			const f = this.GetTagComponent(),
				n =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						t,
					)?.Entity?.GetComponent(185);
			if (
				e.Probability < CharacterAttributeTypes_1.PER_TEN_THOUSAND &&
				RandomSystem_1.default.GetRandomPercent() > e.Probability
			)
				return !1;
			if (!f) return !1;
			if (
				e.AddTagIgnores?.some((e) => f.HasTag(e)) ||
				e.AddTagRequirements?.some((e) => !f.HasTag(e))
			)
				return !1;
			if (this.CheckRemove(e)) return !1;
			if (
				e.RemoveTagIgnores &&
				0 < e.RemoveTagIgnores.length &&
				!e.RemoveTagIgnores.some((e) => f.HasTag(e))
			)
				return !1;
			if (
				0 < (o = e.RemoveTagExistAll ?? []).length &&
				o.every((e) => f.HasTag(e))
			)
				return !1;
			if (
				0 < (t = e.RemoveTagExistAny ?? []).length &&
				t.some((e) => f.HasTag(e))
			)
				return !1;
			if (
				n &&
				(e.AddInstigatorTagIgnores?.some((e) => n.HasTag(e)) ||
					e.AddInstigatorTagRequirements?.some((e) => !n.HasTag(e)))
			)
				return !1;
		}
		return !this.CheckImmune(e);
	}
	CheckImmune(e) {
		for (const f of this.TagImmuneListenerDict.keys())
			if (
				e.GrantedTags?.some((e) =>
					GameplayTagUtils_1.GameplayTagUtils.IsChildTag(e, f),
				)
			)
				for (const n of this.TagImmuneListenerDict.get(f).keys()) {
					var t = this.BuffContainer.get(n),
						o = t?.Config;
					if (
						o &&
						t &&
						t.IsValid() &&
						t.IsActive() &&
						e.GrantedTags &&
						((o =
							GameplayTagUtils_1.GameplayTagUtils.HasAll(
								e.GrantedTags,
								o.ImmuneTags,
							) &&
							!GameplayTagUtils_1.GameplayTagUtils.HasAny(
								e.GrantedTags,
								o.ImmuneTagIgnores,
							)),
						t?.IsActive() && o)
					)
						return !0;
				}
		return !1;
	}
	CheckRemove(e) {
		const t = this.GetTagComponent();
		var o, f, n;
		return t
			? ((o =
					!!e.RemoveTagIgnores?.length &&
					!e.RemoveTagIgnores.some((e) => t.HasTag(e))),
				(f =
					!!e.RemoveTagExistAll?.length &&
					e.RemoveTagExistAll.every((e) => t.HasTag(e))),
				(n =
					!!e.RemoveTagExistAny?.length &&
					e.RemoveTagExistAny.some((e) => t.HasTag(e))),
				o || f || n)
			: !(
					e.RemoveTagIgnores?.length &&
					e.RemoveTagExistAll?.length &&
					e.RemoveTagExistAny?.length
				);
	}
	CheckActivate(e) {
		const t = this.GetTagComponent();
		return (
			!!t &&
			!e.ActivateTagIgnores?.some((e) => t.HasTag(e)) &&
			!e.ActivateTagRequirements?.some((e) => !t.HasTag(e))
		);
	}
	SetBuffEffectCd(e, t, o) {
		let f = this.EffectTimeoutMap.get(e);
		f || this.EffectTimeoutMap.set(e, (f = new Map())),
			f.set(t, Time_1.Time.ServerStopTimeStamp + o);
	}
	GetBuffEffectCd(e, t) {
		return (
			(e = this.EffectTimeoutMap.get(e)?.get(t) ?? 0),
			Math.max(e - Time_1.Time.ServerStopTimeStamp, 0)
		);
	}
	CreateAnimNotifyContentWithoutSkill() {
		var e,
			t = this.Entity.GetComponent(22);
		if (t && t.MontageTaskMessageId)
			return (
				(e = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
				SkillMessageController_1.SkillMessageController.AnimNotifyRequest(
					this.Entity,
					-1,
					-1,
					this.GetSkillComponent()?.PendingAnIndex ?? -1,
					t.MontageTaskMessageId,
					e,
				),
				e
			);
		CombatDebugController_1.CombatDebugController.CombatError(
			"Buff",
			this.Entity,
			"CreateAnimNotifyContentWithoutSkill参数异常",
		);
	}
	CreateAnimNotifyContentWithSkill() {
		var e = this.GetSkillComponent()?.CurrentSkill;
		if (e) {
			var t = e.SkillId;
			let n = e.MontageContextId;
			n = n || e.CombatMessageId;
			var o, f;
			e = this.GetSkillComponent().PendingAnIndex;
			if (n && -1 !== e)
				return (
					(o =
						ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(
							n,
						)?.v4n) ||
						CombatDebugController_1.CombatDebugController.CombatDebug(
							"Buff",
							this.Entity,
							"CreateAnimNotifyContent AnimSequenceAN",
						),
					(o = o?.M4n ?? -1),
					(f = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
					SkillMessageController_1.SkillMessageController.AnimNotifyRequest(
						this.Entity,
						t,
						o,
						e,
						n,
						f,
					),
					f
				);
			CombatDebugController_1.CombatDebugController.CombatError(
				"Buff",
				this.Entity,
				"CreateANCFromSkill",
				["ANIndex", e],
			);
		}
	}
	CreateAnimNotifyContent(e, t) {
		if (
			!(
				(e && CharacterBuffIds_1.specialIgnoreBuff.includes(e)) ||
				(t && CharacterBuffIds_1.specialIgnoreBullet.includes(t))
			)
		)
			return this.GetSkillComponent()?.CurrentSkill
				? this.CreateAnimNotifyContentWithSkill()
				: this.CreateAnimNotifyContentWithoutSkill();
	}
	AddBuffFromAnimNotify(e, t, o) {
		e <= ActiveBuffConfigs_1.NULL_BUFF_ID
			? CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.Entity,
					"AddBuffFromAnimNotify不合法的buffId",
					["buffId", e],
				)
			: ((o.PreMessageId = (t || this).CreateAnimNotifyContent(e)),
				this.AddBuff(e, o));
	}
	AddBuffFromAi(e, t, o) {
		e ||
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Buff",
				this.Entity,
				"AddBuffFromAI No preContextId",
			),
			(o.PreMessageId = e),
			this.AddBuff(t, o);
	}
	AddBuffForDebug(e, t) {
		t.Level =
			t.Level ??
			ModelManager_1.ModelManager.CreatureModel.GetEntity(t.InstigatorId)
				?.Entity?.GetComponent(187)
				.GetBuffLevel(e);
		var o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
				this.Entity.Id,
			),
			f = new Protocol_1.Aki.Protocol.qQn();
		(f.Z4n = 0),
			(f.H3n =
				`@gmapplybuff ${o} ${e} ${t.InstigatorId} ` +
				(t.Level ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL)),
			Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(f), () => {});
	}
	AddBuff(e, t) {
		e <= ActiveBuffConfigs_1.NULL_BUFF_ID
			? CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.Entity,
					"尝试添加buff时传入了不合法的buffId",
					["buffId", e],
					["创建者", t.InstigatorId],
					["持有者", this.GetDebugName()],
				)
			: (t.PreMessageId ||
					(0, CharacterBuffIds_1.checkBuffInSpecialList)(e) ||
					CombatDebugController_1.CombatDebugController.CombatError(
						"Buff",
						this.Entity,
						"AddBuff No PreMessageId",
						["buffId", e],
					),
				(t.Level =
					t.Level ??
					ModelManager_1.ModelManager.CreatureModel.GetEntity(t.InstigatorId)
						?.Entity?.GetComponent(187)
						.GetBuffLevel(e)),
				this.HasBuffAuthority()
					? this.AddBuffLocal(e, t)
					: this.AddBuffOrder(e, t));
	}
	AddBuffLocal(
		e,
		{
			InstigatorId: t = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
			Level: o,
			OuterStackCount: f,
			ApplyType: n = Protocol_1.Aki.Protocol.CGs.Proto_Common,
			PreMessageId: r,
			MessageId: a,
			Duration: i = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
			ServerId: s = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
			IsIterable: u = !0,
			IsServerOrder: l = !1,
			Reason: g,
		},
	) {
		var C, m;
		return this.HasBuffAuthority()
			? (C = require("./CharacterBuffController").default.GetBuffDefinition(e))
				? ((m =
						ModelManager_1.ModelManager.CreatureModel.GetEntity(
							t,
						)?.Entity?.GetComponent(187)),
					(o =
						o ?? m?.GetBuffLevel(e) ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL),
					this.AddBuffInner(
						e,
						C,
						t,
						o,
						f,
						n,
						r,
						a,
						i,
						void 0,
						s,
						g,
						!1,
						u,
						l,
						void 0,
					))
				: ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
			: (CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					this.Entity,
					"[local] 模拟端不本地添加buff",
					["buffId", e],
					["施加者", t],
					["持有者", this.GetDebugName()],
					["前置行为id", r],
					["原因", g],
				),
				ActiveBuffConfigs_1.INVALID_BUFF_HANDLE);
	}
	AddBuffOrder(e, t) {}
	AddBuffRemote(
		e,
		t,
		{
			InstigatorId: o = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
			Level: f = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
			OuterStackCount: n,
			ApplyType: r = Protocol_1.Aki.Protocol.CGs.Proto_Common,
			PreMessageId: a,
			MessageId: i,
			Duration: s = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
			RemainDuration: u,
			ServerId: l = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
			IsActive: g,
			Reason: C,
		},
	) {
		var m = require("./CharacterBuffController").default;
		m = this.AddBuffInner(
			e,
			m.GetBuffDefinition(e),
			o,
			f,
			n,
			r,
			a,
			i,
			s,
			g,
			l,
			C,
			!0,
			!0,
			!1,
			t,
		);
		(e = this.BuffContainer.get(m)) &&
			this.HasBuffAuthority() &&
			void 0 !== u &&
			e.SetRemainDuration(u);
	}
	AddIterativeBuff(e, t, o, f, n) {
		t
			? this.AddBuff(e, {
					InstigatorId:
						t.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
					Level: t.Level,
					PreMessageId: t.MessageId,
					ServerId: t.ServerId,
					OuterStackCount: o,
					IsIterable: f,
					Reason: n,
				})
			: CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.Entity,
					"尝试添加迭代buff失败，未找到前置buff",
					["buffId", e],
					["持有者", this.GetDebugName()],
					["原因", n],
				);
	}
	static GetBuffStat(e) {
		return this.Wbr.has(e) || this.Wbr.set(e, void 0), this.Wbr.get(e);
	}
	AddBuffInner(e, t, o, f, n, r, a, i, s, u, l, g, C, m, d, c) {
		BaseBuffComponent_1.GetBuffStat(e), this.BuffLock++;
		var h = [
			["buffId", e],
			["创建者id", o],
			["持有者", this.GetDebugName()],
			["原因", g],
		];
		if (!t)
			return (
				CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.Entity,
					"[local] 添加buff时找不到配置",
					...h,
				),
				this.BuffLock--,
				ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
			);
		if (
			((r = r ?? Protocol_1.Aki.Protocol.CGs.Proto_Common) !==
				Protocol_1.Aki.Protocol.CGs.Proto_Common ||
				this.NeedCheck(t) ||
				(s = -1),
			!this.CheckAdd(t, o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, C))
		)
			return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
		C = this.GetStackableBuff(
			o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
			e,
			t.StackingType,
		);
		let B = n && 0 < n ? n : t.DefaultStackCount;
		if (!C) {
			let C;
			0 === t.DurationPolicy
				? ((c = ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE),
					(s = ActiveBuffConfigs_1.INFINITY_DURATION),
					(B = 1))
				: (c =
						c ?? require("./CharacterBuffController").default.GenerateHandle());
			try {
				C = ActiveBuff_1.ActiveBuffInternal.AllocBuff(
					t,
					c,
					o,
					this,
					l,
					a,
					i,
					f,
					B,
					s,
				);
			} catch (e) {
				CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
					"Buff",
					this.Entity,
					"Buff初始过程中发生异常",
					e,
					...h,
				);
			}
			if (!C) return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
			0 < C.Id &&
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Buff",
					this.Entity,
					"本地添加buff",
					...h,
					["handle", c],
					["前置行为id", a],
					["说明", t.Desc],
					["是否迭代", m],
				);
			try {
				this.OnBuffAdded(C, n, r, a, s, u, l, m, d, g);
			} catch (e) {
				CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
					"Buff",
					this.Entity,
					"Buff添加中发生异常",
					e,
					...h,
				);
			}
			return (
				0 === t.DurationPolicy &&
					ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(C),
				this.BuffLock--,
				c
			);
		}
		if (
			C.Config &&
			(C.Config.StackLimitCount <= 0 ||
				!C.Config.DenyOverflowAdd ||
				C.StackCount < C.Config.StackLimitCount)
		) {
			0 < t.StackAppendCount && (B = t.StackAppendCount),
				(e = 0 < t.StackLimitCount ? t.StackLimitCount : 1 / 0),
				(i = C.StackCount),
				(u = Math.min(i + B, e));
			try {
				this.OnBuffStackIncreased(
					C,
					i,
					u,
					o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
					f,
					n,
					r,
					a,
					s,
					l,
					m,
					d,
					g,
				),
					this.BuffEffectManager.ApplyInitBuffExecution(C, m);
			} catch (e) {
				CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
					"Buff",
					this.Entity,
					"Buff层数改变中发生异常",
					e,
					...h,
				);
			}
		}
		return this.BuffLock--, C.Handle;
	}
	RemoveBuff(e, t, o, f, n) {
		this.HasBuffAuthority()
			? this.RemoveBuffLocal(e, t, o, f, n)
			: this.RemoveBuffOrder(e, t, o);
	}
	RemoveBuffOrder(e, t, o) {}
	RemoveBuffLocal(e, t, o, f, n) {
		var r;
		return e <= ActiveBuffConfigs_1.NULL_BUFF_ID
			? (CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					this.Entity,
					"尝试本地移除buff时传入了不合法的buffId",
					["buffId", e],
					["持有者", this.GetDebugName()],
					["原因", o],
				),
				0)
			: this.HasBuffAuthority()
				? (r = this.GetBuffById(e))
					? this.RemoveBuffInner(r.Handle, t, !0, o, f, n)
					: 0
				: (CombatDebugController_1.CombatDebugController.CombatError(
						"Buff",
						this.Entity,
						"无法直接移除非本端控制实体持有的buff，请换用RemoveBuff接口",
						["buffId", e],
						["持有者", this.GetDebugName()],
						["原因", o],
					),
					0);
	}
	RemoveBuffByTagLocal(e, t) {
		if (this.HasBuffAuthority()) {
			var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
			for (const f of this.BuffContainer.values())
				f.Config.GrantedTags?.some((t) =>
					GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e),
				) && this.RemoveBuffInner(f.Handle, -1, !0, t ?? "移除tag " + o);
		} else
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Buff",
				this.Entity,
				"尝试根据tag移除非本地控制的实体的buff，移除操作将不被执行",
				["tagId", e],
				["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
				["持有者", this.GetDebugName()],
				["原因", t],
			);
	}
	RemoveBuffByEffectType(e, t) {
		var o = new Set(),
			f = require("./ExtraEffect/ExtraEffectDefine")?.getBuffEffectClass(e);
		if (f) {
			for (const e of this.BuffEffectManager.GetAllEffects())
				e instanceof f && o.add(e.BuffId);
			for (const e of o.values()) this.RemoveBuff(e, -1, t);
		}
	}
	RemoveBuffByHandle(e, t = -1, o, f, n) {
		var r;
		return (
			this.HasBuffAuthority() ||
				((r = this.GetBuffByHandle(e)) &&
					0 < r.Id &&
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"Buff",
						this.Entity,
						"尝试直接通过handle移除非本端控制buff，后续需要新增协议",
						["buffId", r?.Id],
						["handle", e],
						["持有者", this.GetDebugName()],
						["说明", r?.Config?.Desc],
						["原因", o],
					)),
			this.RemoveBuffByHandleLocal(e, t, o, f, n)
		);
	}
	RemoveBuffByHandleLocal(e, t = -1, o, f, n) {
		return this.RemoveBuffInner(e, t, !0, o, f, n);
	}
	RemoveBuffWhenTimeout(e) {
		var t = e.Config.StackExpirationRemoveNumber;
		this.RemoveBuffInner(e.Handle, t, !1, "时间结束自然移除"),
			0 < t && e.IsValid() && e.SetDuration();
	}
	RemoveBuffInner(e, t, o, f, n, r) {
		if (!(e = this.GetBuffByHandle(e))) return 0;
		this.BuffLock++;
		var a = [
				["buffId", e.Id],
				["持有者", this.GetDebugName()],
				["handle", e?.Handle],
				["说明", e?.Config.Desc],
				["原因", f],
			],
			i =
				(0 < e.Id &&
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Buff",
						this.Entity,
						"本地移除buff",
						...a,
					),
				e.StackCount);
		if ((t = t <= 0 ? 0 : Math.max(0, i - t)) <= 0)
			try {
				this.OnBuffRemoved(e, o, f, r, n);
			} catch (e) {
				CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
					"Buff",
					this.Entity,
					"Buff移除时发生异常",
					e,
					...a,
				);
			}
		else
			try {
				this.OnBuffStackDecreased(e, i, t, o, f);
			} catch (e) {
				CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
					"Buff",
					this.Entity,
					"Buff层数降低时发生异常",
					e,
					...a,
				);
			}
		return this.BuffLock--, i - t;
	}
	GetAllBuffs() {
		var e = [];
		for (const t of this.BuffContainer.values())
			this.BuffGarbageSet.has(t.Handle) || e.push(t);
		return e;
	}
	GetBuffByHandle(e) {
		if (!this.BuffGarbageSet.has(e)) return this.BuffContainer.get(e);
	}
	GetBuffById(e) {
		for (const t of this.BuffContainer.values())
			if (t.Id === e && !this.BuffGarbageSet.has(t.Handle)) return t;
	}
	GetBuffLevel(e) {}
	GetStackableBuff(e, t, o) {
		switch (o) {
			case 2:
				for (const e of this.BuffContainer.values())
					if (e.Id === t && !this.BuffGarbageSet.has(e.Handle)) return e;
				return;
			case 1:
				for (const o of this.BuffContainer.values())
					if (
						o.Id === t &&
						!this.BuffGarbageSet.has(o.Handle) &&
						o.InstigatorId === e
					)
						return o;
				return;
			default:
				return;
		}
	}
	GetBuffTotalStackById(e, t = !1) {
		let o = 0;
		for (const f of this.BuffContainer.values())
			f.Id !== e ||
				this.BuffGarbageSet.has(f.Handle) ||
				(t && !f.IsActive()) ||
				(o += f.StackCount);
		return o;
	}
	OnBuffAdded(e, t, o, f, n, r, a, i, s, u) {
		if (e) {
			var l = e.Config;
			if (e.IsInstantBuff()) {
				this.ApplyPeriodExecution(e);
				var g = this.GetExactEntity()?.GetComponent(185);
				if (g) {
					for (const e of l.GrantedTags ?? []) g?.AddTag(e);
					for (const e of l.GrantedTags ?? []) g?.RemoveTag(e);
				}
			} else {
				var C = e.Handle;
				this.BuffContainer.set(C, e),
					this.MarkListenerBuff(e),
					this.BuffEffectManager.OnBuffAdded(e);
			}
			this.NeedCheck(e.Config)
				? this.OnBuffActiveChanged(e, r ?? this.CheckActivate(e.Config))
				: void 0 === r
					? CombatDebugController_1.CombatDebugController.CombatError(
							"Buff",
							this.Entity,
							"buff激活状态未知",
							["buffId", e.Id],
							["handle", e.Handle],
						)
					: this.OnBuffActiveChanged(e, r),
				e.IsActive() &&
					l &&
					0 < l.Period &&
					l.ExecutePeriodicOnAdd &&
					e.ResetPeriodTimer(
						TimerSystem_1.MIN_TIME * CommonDefine_1.SECOND_PER_MILLIONSECOND,
					),
				Info_1.Info.IsBuildDevelopmentOrDebug &&
					(this.Entity.GetComponent(24)?.OnBuffAdded(e),
					this.Entity.GetComponent(20)?.OnBuffAdded(e)),
				this.BuffEffectManager.ApplyInitBuffExecution(e, i),
				e.OnTimeScaleChanged(this.GetTimeScale(), this.IsPaused());
		}
	}
	ApplyPeriodExecution(e) {
		var t = e.Config,
			o = e.GetInstigatorAttributeSet();
		if (t.Modifiers && 0 < t.Modifiers.length) {
			var f = this.GetAttributeComponent();
			if (f) {
				var n,
					r,
					a = this.GetTimeScale();
				for ([n, r] of e.StateModifiers)
					this.HasBuffAuthority() &&
						ActiveBuff_1.ActiveBuffInternal.ModifyStateAttribute(
							o,
							f,
							n,
							e.Level,
							a,
							r,
						);
			} else
				CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					this.Entity,
					"周期buff尝试修改属性，但owner不存在",
					["buffId", e.Id],
					["handle", e.Handle],
					["持有者", e.GetOwnerBuffComponent()?.GetDebugName()],
					["施加者", e.InstigatorId],
				);
		}
		this.BuffEffectManager?.ApplyPeriodBuffExecution(e);
		for (const t of this.BuffEffectManager?.GetEffectsByHandle(e.Handle) ?? [])
			t.OnPeriodCallback();
	}
	OnBuffRemoved(e, t, o, f, n) {}
	OnBuffStackDecreased(e, t, o, f, n) {
		e &&
			(e.SetStackCount(o),
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Buff",
				this.Entity,
				"[buffComp] Buff层数降低",
				["handle", e.Handle],
				["buffId", e.Id],
				["创建者", e.InstigatorId],
				["持有者", e.GetOwnerDebugName()],
				["说明", e.Config?.Desc],
				["oldStack", t],
				["newStack", e.StackCount],
				["原因", n],
			),
			this.BuffEffectManager.OnStackDecreased(e, o, t, f));
	}
	OnBuffStackIncreased(e, t, o, f, n, r, a, i, s, u, l, g, C) {
		if (e) {
			e.SetStackCount(o),
				0 !== e.Config.StackDurationRefreshPolicy ||
					(!this.NeedCheck(e.Config) &&
						a === Protocol_1.Aki.Protocol.CGs.Proto_Common) ||
					e.SetDuration(s);
			a = e.Config;
			var m = e.Handle;
			if (
				a &&
				(0 < e.Id &&
					CombatDebugController_1.CombatDebugController.CombatDebug(
						"Buff",
						this.Entity,
						"[buffComp] Buff层数改变",
						["handle", m],
						["buffId", e.Id],
						["创建者", e.InstigatorId],
						["持有者", e.GetOwnerDebugName()],
						["说明", a.Desc],
						["oldStack", t],
						["newStack", e.StackCount],
						["原因", C],
					),
				this.BuffEffectManager.OnStackIncreased(e, o, t, f),
				this.HasBuffAuthority()) &&
				(s = 0 < a.StackLimitCount ? a.StackLimitCount : 1 / 0) <= t &&
				s <= o
			) {
				if ((C = a.OverflowEffects) && 0 < C.length)
					for (const t of C)
						this.AddIterativeBuff(
							t,
							e,
							void 0,
							!0,
							`Buff层数溢出时迭代添加新buff（前置buff Id=${e.Id}, handle=${m}）`,
						);
				e.Config.ClearStackOnOverflow &&
					this.RemoveBuffByHandle(m, -1, "Buff层数溢出时清除");
			}
		}
	}
	OnBuffActiveChanged(e, t) {}
	OnTagChanged(e) {
		this.BuffLock++;
		var t = this.TagListenerDict.get(e),
			o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
		if (t) {
			for (const e of [...t.values()]) {
				var f = this.GetBuffByHandle(e);
				f &&
					this.CheckRemove(f.Config) &&
					this.RemoveBuffInner(e, -1, !0, `因为tag ${o}的变化触发`);
			}
			for (const e of [...t.values()]) {
				var n,
					r = this.GetBuffByHandle(e);
				r
					? (n = this.CheckActivate(r.Config)) !== r.IsActive() &&
						this.OnBuffActiveChanged(r, n)
					: t.delete(e);
			}
			this.BuffLock--;
		}
	}
	get BuffLock() {
		return this.jbr;
	}
	set BuffLock(e) {
		if ((this.jbr = e) <= 0 && 0 < this.BuffGarbageSet.size) {
			for (const e of this.BuffGarbageSet) {
				var t = this.BuffContainer.get(e);
				this.BuffContainer.delete(e),
					ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(t);
			}
			this.BuffGarbageSet.clear();
		}
	}
	get InitLock() {
		return this.InitLockInternal;
	}
	set InitLock(e) {
		this.InitLockInternal = e;
	}
	AddTrigger(e, t, o) {
		let f = this.TriggerMap.get(t);
		f || this.TriggerMap.set(t, (f = [])), f.push(o);
	}
	RemoveTrigger(e, t) {
		var o;
		(t = this.TriggerMap.get(t)) &&
			-1 !== (o = t.findIndex((t) => t.ActiveHandleId === e)) &&
			t.splice(o, 1);
	}
	TriggerEvents(e, t, o) {
		if ((e = this.TriggerMap.get(e)) && t)
			for (const f of [...e]) f.TryExecute(o, t);
	}
	HasBuffTrigger(e) {
		return this.TriggerMap.has(e);
	}
	AddGameplayCue(e, t, o) {
		var f;
		return !e || e.length <= 0
			? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
			: (((f =
					require("./CharacterBuffController").default.CreateDynamicBuffRef()).GameplayCueIds =
					e),
				(f.Desc = o),
				(f.DurationPolicy = 0 === t ? 0 : t < 0 ? 1 : 2),
				0 < t &&
					((f.DurationCalculationPolicy = [0]), (f.DurationMagnitude = [t])),
				this.AddBuffInner(
					ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
					f,
					void 0,
					1,
					void 0,
					Protocol_1.Aki.Protocol.CGs.Proto_Common,
					void 0,
					void 0,
					t,
					void 0,
					ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
					o,
					!1,
					!0,
					!1,
					void 0,
				));
	}
});
(BaseBuffComponent.Wbr = new Map()),
	(BaseBuffComponent.Kbr = void 0),
	__decorate(
		[(0, Stats_1.statDecorator)("AddBuff_Local")],
		BaseBuffComponent.prototype,
		"AddBuffLocal",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("AddBuffInner_FindStackable")],
		BaseBuffComponent.prototype,
		"GetStackableBuff",
		null,
	),
	(BaseBuffComponent = BaseBuffComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(187)],
			BaseBuffComponent,
		)),
	(exports.BaseBuffComponent = BaseBuffComponent);
