"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckInstanceState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceState extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		if (!e.LimitParams) return !1;
		if (!(a = e.LimitParams.get("InstanceId"))) return !1;
		var a,
			t = parseInt(a);
		switch ((a = e.LimitParams.get("State")) ? parseInt(a) : 0) {
			case 1:
				return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(
					t,
				);
			case 2:
				return !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(
					t,
				);
			default:
				return !1;
		}
	}
}
exports.LevelConditionCheckInstanceState = LevelConditionCheckInstanceState;
