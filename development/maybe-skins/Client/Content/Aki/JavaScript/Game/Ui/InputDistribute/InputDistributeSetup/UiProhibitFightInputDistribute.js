"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiProhibitFightInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class UiProhibitFightInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		var t = ModelManager_1.ModelManager.InputDistributeModel;
		return (
			!!t.HasAnyNotAllowFightInputViewIsOpen() &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]禁止战斗输入的界面的输入分发，有不允许战斗输入的界面打开",
					[
						"NotAllowFightInputViewNameSet",
						t.GetNotAllowFightInputViewNameSet(),
					],
				),
			this.SetInputDistributeTags([
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
					.ShortcutKeyTag,
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
					.MouseInputTag,
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
					.NavigationTag,
			]),
			!0)
		);
	}
}
exports.UiProhibitFightInputDistribute = UiProhibitFightInputDistribute;
