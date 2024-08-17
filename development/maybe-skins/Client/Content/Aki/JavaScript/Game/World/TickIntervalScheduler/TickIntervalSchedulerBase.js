"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickIntervalSchedulerBase = exports.ScoreNode = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils");
class ScoreNode {
	constructor() {
		(this.Item = void 0), (this.Score = 0);
	}
}
exports.ScoreNode = ScoreNode;
class TickIntervalSchedulerBase {
	constructor() {
		(this.MaxNoIntervalCount = 0),
			(this.AverageOtherTickCount = 0),
			(this.NoIntervalThreshold = 0),
			(this.MinTickCountDelta = 0),
			(this.MaxTickCountDelta = 0),
			(this.CurrentCountDelta = 0),
			(this.DeltaRatio = 1),
			(this.MJ = void 0);
	}
	SetBaseConfigs(t, e, r) {
		(this.MaxNoIntervalCount = Math.max(0, t)),
			(this.AverageOtherTickCount = Math.max(1, e)),
			(this.NoIntervalThreshold = r);
	}
	SetCountDelta(t) {
		this.CurrentCountDelta = MathUtils_1.MathUtils.Clamp(
			t * this.DeltaRatio,
			this.MinTickCountDelta,
			this.MaxTickCountDelta,
		);
	}
	Schedule() {
		this.GetScores(), this.ScheduleTickInterval();
	}
	ChangeTickFramePeriodByFrameRate(t) {}
	GetScores() {}
	ScheduleTickInterval() {}
}
exports.TickIntervalSchedulerBase = TickIntervalSchedulerBase;
