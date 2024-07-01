"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChildQuestNodeBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
	BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class ChildQuestNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
	constructor(t) {
		super(t),
			(this.ChildQuestType = "CheckEntityState"),
			(this.ChildQuestStatus = void 0),
			(this.OnAfterSubmit = (t) => {}),
			(this.NodeType = "ChildQuest");
	}
	get CanGiveUp() {
		return (
			this.ChildQuestStatus === Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Progress
		);
	}
	get IsFinished() {
		return (
			this.ChildQuestStatus ===
				Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished ||
			this.ChildQuestStatus ===
				Protocol_1.Aki.Protocol.W2s.Proto_CQNS_FinishAction
		);
	}
	Init(t, e, i, s, o) {
		"ChildQuest" === s.Type &&
			(super.Init(t, e, i, s, o),
			(this.ChildQuestStatus =
				Protocol_1.Aki.Protocol.W2s.Proto_CQNS_NotActive),
			i.Bfs) &&
			(this.UpdateChildQuestStatus(i.Bfs.n3n, e),
			this.UpdateProgress(i.Bfs.Gms));
	}
	UpdateChildQuestStatus(t, e) {
		var i = this.ChildQuestStatus;
		if (((this.ChildQuestStatus = t), i !== this.ChildQuestStatus)) {
			switch (t) {
				case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Progress:
					this.il(e);
					break;
				case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished:
					this.$ne();
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
				this.Context,
				i,
				this.ChildQuestStatus,
			);
		}
	}
	OnNodeActive() {
		this.ContainTag(2) || this.AddTag(0);
	}
	il(t) {
		this.AddEventsOnChildQuestStart(), this.OnStart(t);
	}
	$ne() {
		this.wQt(!0);
	}
	OnNodeDeActive(t) {
		this.RemoveTag(0),
			t ||
				(this.wQt(!1),
				(this.ChildQuestStatus =
					Protocol_1.Aki.Protocol.W2s.Proto_CQNS_NotActive));
	}
	wQt(t) {
		this.RemoveEventsOnChildQuestEnd(), this.OnEnd(t);
	}
	OnCreate(t) {
		return (
			(this.ChildQuestType = t.Condition.Type),
			t.HideTip && this.AddTag(3),
			t.HideUi && (this.AddTag(2), this.AddTag(3)),
			t.ShowNavigation && this.AddTag(4),
			(this.TrackTarget = t.TrackTarget),
			(this.TrackTextConfig = t.TidTip),
			!0
		);
	}
	OnStart(t) {}
	OnEnd(t) {}
	AddEventsOnChildQuestStart() {}
	RemoveEventsOnChildQuestEnd() {}
	SubmitNode(t = void 0) {
		this.Blackboard.ContainTag(6)
			? this.Blackboard.RemovePreparingRollbackNode(this.NodeId)
			: this.Blackboard.IsSuspend() ||
				(this.OnBeforeSubmit(),
				GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSubmitNode(
					this.Context,
					this.OnAfterSubmit,
					t,
				));
	}
	OnBeforeSubmit() {}
	GetCorrelativeEntities() {
		return this.CorrelativeEntities;
	}
}
exports.ChildQuestNodeBase = ChildQuestNodeBase;
