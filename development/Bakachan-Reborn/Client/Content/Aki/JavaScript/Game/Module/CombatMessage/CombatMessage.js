"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatNet = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Entity_1 = require("../../../Core/Entity/Entity"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager");
class CombatNet {
	static kEt(e, t, a, o) {
		return "function" != typeof e
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"MultiplayerCombat",
						20,
						"CombatMessage notify callback should be static function",
						["MessageKey", t],
						["MessageId", a],
						["FunctionName", o],
					),
				!1)
			: (!this.NotifyMap.has(a) && !this.SyncNotifyMap.has(a)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"MultiplayerCombat",
							20,
							"Trying to register duplicate handle in combat message system",
							["MessageKey", t],
							["MessageId", a],
							["FunctionName", o],
						),
					!1);
	}
	static Listen(e, t) {
		return t ? this.SyncHandle(e) : this.Handle(e);
	}
	static Handle(e) {
		const t = NetDefine_1.ECombatNotifyDataMessage[e];
		return (a, o, s) => {
			this.kEt(a, e, t, o) &&
				this.NotifyMap.set(t, (e, t, o) => {
					s.value?.call(a, e, t, o);
				});
		};
	}
	static SyncHandle(e) {
		const t = NetDefine_1.ECombatNotifyDataMessage[e];
		return (a, o, s) => {
			this.kEt(a, e, t, o) &&
				this.SyncNotifyMap.set(t, (e, t, o) => {
					s.value?.call(a, e, t, o);
				});
		};
	}
	static PreHandle(e) {
		const t = NetDefine_1.ECombatNotifyDataMessage[e];
		return (a, o, s) => {
			this.kEt(a, e, t, o) &&
				this.PreNotifyMap.set(t, (e, t, o) => s.value?.call(a, e, t, o));
		};
	}
	static GenerateRpcId() {
		return CombatNet.FEt < 32767 ? ++CombatNet.FEt : (CombatNet.FEt = 0);
	}
	static RemovePendingCall(e) {
		this.Nqn.delete(e);
	}
	static Call(e, t, a, o, s, n, r, i) {
		s &&
			this.Nqn.has(s) &&
			((M = this.Nqn.get(s)),
			CombatNet.RequestMap.set(M[0], M[1]),
			ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(M[2]),
			this.Nqn.delete(s));
		var M = NetDefine_1.ECombatRequestDataMessage[e],
			l =
				((e = CombatNet.GenerateRpcId()),
				(n =
					n ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
				Protocol_1.Aki.Protocol.CombatMessage.jGs.create());
		return (
			((t =
				((l.i4n = e),
				(l.r4n = CombatNet.CreateCombatCommon(t, r, s, n)),
				(l[M] = a),
				Protocol_1.Aki.Protocol.CombatMessage.WGs.create())).Qkn = l),
			i
				? this.Nqn.set(n, [e, o, t])
				: (CombatNet.RequestMap.set(e, o),
					ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(
						t,
					)),
			n
		);
	}
	static Send(e, t, a, o, s, n) {
		e = NetDefine_1.ECombatPushDataMessage[e];
		var r = Protocol_1.Aki.Protocol.CombatMessage.VGs.create();
		((t =
			((r.r4n = CombatNet.CreateCombatCommon(t, n, o, s)),
			(r[e] = a),
			Protocol_1.Aki.Protocol.CombatMessage.WGs.create())).o4n = r),
			ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(t);
	}
	static CreateCombatCommon(e, t, a, o) {
		return (
			(e =
				e instanceof Entity_1.Entity
					? MathUtils_1.MathUtils.NumberToLong(
							e?.GetComponent(0)?.GetCreatureDataId() ?? 0,
						)
					: MathUtils_1.MathUtils.NumberToLong(e ?? 0)),
			Protocol_1.Aki.Protocol.r4n.create({
				rkn: e,
				n4n: a ? MathUtils_1.MathUtils.BigIntToLong(a) : 0,
				s4n: MathUtils_1.MathUtils.BigIntToLong(
					o ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
				),
				a4n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
				h4n: Time_1.Time.NowSeconds,
				l4n: t ?? !1,
			})
		);
	}
}
((exports.CombatNet = CombatNet).NotifyMap = new Map()),
	(CombatNet.SyncNotifyMap = new Map()),
	(CombatNet.PreNotifyMap = new Map()),
	(CombatNet.FEt = 0),
	(CombatNet.RequestMap = new Map()),
	(CombatNet.Nqn = new Map());
