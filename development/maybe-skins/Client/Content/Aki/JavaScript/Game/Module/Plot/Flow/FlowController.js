"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowController = exports.LOCAL_FLOWINCID = void 0);
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
	FlowActionCenter_1 = require("./FlowActionCenter"),
	FlowActionRunner_1 = require("./FlowActionRunner"),
	FlowLaunchCenter_1 = require("./FlowLaunchCenter"),
	FlowNetworks_1 = require("./FlowNetworks"),
	FlowServerNotifyCenter_1 = require("./FlowServerNotifyCenter"),
	assistantMap =
		((exports.LOCAL_FLOWINCID = -1),
		{ 0: void 0, 1: void 0, 2: void 0, 3: void 0 });
class FlowController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
	static OnInit() {
		var t = super.OnInit();
		return FlowNetworks_1.FlowNetworks.Register(), t;
	}
	static OnClear() {
		return FlowNetworks_1.FlowNetworks.UnRegister(), super.OnClear();
	}
	static RegisterAssistant() {
		this.AddAssistant(0, new FlowServerNotifyCenter_1.FlowServerNotifyCenter()),
			this.AddAssistant(1, new FlowActionCenter_1.FlowActionCenter()),
			this.AddAssistant(2, new FlowActionRunner_1.FlowActionRunner()),
			this.AddAssistant(3, new FlowLaunchCenter_1.FlowLaunchCenter());
	}
	static c$t(t) {
		if (this.Assistants) return this.Assistants.get(t);
	}
	static StartNotify(t) {
		this.c$t(0).HandleFlowStartNotify(t);
	}
	static EndNotify(t) {
		this.c$t(0).HandleFlowEndNotify(t);
	}
	static SkipBlackScreenNotify(t) {
		this.c$t(0).HandleFlowSkipBlackScreenNotify(t);
	}
	static ClearOnLeaveOnlineWorld() {}
	static GetFlowAction(t) {
		return this.c$t(1).GetFlowAction(t);
	}
	static ExecuteActions(t, e, i) {
		this.c$t(2).ExecuteActions(t, e, i);
	}
	static FinishFlow(t, e, i) {
		this.c$t(2).FinishFlow(t, e, i);
	}
	static HasFlow(t, e, i) {
		return this.c$t(2).HasFlow(t, e, i);
	}
	static BackgroundFlow(t, e = !0, i = !1) {
		this.c$t(2).BackgroundActions(t, e, i);
	}
	static RunNextAction() {
		this.c$t(2).ExecuteNextAction();
	}
	static FinishFlowByGm() {
		this.c$t(2).ForceFinishActionsByGm();
	}
	static GetCurFlowAction() {
		return this.c$t(2).GetCurActionName();
	}
	static IsInShowTalk() {
		return this.c$t(2).IsInShowTalk();
	}
	static ExecuteSubActions(t, e) {
		this.c$t(2).ExecuteSubActions(t, e);
	}
	static GetInteractPoint() {
		return this.c$t(2).GetInteractPoint();
	}
	static AddActionNext(t) {
		this.c$t(2).AddActionNext(t);
	}
	static GetRecommendedOption(t) {
		return this.c$t(2).GetOptionToSelect(t);
	}
	static SelectOption(t, e) {
		this.c$t(2).RecordOption(t, e);
	}
	static get FlowSequence() {
		return this.c$t(2).FlowSequence;
	}
	static get FlowShowTalk() {
		return this.c$t(2).FlowShowTalk;
	}
	static EnableSkip(t) {
		this.c$t(2).EnableSkip(t);
	}
	static CheckCanSkipTmp() {
		return this.c$t(2).CheckCanSkipTmp();
	}
	static CountDownSkip(t) {
		this.c$t(2).TriggerCountDownSkip(t);
	}
	static CheckDisableInput(t) {
		this.c$t(2).HandleInputBeforePlay(t);
	}
	static GetNextAction(t = !0) {
		return this.c$t(2).GetNextAction(t);
	}
	static LogError(t, ...e) {
		this.c$t(2).LogError(t, ...e);
	}
	static StartFlowByRes(t) {}
	static StartFlow(t, e, i, s, o, n, r, c, a) {
		return this.c$t(3).StartFlow(t, e, i, s, o, n, r, void 0, void 0, c);
	}
	static StartFlowForView(t, e, i, s, o = !0) {
		return this.c$t(3).StartFlow(t, e, i, void 0, void 0, !1, !1, s, o);
	}
	static StartPlotNetworkPending() {
		this.c$t(3).StartPlotNetworkPending();
	}
	static OnTick(t) {
		this.c$t(3).Tick(t);
	}
}
(exports.FlowController = FlowController).IsTickEvenPausedInternal = !0;
