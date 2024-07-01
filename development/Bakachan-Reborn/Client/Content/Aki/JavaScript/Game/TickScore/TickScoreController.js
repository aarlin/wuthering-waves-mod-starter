"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickScoreController = void 0);
const ScoreUpdateManager_1 = require("../AI/Common/ScoreUpdateManager"),
	SWIM_MAX_COUNT = 3;
class TickScoreController {
	static Init() {
		this.SwimTickScore = new ScoreUpdateManager_1.ScoreUpdateManager(1, 3);
	}
	static Tick(e) {
		this.SwimTickScore.Update();
	}
}
exports.TickScoreController = TickScoreController;
