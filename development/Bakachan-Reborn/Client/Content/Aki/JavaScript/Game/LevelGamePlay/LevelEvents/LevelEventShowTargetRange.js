"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventShowTargetRange = void 0);
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventShowTargetRange extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e || this.FinishExecute(!1),
			SimpleNpcController_1.SimpleNpcController.SetClearOutState(1, !1),
			this.FinishExecute(!0);
	}
}
exports.LevelEventShowTargetRange = LevelEventShowTargetRange;
