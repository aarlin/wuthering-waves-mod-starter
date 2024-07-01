"use strict";
var CharacterBuffComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, n) {
			var a,
				r = arguments.length,
				f =
					r < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				f = Reflect.decorate(t, e, o, n);
			else
				for (var i = t.length - 1; 0 <= i; i--)
					(a = t[i]) &&
						(f = (r < 3 ? a(f) : 3 < r ? a(e, o, f) : a(e, o)) || f);
			return 3 < r && f && Object.defineProperty(e, o, f), f;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	BaseBuffComponent_1 = require("./BaseBuffComponent"),
	ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	CharacterBuffController_1 = require("./CharacterBuffController"),
	ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager"),
	NO_BROADCAST_CD_THRESHOLD = 1e4;
let CharacterBuffComponent = (CharacterBuffComponent_1 = class extends (
	BaseBuffComponent_1.BaseBuffComponent
) {
	constructor() {
		super(...arguments),
			(this.ActorComponent = void 0),
			(this.AttributeComponent = void 0),
			(this.DeathComponent = void 0),
			(this.TagComponent = void 0),
			(this.TimeScaleComponent = void 0),
			(this.CueComponent = void 0),
			(this.CreatureDataComponent = void 0),
			(this.PauseLocks = new Set()),
			(this.BuffEffectManager = void 0),
			(this.cqr = !1),
			(this.mqr = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE);
	}
	GetDebugName() {
		return (
			(this.CreatureDataComponent?.GetCreatureDataId() ??
				"非正常实体(entity id=" + this.Entity?.Id) + ""
		);
	}
	GetEntity() {
		return this.Entity;
	}
	AddPauseLock(t) {
		this.PauseLocks.add(t), this.RefreshTimeScale();
	}
	RemovePauseLock(t) {
		this.PauseLocks.delete(t), this.RefreshTimeScale();
	}
	IsPaused() {
		return 0 < this.PauseLocks.size;
	}
	GetTimeScale() {
		return (
			this.Entity.TimeDilation *
			(this.TimeScaleComponent?.CurrentTimeScale ?? 1)
		);
	}
	GetAttributeComponent() {
		return this.AttributeComponent;
	}
	GetTagComponent() {
		return this.TagComponent;
	}
	GetSkillComponent() {
		return this.Entity.GetComponent(33);
	}
	GetActorComponent() {
		return this.ActorComponent;
	}
	GetCueComponent() {
		return this.CueComponent;
	}
	get CreatureDataId() {
		return this.CreatureDataComponent.GetCreatureDataId();
	}
	OnInitData() {
		return (
			(this.BuffEffectManager = new ExtraEffectManager_1.ExtraEffectManager(
				this,
			)),
			!0
		);
	}
	OnInit() {
		return (
			(this.ActorComponent = this.Entity.CheckGetComponent(3)),
			(this.AttributeComponent = this.Entity.CheckGetComponent(156)),
			(this.TagComponent = this.Entity.CheckGetComponent(185)),
			(this.CueComponent = this.Entity.CheckGetComponent(19)),
			(this.DeathComponent = this.Entity.CheckGetComponent(15)),
			(this.TimeScaleComponent = this.Entity.GetComponent(107)),
			(this.CreatureDataComponent = this.Entity.GetComponent(0)),
			!0
		);
	}
	OnStart() {
		return this.BuffEffectManager?.Clear(), !0;
	}
	InitBornBuff() {
		var t = this.CreatureDataComponent.ComponentDataMap,
			e = t.get("Hvs")?.Hvs?.Jps;
		if (e && this.HasBuffAuthority())
			for (const t of e) {
				var o = MathUtils_1.MathUtils.LongToNumber(t.jVn),
					n = t.s4n ? MathUtils_1.MathUtils.LongToBigInt(t.s4n) : void 0,
					a = MathUtils_1.MathUtils.LongToBigInt(t.JFn);
				this.AddBuffLocal(a, {
					InstigatorId: o,
					Level: t.r3n,
					ApplyType: t.WVn,
					PreMessageId: n,
					Duration: t.Skn,
					IsIterable: t.KVn,
					OuterStackCount: t.QVn,
					ServerId: t.$Vn,
					IsServerOrder: !0,
					Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + n,
				});
			}
		if (
			((e = t.get("Qvs")?.Qvs?.Zps),
			(t = t.get("Qvs")?.Qvs?.zps),
			this.InitLock++,
			e)
		)
			for (const t of e) {
				var r = MathUtils_1.MathUtils.LongToBigInt(t.JFn);
				for (let e = 0; e < t.uSs.length; e++)
					this.SetBuffEffectCd(
						r,
						e,
						t.uSs[e] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
					);
			}
		if (t)
			for (const e of t) {
				var f = e,
					i = MathUtils_1.MathUtils.LongToBigInt(f.JFn ?? -1),
					s = MathUtils_1.MathUtils.LongToNumber(f.jVn),
					u = f.y4n ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
				this.AddBuffRemote(i, u, {
					Level: f.r3n,
					InstigatorId: s,
					ApplyType: f.WVn,
					Duration: f.Skn,
					RemainDuration: f.Ivs,
					IsActive: f.rVn,
					ServerId: f.$Vn,
					OuterStackCount: f.QVn,
					Reason: "服务器通过通知FightBuffComponent恢复Buff",
					MessageId: MathUtils_1.MathUtils.LongToBigInt(f.s4n),
				}),
					this.BuffContainer.get(u)?.SetRemainDuration(f.Ivs);
			}
		this.InitLock--;
	}
	OnClear() {
		this.TriggerMap.clear();
		for (const t of [...this.BuffContainer.values()]) t.Destroy();
		return this.PauseLocks.clear(), super.OnClear(), !0;
	}
	OnActivate() {
		for (const t of this.GetAllBuffs())
			this.CueComponent.CreateGameplayCueByBuff(t);
		(this.cqr = !0), this.InitBornBuff();
	}
	HasBuffAuthority() {
		var t;
		return (
			!(
				this.Entity.GetComponent(0).GetEntityType() !==
					Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
				!this.DeathComponent.IsDead()
			) ||
			((t = this.Entity.GetComponent(0)?.GetSummonerPlayerId()),
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t)
		);
	}
	AddBuffWithServerId(t, e, o, n, a) {
		if (!(t <= ActiveBuffConfigs_1.NULL_BUFF_ID))
			for (let i = 0; i < o; i++) {
				var r = this.AddBuffLocal(t, {
						InstigatorId: this.CreatureDataId,
						Level: e,
						Duration: ActiveBuffConfigs_1.DEFAULT_SERVER_GE_DURATION,
						ServerId: n,
						Reason: a,
					}),
					f = CharacterBuffController_1.default.GetBuffDefinition(t);
				r === ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
					CombatDebugController_1.CombatDebugController.CombatError(
						"Buff",
						this.Entity,
						"系统buff添加失败",
						["buffId", t],
						["serverId", n],
						["持有者", this.GetDebugName()],
						["说明", f?.Desc],
					);
			}
	}
	RemoveBuffByServerIdLocal(t, e) {
		if (this.HasBuffAuthority())
			for (const n of [...this.BuffContainer.values()]) {
				var o = n.Handle;
				this.BuffGarbageSet.has(o) ||
					(n.ServerId === t && this.RemoveBuffInner(o, -1, !0, e));
			}
		else
			CombatDebugController_1.CombatDebugController.CombatError(
				"Buff",
				this.Entity,
				"[buffComp] 服务端通知移除非本客户端控制角色持有的系统Buff，需要服务端检查协议是否下发正确",
				["buffId", t],
				["持有者", this.GetDebugName()],
			);
	}
	RemoveBuffByTagName(t, e = void 0) {
		void 0 !== (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)) &&
			this.RemoveBuffByTag(t, e);
	}
	RemoveBuffByTag(t, e = void 0) {
		void 0 !== t &&
			(this.HasBuffAuthority()
				? this.RemoveBuffByTagLocal(t, e)
				: (CombatDebugController_1.CombatDebugController.CombatDebug(
						"Buff",
						this.Entity,
						"[order] 请求根据tagId移除buff",
						["tagId", t],
						["持有者", this.GetDebugName()],
						["原因", e],
					),
					((e = Protocol_1.Aki.Protocol.cNn.create()).XVn = [t]),
					CombatMessage_1.CombatNet.Call(2625, this.Entity, e)));
	}
	RemoveAllBuffs(t) {
		if (this.HasBuffAuthority())
			for (const e of [...this.BuffContainer.keys()])
				this.RemoveBuffByHandle(e, -1, t);
		else
			for (const e of this.BuffContainer.values())
				e?.IsValid() && this.RemoveBuffOrder(e.Id, -1, t);
	}
	RemoveAllBuffsByInstigator(t, e) {
		var o = t?.CreatureDataId;
		t = [...this.BuffContainer.keys()];
		if (this.HasBuffAuthority())
			for (const n of t)
				this.GetBuffByHandle(n)?.InstigatorId === o &&
					this.RemoveBuffByHandle(n, -1, e);
		else
			for (const a of t) {
				var n = this.GetBuffByHandle(a);
				n?.InstigatorId === o && this.RemoveBuffOrder(n.Id, -1, e);
			}
	}
	RemoveAllDurationBuffs(t) {
		var e = [];
		for (const t of this.BuffContainer.values())
			2 === t.Config.DurationPolicy && e.push(t.Handle);
		for (const o of e) this.RemoveBuffByHandle(o, -1, t);
	}
	GetBuffLevel(t) {
		var e = this.Entity.GetComponent(83)?.GetSkillLevelByBuffId(t);
		return (void 0 !== e && 0 < e) ||
			(void 0 !==
				(e = this.Entity.GetComponent(34)?.GetVisionLevelByBuffId(t)) &&
				0 < e)
			? e
			: void 0;
	}
	OnBuffAdded(t, e, o, n, a, r, f, i, s, u) {
		if (t) {
			this.NeedBroadcastBuff(t) && this.BroadcastAddBuff(t, o, s, u);
			var l = t.Config;
			if (
				(super.OnBuffAdded(t, e, o, n, a, r, f, i, s, u),
				l.RemoveBuffWithTags && 0 < l.RemoveBuffWithTags.length)
			) {
				const e = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
				for (const t of l.RemoveBuffWithTags)
					this.HasBuffAuthority() && this.RemoveBuffByTag(t, e),
						this.TagComponent.RemoveTag(t);
			}
			this.cqr && this.CueComponent.CreateGameplayCueByBuff(t),
				i && this.ShareApplyBuffInner(t, e, o, t.MessageId, a, f);
		}
	}
	ShareApplyBuffInner(t, e, o, n, a, r) {
		var f, i, s;
		this.HasBuffAuthority() &&
			(f = this.Entity.GetComponent(47)?.RoleId) &&
			4 === t.Config?.FormationPolicy &&
			(f = EntitySystem_1.EntitySystem.Get(f)?.GetComponent(157)) &&
			((i = t.Id),
			(s = t.Handle),
			f.AddBuffLocal(i, {
				InstigatorId: t.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
				Level: t.Level,
				OuterStackCount: e,
				ApplyType: o,
				PreMessageId: n,
				Duration: a,
				ServerId: r,
				IsIterable: !1,
				Reason: `因为buff${i}(handle=${s})的队伍共享机制导致的buff添加`,
			}));
	}
	OnBuffRemoved(t, e, o, n, a) {
		if (t) {
			if (
				(this.NeedBroadcastBuff(t) && this.BroadcastRemoveBuff(t, e, n, a),
				(n = t.Handle),
				this.RemoveListenerBuff(t),
				this.BuffGarbageSet.add(n),
				t.Destroy(),
				this.BuffEffectManager.OnBuffRemoved(t, e),
				(void 0 === (a = t.GetInstigatorBuffComponent()) || a.Valid) &&
					this.HasBuffAuthority() &&
					(n = e
						? t.Config?.PrematureExpirationEffects
						: t.Config?.RoutineExpirationEffects))
			)
				for (const e of n)
					this.AddIterativeBuff(
						e,
						t,
						void 0,
						!0,
						`因为Buff${t.Id}移除导致的添加`,
					);
			this.cqr && this.CueComponent.DestroyGameplayCue(t),
				Info_1.Info.IsBuildDevelopmentOrDebug &&
					(this.Entity.GetComponent(24)?.OnBuffRemoved(t),
					this.Entity.GetComponent(20)?.OnBuffRemoved(t));
		}
	}
	OnBuffStackIncreased(t, e, o, n, a, r, f, i, s, u, l, C, d) {
		t &&
			(this.NeedBroadcastBuff(t) &&
				this.BroadcastBuffStackChanged(t, e, o, !1, d, n),
			super.OnBuffStackIncreased(t, e, o, n, a, r, f, i, s, u, l, C, d),
			this.HasBuffAuthority()) &&
			l &&
			this.ShareApplyBuffInner(t, r, f, t.MessageId, s, u);
	}
	OnBuffStackDecreased(t, e, o, n, a) {
		t &&
			(this.NeedBroadcastBuff(t) &&
				this.BroadcastBuffStackChanged(t, e, o, n, a),
			super.OnBuffStackDecreased(t, e, o, n, a));
	}
	OnBuffActiveChanged(t, e) {
		t &&
			t.IsActive() !== e &&
			(t.SetActivate(e),
			this.NeedBroadcastBuff(t) && this.BroadcastActivateBuff(t, e),
			this.BuffEffectManager.OnBuffInhibitedChanged(t, !e),
			this.GetCueComponent()?.OnAnyBuffInhibitionChanged(t.Handle, !e));
	}
	BroadcastAddBuff(t, e, o, n) {
		var a;
		!t ||
			t.Id < 0 ||
			!this.NeedBroadcastBuff(t) ||
			(!t.IsInstantBuff() && t.Handle < 0) ||
			(((a = Protocol_1.Aki.Protocol.K2n.create()).E4n = t.Handle),
			(a.Ekn = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
			(a.r3n = t.Level),
			(a.rkn = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
			t.InstigatorId &&
				(a.jVn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId)),
			(a.WVn = e),
			(a.Skn = t.GetRemainDuration()),
			(a.$Vn = t.ServerId),
			(a.QVn = t.StackCount),
			CombatMessage_1.CombatNet.Call(
				4202,
				this.Entity,
				Protocol_1.Aki.Protocol.K2n.create(a),
				void 0,
				t.PreMessageId,
				t.MessageId,
				o,
			));
	}
	BroadcastActivateBuff(t, e) {
		var o;
		!t ||
			t.Id < 0 ||
			!this.NeedBroadcastBuff(t) ||
			(((o = Protocol_1.Aki.Protocol.uNn.create()).E4n = t.Handle),
			(o.YVn = e),
			CombatMessage_1.CombatNet.Call(28428, this.Entity, o));
	}
	BroadcastBuffStackChanged(t, e, o, n, a, r) {
		var f;
		!t ||
			t.Id < 0 ||
			!this.NeedBroadcastBuff(t) ||
			(((f = Protocol_1.Aki.Protocol.DNn.create()).y4n = t.Handle),
			(f.JVn = o),
			(f.zVn = n),
			(f.jVn = r ?? 0),
			CombatMessage_1.CombatNet.Call(8164, this.Entity, f, void 0));
	}
	static BroadcastAddBuffNotify(t, e, o) {
		var n = e.E4n,
			a = MathUtils_1.MathUtils.LongToBigInt(e.Ekn),
			r = MathUtils_1.MathUtils.LongToNumber(e.jVn),
			f = t?.GetComponent(157),
			i = MathUtils_1.MathUtils.LongToBigInt(o?.n4n ?? -1);
		o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
		if (f?.Valid) {
			var s = CharacterBuffController_1.default.GetBuffDefinition(a);
			if (f && s && n !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
				const t = f.TagComponent;
				t &&
					s.RemoveBuffWithTags?.forEach((e) => {
						t.RemoveTag(e);
					}),
					f.AddBuffRemote(a, n, {
						IsActive: e.rVn,
						InstigatorId: r,
						Level: e.r3n,
						ApplyType: e.WVn,
						PreMessageId: i,
						MessageId: o,
						ServerId: e.$Vn,
						Duration: e.Skn,
						Reason: "远端通知添加buff",
					});
			}
		} else
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Buff",
				t,
				"Invalid entity when processing ApplyGameplayEffectNotify",
				["handle", e.E4n],
				["buffId", a],
				["EntityId", MathUtils_1.MathUtils.LongToNumber(e.rkn)],
				["InstigatorId", r],
			);
	}
	static BroadcastBuffStackChangedNotify(t, e) {
		var o = e.y4n;
		(e = e.JVn), (t = t?.GetComponent(157)), (o = t?.GetBuffByHandle(o));
		t &&
			o &&
			(o.StackCount > e
				? t.OnBuffStackDecreased(o, o.StackCount, e, !0, "远端Buff层数变化通知")
				: o.StackCount <= e &&
					t.OnBuffStackIncreased(
						o,
						o.StackCount,
						e,
						o.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
						o.Level,
						void 0,
						Protocol_1.Aki.Protocol.CGs.Proto_Common,
						void 0,
						void 0,
						o.ServerId,
						!1,
						!1,
						"远端Buff层数变化通知",
					));
	}
	BroadcastRemoveBuff(t, e, o, n) {
		var a;
		!t ||
			t.Id < 0 ||
			!this.NeedBroadcastBuff(t) ||
			(((a = Protocol_1.Aki.Protocol.Q2n.create()).E4n = t.Handle),
			(a.rkn = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
			(a.zVn = e),
			CombatMessage_1.CombatNet.Call(
				14295,
				this.Entity,
				a,
				void 0,
				n,
				void 0,
				o,
			));
	}
	static BroadcastRemoveBuffNotify(t, e) {
		var o = e.E4n,
			n = t?.GetComponent(157);
		n?.Valid
			? n?.RemoveBuffInner(o, -1, !0, "远端通知移除buff")
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					t,
					"Invalid entity when processing RemoveGameplayEffectNotify",
					["entity id", e.rkn],
					["handle", e.E4n],
				);
	}
	static OrderAddBuffS2cNotify(t, e, o) {
		var n = t?.GetComponent(157),
			a = MathUtils_1.MathUtils.LongToBigInt(e.Ekn),
			r = MathUtils_1.MathUtils.LongToNumber(e.jVn),
			f =
				((o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1)),
				CharacterBuffController_1.default.GetBuffDefinition(a)),
			i = new Protocol_1.Aki.Protocol.ZNn();
		if (t && n?.Valid && f) {
			const t = n.GetTagComponent();
			t &&
				f.RemoveBuffWithTags?.forEach((e) => {
					t.RemoveTag(e);
				}),
				(f = n.AddBuffInner(
					a,
					CharacterBuffController_1.default.GetBuffDefinition(a),
					r,
					e.r3n,
					e.QVn,
					e.WVn,
					o,
					void 0,
					e.Skn,
					void 0,
					e.$Vn,
					"远端请求添加玩家Buff(s2c)",
					!1,
					e.KVn,
					!0,
					void 0,
				)),
				(a = n.BuffContainer.get(f)),
				(i.E4n = f),
				(i.rVn = !!a?.IsActive()),
				(i.lkn = Protocol_1.Aki.Protocol.lkn.Sys);
		} else i.lkn = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError;
		CombatMessage_1.CombatNet.Send(
			NetDefine_1.ECombatPushDataMessage.ZNn,
			t,
			i,
			o,
			void 0,
			!0,
		);
	}
	static OrderRemoveBuffS2cNotify(t, e, o) {
		var n = t?.GetComponent(157);
		o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
		((n =
			(n?.RemoveBuffByHandle(e.E4n, e.QVn, "远端请求移除buff(s2c)", o, !0),
			new Protocol_1.Aki.Protocol.ekn())).lkn =
			Protocol_1.Aki.Protocol.lkn.Sys),
			CombatMessage_1.CombatNet.Send(
				NetDefine_1.ECombatPushDataMessage.ekn,
				t,
				n,
				o,
				void 0,
				!0,
			);
	}
	RemoveBuffOrder(t, e, o) {
		var n;
		t <= 0 ||
			((n = CharacterBuffController_1.default.GetBuffDefinition(t)),
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Buff",
				this.Entity,
				"[order] 请求远端移除buff",
				["buffId", t],
				["持有者", this.GetDebugName()],
				["stackCount", e],
				["说明", n?.Desc],
				["原因", o],
			),
			((n = Protocol_1.Aki.Protocol._Nn.create()).Ekn =
				MathUtils_1.MathUtils.BigIntToLong(t)),
			(n.QVn = e),
			CombatMessage_1.CombatNet.Call(3683, this.Entity, n));
	}
	static OrderRemoveBuffByIdS2cNotify(t, e, o) {
		var n = t?.GetComponent(157),
			a = MathUtils_1.MathUtils.LongToBigInt(e.JFn),
			r =
				((o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1)),
				new Protocol_1.Aki.Protocol.tkn());
		n?.Valid
			? (n.RemoveBuff(a, e.QVn, "远端移除buff(s2c) reason=" + e.V5n, o, !0),
				(r.lkn = Protocol_1.Aki.Protocol.lkn.Sys))
			: (CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					t,
					"Invalid entity when processing RemoveBuffByIdS2cRequestNotify",
					["entity id", t?.Id],
					["buffId", a],
				),
				(r.lkn = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError)),
			CombatMessage_1.CombatNet.Send(
				NetDefine_1.ECombatPushDataMessage.tkn,
				t,
				r,
				o,
				void 0,
				!0,
			);
	}
	AddBuffOrder(
		t,
		{
			InstigatorId: e,
			Level: o = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
			OuterStackCount: n = 0,
			ApplyType: a = Protocol_1.Aki.Protocol.CGs.Proto_Common,
			PreMessageId: r,
			Duration: f = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
			ServerId: i,
			IsIterable: s = !0,
			Reason: u,
		},
	) {
		t <= 0 ||
			(CombatDebugController_1.CombatDebugController.CombatDebug(
				"Buff",
				this.Entity,
				"[order] 请求远端添加buff...",
				["buffId", t],
				["创建者Id", e],
				["持有者", this.GetDebugName()],
				["level", o],
				["时间计算方式", Protocol_1.Aki.Protocol.CGs[a]],
				["Duration", f],
				["原因", u],
			),
			((u = Protocol_1.Aki.Protocol.lNn.create()).Ekn =
				MathUtils_1.MathUtils.BigIntToLong(t)),
			(u.r3n = o),
			(u.QVn = n),
			(u.jVn = MathUtils_1.MathUtils.NumberToLong(e)),
			(u.WVn = a),
			(u.Skn = f),
			(u.$Vn = i ?? 0),
			(u.KVn = s),
			CombatMessage_1.CombatNet.Call(18677, this.Entity, u, void 0, r));
	}
	static OrderAddBuffNotify(t, e, o) {
		var n,
			a = t?.CheckGetComponent(157);
		a
			? a &&
				((n = MathUtils_1.MathUtils.LongToBigInt(e.Ekn)),
				a.AddBuffLocal(n, {
					InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.jVn),
					Level: e.r3n,
					ApplyType: e.WVn,
					PreMessageId: o?.s4n
						? MathUtils_1.MathUtils.LongToBigInt(o.s4n)
						: void 0,
					Duration: e.Skn,
					IsIterable: e.KVn,
					OuterStackCount: e.QVn,
					ServerId: e.$Vn,
					IsServerOrder: !0,
					Reason: "服务端或其它客户端请求添加Buff",
				}))
			: CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					t,
					"收到服务端请求添加buff，但找不到对应的entity",
					["entity", t],
					["buffId", e.Ekn],
					["InstigatorId", e.jVn],
				);
	}
	static OrderRemoveBuffNotify(t, e) {
		var o = t?.GetComponent(157),
			n = MathUtils_1.MathUtils.LongToBigInt(e.Ekn);
		o
			? o.RemoveBuffLocal(n, e.QVn, "服务端或其它客户端请求本端移除buff")
			: ((o = CharacterBuffController_1.default.GetBuffDefinition(n)),
				CombatDebugController_1.CombatDebugController.CombatError(
					"Buff",
					t,
					"[order] 移除Buff请求找不到对应实体",
					["buffId", n],
					["持有者", t?.Id],
					["说明", o?.Desc],
				));
	}
	static OrderRemoveBuffByTagsNotify(t, e) {
		var o = t?.GetComponent(157);
		if (o)
			for (const t of e.XVn) {
				var n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
				o.RemoveBuffByTagLocal(t, `远端请求根据tag ${n} 移除buff`);
			}
		else
			CombatDebugController_1.CombatDebugController.CombatError(
				"Buff",
				t,
				"[order] 根据tag移除Buff请求找不到对应实体",
				[
					"tagId",
					e?.XVn.map((t) =>
						GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
					),
				],
			);
	}
	static BroadcastActivateBuffNotify(t, e) {
		var o = t?.GetComponent(157),
			n = e.E4n,
			a = e.YVn,
			r = o?.GetBuffByHandle(n);
		!o || o.HasBuffAuthority()
			? CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					t,
					"主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
					["handle", n],
					["buffId", r?.Id],
					["本地激活状态", a],
					["远端激活状态", e.YVn],
				)
			: (CombatDebugController_1.CombatDebugController.CombatDebug(
					"Buff",
					t,
					"远端通知修改buff激活状态",
					["handle", n],
					["buffId", r?.Id],
					["激活状态", a],
				),
				o.OnBuffActiveChanged(r, a));
	}
	UpdateSysGrowBuff(t) {
		0 <= this.mqr &&
			this.RemoveBuffByHandleLocal(this.mqr, -1, "更新系统成长值");
		const e = CharacterBuffController_1.default.CreateDynamicBuffRef();
		(e.StackingType = 0),
			(e.DurationPolicy = 1),
			(e.Modifiers = []),
			(e.Desc = "系统成长buff"),
			t.forEach((t, o) => {
				0 !== t &&
					e.Modifiers.push({
						AttributeId: o,
						Value1: [t],
						Value2: [0],
						CalculationPolicy: [0],
					});
			}),
			(this.mqr = this.AddBuffInner(
				ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
				e,
				this.CreatureDataId,
				1,
				void 0,
				Protocol_1.Aki.Protocol.CGs.Proto_Common,
				void 0,
				void 0,
				ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
				void 0,
				ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
				"更新系统成长值",
				!1,
				!0,
				!1,
				void 0,
			));
	}
	AddAttributeRateModifierLocal(t, e, o) {
		var n;
		return 0 === e
			? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
			: (((n =
					CharacterBuffController_1.default.CreateDynamicBuffRef()).StackingType =
					0),
				(n.DurationPolicy = 1),
				(n.Modifiers = []),
				(n.Desc = o),
				n.Modifiers.push({
					AttributeId: t,
					Value1: [e * CharacterAttributeTypes_1.PER_TEN_THOUSAND],
					Value2: [0],
					CalculationPolicy: [1],
				}),
				this.AddBuffInner(
					ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
					n,
					this.CreatureDataId,
					1,
					void 0,
					Protocol_1.Aki.Protocol.CGs.Proto_Common,
					void 0,
					void 0,
					ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
					void 0,
					ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
					o,
					!1,
					!0,
					!1,
					void 0,
				));
	}
	AddTagWithReturnHandle(t, e = -1) {
		var o;
		return !t || t.length <= 0
			? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
			: (((o =
					CharacterBuffController_1.default.CreateDynamicBuffRef()).GrantedTags =
					[...t]),
				(o.StackingType = 0),
				(o.DurationPolicy = 1),
				0 < e &&
					((o.DurationPolicy = 2),
					(o.DurationCalculationPolicy = [0]),
					(o.DurationMagnitude = [e])),
				(o.Desc = "AddTagWithReturnHandle"),
				this.AddBuffInner(
					ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
					o,
					this.CreatureDataId,
					1,
					void 0,
					Protocol_1.Aki.Protocol.CGs.Proto_Common,
					void 0,
					void 0,
					e,
					void 0,
					ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
					"添加tag",
					!1,
					!0,
					!1,
					void 0,
				));
	}
	SetBuffEffectCd(t, e, o) {
		super.SetBuffEffectCd(t, e, o),
			(t =
				this.GetBuffById(t)?.Handle ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE),
			this.NeedBroadcastBuff() &&
				t !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
				o > 1e4 &&
				(((o = Protocol_1.Aki.Protocol.kNn.create()).y4n = t),
				(o.Akn = e),
				CombatMessage_1.CombatNet.Call(28624, this.Entity, o));
	}
	GetDebugBuffString(t = "") {
		let e = "";
		var o = [...t.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
		for (const t of this.BuffContainer.values()) {
			const n = String(t.Id);
			if (!(0 < o.length) || o.some((t) => n.startsWith(t))) {
				let o =
					(t.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
						? "系统buff"
						: (this.HasBuffAuthority() ? "RemoteBuff_" : "Buff_") + n) +
					`(${this.BuffGarbageSet.has(t.Handle) ? "销毁" : t.IsActive() ? "激活" : "失效"})  handle: ${t.Handle},  层数: ${t.StackCount},  等级: ${t.Level} \n    施加者: ${t.GetInstigatorActorComponent()?.Actor.GetName()},  时长: ${t.Duration < 0 ? "无限" : t.GetRemainDuration().toFixed(1) + "/" + t.Duration.toFixed(1)},  ${0 < t.Period ? `周期: ${t.GetRemainPeriod()?.toFixed(1)}/` + t.Period.toFixed(1) : ""}\n    说明: ${t.Config?.Desc}\n`;
				t.Config.GrantedTags?.forEach((t) => {
					o += `    +附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}\n`;
				});
				for (const e of this.BuffEffectManager.GetEffectsByHandle(t.Handle))
					o += `    +激活效果 ${e.GetDebugString()}(cd:${(this.GetBuffEffectCd(t.Id, e.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)\n`;
				e += o + "\n";
			}
		}
		return e;
	}
});
(CharacterBuffComponent.dqr = void 0),
	(CharacterBuffComponent.Cqr = void 0),
	(CharacterBuffComponent.gqr = void 0),
	(CharacterBuffComponent.fqr = void 0),
	(CharacterBuffComponent.pqr = void 0),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffAdded")],
		CharacterBuffComponent.prototype,
		"OnBuffAdded",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffRemoved")],
		CharacterBuffComponent.prototype,
		"OnBuffRemoved",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffStackIncreased")],
		CharacterBuffComponent.prototype,
		"OnBuffStackIncreased",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffStackDecreased")],
		CharacterBuffComponent.prototype,
		"OnBuffStackDecreased",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffActiveChanged")],
		CharacterBuffComponent.prototype,
		"OnBuffActiveChanged",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("NOn", !1)],
		CharacterBuffComponent,
		"BroadcastAddBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("p2n", !1)],
		CharacterBuffComponent,
		"BroadcastBuffStackChangedNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("kOn", !1)],
		CharacterBuffComponent,
		"BroadcastRemoveBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("R2n", !1)],
		CharacterBuffComponent,
		"OrderAddBuffS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("x2n", !1)],
		CharacterBuffComponent,
		"OrderRemoveBuffS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("q2n", !1)],
		CharacterBuffComponent,
		"OrderRemoveBuffByIdS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Handle("n2n")],
		CharacterBuffComponent,
		"OrderAddBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("s2n", !1)],
		CharacterBuffComponent,
		"OrderRemoveBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("h2n", !1)],
		CharacterBuffComponent,
		"OrderRemoveBuffByTagsNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("a2n", !1)],
		CharacterBuffComponent,
		"BroadcastActivateBuffNotify",
		null,
	),
	(CharacterBuffComponent = CharacterBuffComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(157)],
			CharacterBuffComponent,
		)),
	(exports.CharacterBuffComponent = CharacterBuffComponent);
