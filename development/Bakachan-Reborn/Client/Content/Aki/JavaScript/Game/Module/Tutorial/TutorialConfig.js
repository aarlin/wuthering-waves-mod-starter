"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialConfig = void 0);
const GuideTutorialById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class TutorialConfig extends ConfigBase_1.ConfigBase {
	GetTutorial(e) {
		return GuideTutorialById_1.configGuideTutorialById.GetConfig(e);
	}
}
exports.TutorialConfig = TutorialConfig;
