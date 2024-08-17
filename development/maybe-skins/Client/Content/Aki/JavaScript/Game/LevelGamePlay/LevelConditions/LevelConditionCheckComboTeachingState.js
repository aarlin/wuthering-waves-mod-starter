"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckComboTeachingState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckComboTeachingState extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		return ModelManager_1.ModelManager.ComboTeachingModel.IsClose;
	}
}
exports.LevelConditionCheckComboTeachingState =
	LevelConditionCheckComboTeachingState;
