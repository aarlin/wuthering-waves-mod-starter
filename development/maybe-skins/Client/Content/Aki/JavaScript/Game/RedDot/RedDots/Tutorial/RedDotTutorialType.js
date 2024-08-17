"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotTutorialType = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotTutorialType extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionTutorial";
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.RedDotNewTutorialType];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.TutorialModel.RedDotCheckIsNewTutorialType(
			e,
		);
	}
}
exports.RedDotTutorialType = RedDotTutorialType;
