"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils"),
	LevelGeneralCommons_1 = require("./LevelGeneralCommons");
class LevelGeneralBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static UpdateEntityTag(e, t, n) {
		LevelGeneralCommons_1.LevelGeneralCommons.UpdateEntityTag(e, t, n);
	}
	static HandleConditionInteractOption(e, t, n, r) {
		return !1;
	}
	static TriggerLevelGeneralEvents(e, t) {
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
			e,
			t,
		);
	}
	static HandleConditionalEventListen(e) {}
	static HandleConditionPush(e) {}
	static OpenInteractHints() {
		TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView();
	}
	static CloseInteractHints() {
		TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
	}
}
exports.default = LevelGeneralBlueprintFunctionLibrary;
