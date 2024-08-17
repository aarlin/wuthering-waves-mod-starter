"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeneralLogicTreeController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ControllerWithAssistantBase_1 = require("./ControllerAssistant/ControllerWithAssistantBase"),
	RequestToServerAssistant_1 = require("./ControllerAssistant/RequestToServerAssistant"),
	ServerNotifyAssistant_1 = require("./ControllerAssistant/ServerNotifyAssistant"),
	TreeExpressAssistant_1 = require("./ControllerAssistant/TreeExpressAssistant"),
	assistantMap = { 0: void 0, 1: void 0, 2: void 0 };
class GeneralLogicTreeController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
	static OnClear() {
		return (GeneralLogicTreeController.u$t = void 0), super.OnClear();
	}
	static RegisterAssistant() {
		this.AddAssistant(0, new ServerNotifyAssistant_1.ServerNotifyAssistant()),
			this.AddAssistant(
				1,
				new RequestToServerAssistant_1.RequestToServerAssistant(),
			),
			this.AddAssistant(2, new TreeExpressAssistant_1.TreeExpressAssistant());
	}
	static c$t(e) {
		if (this.Assistants) return this.Assistants.get(e);
	}
	static OnAddEvents() {
		super.OnAddEvents(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				GeneralLogicTreeController.SUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeModeFinish,
				GeneralLogicTreeController.SUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				GeneralLogicTreeController.yze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BehaviorTreeStartActionSession,
				GeneralLogicTreeController.m$t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				GeneralLogicTreeController.PKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			GeneralLogicTreeController.SUe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeModeFinish,
				GeneralLogicTreeController.SUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				GeneralLogicTreeController.yze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BehaviorTreeStartActionSession,
				GeneralLogicTreeController.m$t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				GeneralLogicTreeController.PKe,
			),
			super.OnRemoveEvents();
	}
	static RequestSubmitNode(e, t, r = void 0) {
		this.c$t(1).RequestSubmitNode(e, t, r);
	}
	static RequestSetTimerInfo(e, t, r, s, o) {
		this.c$t(1).RequestSetTimerInfo(e, t, r, s, o);
	}
	static RequestGiveUp(e, t) {
		this.c$t(1).RequestGiveUp(e, t);
	}
	static RequestRollback(e, t) {
		this.c$t(1).RequestRollback(e, t);
	}
	static RequestTimerEnd(e, t) {
		this.c$t(1).RequestTimerEnd(e, t);
	}
	static RequestFinishUiGameplay(e, t) {
		this.c$t(1).RequestFinishUiGameplay(e, t);
	}
	static RequestForcedOccupation(e, t) {
		this.c$t(1).RequestForcedOccupation(e, t);
	}
	static RequestEntityPosition(e, t, r) {
		return this.c$t(1).RequestEntityPosition(e, t, r);
	}
	static GetEntityPos(e, t, r) {
		return this.c$t(1).GetEntityPos(e, t, r);
	}
	static IsShowNodeStatus(e) {
		return this.c$t(2).IsShowNodeStatus(e);
	}
	static GetTitleTrackNodeId(e) {
		return this.c$t(2).GetTitleTrackNodeId(e);
	}
	static IsShowTrackDistance(e, t) {
		return this.c$t(2).IsShowTrackDistance(e, t);
	}
	static IsShowNodeTrackDistance(e, t) {
		return this.c$t(2).IsShowNodeTrackDistance(e, t);
	}
	static GetTitleText(e, t) {
		return this.c$t(2).GetTitleText(e, t);
	}
	static GetNodeTrackText(e, t) {
		return this.c$t(2).GetNodeTrackText(e, t);
	}
	static ApplyOccupyTreeExpression(e, t, r) {
		this.c$t(2).ApplyOccupyTreeExpression(e, t, r);
	}
	static TryReleaseExpressionOccupation(e) {
		this.c$t(2).TryReleaseExpressionOccupation(e);
	}
}
((exports.GeneralLogicTreeController = GeneralLogicTreeController).u$t =
	void 0),
	(GeneralLogicTreeController.SUe = () => {
		var e = () => {
			GeneralLogicTreeController.u$t = void 0;
			var e =
				ModelManager_1.ModelManager.GeneralLogicTreeModel.GetAllBehaviorTrees();
			if (e && 0 < e.size) for (var [, t] of e) t.SetSleep(!1);
			(ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
				);
		};
		UiManager_1.UiManager.IsViewShow("BattleView")
			? e()
			: ((GeneralLogicTreeController.u$t = new CustomPromise_1.CustomPromise()),
				GeneralLogicTreeController.u$t.Promise.then(e));
	}),
	(GeneralLogicTreeController.yze = () => {
		GeneralLogicTreeController.u$t?.SetResult(!0);
	}),
	(GeneralLogicTreeController.m$t = (e) => {
		var t,
			r,
			s = e.Hms;
		let o;
		switch (s.Xms) {
			case Protocol_1.Aki.Protocol.Pbs.cCs:
				o = s.cCs.$Cs;
				break;
			case Protocol_1.Aki.Protocol.Pbs.dCs:
				o = s.dCs.$Cs;
				break;
			case Protocol_1.Aki.Protocol.Pbs.mCs:
				o = s.mCs.$Cs;
				break;
			case Protocol_1.Aki.Protocol.Pbs.CCs:
				o = s.CCs.$Cs;
				break;
			case Protocol_1.Aki.Protocol.Pbs.gCs:
				o = s.gCs.$Cs;
				break;
			case Protocol_1.Aki.Protocol.Pbs.SCs:
				o = s.SCs.$Cs;
		}
		o &&
			((t = MathUtils_1.MathUtils.LongToBigInt(o.Ykn)),
			(r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t))
				? r.DoAction(s.Xms, o.Jkn, e.aFn, e.Ykn, e.hFn, e.Wms)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"服务器通知执行行为时：对应的数据不存在，联系程序检查Bug",
						["treeType", o.NCs],
						["treeId", t],
						["actionIncId", e.Ykn],
					));
	}),
	(GeneralLogicTreeController.PKe = (e) => {
		ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(e);
	});
