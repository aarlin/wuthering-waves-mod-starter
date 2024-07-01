"use strict";
var _a,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, r) {
			var a,
				n = arguments.length,
				s =
					n < 3
						? t
						: null === r
							? (r = Object.getOwnPropertyDescriptor(t, o))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, o, r);
			else
				for (var l = e.length - 1; 0 <= l; l--)
					(a = e[l]) &&
						(s = (n < 3 ? a(s) : 3 < n ? a(t, o, s) : a(t, o)) || s);
			return 3 < n && s && Object.defineProperty(t, o, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatMessageController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StatDefine_1 = require("../../Common/StatDefine"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	WorldGlobal_1 = require("../../World/WorldGlobal"),
	CombatMessage_1 = require("./CombatMessage"),
	notifyMessageCacheSet = new Set([
		NetDefine_1.ECombatNotifyDataMessage.HOn,
		NetDefine_1.ECombatNotifyDataMessage.VOn,
		NetDefine_1.ECombatNotifyDataMessage.jOn,
		NetDefine_1.ECombatNotifyDataMessage.YOn,
		NetDefine_1.ECombatNotifyDataMessage.$On,
		NetDefine_1.ECombatNotifyDataMessage.XOn,
	]),
	MAX_AI_INFO_COUNT = 100;
class CombatMessageController extends ControllerBase_1.ControllerBase {
	static get Model() {
		return ModelManager_1.ModelManager.CombatMessageModel;
	}
	static OnInit() {
		Net_1.Net.Register(28028, CombatMessageController.VEt),
			Net_1.Net.Register(3991, CombatMessageController.HEt),
			Net_1.Net.Register(6482, CombatMessageController.jEt),
			Net_1.Net.Register(4976, CombatMessageController.WEt),
			Net_1.Net.Register(19531, CombatMessageController.KEt),
			Net_1.Net.Register(
				17300,
				CombatMessageController.PreAiControlSwitchNotify,
			),
			Net_1.Net.Register(14957, this.QEt);
		for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
			this.Register(e, this.XEt(e, CombatMessage_1.CombatNet.SyncNotifyMap));
		return !0;
	}
	static OnClear() {
		Net_1.Net.UnRegister(28028),
			Net_1.Net.UnRegister(3991),
			Net_1.Net.UnRegister(6482),
			Net_1.Net.UnRegister(4976),
			Net_1.Net.UnRegister(19531),
			Net_1.Net.UnRegister(17300),
			Net_1.Net.UnRegister(14957);
		for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
			this.UnRegister(e);
		return !0;
	}
	static XEt(e, t) {
		return (o, r) => {
			t.get(e)?.(o, r);
		};
	}
	static $Et(e) {
		let t = this.YEt.get(e);
		return t || ((t = void 0), this.YEt.set(e, t)), t;
	}
	static JEt(e, t) {
		const o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
		var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
			a = NetDefine_1.ECombatNotifyDataMessage[t.$Gs];
		if (!r || r.IsInit || notifyMessageCacheSet.has(a))
			if (
				(CombatDebugController_1.CombatDebugController.CombatInfoMessage(
					"Notify",
					t.$Gs,
					e,
				),
				(r = r?.Entity),
				CombatMessage_1.CombatNet.SyncNotifyMap.has(a))
			) {
				const o = MathUtils_1.MathUtils.LongToNumber(e.a4n);
				var n,
					s = CombatMessageController.Model?.GetMessageBuffer(o);
				s && ModelManager_1.ModelManager.GameModeModel.IsMulti
					? ((n = CombatMessage_1.CombatNet.PreNotifyMap.get(a)) &&
							!n(r, t[t.$Gs], e)) ||
						s.Push(a, r, t.r4n, t[t.$Gs])
					: CombatMessage_1.CombatNet.SyncNotifyMap.get(a)?.(r, t[t.$Gs], e);
			} else
				CombatMessage_1.CombatNet.NotifyMap.has(a)
					? CombatMessage_1.CombatNet.NotifyMap.get(a)?.(r, t[t.$Gs], e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"MultiplayerCombat",
							20,
							"Unexpected combat notify message type",
							["MessageKey", t.$Gs],
							["MessageId", a],
						);
		else
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Notify",
				o,
				"协议丢弃，实体未加载完成",
				["Message", t.$Gs],
				["CombatCommon", e],
			);
	}
	static zEt(e, t) {
		var o = CombatMessage_1.CombatNet.RequestMap,
			r = t.i4n;
		if (o.has(r)) {
			var a = o.get(r),
				n = t[t.$Gs];
			if ((o.delete(r), n))
				try {
					a?.(n);
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"CombatInfo",
								15,
								"战斗协议执行response异常",
								e,
								["response", t.$Gs],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CombatInfo",
								15,
								"战斗协议执行response异常",
								["response", t.$Gs],
								["stack", e],
							);
				}
			else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"MultiplayerCombat",
						20,
						"unexpected null combat response",
						["messageType", t.$Gs],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"MultiplayerCombat",
					20,
					"unexpected response RPC id from server",
					["messageType", t.$Gs],
				);
	}
	static Register(e, t) {
		return (
			Net_1.Net.Register(e, (o) => {
				var r,
					a,
					n = o;
				n
					? n.CombatCommon
						? ((r = MathUtils_1.MathUtils.LongToNumber(n.CombatCommon.rkn)),
							(a =
								ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity),
							ModelManager_1.ModelManager.GameModeModel.IsMulti
								? (this.IsDebugMessageLog &&
										Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"MultiplayerCombat",
											15,
											"[CombatMessageController.ReceiveNotify]",
											["id", e],
											["MessageId", n.CombatCommon.s4n],
											["Originator", n.CombatCommon.a4n],
											["TimeStamp", n.CombatCommon.h4n],
										),
									CombatMessageController.Model.GetMessageBuffer(r)?.Push(
										e,
										a,
										n.CombatCommon,
										o,
									))
								: t(a, o))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"MultiplayerCombat",
								15,
								"[CombatMessageController.ReceiveNotify]协议字段CombatCommon为空",
								["id", e],
							)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"MultiplayerCombat",
							15,
							"[CombatMessageController.ReceiveNotify]战斗消息必须包含CombatCommon属性",
							["id", e],
						);
			}),
			this.sX.has(e)
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"MultiplayerCombat",
							15,
							"[CombatMessageController.Register]战斗网络消息重复注册",
							["id", e],
						),
					!1)
				: (this.sX.set(e, (e, o) => {
						t(e, o);
					}),
					!0)
		);
	}
	static UnRegister(e) {
		return (
			Net_1.Net.UnRegister(e),
			this.sX.delete(e) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("MultiplayerCombat", 15, "战斗网络消息未注册", [
						"id",
						e,
					])),
			!0
		);
	}
	static Process(e, t, o, r) {
		var a = CombatMessage_1.CombatNet.SyncNotifyMap.get(e);
		a ? a(t, o, r) : this.sX.get(e)?.(t, o);
	}
	static RegisterPreTick(e, t) {
		this.Y7.has(e)
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"CombatInfo",
					15,
					"[CombatMessageController.RegisterPreTick] 当前Comp已经注册过PreTick",
					["Comp", e.toString()],
				)
			: this.Y7.set(e, t);
	}
	static UnregisterPreTick(e) {
		this.Y7.has(e)
			? this.Y7.delete(e)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"CombatInfo",
					15,
					"[CombatMessageController.RegisterPreTick] 当前Comp未注册过PreTick",
					["Comp", e.toString()],
				);
	}
	static RegisterAfterTick(e, t) {
		this.ZEt.has(e)
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"CombatInfo",
					15,
					"[CombatMessageController.RegisterAfterTick] 当前Comp已经注册过AfterTick",
					["Comp", e.toString()],
				)
			: this.ZEt.set(e, t);
	}
	static UnregisterAfterTick(e) {
		this.ZEt.has(e)
			? this.ZEt.delete(e)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"CombatInfo",
					15,
					"[CombatMessageController.UnregisterAfterTick] 当前Comp未注册过AfterTick",
					["Comp", e.toString()],
				);
	}
	static PreTick(e) {
		if (
			Net_1.Net.IsServerConnected() &&
			ModelManager_1.ModelManager.GameModeModel.MapDone
		) {
			var t,
				o,
				r = e * MathUtils_1.MathUtils.MillisecondToSecond;
			for (const e of this.Model.CombatMessageBufferMap.values()) e.OnTick(r);
			for ([t, o] of this.Y7)
				try {
					t.Entity?.Valid && o(e);
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"CombatInfo",
								15,
								"处理方法执行异常",
								e,
								["comp", t.toString()],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CombatInfo",
								15,
								"处理方法执行异常",
								["comp", t.toString()],
								["error", e],
							);
				}
		}
	}
	static AfterTick(e) {
		if (
			Net_1.Net.IsServerConnected() &&
			ModelManager_1.ModelManager.GameModeModel.MapDone
		) {
			for (var [t, o] of this.ZEt)
				try {
					t.Entity?.Valid &&
						((t.Entity.Active || this.tyt.has(t.Entity)) &&
						(o(e), t.Entity.Active)
							? this.tyt.add(t.Entity)
							: this.tyt.delete(t.Entity));
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"CombatInfo",
								15,
								"处理方法执行异常",
								e,
								["comp", t.toString()],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"CombatInfo",
								15,
								"处理方法执行异常",
								["comp", t.toString()],
								["error", e],
							);
				}
			if (
				Time_1.Time.NowSeconds > this.iyt + this.oyt ||
				0 <
					BlackboardController_1.BlackboardController.PendingBlackboardParams
						.size
			) {
				let e = !1;
				for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
					[])
					if (t.IsInit) {
						e || ((r = t.Entity.GetComponent(158)), (e = r?.IsInFightState()));
						var r = Protocol_1.Aki.Protocol.Ai.mNn.create();
						if (
							(l = t.Entity.GetComponent(1)) &&
							l.CreatureData.GetEntityType() ===
								Protocol_1.Aki.Protocol.HBs.Proto_Monster
						) {
							var a,
								n,
								s = Protocol_1.Aki.Protocol.Ai.h2s.create(),
								l = l.CreatureData.GetCreatureDataId();
							for ([a, n] of t.Entity.GetComponent(
								38,
							).AiController.AiHateList.GetHatredMap()) {
								var C = Protocol_1.Aki.Protocol.Ai.n2s.create();
								(C.rkn = MathUtils_1.MathUtils.NumberToLong(
									ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
										a,
									),
								)),
									(C._4n = n.HatredValue),
									s.efs.push(C);
							}
							var i =
								BlackboardController_1.BlackboardController.PendingBlackboardParams.get(
									l,
								);
							i && (s.u4n = [...i.values()]),
								s.u4n.length > 100 &&
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"MultiplayerCombat",
										20,
										"黑板数据过大",
										["CreatureData", l],
										["AiBlackboards", s.u4n.length],
									),
								s.tfs.length > 100 &&
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"MultiplayerCombat",
										20,
										"黑板CD数据过大",
										["CreatureData", l],
										["AiBlackboardCd", s.tfs.length],
									),
								s.efs.length > 100 &&
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"MultiplayerCombat",
										20,
										"仇恨数据过大",
										["CreatureData", l],
										["HateList", s.efs.length],
									),
								(r.c4n = s),
								CombatMessage_1.CombatNet.Call(12325, l, r, () => {});
						}
					}
				(this.Model.AnyEntityInFight = e),
					BlackboardController_1.BlackboardController.PendingBlackboardParams.clear(),
					(this.iyt = Time_1.Time.NowSeconds);
			}
			if (
				(!ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode ||
					!ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
				ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove
			) {
				var g = Protocol_1.Aki.Protocol.Xhs.create();
				for (const e of ModelManager_1.ModelManager.CombatMessageModel
					.MoveSyncSet) {
					var M = e.CollectPendingMoveInfos();
					M && g.Mys.push(M);
				}
				0 < g.Mys.length && Net_1.Net.Send(29494, g),
					(ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !1);
			}
			var m = this.Model.MessagePack;
			if (0 < m.Kkn.length) {
				for (const e of m.Kkn)
					e.Qkn &&
						CombatDebugController_1.CombatDebugController.CombatContextInfoMessage(
							"Request",
							e.Qkn.$Gs,
							e.Qkn,
						);
				Net_1.Net.Call(27030, m, (e) => {
					e.yEs && this.QEt(e.yEs);
				}),
					(this.Model.MessagePack =
						Protocol_1.Aki.Protocol.CombatMessage.nXn.create());
			}
		}
	}
	static nyt(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
			r = MathUtils_1.MathUtils.LongToNumber(e.a4n);
		if (
			(CombatMessageController.IsDebugMessageLog &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"MultiplayerCombat",
					15,
					"[CombatMessageController.ReceiveNotify]",
					["Originator", r],
				),
			o)
		)
			if (e.m4n.length <= 0)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"MultiplayerCombat",
						15,
						"[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
						["Originator", r],
					);
			else {
				var a = e.m4n[0].h4n;
				if (o.Entity.Active) {
					var n,
						s = CombatMessageController.Model.GetMessageBuffer(r);
					s &&
						((n = o.Entity.GetComponent(0)),
						CombatMessageController.Model.SetEntityMap(o.Id, r),
						s.RecordMessageTime(a, n.GetPbDataId(), !0));
					const l = o.Entity.GetComponent(57);
					l
						? l.ReceiveMoveInfos(e.m4n, Number(r), a)
						: CombatDebugController_1.CombatDebugController.CombatWarn(
								"Move",
								o.Entity,
								"entity不存在组件CharacterMovementSyncComponent",
								["creatureDataId", t],
							);
				} else {
					if (!o.IsInit) return;
					const t = o.Entity.GetComponent(57);
					(s = e.m4n[e.m4n.length - 1]),
						CombatMessageController.syt(s.$kn, CombatMessageController.ayt),
						CombatMessageController.hyt(s.D3n, CombatMessageController.lyt),
						o.Entity.GetComponent(3)?.SetActorLocationAndRotation(
							CombatMessageController.ayt,
							CombatMessageController.lyt,
							"MoveInfosHandle",
							!1,
						),
						t?.ClearReplaySamples();
				}
			}
	}
	static EntityIsVisibleNotify(e, t) {
		e &&
			(e.IsInit
				? (CombatDebugController_1.CombatDebugController.CombatInfo(
						"Actor",
						e,
						"Entity通知设置显隐",
						["v", t.d4n],
					),
					ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
						e,
						t.d4n,
						"CombatMessageController.EntityIsVisibleNotify",
					))
				: e.GetComponent(0)?.SetVisible(t.d4n));
	}
	static ActorIsVisibleNotify(e, t) {
		e &&
			(CombatDebugController_1.CombatDebugController.CombatInfo(
				"Actor",
				e,
				"Actor通知设置显隐",
				["v", t.C4n],
			),
			ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
				e,
				t.C4n,
				t.C4n,
				t.C4n,
				"ActorIsVisibleNotify",
			));
	}
	static _yt(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		o
			? (o = o.Entity.GetComponent(38))
				? o.OnSyncAiInformation(e)
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"Ai",
						t,
						"OnSyncAiInformation 不存在CharacterAiComponent",
					)
			: CombatDebugController_1.CombatDebugController.CombatWarn(
					"Ai",
					t,
					"OnSyncAiInformation 不存在实体",
				);
	}
	static EntityLoadCompleteNotify(e, t) {
		var o = t.aFn;
		for (const e of t.sfs) {
			var r = MathUtils_1.MathUtils.LongToNumber(e);
			(r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) &&
				r.Entity.GetComponent(38)?.SetLoadCompletePlayer(o);
		}
	}
	static PlayerRebackSceneNotify(e, t) {
		(t = MathUtils_1.MathUtils.LongToNumber(t.mIs)),
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
				t.Entity.GetComponent(57).ClearReplaySamples();
	}
	static MaterialNotify(e, t) {
		if (t.f4n.g4n.length <= 0 || "None" === t.f4n.g4n)
			CombatDebugController_1.CombatDebugController.CombatWarn(
				"Material",
				e,
				"材质同步失败，参数非法",
			);
		else {
			const o = e?.GetComponent(2)?.Actor;
			o
				? t.f4n.p4n
					? ResourceSystem_1.ResourceSystem.LoadAsync(
							t.f4n.g4n,
							UE.PD_CharacterControllerDataGroup_C,
							(e) => {
								e
									? o.CharRenderingComponent.AddMaterialControllerDataGroup(e)
									: Log_1.Log.CheckError() &&
										Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
											"data.MaterialInfo.AssetName",
											t.f4n.g4n,
										]);
							},
						)
					: ResourceSystem_1.ResourceSystem.LoadAsync(
							t.f4n.g4n,
							UE.PD_CharacterControllerData_C,
							(e) => {
								e
									? o.CharRenderingComponent.AddMaterialControllerData(e)
									: Log_1.Log.CheckError() &&
										Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
											"data!.MaterialInfo.AssetName",
											t.f4n.g4n,
										]);
							},
						)
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"Material",
						e,
						"材质同步失败，Actor为空",
					);
		}
	}
	static syt(e, t) {
		(t.X = e.X), (t.Y = e.Y), (t.Z = e.Z);
	}
	static hyt(e, t) {
		(t.Pitch = e.Pitch), (t.Roll = e.Roll), (t.Yaw = e.Yaw);
	}
}
((_a = CombatMessageController).IsTickEvenPausedInternal = !0),
	(CombatMessageController.IsDebugMessageLog = !1),
	(CombatMessageController.IsDebugMoveMessage = !1),
	(CombatMessageController.StartTime = 0),
	(CombatMessageController.MoveData = 0),
	(CombatMessageController.MoveDataCount = 0),
	(CombatMessageController.StateData = 0),
	(CombatMessageController.StateDataCount = 0),
	(CombatMessageController.sX = new Map()),
	(CombatMessageController.uyt = void 0),
	(CombatMessageController.YEt = new Map()),
	(CombatMessageController.QEt = (e) => {
		for (const r of e.Kkn) {
			var t,
				o = r[(o = r.$Gs)];
			r.SEs
				? ((t = r.SEs), _a.$Et(t.$Gs), _a.JEt(o.r4n, t))
				: r.EEs && ((t = r.EEs), _a.$Et(t.$Gs), _a.zEt(o.r4n, t));
		}
	}),
	(CombatMessageController.iyt = 0),
	(CombatMessageController.oyt = 1),
	(CombatMessageController.eyt = void 0),
	(CombatMessageController.ryt = void 0),
	(CombatMessageController.Y7 = new Map()),
	(CombatMessageController.ZEt = new Map()),
	(CombatMessageController.tyt = new Set()),
	(CombatMessageController.VEt = (e) => {
		var t,
			o,
			r,
			a = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			n = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
		n
			? n.IsInit &&
				((t = WorldGlobal_1.WorldGlobal.ToUeVector(e.rIs)),
				(o =
					CharacterController_1.CharacterController.GetActorComponent(
						n,
					)).SetActorLocation(t, "CombatMessageController.位置重置", !1),
				e.oIs &&
					((r = WorldGlobal_1.WorldGlobal.ToUeRotator(e.D3n)),
					o.SetActorRotation(r, "CombatMessageController.位置重置")),
				n.Entity.GetComponent(161)?.SetForceSpeed(
					Vector_1.Vector.ZeroVectorProxy,
				),
				(o = n.Entity.GetComponent(57))
					? o.ClearReplaySamples()
					: (r = n.Entity.GetComponent(57)) && r?.ClearReplaySamples(),
				e.nIs) &&
				((o = n.Entity.GetComponent(0)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"ResetLocationForZRangeNotify 重置出生点",
						["CreatureDataId", o.GetCreatureDataId()],
						["PbDataId", o.GetPbDataId()],
						["EntityId", n.Entity.Id],
					),
				o.SetInitLocation(t),
				(r = n.Entity.GetComponent(3))?.SetInitLocation(t),
				r?.FixBornLocation("重置出生点.修正角色地面位置", !0, void 0, !1))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"MultiplayerCombat",
					15,
					"[CombatMessageController.ResetLocationForZRangeNotify] 不存在实体。",
					["CreatureData", a],
				);
	}),
	(CombatMessageController.HEt = (e) => {
		for (const t of e.Mys) _a.nyt(t);
	}),
	(CombatMessageController.jEt = (e) => {
		for (const t of e.Mys) _a.nyt(t);
	}),
	(CombatMessageController.WEt = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.r4n.rkn);
		if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)))
			if (e.m4n.length <= 0)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"MultiplayerCombat",
						15,
						"[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
						["MessageId", e.r4n.s4n],
						["Originator", e.r4n.a4n],
						["TimeStamp", e.r4n.h4n],
					);
			else if (t.Entity.Active) {
				var o = MathUtils_1.MathUtils.LongToNumber(e.r4n.a4n);
				(r = CombatMessageController.Model.GetMessageBuffer(o)) &&
					((a = t.Entity.GetComponent(0)),
					CombatMessageController.Model.SetEntityMap(t.Id, o),
					r.RecordMessageTime(e.r4n.h4n, a.GetPbDataId(), !0));
				CharacterController_1.CharacterController.GetActorComponent(
					t,
				).CreatureData.GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
					(o = t.Entity.GetComponent(142)) &&
					o.ReceiveMoveInfos(e.m4n, e.r4n);
			} else {
				if (!t.IsInit) return;
				var r = t.Entity.GetComponent(57),
					a = e.m4n[e.m4n.length - 1];
				CombatMessageController.syt(a.$kn, CombatMessageController.ayt),
					CombatMessageController.hyt(a.D3n, CombatMessageController.lyt);
				const o = t.Entity.GetComponent(3);
				o?.SetActorLocationAndRotation(
					CombatMessageController.ayt,
					CombatMessageController.lyt,
					"MoveSceneItemNotify",
					!1,
				),
					r?.ClearReplaySamples();
			}
	}),
	(CombatMessageController.KEt = (e) => {
		for (const t of e.nfs) CombatMessageController._yt(t);
	}),
	(CombatMessageController.PreAiControlSwitchNotify = (e) => {
		for (const r of e.sfs) {
			var t = MathUtils_1.MathUtils.LongToNumber(r),
				o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
			o
				? (o = o.Entity.GetComponent(38)) && o.AiController.PreSwitchControl()
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"Ai",
						t,
						"PreAiControlSwitchNotify 不存在实体",
						["id", t],
					);
		}
	}),
	(CombatMessageController.ayt = new UE.Vector()),
	(CombatMessageController.lyt = new UE.Rotator()),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("XOn")],
		CombatMessageController,
		"EntityIsVisibleNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("w2n")],
		CombatMessageController,
		"ActorIsVisibleNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Handle("WOn")],
		CombatMessageController,
		"EntityLoadCompleteNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.Handle("JOn")],
		CombatMessageController,
		"PlayerRebackSceneNotify",
		null,
	),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("$On")],
		CombatMessageController,
		"MaterialNotify",
		null,
	),
	(exports.CombatMessageController = CombatMessageController);
