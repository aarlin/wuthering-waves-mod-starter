"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineCondition = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
	AiStateMachine_1 = require("../AiStateMachine");
class AiStateMachineCondition {
	constructor(t, e, i) {
		(this.Inited = !1),
			(this.Node = void 0),
			(this.Transition = void 0),
			(this.ConditionData = void 0),
			(this.Index = void 0),
			(this.CheckForClient = !1),
			(this.Reverse = !1),
			(this.ResultSelf = !1),
			(this.LastResult = void 0),
			(this.HasTaskFinishCondition = !1),
			(this.ResultServer = !1),
			(this.Node = t.Node),
			(this.Transition = t),
			(this.ConditionData = e),
			(this.Reverse = e.Reverse),
			(this.Index = i);
	}
	get Result() {
		return this.ResultSelf === !this.Reverse;
	}
	Init() {
		return (
			(this.CheckForClient = !!this.ConditionData.IsClient),
			(this.Inited = this.OnInit(this.ConditionData)),
			this.Inited
		);
	}
	OnInit(t) {
		return !0;
	}
	Enter() {
		(this.LastResult = void 0), this.OnEnter();
	}
	OnEnter() {}
	Exit() {
		(this.LastResult = void 0), this.OnExit();
	}
	OnExit() {}
	Tick() {
		if (
			(this.OnTick(), this.CheckForClient && this.Result !== this.LastResult)
		) {
			const t = Protocol_1.Aki.Protocol.LNn.create();
			(t.ukn = this.Node.RootNode.Uuid),
				(t.mkn = this.Transition.From),
				(t.dkn = this.Transition.To),
				(t.fkn = this.Index),
				(t.gkn = this.Result),
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"StateMachineNew",
					this.Node.Entity,
					`客户端条件 [${t.mkn}=>${t.dkn}]，index:${this.Index}，res:` +
						this.Result,
				),
				CombatMessage_1.CombatNet.Call(13166, this.Node.Entity, t, (e) => {
					CombatDebugController_1.CombatDebugController.CombatDebug(
						"StateMachineNew",
						this.Node?.Entity,
						`客户端条件完成response [${t.mkn}=>${t.dkn}]，index:` + this.Index,
						["response", e.K0s],
					);
				});
		}
		this.LastResult = this.Result;
	}
	OnTick() {}
	Clear() {
		this.OnClear(),
			(this.Node = void 0),
			(this.Transition = void 0),
			(this.ConditionData = void 0);
	}
	OnClear() {}
	HandleServerDebugInfo(t) {
		this.ResultServer = t[this.Index];
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e),
			t.Append(`[${this.Result ? "Y" : "N"} `),
			t.Append((this.ResultServer ? "Y" : "N") + " "),
			t.Append((this.CheckForClient ? "C" : "S") + "] "),
			this.Reverse && t.Append("[取反] "),
			t.Append("" + this.ConditionData.Name);
	}
}
exports.AiStateMachineCondition = AiStateMachineCondition;
