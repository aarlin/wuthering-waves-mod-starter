"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReConnectModel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
class ReConnectModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Uno = !1),
			(this.Ano = 0),
			(this.Pno = 0),
			(this.xno = 0),
			(this.wno = 0),
			(this.Bno = new Set()),
			(this.bno = 0),
			(this.qno = 0),
			(this.Gno = 0),
			(this.Nno = void 0),
			(this.Ono = 1e3),
			(this.kno = 60),
			(this.Fno = void 0),
			(this.Vno = ""),
			(this.Hno = NetworkDefine_1.ENetworkType.None),
			(this.jno = void 0);
	}
	OnInit() {
		return (
			this.ClearReconnectData(),
			void 0 === this.wno && (this.wno = 0),
			(this.bno =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"max_try_reconnect_count",
				) ?? 3),
			(this.qno =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"reconnect_count_per_try",
				) ?? 3),
			(this.kno =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"reconnect_channel_close_seconds",
				) ?? 60),
			(this.Ono =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"reconnect_show_mask_timeout_ms",
				) ?? 1e3),
			-1 ===
			UE.KismetSystemLibrary.GetCommandLine().search("-InfinityReconnect")
				? (this.Uno = !1)
				: ((this.Uno = !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Reconnect",
							42,
							"[InfinityReconnect] Enable infinity reconnect.",
						)),
			!0
		);
	}
	OnClear() {
		return this.ClearReconnectData(), !0;
	}
	ClearReconnectData() {
		(this.Ano = 0),
			(this.Pno = 0),
			this.ResetReconnectStatus(),
			(this.ReconvTraceId = "");
	}
	get ServerChannelCloseTimeMs() {
		return 1e3 * this.kno;
	}
	AddRpc(e) {
		this.Bno.add(e);
	}
	DelRpc(e) {
		this.Bno.delete(e);
	}
	IsRpcEmpty() {
		return this.Bno.size <= 0;
	}
	GetUnResponsedRpcStr() {
		let e = "";
		for (const n of this.Bno) e += `[${n}]`;
		return e;
	}
	IsReConnectMaxCount() {
		return this.Ano > this.qno;
	}
	GetReConnectCount() {
		return this.Ano;
	}
	ReSetReConnectCount() {
		this.Ano = 0;
	}
	AddReConnectCount() {
		return this.Ano++, this.wno++, this.Ano;
	}
	IsTryMaxCount() {
		return !this.Uno && this.Pno >= this.bno;
	}
	AddTryCount() {
		this.Pno++;
	}
	GetTryCount() {
		return this.Pno;
	}
	get GetTotalReConnectCount() {
		return this.wno;
	}
	GetReConnectStatus() {
		return this.xno;
	}
	ResetReconnectStatus() {
		this.xno = 0;
	}
	SetReconnectDoing() {
		this.xno = 1;
	}
	CancelShowMaskTimer() {
		this.Nno &&
			(TimerSystem_1.TimerSystem.Remove(this.Nno), (this.Nno = void 0));
	}
	StartShowMaskTimer(e) {
		this.Nno = TimerSystem_1.TimerSystem.Delay(() => {
			e(), (this.Nno = void 0);
		}, this.Ono);
	}
	SetCurIncId() {
		this.Gno = ReConnectModel.Wno;
	}
	IsReConnectIdSame() {
		return this.Gno === ReConnectModel.Wno;
	}
	static AddReConnectIncId() {
		ReConnectModel.Wno++;
	}
	set DisconnectedFunction(e) {
		this.Fno = e;
	}
	get DisconnectedFunction() {
		return this.Fno;
	}
	get ReconvTraceId() {
		return this.Vno;
	}
	set ReconvTraceId(e) {
		this.Vno = e;
	}
	get LastNetworkType() {
		return this.Hno;
	}
	set LastNetworkType(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Reconnect",
				31,
				"set LastNetworkType",
				["old", this.Hno],
				["new", e],
			),
			(this.Hno = e);
	}
	get NetworkListener() {
		return this.jno || (this.jno = new UE.KuroNetworkChange()), this.jno;
	}
}
(exports.ReConnectModel = ReConnectModel).Wno = 0;
