"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayWuYinAreaSequence = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayWuYinAreaSequence extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, a) {
		var r = e.get("State");
		"Play" !== r && "End" !== r
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"WuYinModel",
					4,
					"PlayWuYinSequence事件State参数填写错误！（必须是Play或者End）",
					["GroupId:", this.GroupId],
				)
			: ((e = e.get("SequenceName")),
				ModelManager_1.ModelManager.WuYinAreaModel.PlayWuYinSequence(e, r));
	}
}
exports.LevelEventPlayWuYinAreaSequence = LevelEventPlayWuYinAreaSequence;
