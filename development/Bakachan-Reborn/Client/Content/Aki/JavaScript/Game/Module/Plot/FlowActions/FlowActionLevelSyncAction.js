"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionLevelSyncAction = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLevelSyncAction extends FlowActionBase_1.FlowActionBase {
	OnExecute() {
		var e = LevelGeneralContextDefine_1.PlotContext.Create(
			this.Context.FlowIncId,
			this.Context.Context?.SubType,
		);
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
			[this.ActionInfo],
			e,
		);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
}
exports.FlowActionLevelSyncAction = FlowActionLevelSyncAction;
