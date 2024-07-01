"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TodTimeAdjustingAnimation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
	MINIMAL_SPEED = 1e4;
class TodTimeAdjustingAnimation {
	constructor(i, t, s, o) {
		(this.uTo = 0),
			(this.RJ = 0),
			(this.cTo = 0),
			(this.mTo = 0),
			(this.dTo = 0),
			(this.CTo = -1),
			(this.gTo = -1),
			(this.fTo = 0),
			(this.pTo = 0),
			(this.vTo = 0),
			(this.uTo = i),
			(this.RJ = t),
			(this.MTo = s),
			(this.STo = o);
	}
	get IsPlaying() {
		return 0 <= this.CTo;
	}
	get IsFinished() {
		return !!this.IsPlaying && this.CTo >= this.gTo;
	}
	$ne() {
		this.Stop(), this.STo();
	}
	Play(i, t) {
		this.Stop(),
			(this.CTo = i),
			(this.gTo = t),
			(i = this.uTo / this.RJ),
			(this.fTo = Math.abs(this.ETo() - 0.5 * this.RJ * i * i));
	}
	ETo() {
		return this.gTo - this.CTo;
	}
	Tick(i) {
		this.IsPlaying &&
			(this.IsFinished
				? this.$ne()
				: ((i /= TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND),
					(this.mTo = this.mTo + i),
					this.dTo >= this.fTo
						? ((this.pTo += i),
							(this.cTo = this.vTo - this.pTo * this.RJ),
							this.cTo <= 1e4 && (this.cTo = 1e4))
						: ((this.cTo = this.mTo * this.RJ),
							this.cTo >= this.uTo &&
								((this.cTo = this.uTo), (this.vTo = this.uTo)),
							(this.vTo = this.cTo)),
					(i *= this.cTo),
					(this.dTo += i),
					(this.CTo += i),
					this.IsFinished && (this.CTo = this.gTo),
					this.MTo(this.CTo)));
	}
	Stop() {
		(this.cTo = 0),
			(this.mTo = 0),
			(this.CTo = -1),
			(this.gTo = -1),
			(this.pTo = 0),
			(this.dTo = 0),
			(this.fTo = 0),
			(this.vTo = 0);
	}
	DebugPrint() {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"TimeOfDay",
				17,
				"TodTimeAdjustingAnimation",
				["this.MaxV", this.uTo],
				["this.A", this.RJ],
				["this.StartSecond", this.CTo],
				["this.ToSecond", this.gTo],
			);
	}
}
exports.TodTimeAdjustingAnimation = TodTimeAdjustingAnimation;
