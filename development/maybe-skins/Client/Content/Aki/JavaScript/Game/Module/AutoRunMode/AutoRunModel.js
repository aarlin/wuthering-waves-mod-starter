"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AutoRunModel = exports.TeleportInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager");
class TeleportInfo {
	constructor(e, t) {
		(this.Location = e), (this.Rotator = t);
	}
}
exports.TeleportInfo = TeleportInfo;
class AutoRunModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.GWe = "Stopped"),
			(this.NWe = "Disabled"),
			(this.OWe = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid),
			(this.kWe = 0),
			(this.FWe = 0),
			(this.ShouldTpAfterSkip = !1),
			(this.ShouldFastSkip = !1),
			(this.VWe = new Map()),
			(this.HWe = new Map()),
			(this.MapEntityDataCache = new Map());
	}
	OnInit() {
		return (
			(this.NWe = "Disabled"),
			(this.OWe = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid),
			(this.kWe = 0),
			!(this.FWe = 0)
		);
	}
	OnClear() {
		return (
			this.ClearAllOverrideTpInfo(),
			this.ClearAllGuaranteeTpInfo(),
			this.MapEntityDataCache.clear(),
			!0
		);
	}
	GetAutoRunState() {
		return this.GWe;
	}
	SetAutoRunState(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"GeneralLogicTree",
				40,
				"[Gm一键推进] AutoRunState改变",
				["原AutoRunState", this.GWe],
				["新AutoRunState", e],
			),
			this.GWe !== e &&
				((this.GWe = e),
				(ModelManager_1.ModelManager.SundryModel.IsBlockTips =
					this.IsInLogicTreeGmMode()),
				ModelManager_1.ModelManager.GuideModel.SetGmLock(
					this.IsInLogicTreeGmMode(),
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GmAutoModeChange,
					e,
				));
	}
	IsInLogicTreeGmMode() {
		return "Disabled" !== this.NWe && "Running" === this.GWe;
	}
	IsInAfterRunningState() {
		return "Disabled" !== this.NWe && "AfterRunning" === this.GWe;
	}
	IsInServerControlGmMode() {
		return "ServerControlledSkip" === this.NWe;
	}
	GetAutoRunMode() {
		return this.NWe;
	}
	SetAutoRunMode(
		e,
		t = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid,
		o = 0,
		r = 0,
	) {
		(this.NWe = e), (this.OWe = t), (this.kWe = o), (this.FWe = r);
	}
	StopAutoRunAndClearInfo() {
		this.SetAutoRunState("Stopped"), this.ClearAutoRunInfo();
	}
	ClearAutoRunInfo() {
		this.SetAutoRunMode("Disabled"),
			(this.ShouldFastSkip = !1),
			(this.ShouldTpAfterSkip = !1),
			(this.ShouldTpAfterSkip = !1),
			this.ClearAllOverrideTpInfo(),
			this.ClearAllGuaranteeTpInfo();
	}
	GetGmSkipTreeType() {
		return this.OWe;
	}
	GetGmSkipTreeConfigId() {
		return this.kWe;
	}
	GetGmSkipNodeId() {
		return this.FWe;
	}
	GetGuaranteeTpInfo(e) {
		return (
			(e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			this.HWe.get(e)
		);
	}
	SetGuaranteeTpInfo(e, t) {
		(t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Gm",
					40,
					"[Gm一键推进] 设置保底传送信息",
					["地图Id", t],
					["旧值", this.HWe.get(t)],
					["新值", e],
				),
			e ? this.HWe.set(t, e) : this.HWe.delete(t);
	}
	ClearAllGuaranteeTpInfo() {
		this.HWe.clear();
	}
	GetOverrideTpInfo(e) {
		return (
			(e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			this.VWe.get(e)
		);
	}
	SetOverrideTpInfo(e, t) {
		(t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Gm",
					40,
					"[Gm一键推进] 设置覆盖传送信息",
					["地图Id", t],
					["旧值", this.VWe.get(t)],
					["新值", e],
				),
			e ? this.VWe.set(t, e) : this.VWe.delete(t);
	}
	ClearAllOverrideTpInfo() {
		this.VWe.clear();
	}
}
exports.AutoRunModel = AutoRunModel;
