"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionAssistant = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class FunctionAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments), (this.cto = void 0), (this.mto = void 0);
	}
	Load(e) {
		var t = this.dto(this.Model.Config.FrameEvents);
		this.SetFrameEvents(this.Model.Config.FrameEvents),
			(this.cto = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(t, (t) => {
				(this.cto = void 0), e(t ?? !1);
			}));
	}
	PreAllPlay() {
		(this.mto = void 0),
			ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqStart();
	}
	AllStop() {
		this.Model.FrameEvents.clear();
	}
	End() {
		this.cto && this.cto.Cancel(),
			this.mto &&
				(this.mto.Remove(), UiManager_1.UiManager.CloseView("PlotLogoView")),
			ModelManager_1.ModelManager.PlotModel.PlotWeather.StopAllWeather(),
			ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnSeqEnd(),
			this.Model.FrameEvents.clear();
	}
	dto(e) {
		var t = new Array();
		if (e?.length)
			for (const r of e)
				if (r.EventActions?.length)
					for (const e of r.EventActions) {
						let r;
						switch (e.Name) {
							case "AwakeEntity":
								var o = e.Params;
								r = o.EntityIds;
								break;
							case "ChangeEntityState":
								r = [(o = e.Params).EntityId];
						}
						if (r && 0 < r.length) for (const e of r) t.push(e);
					}
		return t;
	}
	SetFrameEvents(e) {
		if (e && 0 !== e.length)
			for (const t of e)
				this.Model.FrameEvents.set(t.EventKey, t.EventActions),
					this.Model.ActionQueue.Push(t.EventKey);
	}
	RunSequenceFrameEvents(e) {
		var t;
		5 !== this.Model.State &&
			((t = this.Model.GetFrameEvents(e)),
			!this.Model.ActionQueue || this.Model.ActionQueue.Size <= 0
				? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 46, "ActionQueue为空")
				: (this.Model.ActionQueue.Pop() !== e &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"编辑器与Seq帧事件顺序不一致，可能会导致跳过的表现错误",
						),
					t && 0 !== t.length
						? ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
								t,
								() => {},
							)
						: ControllerHolder_1.ControllerHolder.FlowController.LogError(
								"没有找到对应的帧事件",
								["key", e],
							)));
	}
	ShowLogo(e) {
		(e *= CommonDefine_1.MILLIONSECOND_PER_SECOND) < TimerSystem_1.MIN_TIME
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "展示logo时间过短，不展示")
			: (UiManager_1.UiManager.OpenView("PlotLogoView"),
				(this.mto = TimerSystem_1.TimerSystem.Delay(() => {
					UiManager_1.UiManager.CloseView("PlotLogoView"), (this.mto = void 0);
				}, e)));
	}
}
exports.FunctionAssistant = FunctionAssistant;
