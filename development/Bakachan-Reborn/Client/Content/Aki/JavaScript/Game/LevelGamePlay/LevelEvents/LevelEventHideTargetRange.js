"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventHideTargetRange = void 0);
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHideTargetRange extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e || this.FinishExecute(!1),
			e.IsHideSimpleNpc &&
				SimpleNpcController_1.SimpleNpcController.SetClearOutState(1, !0),
			this.FinishExecute(!0);
	}
}
exports.LevelEventHideTargetRange = LevelEventHideTargetRange;
