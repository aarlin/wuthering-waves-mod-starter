"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConditionListenBeHit = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionListenBeHit extends AiStateMachineCondition_1.AiStateMachineCondition {
	constructor() {
		super(...arguments),
			(this.mne = !1),
			(this.dne = new Set()),
			(this.Cne = 0),
			(this.gne = (e, t) => {
				0 < t.VisionCounterAttackId &&
					this.Cne === t.VisionCounterAttackId &&
					(this.ResultSelf = !0),
					t.HasBeHitAnim
						? this.dne.has(t.BeHitAnim) && (this.ResultSelf = !0)
						: this.mne && (this.ResultSelf = !0);
			});
	}
	OnInit(e) {
		return (
			e.CondListenBeHit.NoHitAnimation && (this.mne = !0),
			e.CondListenBeHit.SoftKnock &&
				(this.dne.add(0), this.dne.add(1), this.dne.add(8), this.dne.add(9)),
			e.CondListenBeHit.HeavyKnock &&
				(this.dne.add(2), this.dne.add(3), this.dne.add(10), this.dne.add(11)),
			e.CondListenBeHit.KnockUp && this.dne.add(4),
			e.CondListenBeHit.KnockDown && (this.dne.add(6), this.dne.add(5)),
			e.CondListenBeHit.Parry && this.dne.add(7),
			(this.Cne = e.CondListenBeHit.VisionCounterAttackId),
			!0
		);
	}
	OnClear() {
		EventSystem_1.EventSystem.HasWithTarget(
			this.Node.Entity,
			EventDefine_1.EEventName.CharBeHitLocal,
			this.gne,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Node.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.gne,
			);
	}
	OnEnter() {
		(this.ResultSelf = !1),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Node.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.gne,
			);
	}
	OnExit() {
		(this.ResultSelf = !1),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Node.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.gne,
			);
	}
	ToString(e, t = 0) {
		super.ToString(e, t), e.Append("监听受击\n");
	}
}
exports.AiStateMachineConditionListenBeHit = AiStateMachineConditionListenBeHit;
