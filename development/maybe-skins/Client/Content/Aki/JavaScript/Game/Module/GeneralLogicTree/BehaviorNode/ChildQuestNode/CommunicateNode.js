"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommunicateNode = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CommunicateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.CommunicateId = 0),
			(this.BQt = !1),
			(this.bQt = !1),
			(this.qQt = (e) => {
				e === this.CommunicateId &&
					(this.Blackboard.RemoveTag(7), this.SubmitNode());
			}),
			(this.GQt = (e) => {
				e === this.CommunicateId && this.NQt();
			}),
			(this.OQt = (e, t) => {
				t !== this.TreeIncId ||
					UiManager_1.UiManager.IsViewShow("BattleView") ||
					(this.BQt = this.Blackboard.IsTracking);
			}),
			(this.rbe = () => {
				this.BQt &&
					!UiManager_1.UiManager.IsViewShow("CommunicateView") &&
					(this.NQt(), (this.BQt = !1));
			}),
			(this.$Ge = (e) => {
				"CommunicateView" !== e ||
					this.ChildQuestStatus !==
						Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Progress ||
					(this.Blackboard.AddTag(7), this.bQt) ||
					this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest ||
					((this.bQt = !0),
					QuestController_1.QuestNewController.RedDotRequest(
						this.TreeConfigId,
						1,
					));
			}),
			(this.kQt = () => {
				UiManager_1.UiManager.CloseView("CommunicateView");
			});
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"ReceiveTelecom" === (e = e.Condition).Type &&
			((this.CommunicateId = e.TelecomId), !0)
		);
	}
	OnStart(e) {
		super.OnStart(e),
			(this.bQt = !1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CommunicateFinished,
				this.qQt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CommunicateAgain,
				this.GQt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.OQt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.rbe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeMode,
				this.kQt,
			),
			this.NQt();
	}
	OnEnd(e) {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CommunicateFinished,
			this.qQt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CommunicateAgain,
				this.GQt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.OQt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.rbe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeMode,
				this.kQt,
			),
			super.OnEnd(e);
	}
	NQt() {
		this.Blackboard.RemoveTag(7),
			UiManager_1.UiManager.OpenView("CommunicateView", this.CommunicateId);
	}
}
exports.CommunicateNode = CommunicateNode;
