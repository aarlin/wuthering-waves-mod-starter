"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventTriggerExit = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerExit extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.bLe = (e) => {
				this.FinishExecute(!0);
			});
	}
	Execute(e, t) {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTriggerVolumeExit,
			this.bLe,
		);
	}
	OnReset() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTriggerVolumeExit,
			this.bLe,
		);
	}
}
exports.LevelEventTriggerExit = LevelEventTriggerExit;
