"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckHasFirstPhantomAtPosition = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasFirstPhantomAtPosition extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
		if (1 === parseInt(e.LimitParams.get("IsFull"))) {
			for (const e of o)
				if (
					0 ===
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
						e.GetConfigId,
						0,
					)
				)
					return !1;
			return !0;
		}
		var r = parseInt(e.LimitParams.get("Position"));
		e = 1 === parseInt(e.LimitParams.get("Available"));
		if (r > o.length) return !1;
		const n = o[r - 1];
		return (
			(0 !==
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
					n.GetConfigId,
					0,
				)) ==
			e
		);
	}
}
exports.LevelConditionCheckHasFirstPhantomAtPosition =
	LevelConditionCheckHasFirstPhantomAtPosition;
