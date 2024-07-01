"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBattleMessageBox extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments), (this.BoardId = 0);
	}
	ReceiveExecuteAI(e, o) {
		e.AiController
			? (0 < this.BoardId &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Battle", 4, "触发战斗弹框", ["Id", this.BoardId]),
					ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController.OpenSoundAreaPlayTips(
						this.BoardId,
					)),
				this.FinishExecute(!0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					e.GetClass().GetName(),
				]);
	}
}
exports.default = TsTaskBattleMessageBox;
