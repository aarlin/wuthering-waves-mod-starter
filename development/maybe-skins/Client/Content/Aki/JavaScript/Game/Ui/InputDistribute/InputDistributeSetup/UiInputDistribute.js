"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiManager_1 = require("../../UiManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class UiInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			UiManager_1.UiManager.IsViewShow("BattleView")
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]刷新UI输入时，主界面已经打开，设置输入分发Tag为 UiInputRootTag",
						),
					this.SetInputDistributeTag(
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
					))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]刷新UI输入时，主界面没有打开，设置输入分发Tag为 ShortcutKeyTag，MouseInputTag，NavigationTag",
						),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.ShortcutKeyTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.MouseInputTag,
						InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
							.NavigationTag,
					])),
			!0
		);
	}
}
exports.UiInputDistribute = UiInputDistribute;
