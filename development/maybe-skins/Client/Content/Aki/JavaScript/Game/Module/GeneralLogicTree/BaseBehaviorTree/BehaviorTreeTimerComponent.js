"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorTreeTimerCenter = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
	CountDownTimer_1 = require("../Timer/CountDownTimer"),
	FailRangeTimer_1 = require("../Timer/FailRangeTimer"),
	LevelPlayPrepareTimer_1 = require("../Timer/LevelPlayPrepareTimer"),
	NoUiTimer_1 = require("../Timer/NoUiTimer"),
	TICK_INTETVAL_TIME = 20,
	FAILEDRANGE_INTERTVAL = 100;
class BehaviorTreeTimerCenter {
	constructor(e) {
		(this.Gct = BigInt(0)),
			(this.EJ = void 0),
			(this.Gct = e),
			(this.EJ = new Map());
	}
	Dispose() {
		for (var [, e] of this.EJ) e.Destroy();
		this.EJ.clear();
	}
	UpdateTimerInfo(e) {
		var i;
		e &&
			((i = e.y5n),
			e.jCs && 0 !== (e = MathUtils_1.MathUtils.LongToNumber(e.jCs))
				? this.CKt(i, e)
				: this.dKt(i));
	}
	CKt(e, i) {
		let r;
		switch (e) {
			case "CountDownChallenge":
			case "PublicTime":
				(r = this.GetTimer(e)) ||
					((r = new CountDownTimer_1.CountDownTimer(this.Gct, e, 20)),
					this.EJ.set(e, r));
				break;
			case "WaitTime":
				(r = this.GetTimer(e)) ||
					((r = new NoUiTimer_1.NoUiTimer(this.Gct, e, !0, 20)),
					this.EJ.set(e, r));
				break;
			case "GameStartCountDown":
				(r = this.GetTimer(e)) ||
					((r = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(
						this.Gct,
						e,
						!1,
					)),
					this.EJ.set(e, r));
				break;
			case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
			case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
				(r = this.GetTimer(e)) ||
					((r = new FailRangeTimer_1.FailRangeTimer(this.Gct, e, 100)),
					this.EJ.set(e, r));
		}
		r?.StartShowTimer(i);
	}
	dKt(e) {
		var i = this.GetTimer(e);
		if (i)
			switch (e) {
				case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
				case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
				case "GameStartCountDown":
					i.EndShowTimer();
					break;
				default:
					i.Destroy(), this.EJ.delete(e);
			}
	}
	GetTimer(e) {
		return this.EJ.get(e);
	}
	GetRemainTime(e = "CountDownChallenge") {
		return this.GetTimer(e)?.GetRemainTime() ?? 0;
	}
}
exports.BehaviorTreeTimerCenter = BehaviorTreeTimerCenter;
