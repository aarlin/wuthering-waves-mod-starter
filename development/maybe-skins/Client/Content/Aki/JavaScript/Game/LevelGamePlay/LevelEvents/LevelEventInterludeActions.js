"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventInterludeActions = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventInterludeActions extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.pDe = void 0),
			(this.nx = void 0),
			(this.RDe = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("LevelEvent", 18, "幕间行为执行完成"),
					this.UDe();
			});
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "幕间行为触发"),
			e
				? ((this.pDe = e),
					(this.nx = t),
					this.pDe.IsFadeIn ? this.ADe() : this.PDe())
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("LevelEvent", 18, "幕间行为结束【inParams为空】"),
					this.FinishExecute(!0));
	}
	ADe() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "幕间行为淡入");
	}
	PDe() {
		this.pDe?.InterludeActionList && 0 < this.pDe?.InterludeActionList.length
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("LevelEvent", 18, "幕间行为开始执行"),
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
					this.pDe.InterludeActionList,
					LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx),
					this.RDe,
				))
			: this.UDe();
	}
	UDe() {
		this.pDe?.IsFadeOut
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelEvent", 18, "幕间行为淡出")
			: this.FinishExecute(!0);
	}
}
exports.LevelEventInterludeActions = LevelEventInterludeActions;
