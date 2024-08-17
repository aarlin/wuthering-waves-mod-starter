"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Net = exports.CallbackStatus = void 0);
const UE = require("ue"),
	Info_1 = require("../Common/Info"),
	Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	Time_1 = require("../Common/Time"),
	List_1 = require("../Container/List"),
	Queue_1 = require("../Container/Queue"),
	Long = require("../Define/Net/long"),
	NetDefine_1 = require("../Define/Net/NetDefine"),
	GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
	TimerSystem_1 = require("../Timer/TimerSystem"),
	MathUtils_1 = require("../Utils/MathUtils"),
	StringUtils_1 = require("../Utils/StringUtils"),
	NetInfo_1 = require("./NetInfo"),
	ENABLE_NET_STAT = !0,
	ENABLE_NET_LOG = !0,
	ENABLE_HEARTBEAT_LOG = !0,
	ENABLE_SYNC_LOG = !0,
	ENABLE_MESSAGE_LOG = !1,
	s2cEncryptType = { [0]: 1, 2: 0 };
class CallbackStatus {
	constructor(e) {
		(this.UserData = void 0),
			(this.IsFinished = !0),
			(this.t6 = 0),
			(this.Zqi = 0),
			(this.Zqi = e);
	}
	get IsJobFinished() {
		return this.t6 >= CallbackStatus.MaxCallbackCount
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 31, "分帧回调次数超过最大值", [
						"MessageId",
						this.Zqi,
					]),
				!0)
			: this.IsFinished;
	}
	get CallbackCount() {
		return this.t6;
	}
	IncrementCount() {
		this.t6++;
	}
}
(exports.CallbackStatus = CallbackStatus).MaxCallbackCount = 180;
class CallbackQueueItem {
	constructor(e, t) {
		(this.Callback = void 0),
			(this.Status = void 0),
			(this.Callback = e),
			(this.Status = new CallbackStatus(t));
	}
	DoCallback() {
		return this.Callback?.(this.Status), this.Status.IsJobFinished;
	}
}
class SendMessageCache {
	constructor(e, t, N, i, a) {
		(this.RpcId = 0),
			(this.SeqNo = 0),
			(this.MessageId = void 0),
			(this.EncodeMessage = void 0),
			(this.Handle = void 0),
			(this.SendTimeMs = 0),
			(this.TimeoutHandle = void 0),
			(this.RpcId = e),
			(this.SeqNo = t),
			(this.MessageId = N),
			(this.EncodeMessage = i),
			(this.Handle = a),
			(this.SendTimeMs = Date.now()),
			(this.TimeoutHandle = void 0);
	}
	ClearHandle() {
		this.Handle = void 0;
	}
}
SendMessageCache.NullMessageCache = new SendMessageCache(
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
);
class Net {
	static get RttMs() {
		return NetInfo_1.NetInfo.RttMs;
	}
	static get LastReceiveTimeMs() {
		return Net.QK;
	}
	static StartReconnecting() {
		Net.Dna = !0;
	}
	static Ana() {
		Net.Dna = !1;
	}
	static IsServerConnected() {
		return Net.Dna || 4 === Net.Rna;
	}
	static IsFinishLogin() {
		return 4 === Net.Rna;
	}
	static ChangeState1() {
		Net.Rna = 1;
	}
	static Una() {
		1 !== Net.Rna && Net.xna(2), (Net.Rna = 2);
	}
	static DX() {
		return 2 <= Net.Rna && Net.Rna <= 4;
	}
	static ChangeStateEnterGame() {
		2 !== Net.Rna && 3 !== Net.Rna && Net.xna(3), (Net.Rna = 3);
	}
	static ChangeStateFinishLogin() {
		3 !== Net.Rna && Net.xna(4), (Net.Rna = 4), Net.Ana();
	}
	static IsCallbackPaused() {
		return Net.sga;
	}
	static PauseAllCallback() {
		(Net.sga = !0),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 31, "暂停消息处理");
	}
	static ResumeAllCallback() {
		(Net.sga = !1),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Net", 31, "恢复消息处理");
	}
	static xna(e) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Net",
				31,
				"状态切换错误",
				["Current", Net.Rna],
				["Dest", e],
			);
	}
	static SetNetworkErrorHandle(e) {
		Net.$K = e;
	}
	static SetExceptionHandle(e) {
		Net.YK = e;
	}
	static SetAddRequestMaskHandle(e) {
		Net.JK = e;
	}
	static SetRemoveRequestMaskHandle(e) {
		Net.zK = e;
	}
	static Initialize() {
		Net._X(0);
		var e = new UE.KuroKcpClient(),
			e =
				(1 === Info_1.Info.PlatformType && (e.UseNewResolveIp = !1),
				(e.IsTickDrivenOutside = !0),
				e.OnConnectSuccess.Add(Net.lia),
				e.OnRecResp.Bind(Net.iX),
				e.OnRecException.Bind(Net.oX),
				e.OnRecPush.Bind(Net.rX),
				e.OnError.Bind(Net.nX),
				e.SetEnType(2, 111),
				e.SetEnType(2, 112),
				Net.sX.clear(),
				(Net.aX = 0),
				(Net.hX = 0),
				(Net.lX = 0),
				UE.KuroStaticLibrary.IsBuildShipping() ||
					((Net.uX = ENABLE_NET_LOG),
					(Net.cX = ENABLE_NET_STAT),
					(Net.mX = ENABLE_HEARTBEAT_LOG),
					(Net.dX = ENABLE_SYNC_LOG)),
				Net.CX(NetDefine_1.PushMessageIds, "Net.Push", !0),
				Net.CX(NetDefine_1.RequestMessageIds, "Net.Request", !1),
				Net.CX(NetDefine_1.ResponseMessageIds, "Net.Response", !0),
				Net.CX(NetDefine_1.NotifyMessageIds, "Net.Notify", !0),
				e.SetKcpMtu(1e3),
				e.SetKcpSegmentSize(123952),
				e.SetKcpWndSize(256, 256),
				e.SetKcpNoDelay(1, 10, 2, 1),
				e.SetKcpStream(!0),
				(Net.gX = e),
				{
					GroupId: new UE.FName("NetOnceTaskGroup"),
					Priority: 100,
					IsEmpty: this.fX,
					Consume: this.pX,
				});
		GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterOnceTaskCustomGroup(
			e,
		);
	}
	static Tick(e) {
		Net.gX && Net.gX.TickOutside(e);
	}
	static InitCanTimerOutMessage(e) {
		Net.MX.clear();
		for (const t of e) Net.MX.add(t);
	}
	static InitNotPauseMessage(e) {
		Net.zX.includes(e) || Net.zX.push(e);
	}
	static hga() {
		return !!Net.lga && (Net.lga.DoCallback() && (Net.lga = void 0), !0);
	}
	static _ga(e) {
		return 0 !== e.Size && ((Net.lga = e.Pop()), Net.hga());
	}
	static Connect(e, t, N, i, a) {
		Net.EX()
			? ((Net._ia = N),
				(Net.uia = a),
				(Net.cia = 0),
				(Net.mia = e),
				(Net.dia = t),
				(Net.Cia = i),
				Net.gia())
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 9, "已经连接或者正在连接中."),
				N(3));
	}
	static async ConnectAsync(e, N, i, a) {
		return new Promise((t) => {
			Net.Connect(
				e,
				N,
				(e) => {
					t(e);
				},
				i,
				a,
			);
		});
	}
	static Disconnect(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Net", 31, "断开连接", ["Reason", e]),
			Net._X(0),
			Net._ia && Net.fia(2),
			(Net.Rna = 0 === e ? 5 : 0),
			1 !== e && (Net.LX(), (Net.aX = 0), (Net.hX = 0), Net.Ana());
	}
	static SetDynamicProtoKey(e, t) {
		e = s2cEncryptType[e];
		Net.Una();
		Net.gX.SetK(e, t) ||
			(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Net", 22, "网络 key 设置失败"));
	}
	static GetDownStreamSeqNo() {
		return Net.lX;
	}
	static GetCachedMessageData(e) {
		let t = Net.RX.GetHeadNextNode(),
			N = void 0;
		for (; t; ) {
			if (t.Element?.SeqNo === e) {
				N = t.Element;
				break;
			}
			t = t.Next;
		}
		var i, a, s;
		return N
			? (([i, a, , s] = Net.gX
					.GetDebugString(N.EncodeMessage, ";", N.MessageId, N.SeqNo)
					.split(";")),
				[N.MessageId, Number(i), a, s])
			: [0, 0, "", ""];
	}
	static GetUnVerifiedMessageCount() {
		return Net.RX.Count;
	}
	static ReconnectSuccessAndReSend(N) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Net", 31, "重连流程,", ["lastReceived", N]);
		var i = Net.RX.Count;
		if (0 < i) {
			let e = Net.RX.GetHeadNextNode(),
				t = !1;
			for (; e; ) {
				var a = e.Element.SeqNo;
				if (N <= a) {
					t = a === N;
					break;
				}
				e = e.Next;
			}
			e &&
				(Net.RX.RemoveNodesBeforeThis(e, t), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Net",
					31,
					"重连流程, 清理掉已经被服务器收到的缓存消息",
					["beforeCount", i],
					["afterCount", Net.RX.Count],
					["find SeqNo", e.Element.SeqNo],
				);
		}
		if (0 < Net.RX.Count) {
			let e = 0,
				t = 0,
				N = 0,
				i = Net.RX.GetHeadNextNode();
			for (; i; ) {
				var s,
					r,
					o = i.Element,
					n = o.MessageId;
				0 == (3 & NetDefine_1.protoConfig[n]) ||
					(4 != (r = void 0 !== (s = o.RpcId) ? 1 : 4) && !o.Handle) ||
					(e++,
					(t = o.SeqNo),
					(N = n),
					Net.UX(r, o.SeqNo, s, n, o.EncodeMessage)),
					(i = i.Next);
			}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Net",
					31,
					"重连流程, 重发未被服务器确认的消息",
					["Count", e],
					["lastSeqNo", t],
					["lastMsgId", N],
				);
		}
		Net.ChangeStateFinishLogin();
	}
	static Register(e, N) {
		return Net.sX.has(e)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 1, "网络消息重复注册", ["id", e]),
				!1)
			: (Net.sX.set(e, (e, t) => {
					N(e, t);
				}),
				!0);
	}
	static UnRegister(e) {
		return (
			!!Net.sX.delete(e) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Net", 1, "Notify消息未注册", ["id", e]),
			!1)
		);
	}
	static Send(e, t) {
		Net.AX(e) && Net.PX(4, e, t, void 0, void 0);
	}
	static Call(e, t, N, i = 0) {
		var a;
		!Net.xX(e) && Net.AX(e)
			? ((a = Net.BX()),
				(t = Net.PX(1, e, t, a, N)),
				Net.bX(e, t),
				0 < i && Net.qX(i, t.Element),
				4 == (4 & NetDefine_1.protoConfig[e]) && Net.JK?.(a))
			: N(void 0, void 0);
	}
	static async CallAsync(e, t, i = 0) {
		return new Promise((N) => {
			Net.Call(
				e,
				t,
				(e, t) => {
					N(e);
				},
				i,
			);
		});
	}
	static PX(e, t, N, i, a) {
		var s = Net.OX(),
			r = NetDefine_1.messageDefine[t].encode(N).finish(),
			a =
				(30720 < r.length &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Net",
						31,
						"消息过大",
						["message", t],
						["length", r.length],
					),
				new SendMessageCache(i, s, t, r, a)),
			a = Net.FX(a);
		return Net.VX(t) || Net.UX(e, s, i, t, r, N), a;
	}
	static qX(t, N) {
		const i = N.MessageId;
		var e;
		Net.MX.has(i)
			? ((e = TimerSystem_1.TimerSystem.Delay(() => {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Net",
							31,
							"协议超时",
							["message", i],
							["timeout", t],
						);
					var e = N.Handle;
					if ((N.ClearHandle(), (N.TimeoutHandle = void 0), e))
						try {
							Net.cX && Net.HX.get(i), e(void 0, void 0);
						} catch (e) {
							e instanceof Error
								? Log_1.Log.CheckError() &&
									Log_1.Log.ErrorWithStack("Net", 31, "callback执行异常", e, [
										"requestId",
										i,
									])
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error("Net", 31, "callback执行异常", [
										"requestId",
										i,
									]);
						}
				}, t)),
				(N.TimeoutHandle = e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Net", 31, "该协议未配置可超时", ["message", i]);
	}
	static CX(e, t, N) {
		if (Net.uX || Net.cX)
			for (const s of e) {
				var i = s,
					a = t + `.(${i})`;
				Net.uX && Net.jX.set(i, a), N && Net.cX && Net.HX.set(i, void 0);
			}
	}
	static xX(e) {
		return (
			!!Net.WX.has(e) &&
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Net", 31, "Request重复发送。", ["message", e]),
			!0)
		);
	}
	static _X(e) {
		Net.KX !== e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Net",
					9,
					"连接状态变化",
					["Before", Net.KX],
					["After", e],
				),
			0 === (Net.KX = e)) &&
			Net.gX &&
			Net.gX.Disconnect();
	}
	static EX() {
		return 0 === Net.KX;
	}
	static gia() {
		(Net.IX = TimerSystem_1.TimerSystem.Delay((e) => {
			Net.fia(1);
		}, Net.Cia)),
			Net._X(1),
			Net.gX.Connect(Net.mia, Net.dia);
	}
	static Pna(e) {
		return 111 === e || 107 === e;
	}
	static VX(e) {
		return !!Net.Dna && !Net.Pna(e);
	}
	static AX(e) {
		if (5 === Net.Rna) return !1;
		if (Net.Dna)
			return !(
				107 === e &&
				!Net.DX() &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 31, "上行协议时机不对，未发送", [
						"messageId",
						e,
					]),
				1)
			);
		if (!Net.YX(e) && !Net.DX())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 22, "上行协议时机不对，未发送", [
						"messageId",
						e,
					]),
				!1
			);
		if (4 !== Net.Rna && !(0 == (3 & NetDefine_1.protoConfig[e])))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Net",
						9,
						"尚未完成登录流程, 登录流程以外的协议会被丢弃",
						["state", Net.Rna],
						["messageId", e],
					),
				!1
			);
		return !0;
	}
	static BX() {
		return Net.aX < MathUtils_1.MathUtils.Int16Max
			? ++Net.aX
			: ((Net.aX = 1), Net.aX);
	}
	static OX() {
		return Net.hX < MathUtils_1.MathUtils.Int32Max
			? ++Net.hX
			: ((Net.hX = 1), Net.hX);
	}
	static QX(e) {
		if (0 === e) return !0;
		var t = Net.lX;
		let N = t + 1;
		return (
			(Net.lX = e) === (N = t === MathUtils_1.MathUtils.Int32Max ? 1 : N) ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Net", 31, "下行包序号不对", ["old", t], ["new", e]),
			!1)
		);
	}
	static FX(e) {
		return (
			Net.uX &&
				ENABLE_MESSAGE_LOG &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Net",
					9,
					"AddMessage",
					["SeqNo", e.SeqNo],
					["MsgName", Net.jX.get(e.MessageId)],
				),
			Net.RX.AddTail(e)
		);
	}
	static bX(e, t) {
		Net.XX.set(t.Element.RpcId, t),
			8 == (8 & NetDefine_1.protoConfig[e]) && Net.WX.add(e);
	}
	static cga(e) {
		var t = e.Element,
			N = t.MessageId;
		Net.XX.delete(t.RpcId),
			8 == (8 & NetDefine_1.protoConfig[N]) && Net.WX.delete(N),
			Net.Pna(N) ||
				(Net.RX.RemoveNodesBeforeThis(e, !0),
				Net.uX &&
					ENABLE_MESSAGE_LOG &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Net",
						31,
						"DeleteMessage",
						["RpcId", t.RpcId],
						["SeqNo", t.SeqNo],
						["MsgName", Net.jX.get(N)],
					));
	}
	static YX(e) {
		return 111 === e;
	}
	static JX(e, t, N, i, a = void 0) {
		var s,
			r,
			i = new Uint8Array(i),
			i = new Uint8Array(i);
		Net.QX(t);
		let o = void 0,
			n = void 0,
			_ = void 0;
		const c = N;
		let g = void 0,
			d = !0;
		const u = Date.now();
		if (
			((Net.QK = u),
			a
				? (o = Net.XX.get(a))
					? (Net.cga(o),
						(s = o.Element),
						(r = u - s.SendTimeMs),
						(g = s.MessageId),
						NetInfo_1.NetInfo.SetRttMs(r),
						300 < r &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Net",
								31,
								"RTT过高",
								["requestId", g],
								["rpcId", a],
								["seqNo", s.SeqNo],
								["serverSeqNo", t],
								["rtt", r],
								["deltaTime", Time_1.Time.DeltaTime],
							),
						(_ = s.Handle),
						(d = !this.zX.includes(g)),
						s.TimeoutHandle &&
							TimerSystem_1.TimerSystem.Remove(s.TimeoutHandle))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Net",
							1,
							"网络 rpc 响应不存在",
							["rpcId", a],
							["messageId", N],
						)
				: ((_ = Net.sX.get(c)) ||
						(Net.uX &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Net",
								1,
								"网络 notify 响应不存在",
								["Id", c],
								["Name", Net.jX.get(c)],
							)),
					(d = !this.zX.includes(c))),
			3 === e)
		) {
			const L = `[异常信息:${StringUtils_1.StringUtils.Uint8ArrayToString(i)}]`,
				S = _;
			_ = () => {
				Net.YK?.(
					a,
					N,
					g,
					o
						? NetDefine_1.messageDefine[g].decode(o.Element.EncodeMessage)
						: void 0,
					L,
				),
					S?.(void 0, void 0);
			};
		} else
			(n = NetDefine_1.messageDefine[c].decode(i)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Net", 1, "协议解析异常", ["messageId", c]));
		n && Net.uX && Net.ZX(c, t, a, n);
		var l = (e) => {
			var t;
			Net.cX && Net.HX.get(c),
				Net.uX &&
					0 === e.CallbackCount &&
					67 < (t = Date.now() - u) &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Net",
						31,
						"callback exceeds limit",
						["delay", t],
						["msg", Net.jX.get(c)],
					);
			try {
				0 === e.CallbackCount &&
					g &&
					4 == (4 & NetDefine_1.protoConfig[g]) &&
					Net.zK?.(a),
					_?.(n, e);
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack("Net", 31, "callback执行异常", e, [
							"messageId",
							c,
						])
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Net", 31, "callback执行异常", ["messageId", c]);
			} finally {
				e.IncrementCount();
			}
		};
		if (Net.UseBudget)
			(!d && this.sga ? this.dga : this.Cga).Push(new CallbackQueueItem(l, c));
		else for (var v = new CallbackStatus(c); l(v), !v.IsJobFinished; );
		return !0;
	}
	static UX(e, t, N, i, a, s = void 0) {
		return (
			Net.uX &&
				((s = s || NetDefine_1.messageDefine[i].decode(a)), Net.ZX(i, t, N, s)),
			Net.gX.SendM(e, t, N, i, a, 0 == (32 & NetDefine_1.protoConfig[i]))
		);
	}
	static LX() {
		Net.WX.clear(), Net.XX.clear(), Net.RX.RemoveAllNodeWithoutHead();
	}
	static ZX(e, t, N, i) {
		var a;
		(Net.mX || (24749 !== e && 20673 !== e && 13894 !== e)) &&
			28674 !== e &&
			4850 !== e &&
			15095 !== e &&
			24476 !== e &&
			2619 !== e &&
			26446 !== e &&
			26266 !== e &&
			8144 !== e &&
			9592 !== e &&
			(Net.dX ||
				(23406 !== e &&
					23193 !== e &&
					19679 !== e &&
					18400 !== e &&
					20191 !== e &&
					5751 !== e &&
					25867 !== e &&
					11926 !== e &&
					1532 !== e)) &&
			((a = 0 < Object.keys(i).length), Net.uX) &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Net",
				23,
				Net.jX.get(e),
				["SeqNo", t],
				["RpcId", N],
				["UpStreamSeqNo", Net.hX],
				["DownStream", Net.lX],
				["msg", a ? this.tY(i) : ""],
			);
	}
	static tY(e) {
		return JSON.stringify(e, (e, t) =>
			t instanceof Long ? MathUtils_1.MathUtils.LongToBigInt(t).toString() : t,
		);
	}
}
(exports.Net = Net),
	((_a = Net).QK = 0),
	(Net.UseBudget = !0),
	(Net.gX = void 0),
	(Net._ia = void 0),
	(Net.mia = ""),
	(Net.dia = 0),
	(Net.Cia = 0),
	(Net.IX = void 0),
	(Net.cia = 0),
	(Net.uia = 0),
	(Net.sX = new Map()),
	(Net.WX = new Set()),
	(Net.RX = new List_1.default(SendMessageCache.NullMessageCache)),
	(Net.XX = new Map()),
	(Net.jX = new Map()),
	(Net.HX = new Map()),
	(Net.wX = void 0),
	(Net.NX = void 0),
	(Net.MX = new Set()),
	(Net.aX = 0),
	(Net.hX = 0),
	(Net.lX = 0),
	(Net.KX = 0),
	(Net.Rna = 0),
	(Net.Dna = !1),
	(Net.uX = !1),
	(Net.cX = !1),
	(Net.mX = !1),
	(Net.dX = !1),
	(Net.YK = void 0),
	(Net.JK = void 0),
	(Net.zK = void 0),
	(Net.$K = void 0),
	(Net.lga = void 0),
	(Net.Cga = new Queue_1.Queue(256)),
	(Net.dga = new Queue_1.Queue(32)),
	(Net.sga = !1),
	(Net.zX = new Array()),
	(Net.fX = () =>
		void 0 === Net.lga && 0 === _a.dga.Size && (_a.sga || 0 === _a.Cga.Size)),
	(Net.pX = () => {
		Net.hga() || Net._ga(Net.dga) || Net.sga || Net._ga(Net.Cga);
	}),
	(Net.uga = void 0),
	(Net.mga = void 0),
	(Net.kX = void 0),
	(Net.lia = () => {
		Net.gX?.SetKcpStream(!0), _a.fia(0);
	}),
	(Net.fia = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Net", 31, "Kcp连接结果:", ["result", e]),
			TimerSystem_1.TimerSystem.Remove(Net.IX),
			(Net.IX = void 0),
			1 === e && Net.cia < Net.uia
				? (Net.cia++, Net._X(0), Net.gia())
				: (Net._ia && (Net._ia(e), (Net._ia = void 0)),
					Net._X(0 === e ? 2 : 0));
	}),
	(Net.nX = (e, t, N, i, a) => {
		switch (e) {
			case 1:
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Net",
						31,
						"SocketError",
						["errorCode", t],
						["Size", N],
						["Read", i],
					),
					0 !== t && Net.$K?.(t);
				break;
			case 3:
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Net",
						31,
						"DecryptError",
						["Result", t],
						["Type", N],
						["RpcId", i],
						["MessageId", a],
					);
		}
	}),
	(Net.iX = (e, t, N, i) => {
		Net.JX(2, e, N, i, t);
	}),
	(Net.oX = (e, t, N, i) => {
		Net.JX(3, e, N, i, t);
	}),
	(Net.rX = (e, t, N) => {
		Net.JX(4, e, t, N);
	});
//# sourceMappingURL=Net.js.map
