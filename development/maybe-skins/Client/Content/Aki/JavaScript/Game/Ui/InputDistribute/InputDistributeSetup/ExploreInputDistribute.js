"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiManager_1 = require("../../UiManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class ExploreInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			!!UiManager_1.UiManager.IsViewOpen("PhantomExploreView") &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]PhantomExploreView轮盘界面打开,Input输入检测，刷新战斗输入时设置输入分发Tag为 MoveInputTag",
				),
			this.SetInputDistributeTags([
				InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot
					.AxisInput.MoveInputTag,
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
			]),
			!0)
		);
	}
}
exports.ExploreInputDistribute = ExploreInputDistribute;
