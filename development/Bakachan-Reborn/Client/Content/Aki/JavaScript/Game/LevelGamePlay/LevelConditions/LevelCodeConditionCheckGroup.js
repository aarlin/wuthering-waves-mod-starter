"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelCodeConditionCheckGroup = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralController_1 = require("../LevelGeneralController");
class LevelCodeConditionCheckGroup extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, o, r) {
		return (
			!e ||
			!e.ConditionGroup ||
			LevelGeneralController_1.LevelGeneralController.CheckConditionNew(
				e.ConditionGroup,
				o,
				r,
			)
		);
	}
}
exports.LevelCodeConditionCheckGroup = LevelCodeConditionCheckGroup;
