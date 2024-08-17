"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Heartbeat = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	OperationsPerformance_1 = require("../PerformanceCollection/OperationsPerformance"),
	HeartbeatDefine_1 = require("./HeartbeatDefine");
class Heartbeat {
	static SetMaxTimeOutHandler(e) {
		this.t8s = e;
	}
	static GetHeartbeatInterval() {
		return this.svi;
	}
	static SendHeartbeatImmediately() {
		this.avi = 9999999;
	}
	static BeginHeartBeat(e) {
		(this.hvi = !0),
			(this.lvi = !1),
			(this._vi = Date.now()),
			(this.uvi = 0),
			this.SetHeartBeatMode(0),
			this.SendHeartbeatImmediately(),
			Net_1.Net.SetReceivedMessageHandle(this.ResetHeartbeatSendTime),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StartHeartBeat),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Heartbeat",
					9,
					"开启心跳",
					["MaxTimeOutCount", this.TimeOutMaxCount],
					["ConnectTimeOut", this.cvi],
					["HeartbeatInterval", this.svi],
					["Reason", HeartbeatDefine_1.EBeginHeartbeat[e]],
				);
	}
	static SetHeartBeatMode(e) {
		if (e !== this.mvi)
			switch ((this.mvi = e)) {
				case 0:
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Heartbeat", 9, "设置心跳配置为普通状态"),
						(this.TimeOutMaxCount =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"normal_heartbeat_timeout_reconnect",
							) ?? 3),
						(this.cvi =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"normal_heartbeat_timeout_ms",
							) ?? 3e3),
						(this.svi =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"normal_heartbeat_interval_ms",
							) ?? 7e3);
					break;
				case 1:
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Heartbeat", 9, "设置心跳配置为战斗状态"),
						(this.TimeOutMaxCount =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"battle_heartbeat_timeout_reconnect",
							) ?? 3),
						(this.cvi =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"battle_heartbeat_timeout_ms",
							) ?? 900),
						(this.svi =
							CommonParamById_1.configCommonParamById.GetIntConfig(
								"battle_heartbeat_interval_ms",
							) ?? 1e3);
			}
	}
	static StopHeartBeat(e) {
		this.hvi = !1;
		var t = this.uvi;
		(this.uvi = 0),
			this.SetHeartBeatMode(0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StopHeartBeat),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Heartbeat",
					9,
					"结束心跳",
					["MaxTimeOutCount", this.TimeOutMaxCount],
					["ConnectTimeOut", this.cvi],
					["HeartbeatInterval", this.svi],
					["TimeOutCount", t],
					["Reason", HeartbeatDefine_1.EStopHeartbeat[e]],
				);
	}
	static dvi() {
		this.uvi++,
			this.hvi &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Heartbeat", 9, "心跳超时", ["次数", this.uvi]),
				this.uvi < this.TimeOutMaxCount
					? this.SendHeartbeatImmediately()
					: TimerSystem_1.TimerSystem.Next(() => {
							this.t8s?.();
						}));
	}
	static RegisterTick() {
		void 0 === Heartbeat.Cvi &&
			(Heartbeat.Cvi = TimerSystem_1.TimerSystem.Forever(
				Heartbeat.Tick,
				TimerSystem_1.MIN_TIME,
			));
	}
	static gvi() {
		(this.avi = 0),
			Log_1.Log.CheckDebug() && Log_1.Log.Debug("Net", 9, "发送心跳");
		var e = new Protocol_1.Aki.Protocol.des();
		Net_1.Net.Call(
			21988,
			Protocol_1.Aki.Protocol.des.create(e),
			this.fvi,
			this.cvi,
		),
			(this.pvi = Date.now()),
			(this.lvi = !0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SendHeartbeat);
	}
}
(exports.Heartbeat = Heartbeat),
	((_a = Heartbeat).hvi = !1),
	(Heartbeat.lvi = !1),
	(Heartbeat.uvi = 0),
	(Heartbeat.TimeOutMaxCount = 0),
	(Heartbeat.cvi = 0),
	(Heartbeat.svi = 0),
	(Heartbeat.pvi = 0),
	(Heartbeat.avi = 0),
	(Heartbeat._vi = 0),
	(Heartbeat.Cvi = void 0),
	(Heartbeat.t8s = void 0),
	(Heartbeat.mvi = void 0),
	(Heartbeat.ResetHeartbeatSendTime = () => {
		1 !== _a.mvi && (_a.avi = 0);
	}),
	(Heartbeat.Tick = (e) => {
		var t;
		_a.hvi &&
			((t = Date.now()),
			(e = Math.max(t - _a._vi, e)),
			(_a.avi += e),
			(_a._vi = t),
			_a.avi < _a.svi || _a.lvi || _a.gvi());
	}),
	(Heartbeat.fvi = (e) => {
		(_a.lvi = !1),
			void 0 === e
				? Heartbeat.dvi()
				: 0 !== Heartbeat.pvi
					? ((e = Date.now()),
						OperationsPerformance_1.OperationsPerformance.AddPing(
							e - Heartbeat.pvi,
						),
						(Heartbeat.pvi = 0))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Core",
							31,
							"ping值计算有误！Heartbeat.LastSendTime为0",
						);
	});
