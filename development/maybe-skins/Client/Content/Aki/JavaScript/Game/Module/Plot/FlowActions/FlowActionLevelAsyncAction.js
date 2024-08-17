"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionLevelAsyncAction = void 0);
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLevelAsyncAction extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments), (this.zKe = 0);
	}
	OnExecute() {
		this.zKe++;
		const e = this.zKe;
		var t = LevelGeneralContextDefine_1.PlotContext.Create(
			this.Context.FlowIncId,
			this.Context.Context?.SubType,
		);
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
			[this.ActionInfo],
			t,
			(t) => {
				this.ActionInfo &&
					this.Runner &&
					e === this.zKe &&
					this.FinishExecute(1 === t);
			},
		);
	}
	OnBackgroundExecute() {
		this.OnExecute();
	}
	OnInterruptExecute() {
		this.zKe++, this.FinishExecute(!0);
	}
}
exports.FlowActionLevelAsyncAction = FlowActionLevelAsyncAction;
