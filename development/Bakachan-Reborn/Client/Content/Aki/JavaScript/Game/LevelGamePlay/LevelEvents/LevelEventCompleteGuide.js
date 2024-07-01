"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCompleteGuide = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GuideController_1 = require("../../Module/Guide/GuideController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCompleteGuide extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.mDe = 0),
			(this.dDe = (e) => {
				e === this.mDe &&
					((this.mDe = 0),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.GuideGroupFinished,
						this.dDe,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.GuideGroupBreak,
						this.dDe,
					),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.GuideGroupRest,
						this.dDe,
					),
					this.FinishExecute(!0),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("Guide", 17, "行为完成的引导组执行完毕[成功完成]", [
						"组Id",
						e,
					]);
			});
	}
	ExecuteNew(e) {
		e
			? this.CDe(e.GuideId)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelEvent", 19, "行为缺少参数", [
						"actionIndex",
						this.ActionIndex,
					]),
				this.FinishExecute(!1));
	}
	CDe(e) {
		GuideController_1.GuideController.TryFinishGuide(e)
			? ((this.mDe = e),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.GuideGroupFinished,
					this.dDe,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.GuideGroupBreak,
					this.dDe,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.GuideGroupRest,
					this.dDe,
				))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Guide", 17, "行为完成的引导组执行完毕[跳过完成]", [
						"组Id",
						e,
					]),
				this.FinishExecute(!0));
	}
}
exports.LevelEventCompleteGuide = LevelEventCompleteGuide;
