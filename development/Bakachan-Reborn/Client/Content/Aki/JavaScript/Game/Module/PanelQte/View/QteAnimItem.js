"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QteAnimItem = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	START_ANIM_TIME = 400,
	ANIM_START = "Start",
	ANIM_LOOP = "Loop",
	ANIM_CLOSE = "Close",
	ANIM_PRESS = "Press";
class QteAnimItem {
	constructor() {
		(this.HNi = void 0),
			(this.EPe = void 0),
			(this.xNi = void 0),
			(this.jNi = void 0);
	}
	Init(e) {
		(this.HNi = e),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.HNi));
	}
	StartAnim(e = 0) {
		this.NNi(),
			e > TimerSystem_1.MIN_TIME
				? (this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
						(this.xNi = void 0), this.StartAnim();
					}, e))
				: ((this.jNi = "Start"),
					this.Gei(this.jNi),
					(this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
						(this.xNi = void 0), (this.jNi = "Loop"), this.Gei(this.jNi);
					}, 400)));
	}
	StopAnim() {
		this.NNi(),
			this.EPe.StopSequenceByKey(this.jNi),
			(this.jNi = void 0),
			this.Gei("Close");
	}
	PressAnim() {
		this.Gei("Press");
	}
	Gei(e) {
		this.EPe.PlaySequencePurely(e);
	}
	NNi() {
		this.xNi &&
			(TimerSystem_1.TimerSystem.Remove(this.xNi), (this.xNi = void 0));
	}
	Clear() {
		this.NNi();
	}
}
exports.QteAnimItem = QteAnimItem;
