"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSubmitQuestBehavior = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSubmitQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e && e.Callback && e.Callback();
	}
}
exports.LevelEventSubmitQuestBehavior = LevelEventSubmitQuestBehavior;
