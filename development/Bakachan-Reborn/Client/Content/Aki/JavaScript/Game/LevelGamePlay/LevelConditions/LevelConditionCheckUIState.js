"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckUIState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckUIState extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, r) {
		var a = e.LimitParams.get("UIName"),
			i = Number(e.LimitParams.get("UIState"));
		return !a || isNaN(i)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						`配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckUIState}的定义`,
					),
				!1)
			: i
				? UiManager_1.UiManager.IsViewShow(a)
				: !UiManager_1.UiManager.IsViewShow(a);
	}
}
exports.LevelConditionCheckUIState = LevelConditionCheckUIState;
