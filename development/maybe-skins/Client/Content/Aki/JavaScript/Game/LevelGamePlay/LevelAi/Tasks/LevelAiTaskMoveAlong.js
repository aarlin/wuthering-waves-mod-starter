"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskMoveAlong = void 0);
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskMoveAlong extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments),
			(this.PathPoint = void 0),
			(this.Navigation = !0),
			(this.Gce = void 0);
	}
	ExecuteTask() {
		var e;
		return (
			(this.Gce = this.CreatureDataComponent.Entity.GetComponent(36)),
			this.Gce
				? ((e = {
						Points: this.PathPoint,
						Navigation: this.Navigation,
						IsFly: !1,
						DebugMode: !0,
						Loop: !1,
						Callback: (e) => {
							this.wTe(e);
						},
						UsePreviousIndex: !0,
						UseNearestPoint: !0,
						ReturnFalseWhenNavigationFailed: !1,
					}),
					this.Gce.MoveAlongPath(e),
					3)
				: 1
		);
	}
	AbortTask() {
		return this.Gce.StopMove(!0), 2;
	}
	wTe(e) {
		switch ((this.Gce.StopMove(!0), e)) {
			case 1:
				this.FinishLatentTask(0);
				break;
			case 2:
			case 3:
				this.FinishLatentTask(1);
		}
	}
}
exports.LevelAiTaskMoveAlong = LevelAiTaskMoveAlong;
