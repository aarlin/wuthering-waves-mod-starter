"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetVar = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventSetVar extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r, t) {
		e
			? (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestDoAction(t, r),
				this.FinishExecute(!0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						7,
						"LevelEventSetVar, 设定变量的值参数为空",
					),
				this.FinishExecute(!1));
	}
}
exports.LevelEventSetVar = LevelEventSetVar;
