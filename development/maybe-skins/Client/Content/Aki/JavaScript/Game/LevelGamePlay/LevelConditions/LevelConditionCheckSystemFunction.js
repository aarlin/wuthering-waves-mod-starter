"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckSystemFunction = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSystemFunction extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, n) {
		var o = e.SystemId;
		o = ModelManager_1.ModelManager.FunctionModel.IsOpen(o);
		return "Eq" === e.Compare ? o : !o;
	}
}
exports.LevelConditionCheckSystemFunction = LevelConditionCheckSystemFunction;
