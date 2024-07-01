"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils");
class LevelGeneralBpBridge extends UE.Object {
	HandleCoditionInteractOption(e, t, n, r) {
		return !1;
	}
	TriggerLevelGeneralEvents(e, t) {
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
			e,
			t,
		);
	}
	HandleConditionalEventListen(e) {}
	HandleConditionPush(e) {}
	OpenInteractHints() {
		TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView();
	}
	CloseInteractHints() {
		TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
	}
}
exports.default = LevelGeneralBpBridge;
