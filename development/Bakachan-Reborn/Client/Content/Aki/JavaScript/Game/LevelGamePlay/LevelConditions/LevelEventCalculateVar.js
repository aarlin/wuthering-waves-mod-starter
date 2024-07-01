"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCalculateVar = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventCalculateVar extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r, l) {
		e
			? (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestDoAction(l, r),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						7,
						"LevelEventCalculateVar, 对变量进行运算参数为空",
					),
				this.FinishExecute(!1));
	}
}
exports.LevelEventCalculateVar = LevelEventCalculateVar;
