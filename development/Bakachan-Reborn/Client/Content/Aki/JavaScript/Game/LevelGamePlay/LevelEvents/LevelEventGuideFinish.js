"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventGuideFinish = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventGuideFinish extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, n) {
		e &&
			(e = e.get("GuidePassword")) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GuideFinish,
				parseInt(e),
			);
	}
}
exports.LevelEventGuideFinish = LevelEventGuideFinish;
