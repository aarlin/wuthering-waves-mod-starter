"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialListInfo = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class TutorialListInfo {
	constructor(t) {
		(this.OwnerStep = void 0),
			(this.GuideId = 0),
			(this.TipState = 0),
			(this.Duration = 0),
			(this.TutorialTip = !1),
			(this.OwnerStep = t);
	}
	Init() {
		(this.GuideId = this.OwnerStep.Id),
			ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
				this.OwnerStep.Id,
			)?.TutorialTip
				? ((this.TipState = 0),
					(this.TutorialTip = !0),
					(this.Duration = this.OwnerStep.Config.Duration))
				: ((this.TipState = 2), (this.TutorialTip = !1));
	}
	StopGuide() {
		this.OwnerStep &&
			(this.OwnerStep.SwitchState(4), (this.OwnerStep = void 0));
	}
	Tick(t) {
		return (
			1 === this.TipState &&
			((this.Duration -= t), this.Duration <= 0) &&
			(this.StopGuide(), !0)
		);
	}
	ClickToPopState() {
		2 !== this.TipState &&
			0 < this.Duration &&
			((this.TipState = 2),
			this.StopGuide(),
			ModelManager_1.ModelManager.GuideModel.TryPauseTimer());
	}
}
exports.TutorialListInfo = TutorialListInfo;
