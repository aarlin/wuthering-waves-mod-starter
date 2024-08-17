"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformAlertState = void 0);
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
	AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	TURN_SPEED = 2e4;
class NpcPerformAlertState extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.VZo = () => {
				this.StateMachine.Switch(1);
			});
	}
	CanChangeFrom(e) {
		var t = this.Owner.Entity.GetComponent(168);
		return (
			void 0 !==
				this.Owner.Entity.GetComponent(38)?.AiController?.AiAlert
					?.AiAlertConfig &&
			1 === e &&
			!t.IsInPlot
		);
	}
	OnEnter(e) {
		var t, r;
		Global_1.Global.BaseCharacter &&
			((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
			(r = this.Owner.Entity.GetComponent(3)),
			AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
				r,
				t.ActorLocationProxy,
				2e4,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner.Entity,
				EventDefine_1.EEventName.OnStalkAlertLifted,
				this.VZo,
			));
	}
	OnExit(e) {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner.Entity,
			EventDefine_1.EEventName.OnStalkAlertLifted,
			this.VZo,
		);
	}
}
exports.NpcPerformAlertState = NpcPerformAlertState;
