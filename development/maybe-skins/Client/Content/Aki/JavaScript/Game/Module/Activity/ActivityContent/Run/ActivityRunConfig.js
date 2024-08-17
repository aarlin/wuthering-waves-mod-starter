"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunConfig = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ParkourChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRunConfig extends ConfigBase_1.ConfigBase {
	GetActivityRunChallengeConfig(e) {
		return ParkourChallengeById_1.configParkourChallengeById.GetConfig(e);
	}
	GetActivityRunTitle(e) {
		return (
			(e = this.GetActivityRunChallengeConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? ""
		);
	}
	GetActivityRunScoreMap(e) {
		e = this.GetActivityRunChallengeConfig(e);
		const t = new Map();
		let i = 0;
		return (
			e.RewardList.forEach((e) => {
				var n = e.Item1;
				e = e.Item2;
				t.set(i, [n, e]), i++;
			}),
			t
		);
	}
	GetActivityRunMarkId(e) {
		return this.GetActivityRunChallengeConfig(e).MarkId;
	}
	GetActivityRunTexture(e) {
		return this.GetActivityRunChallengeConfig(e).BackGroundTexture;
	}
}
exports.ActivityRunConfig = ActivityRunConfig;
