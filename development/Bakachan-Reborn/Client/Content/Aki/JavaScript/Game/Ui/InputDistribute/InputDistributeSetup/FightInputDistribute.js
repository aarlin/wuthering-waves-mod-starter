"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputManager_1 = require("../../Input/InputManager"),
	UiLayer_1 = require("../../UiLayer"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class FightInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			UiLayer_1.UiLayer.UiRootItem.IsUIActiveSelf() ||
			UiLayer_1.UiLayer.WorldSpaceUiRootItem.IsUIActiveSelf()
				? InputManager_1.InputManager.IsShowMouseCursor() &&
					ModelManager_1.ModelManager.PlatformModel.IsPc()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新战斗输入时，处于PC平台并且在显示鼠标，设置输入分发Tag为 UiInputRootTag",
							),
						this.SetInputDistributeTag(
							InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
						))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Input",
								8,
								"[InputDistribute]刷新战斗输入时，则设置分发类型为 FightInputRootTag,UiInputRootTag",
							),
						this.SetInputDistributeTags([
							InputDistributeDefine_1.inputDistributeTagDefine
								.FightInputRootTag,
							InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
						]))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Input",
							8,
							"[InputDistribute]尝试刷新战斗输入时，当任何界面都没显示时，只允许战斗输入",
						),
					this.SetInputDistributeTags([
						InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
					])),
			!0
		);
	}
}
exports.FightInputDistribute = FightInputDistribute;
