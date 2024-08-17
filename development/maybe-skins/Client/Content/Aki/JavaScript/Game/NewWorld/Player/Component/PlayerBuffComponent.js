"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var a,
			r = arguments.length,
			f =
				r < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			f = Reflect.decorate(e, t, o, n);
		else
			for (var i = e.length - 1; 0 <= i; i--)
				(a = e[i]) && (f = (r < 3 ? a(f) : 3 < r ? a(t, o, f) : a(t, o)) || f);
		return 3 < r && f && Object.defineProperty(t, o, f), f;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerBuffComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../Module/Abilities/FormationDataController"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
	BaseBuffComponent_1 = require("../../Character/Common/Component/Abilities/BaseBuffComponent"),
	ActiveBuffConfigs_1 = require("../../Character/Common/Component/Abilities/Buff/ActiveBuffConfigs"),
	CharacterBuffController_1 = require("../../Character/Common/Component/Abilities/CharacterBuffController"),
	ExtraEffectManager_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectManager");
let PlayerBuffComponent = class extends BaseBuffComponent_1.BaseBuffComponent {
	constructor() {
		super(...arguments),
			(this.PlayerId = 0),
			(this.BuffEffectManager = void 0),
			(this.xie = () => {
				this.BuffLock++;
				var e = new Set();
				for (const t of this.TagListenerDict.values())
					for (const o of t) e.add(o);
				for (const n of e) {
					var t,
						o = this.GetBuffByHandle(n);
					o &&
						(this.CheckRemove(o.Config)
							? this.RemoveBuffInner(n, -1, !0, "因为切人导致不满足tag条件")
							: (t = this.CheckActivate(o.Config)) !== o.IsActive() &&
								this.OnBuffActiveChanged(o, t));
				}
				this.BuffLock--;
			});
	}
	OnCreate(e) {
		return (
			(this.PlayerId = e?.PlayerId ?? 0),
			(this.BuffEffectManager =
				new ExtraEffectManager_1.PlayerExtraEffectManager(this)),
			!0
		);
	}
	OnStart() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			!0
		);
	}
	OnClear() {
		this.TriggerMap.clear();
		for (const e of this.BuffContainer.values()) e.Destroy();
		return super.OnClear(), !0;
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			!0
		);
	}
	IsPaused() {
		return this.GetCurrentBuffComponent()?.IsPaused() ?? !1;
	}
	AddInitPlayerBuff(e) {
		this.InitLock++;
		for (const t of e)
			this.AddBuffRemote(MathUtils_1.MathUtils.LongToBigInt(t.Ekn), t.E4n, {
				InstigatorId: MathUtils_1.MathUtils.LongToNumber(t.jVn),
				Level: t.r3n,
				OuterStackCount: t.QVn,
				ApplyType: t.WVn,
				Duration: t.Skn,
				RemainDuration: t.Ivs,
				ServerId: t.$Vn,
				IsActive: t.rVn,
				Reason: "服务器初始化下发",
			});
		this.InitLock--;
	}
	GetDebugName() {
		return "player_" + this.PlayerId;
	}
	GetEntity() {
		return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(
			this.PlayerId,
			{ ParamType: 2, IsControl: !0 },
		)?.EntityHandle?.Entity;
	}
	GetTimeScale() {
		var e = this.GetEntity();
		return (
			(e?.TimeDilation ?? 1) * (e?.GetComponent(107)?.CurrentTimeScale ?? 1)
		);
	}
	GetCurrentBuffComponent() {
		return this.GetEntity()?.GetComponent(157);
	}
	GetSkillComponent() {
		return this.GetEntity()?.GetComponent(33);
	}
	GetAttributeComponent() {
		return this.GetEntity()?.GetComponent(156);
	}
	GetTagComponent() {
		return this.GetEntity()?.GetComponent(185);
	}
	CheckAdd(e, t, o) {
		return !this.GetTagComponent() || super.CheckAdd(e, t, o);
	}
	CheckActivate(e) {
		return !this.GetTagComponent() || super.CheckActivate(e);
	}
	GetActorComponent() {
		return this.GetEntity()?.GetComponent(3);
	}
	GetBuffLevel(e) {
		return this.GetEntity()?.GetComponent(157)?.GetBuffLevel(e);
	}
	GetCueComponent() {
		return this.GetEntity()?.GetComponent(19);
	}
	GetBuffTotalStackById(e, t = !1) {
		return (
			(this.GetCurrentBuffComponent()?.GetBuffTotalStackById(e, t) ?? 0) +
			super.GetBuffTotalStackById(e, t)
		);
	}
	HasBuffAuthority() {
		return (
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.PlayerId
		);
	}
	AddBuffInner(e, t, o, n, a, r, f, i, l, s, u, d, C, m, c, B) {
		return 5 !== t.FormationPolicy && e !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
			? (CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					this.Entity,
					"暂不支持对编队实体增删非编队buff",
					["buffId", e],
					["reason", d],
				),
				ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
			: super.AddBuffInner(e, t, o, n, a, r, f, i, l, s, u, d, C, m, c, B);
	}
	OnBuffAdded(e, t, o, n, a, r, f, i, l, s) {
		if (e) {
			this.NeedBroadcastBuff() && this.BroadcastAddBuff(e, o, l, s, n);
			var u = e.Config;
			t =
				(super.OnBuffAdded(e, t, o, n, a, r, f, i, l, s),
				ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
					this.PlayerId,
				) ?? []);
			for (const o of t) {
				var d = o.EntityHandle?.Entity;
				if (o.EntityHandle?.Valid && d) {
					var C = d?.GetComponent(157);
					if (C && u.RemoveBuffWithTags && 0 < u.RemoveBuffWithTags.length) {
						const t = `因为buff${e.Id}(handle=${e.Handle})的RemoveBuffWithTags导致移除`;
						for (const e of u.RemoveBuffWithTags)
							C.HasBuffAuthority() && C.RemoveBuffByTag(e, t),
								C.TagComponent.RemoveTag(e);
					}
					o.EntityHandle?.IsInit &&
						d?.GetComponent(19)?.CreateGameplayCueByBuff(e);
				}
			}
		}
	}
	OnBuffRemoved(e, t, o, n, a) {
		if (e) {
			if (
				(this.NeedBroadcastBuff() && this.BroadcastRemoveBuff(e, t, a, n),
				(a = e.Handle),
				this.RemoveListenerBuff(e),
				this.BuffGarbageSet.add(a),
				e.Destroy(),
				this.BuffEffectManager.OnBuffRemoved(e, t),
				(void 0 === (n = e.GetInstigatorBuffComponent()) || n.Valid) &&
					this.HasBuffAuthority() &&
					(a = t
						? e.Config?.PrematureExpirationEffects
						: e.Config?.RoutineExpirationEffects))
			)
				for (const t of a)
					this.AddIterativeBuff(
						t,
						e,
						void 0,
						!0,
						`因为Buff${e.Id}移除导致的添加`,
					);
			if (
				((n = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
					this.PlayerId,
				)),
				n)
			)
				for (const t of n)
					t.EntityHandle?.IsInit &&
						t.EntityHandle?.Entity?.GetComponent(19)?.DestroyGameplayCue(e);
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				(this.Entity.GetComponent(24)?.OnBuffRemoved(e),
				this.Entity.GetComponent(20)?.OnBuffRemoved(e));
		}
	}
	OnBuffStackIncreased(e, t, o, n, a, r, f, i, l, s, u, d, C) {
		e &&
			(this.NeedBroadcastBuff() &&
				this.BroadcastBuffStackChanged(e, t, o, !1, C),
			super.OnBuffStackIncreased(e, t, o, n, a, r, f, i, l, s, u, d, C));
	}
	OnBuffStackDecreased(e, t, o, n, a) {
		e &&
			(this.NeedBroadcastBuff() &&
				this.BroadcastBuffStackChanged(e, t, o, n, a),
			super.OnBuffStackDecreased(e, t, o, n, a));
	}
	OnBuffActiveChanged(e, t) {
		e &&
			e.IsActive() !== t &&
			(e.SetActivate(t),
			this.NeedBroadcastBuff() && this.BroadcastActivateBuff(e, t),
			this.BuffEffectManager.OnBuffInhibitedChanged(e, !t));
	}
	BroadcastAddBuff(e, t, o, n, a) {
		var r = new Protocol_1.Aki.Protocol.bNn();
		(r.E4n = e.Handle),
			(r.Ekn = MathUtils_1.MathUtils.BigIntToLong(e.Id)),
			(r.r3n = e.Level),
			(r.jVn = e.InstigatorId ?? 0),
			(r.WVn = t),
			(r.Skn = e.Duration),
			(r.QVn = e.StackCount),
			(r.rVn = e.IsActive()),
			CombatMessage_1.CombatNet.Call(
				13725,
				void 0,
				r,
				void 0,
				a,
				e.MessageId,
				o,
			);
	}
	BroadcastActivateBuff(e, t) {
		var o = new Protocol_1.Aki.Protocol.ONn();
		(o.E4n = e.Handle),
			(o.YVn = t),
			CombatMessage_1.CombatNet.Call(15726, void 0, o, void 0);
	}
	BroadcastBuffStackChanged(e, t, o, n, a) {
		var r = new Protocol_1.Aki.Protocol.qNn();
		(r.y4n = e.Handle),
			(r.JVn = o),
			CombatMessage_1.CombatNet.Call(5567, void 0, r, void 0);
	}
	BroadcastRemoveBuff(e, t, o, n) {
		var a = new Protocol_1.Aki.Protocol.GNn();
		(a.E4n = e.Handle),
			(a.zVn = t),
			CombatMessage_1.CombatNet.Call(23492, void 0, a, void 0, o, void 0, n);
	}
	static OrderAddBuffS2cNotify(e, t, o) {
		var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			a =
				((n =
					FormationDataController_1.FormationDataController.GetPlayerEntity(
						n,
					)?.GetComponent(180)),
				MathUtils_1.MathUtils.LongToBigInt(t.Ekn)),
			r = MathUtils_1.MathUtils.LongToNumber(t.jVn),
			f =
				((o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1)),
				CharacterBuffController_1.default.GetBuffDefinition(a)),
			i = new Protocol_1.Aki.Protocol.JNn();
		if (f) {
			const e = n.GetTagComponent();
			e &&
				f.RemoveBuffWithTags?.forEach((t) => {
					e.RemoveTag(t);
				}),
				(f = n.AddBuffInner(
					a,
					CharacterBuffController_1.default.GetBuffDefinition(a),
					r,
					t.r3n,
					t.QVn,
					t.WVn,
					o,
					void 0,
					t.Skn,
					void 0,
					t.$Vn,
					"远端通知添加buff",
					!1,
					!0,
					!0,
					void 0,
				)),
				(a = n.BuffContainer.get(f)),
				(i.E4n = f),
				(i.rVn =
					f === ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE ||
					(a?.IsActive() ?? !1)),
				(i.X5n = Protocol_1.Aki.Protocol.lkn.Sys);
		} else i.X5n = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError;
		CombatMessage_1.CombatNet.Send(
			NetDefine_1.ECombatPushDataMessage.JNn,
			void 0,
			i,
			o,
			void 0,
			!0,
		);
	}
	static OrderRemoveBuffS2cNotify(e, t, o) {
		var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
		(n =
			FormationDataController_1.FormationDataController.GetPlayerEntity(
				n,
			)?.GetComponent(180)),
			(o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1));
		((n =
			(n.RemoveBuffByHandle(t.E4n, t.QVn, "远端请求移除buff(s2c)", o, !0),
			new Protocol_1.Aki.Protocol.zNn())).X5n =
			Protocol_1.Aki.Protocol.lkn.Sys),
			CombatMessage_1.CombatNet.Send(
				NetDefine_1.ECombatPushDataMessage.zNn,
				void 0,
				n,
				o,
				void 0,
				!0,
			);
	}
	static OrderRemoveBuffByIdS2cNotify(e, t, o) {
		var n,
			a = new Protocol_1.Aki.Protocol.ikn(),
			r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
		(r =
			FormationDataController_1.FormationDataController.GetPlayerEntity(
				r,
			)?.GetComponent(180)),
			(o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1));
		r
			? ((n = MathUtils_1.MathUtils.LongToBigInt(t.JFn)),
				r.RemoveBuff(n, t.QVn, "远端移除buff(s2c) reason=" + t.V5n, o, !0),
				(a.X5n = Protocol_1.Aki.Protocol.lkn.Sys))
			: (a.X5n = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError),
			CombatMessage_1.CombatNet.Send(
				NetDefine_1.ECombatPushDataMessage.ikn,
				void 0,
				a,
				o,
				void 0,
				!0,
			);
	}
	static BroadcastAddBuffNotify(e, t, o) {
		var n = FormationDataController_1.FormationDataController.GetPlayerEntity(
				t.aFn,
			)?.GetComponent(180),
			a = t.E4n,
			r = MathUtils_1.MathUtils.LongToBigInt(t.Ekn),
			f = MathUtils_1.MathUtils.LongToNumber(t.jVn);
		o = MathUtils_1.MathUtils.LongToBigInt(o?.n4n ?? -1);
		if (n?.Valid) {
			var i = CharacterBuffController_1.default.GetBuffDefinition(r);
			if (i && a !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
				const e = n.GetTagComponent();
				e &&
					i.RemoveBuffWithTags?.forEach((t) => {
						e.RemoveTag(t);
					}),
					n.AddBuffInner(
						r,
						CharacterBuffController_1.default.GetBuffDefinition(r),
						f,
						t.r3n,
						t.QVn,
						t.WVn,
						o,
						void 0,
						t.Skn,
						t.rVn,
						t.$Vn,
						"远端通知添加buff",
						!0,
						!0,
						!1,
						a,
					);
			}
		} else
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Buff",
				n?.Entity,
				"Invalid entity when processing FormationBuffApplyNotify",
				["handle", t.E4n],
				["buffId", r],
				["playerId", t.aFn],
				["InstigatorId", f],
			);
	}
	static BroadcastRemoveBuffNotify(e, t, o) {
		var n = t.E4n,
			a = FormationDataController_1.FormationDataController.GetPlayerEntity(
				t.aFn,
			)?.GetComponent(180);
		a?.Valid
			? a?.RemoveBuffInner(n, -1, !0, "远端通知移除buff")
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					a?.Entity,
					"Invalid entity when processing RemoveGameplayEffectNotify",
					["player id", t.aFn],
					["handle", t.E4n],
				);
	}
	static BroadcastBuffStackChangedNotify(e, t) {
		var o = t.JVn,
			n = FormationDataController_1.FormationDataController.GetPlayerEntity(
				t.aFn,
			)?.GetComponent(180);
		t = n?.GetBuffByHandle(t.y4n);
		n &&
			t &&
			(t.StackCount > o
				? n.OnBuffStackDecreased(t, t.StackCount, o, !0, "远端Buff层数变化通知")
				: t.StackCount <= o &&
					n.OnBuffStackIncreased(
						t,
						t.StackCount,
						o,
						void 0,
						t.Level,
						void 0,
						Protocol_1.Aki.Protocol.CGs.Proto_Common,
						void 0,
						void 0,
						t.ServerId,
						!1,
						!1,
						"远端Buff层数变化通知",
					));
	}
	static BroadcastActivateBuffNotify(e, t) {
		var o = FormationDataController_1.FormationDataController.GetPlayerEntity(
				t.aFn,
			)?.GetComponent(180),
			n = t.YVn,
			a = o?.GetBuffByHandle(t.E4n);
		!o || o.HasBuffAuthority()
			? CombatDebugController_1.CombatDebugController.CombatWarn(
					"Buff",
					o?.Entity,
					"主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
					["handle", t.E4n],
					["buffId", a?.Id],
					["本地激活状态", n],
					["远端激活状态", t.YVn],
				)
			: (CombatDebugController_1.CombatDebugController.CombatDebug(
					"Buff",
					o?.Entity,
					"远端通知修改buff激活状态",
					["handle", t.E4n],
					["buffId", a?.Id],
					["激活状态", n],
				),
				o.OnBuffActiveChanged(a, n));
	}
	AddBuffOrder(e, t) {
		CombatDebugController_1.CombatDebugController.CombatWarn(
			"Buff",
			this.Entity,
			"[buffComp] 客户端暂不能给其它玩家添加队伍buff",
			["buffId", e],
			["持有者", this.GetDebugName()],
			["原因", t.Reason],
		);
	}
	RemoveBuffOrder(e, t, o) {
		CombatDebugController_1.CombatDebugController.CombatWarn(
			"Buff",
			this.Entity,
			"[buffComp] 客户端暂不能给其它玩家移除队伍buff",
			["buffId", e],
			["持有者", this.GetDebugName()],
			["原因", o],
		);
	}
	FormationBuffApplyRequest() {}
};
__decorate(
	[(0, Stats_1.statDecorator)("OnBuffAdded")],
	PlayerBuffComponent.prototype,
	"OnBuffAdded",
	null,
),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffRemoved")],
		PlayerBuffComponent.prototype,
		"OnBuffRemoved",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffStackIncreased")],
		PlayerBuffComponent.prototype,
		"OnBuffStackIncreased",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffStackDecreased")],
		PlayerBuffComponent.prototype,
		"OnBuffStackDecreased",
		null,
	),
	__decorate(
		[(0, Stats_1.statDecorator)("OnBuffActiveChanged")],
		PlayerBuffComponent.prototype,
		"OnBuffActiveChanged",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("A2n", !1)],
		PlayerBuffComponent,
		"OrderAddBuffS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("U2n", !1)],
		PlayerBuffComponent,
		"OrderRemoveBuffS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("G2n", !1)],
		PlayerBuffComponent,
		"OrderRemoveBuffByIdS2cNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("L2n", !1)],
		PlayerBuffComponent,
		"BroadcastAddBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("P2n", !1)],
		PlayerBuffComponent,
		"BroadcastRemoveBuffNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("D2n", !1)],
		PlayerBuffComponent,
		"BroadcastBuffStackChangedNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("B2n", !1)],
		PlayerBuffComponent,
		"BroadcastActivateBuffNotify",
		null,
	),
	(PlayerBuffComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(180)],
		PlayerBuffComponent,
	)),
	(exports.PlayerBuffComponent = PlayerBuffComponent);
