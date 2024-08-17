"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class SignalDecodeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentGameplayId = ""),
			(this.CurrentGameplayType = 1),
			(this.CurrentMorseCode = ""),
			(this.CurrentDifficulty = 0),
			(this.TargetCompletion = 100),
			(this.Speed = 100),
			(this.StartDecisionSize = 0),
			(this.EndDecisionSize = 0);
	}
	GameplayStart(e) {
		(this.CurrentGameplayId = e),
			(e =
				ConfigManager_1.ConfigManager.SignalDecodeConfig.GetGameplayConfig(
					e,
				)) &&
				((this.CurrentGameplayType = e.Type),
				(this.CurrentMorseCode = e.MorseCode),
				(this.CurrentDifficulty = e.Difficulty),
				(e =
					ConfigManager_1.ConfigManager.SignalDecodeConfig.GetDifficultyConfig(
						e.Difficulty,
					))) &&
				((this.TargetCompletion = e.TargetCompletion),
				(this.Speed = 100 * e.SpeedRate),
				(this.StartDecisionSize = e.PressTimeWindow),
				(this.EndDecisionSize = e.ReleaseTimeWindow));
	}
}
exports.SignalDecodeModel = SignalDecodeModel;
